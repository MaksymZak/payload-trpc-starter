import { getPayloadClient } from "@/db/client";

export const seedUsers = async () => {
  const payload = await getPayloadClient();

  console.log("👤 Creating admin user...");

  // Create the admin user
  await payload.create({
    collection: "users",
    data: {
      email: "test@gmail.com",
      password: "123456",
      roles: ["admin"], // Ensure the role is set to admin
    },
  });

  console.log("✅ Admin user created: test@gmail.com");
  console.log("🌱 Database seeded successfully");
};
