import type { CollectionConfig } from "payload";
import { protectRoles } from "./hooks/protectRoles";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200, // 2 hours
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
      required: true,
      defaultValue: "user",
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],
  // access: {
  //   admin: ({ req: { user } }) => {
  //     return user?.collection === "users" && user?.roles?.includes("admin");
  //   },
  // },
};
