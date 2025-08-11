import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSocialLinkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user by username
  app.get("/api/users/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const socialLinks = await storage.getSocialLinks(user.id);
      
      res.json({
        user,
        socialLinks,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get default user (for demo)
  app.get("/api/profile", async (req, res) => {
    try {
      const user = await storage.getUser("default-user");
      
      if (!user) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const socialLinks = await storage.getSocialLinks(user.id);
      
      res.json({
        user,
        socialLinks,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create user
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Update user
  app.put("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, validatedData);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Create social link
  app.post("/api/social-links", async (req, res) => {
    try {
      const validatedData = insertSocialLinkSchema.parse(req.body);
      const socialLink = await storage.createSocialLink(validatedData);
      res.status(201).json(socialLink);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Update social link
  app.put("/api/social-links/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertSocialLinkSchema.partial().parse(req.body);
      const socialLink = await storage.updateSocialLink(id, validatedData);
      
      if (!socialLink) {
        return res.status(404).json({ message: "Social link not found" });
      }
      
      res.json(socialLink);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Delete social link
  app.delete("/api/social-links/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteSocialLink(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Social link not found" });
      }
      
      res.json({ message: "Social link deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
