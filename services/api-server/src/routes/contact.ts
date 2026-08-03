import { Router } from "express";
import { db } from "@workspace/db";
import { contactTable } from "@workspace/db";
const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};
  if (!name || !email || !subject || !message || message.length < 10) {
    res.status(400).json({ error: "Invalid form data" });
    return;
  }
  await db.insert(contactTable).values({ name, email, subject, message });
  res.status(201).json({ success: true, message: "Message received. I'll be in touch soon." });
});

export default router;
