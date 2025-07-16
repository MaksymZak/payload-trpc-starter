// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "@/config/collections/Users/Users";
import { collections } from "@/config/collections";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  graphQL: {
    disable: true,
  },
  routes: {
    admin: "/admin",
    api: "/api",
  },
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: "MM/dd/yyyy",
    timezones: {
      defaultTimezone: "Europe/Berlin",
      supportedTimezones: [
        { label: "Central Europe", value: "Europe/Berlin" },
        { label: "Asia/Tokyo", value: "Asia/Tokyo" },
        { label: "America/New_York", value: "America/New_York" },
        { label: "America/Los_Angeles", value: "America/Los_Angeles" },
        { label: "Australia/Sydney", value: "Australia/Sydney" },
        { label: "Europe/Moscow", value: "Europe/Moscow" },
      ],
    },
  },

  collections: collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  email: nodemailerAdapter({
    defaultFromAddress: "zaksumy1989@email.com",
    defaultFromName: "From Payload TRPC Starter",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
});
