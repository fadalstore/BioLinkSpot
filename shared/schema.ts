import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  title: text("title"),
  location: text("location"),
  bio: text("bio"),
  profilePicture: text("profile_picture"),
  website: text("website"),
  followers: integer("followers").default(0),
  following: integer("following").default(0),
  posts: integer("posts").default(0),
});

export const socialLinks = pgTable("social_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  platform: text("platform").notNull(), // instagram, twitter, linkedin, youtube, github, website
  handle: text("handle").notNull(),
  url: text("url").notNull(),
  isActive: text("is_active").default("true"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;
