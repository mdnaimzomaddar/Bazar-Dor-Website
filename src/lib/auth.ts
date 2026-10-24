
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.BETTER_AUTH_DB_URL) {
  throw new Error("Please define BETTER_AUTH_DB_URL in .env");
}

const uri = process.env.BETTER_AUTH_DB_URL;
const options = {
  serverSelectionTimeoutMS: 8000, 
  connectTimeoutMS: 10000,
  family: 4,
};

declare global {

  var _mongoClient: MongoClient | undefined;
}

const client = global._mongoClient ?? new MongoClient(uri, options);
if (process.env.NODE_ENV !== "production") global._mongoClient = client;

const db = client.db("bazar-dor-website");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-ph-b14-a7.netlify.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
});