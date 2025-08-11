import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertUserSchema, insertSocialLinkSchema, insertTipSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

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

  // Stripe payment routes for tip jar
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          type: "tip",
          userId: "default-user"
        }
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Create subscription for premium features
  app.post("/api/create-subscription", async (req, res) => {
    try {
      const { planId, price } = req.body;
      
      // For demo purposes, create a setup intent
      const setupIntent = await stripe.setupIntents.create({
        usage: "off_session",
        metadata: {
          planId,
          price: price.toString(),
          userId: "default-user"
        }
      });
      
      res.json({ clientSecret: setupIntent.client_secret });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating subscription: " + error.message });
    }
  });

  // Analytics endpoints
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const { eventType, linkId, metadata } = req.body;
      
      const analyticsData = {
        userId: "default-user",
        linkId: linkId || null,
        eventType,
        metadata: metadata || null,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || null,
      };

      await storage.createAnalytics(analyticsData);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to track analytics" });
    }
  });

  app.get("/api/analytics/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const analytics = await storage.getAnalytics(userId);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Get tips for a user
  app.get("/api/tips/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const tips = await storage.getTips(userId);
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
