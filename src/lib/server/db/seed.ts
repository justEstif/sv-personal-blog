
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { users, blogs, posts } from './seed-data';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  console.log('Seeding database...');

  await db.insert(schema.user).values(users);
  console.log(`Seeded ${users.length} users`);

  const insertedBlogs = await db.insert(schema.blog).values(blogs).returning();
  console.log(`Seeded ${insertedBlogs.length} blogs`);

  const postsToInsert = posts.map((post) => ({
    ...post,
    blogId: insertedBlogs.find((b) => b.userId === `author-user-id-${post.blogId}`)!.id,
  }));

  await db.insert(schema.post).values(postsToInsert);
  console.log(`Seeded ${postsToInsert.length} posts`);

  console.log('Database seeded successfully!');

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
