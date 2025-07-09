import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const customersRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const customers = ctx.payload.find({
      collection: "customers",
      depth: 1,
      limit: 10,
    });

    return customers; // Example response
  }),
});
