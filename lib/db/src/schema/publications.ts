import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const publicationsTable = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").array().notNull().default([]),
  venue: text("venue").notNull(),
  year: integer("year").notNull(),
  abstract: text("abstract"),
  plainLanguageSummary: text("plain_language_summary"),
  doi: text("doi"),
  url: text("url"),
  tags: text("tags").array().notNull().default([]),
});

export const insertPublicationSchema = createInsertSchema(publicationsTable).omit({ id: true });
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publicationsTable.$inferSelect;
