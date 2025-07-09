import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import React from "react";

import config from "@/payload.config";
import "./styles.css";
import { Button } from "@/components/ui/button";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  const queryClient = getQueryClient();
  const customers = await queryClient.fetchQuery(
    trpc.customers.getMany.queryOptions(),
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 xl:text-4xl">
        Welcome to Teacher Booking
      </h1>

      <Button type="button">Shadcn/ui</Button>

      {customers.docs.map((subject, index) => (
        <div key={index} className="mt-4">
          <h2 className="text-xl font-semibold">{subject.email}</h2>
        </div>
      ))}

      <pre>{JSON.stringify(customers, null, 2)}</pre>
    </div>
  );
}
