import { getUser } from "../actions/getUser";
import UpdateForm from "@/app/(frontend)/(auth)/dashboard/components/updateForm";
import { Customers } from "@/config/collections/Customers/Customers";
import type { Customer, TierProps } from "@/payload-types";
import { ResetPasswordButton } from "@/app/(frontend)/(auth)/components/ResetPasswordButton";

export default async function Page() {
  const user = (await getUser()) as Customer;
  const tiers = Customers.fields
    .filter((field) => field.type === "radio")
    .filter((field) => field.name === "tier")[0].options;
  return (
    <main className={`mx-auto my-8 w-full sm:max-w-sm`}>
      <div className={`my-8`}>
        <h1>
          Hello, {user?.firstName === "" ? user?.email : user?.firstName}!
        </h1>
        <p>
          You are currently on the {user.tier?.toLowerCase() || "free"} tier.
        </p>
      </div>
      <UpdateForm user={user} tiers={tiers as TierProps[]} />
      <div className={`flex items-center justify-start gap-4`}>
        <ResetPasswordButton email={user.email} />
      </div>
    </main>
  );
}
