import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from 'drizzle-orm';
import { reset } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";
import { users, blogs, posts } from "./seed-data";
import { auth } from "../auth";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  console.log("Seeding database...");

  // Reset database to start fresh
  await reset(db, schema);
  console.log("Database reset complete");

  // Create users using Better Auth API (this will handle password hashing correctly)
  const createdUsers = new Map<
    string,
    {
      id: string;
      email: string;
      role?: string;
      username?: string;
      displayUsername?: string;
    }
  >();

  for (const user of users) {
    try {
      const response = await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: "password123",
        },
      });

      if (response?.user) {
        createdUsers.set(user.email, {
          id: response.user.id,
          email: user.email,
          role: user.role,
          username: user.username,
          displayUsername: user.displayUsername,
        });
        console.log(`Created user: ${user.email}`);
      }
    } catch (error: any) {
      console.error(`Failed to create user ${user.email}:`, error?.message);
      throw error;
    }
  }

  // Update user roles and custom fields
  for (const userData of createdUsers.values()) {
    if (userData.role || userData.username || userData.displayUsername) {
      await db
        .update(schema.user)
        .set({
          role: userData.role,
          username: userData.username,
          displayUsername: userData.displayUsername,
        })
        .where(eq(schema.user.id, userData.id));
    }
  }
  console.log(
    `Updated ${createdUsers.size} users with roles and custom fields`,
  );

  // Create blogs for author users
  const blogCreateData = Array.from(createdUsers.values())
    .filter((u) => u.role === "author")
    .map((user, index) => ({
      userId: user.id,
      title: blogs[index]?.title || "Default Blog Title",
      description: blogs[index]?.description || "Default Description",
    }));

  const insertedBlogs = await db
    .insert(schema.blog)
    .values(blogCreateData)
    .returning();
  console.log(`Seeded ${insertedBlogs.length} blogs`);

  // Create posts for each blog
  const postsToInsert = posts.flatMap((post, postIndex) => {
    const blogIndex = post.blogId - 1;
    const blog = insertedBlogs[blogIndex];
    return {
      ...post,
      blogId: blog.id,
    };
  });

  await db.insert(schema.post).values(postsToInsert);
  console.log(`Seeded ${postsToInsert.length} posts`);

  console.log("Database seeded successfully!");

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
