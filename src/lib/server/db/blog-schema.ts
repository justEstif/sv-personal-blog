import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

// Blogs table - one blog per user
export const blog = pgTable("blog", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  coverImageUrl: text("cover_image_url"), // Cover image URL from MinIO
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Posts table - SVX content
export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blog.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(), // SVX content
  excerpt: text("excerpt"),
  featuredImageUrl: text("featured_image_url"), // Featured image URL from MinIO
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array().default([]).notNull(), // Array of tag strings
  // SEO metadata
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords").array().default([]).notNull(), // Array of keywords
  ogImageUrl: text("og_image_url"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  viewCount: integer("view_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Tags table - for tag management and autocomplete
export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blog.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Assets table - MinIO file references
export const asset = pgTable("asset", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blog.id, { onDelete: "cascade" }),
  filename: text("filename").notNull(),
  originalName: text("original_name"),
  minioKey: text("minio_key").notNull(), // Full path in MinIO bucket
  bucket: text("bucket").notNull(), // bucket name (blog-assets, blog-posts, etc)
  mimeType: text("mime_type"),
  size: integer("size"), // file size in bytes
  altText: text("alt_text"),
  uploadedBy: text("uploaded_by")
    .notNull()
    .references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
