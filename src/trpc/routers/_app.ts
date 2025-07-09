import { createTRPCRouter } from "../init";
import { customersRouter } from "@/modules/customers/server/procedure";
export const appRouter = createTRPCRouter({
  customers: customersRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
