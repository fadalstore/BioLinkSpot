import { 
  type User, 
  type InsertUser, 
  type SocialLink, 
  type InsertSocialLink,
  type Tip,
  type InsertTip,
  type Analytics,
  type InsertAnalytics
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  getSocialLinks(userId: string): Promise<SocialLink[]>;
  createSocialLink(socialLink: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: string, socialLink: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  // Tips functionality
  createTip(tip: InsertTip): Promise<Tip>;
  getTips(userId: string): Promise<Tip[]>;
  // Analytics functionality
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalytics(userId: string): Promise<Analytics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private socialLinks: Map<string, SocialLink>;
  private tips: Map<string, Tip>;
  private analytics: Map<string, Analytics>;

  constructor() {
    this.users = new Map();
    this.socialLinks = new Map();
    this.tips = new Map();
    this.analytics = new Map();
    
    // Create default user with social links
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    const defaultUser: User = {
      id: "default-user",
      username: "alexjohnson",
      displayName: "Alex Johnson",
      title: "Digital Creator & Designer",
      location: "San Francisco, CA",
      bio: "Passionate about creating beautiful digital experiences. Follow me for design tips, tech insights, and creative inspiration! ✨",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
      website: "alexjohnson.design",
      followers: 12500,
      following: 2100,
      posts: 458,
      stripeCustomerId: null,
      premiumPlan: null,
      premiumExpiresAt: null,
      createdAt: new Date(),
    };

    this.users.set(defaultUser.id, defaultUser);

    const defaultSocialLinks: Omit<SocialLink, 'id'>[] = [
      {
        userId: "default-user",
        platform: "instagram",
        handle: "@alexjohnson",
        url: "https://instagram.com/alexjohnson",
        isActive: "true",
      },
      {
        userId: "default-user",
        platform: "twitter",
        handle: "@alexj_design",
        url: "https://twitter.com/alexj_design",
        isActive: "true",
      },
      {
        userId: "default-user",
        platform: "linkedin",
        handle: "Alex Johnson",
        url: "https://linkedin.com/in/alexjohnson",
        isActive: "true",
      },
      {
        userId: "default-user",
        platform: "youtube",
        handle: "Alex Johnson Design",
        url: "https://youtube.com/@alexjohnsondesign",
        isActive: "true",
      },
      {
        userId: "default-user",
        platform: "github",
        handle: "alexjohnson",
        url: "https://github.com/alexjohnson",
        isActive: "true",
      },
      {
        userId: "default-user",
        platform: "website",
        handle: "alexjohnson.design",
        url: "https://alexjohnson.design",
        isActive: "true",
      },
    ];

    defaultSocialLinks.forEach(link => {
      const id = randomUUID();
      this.socialLinks.set(id, { ...link, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      title: insertUser.title ?? null,
      location: insertUser.location ?? null,
      bio: insertUser.bio ?? null,
      profilePicture: insertUser.profilePicture ?? null,
      website: insertUser.website ?? null,
      followers: insertUser.followers ?? null,
      following: insertUser.following ?? null,
      posts: insertUser.posts ?? null,
      stripeCustomerId: insertUser.stripeCustomerId ?? null,
      premiumPlan: insertUser.premiumPlan ?? null,
      premiumExpiresAt: insertUser.premiumExpiresAt ?? null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updateData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getSocialLinks(userId: string): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values()).filter(
      (link) => link.userId === userId,
    );
  }

  async createSocialLink(insertSocialLink: InsertSocialLink): Promise<SocialLink> {
    const id = randomUUID();
    const socialLink: SocialLink = { 
      ...insertSocialLink, 
      id,
      isActive: insertSocialLink.isActive ?? null,
    };
    this.socialLinks.set(id, socialLink);
    return socialLink;
  }

  async updateSocialLink(id: string, updateData: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const link = this.socialLinks.get(id);
    if (!link) return undefined;
    
    const updatedLink = { ...link, ...updateData };
    this.socialLinks.set(id, updatedLink);
    return updatedLink;
  }

  async deleteSocialLink(id: string): Promise<boolean> {
    return this.socialLinks.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Tips functionality
  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = randomUUID();
    const tip: Tip = { 
      ...insertTip, 
      id,
      currency: insertTip.currency ?? "USD",
      paymentIntentId: insertTip.paymentIntentId ?? null,
      status: insertTip.status ?? "pending",
      tipperName: insertTip.tipperName ?? null,
      message: insertTip.message ?? null,
      createdAt: new Date(),
    };
    this.tips.set(id, tip);
    return tip;
  }

  async getTips(userId: string): Promise<Tip[]> {
    return Array.from(this.tips.values()).filter(
      (tip) => tip.userId === userId,
    );
  }

  // Analytics functionality
  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = { 
      ...insertAnalytics, 
      id,
      linkId: insertAnalytics.linkId ?? null,
      metadata: insertAnalytics.metadata ?? null,
      ipAddress: insertAnalytics.ipAddress ?? null,
      userAgent: insertAnalytics.userAgent ?? null,
      createdAt: new Date(),
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getAnalytics(userId: string): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(
      (analytics) => analytics.userId === userId,
    );
  }
}

export const storage = new MemStorage();
