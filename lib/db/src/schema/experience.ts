import { pgTable, text, serial, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const experienceTable = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  current: boolean("current").notNull().default(false),
  location: text("location"),
  description: text("description").notNull(),
  highlights: text("highlights").array().notNull().default([]),
  techStack: text("tech_stack").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertExperienceSchema = createInsertSchema(experienceTable).omit({ id: true });
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type ExperienceEntry = typeof experienceTable.$inferSelect;
