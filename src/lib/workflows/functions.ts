import { unwdk, userSignup } from "./client.js";

export const sendWelcome = unwdk.step("sendWelcome", async (email: string) => {
  console.log(`[sendWelcome] would email ${email}`);
});

export const onSignup = unwdk.createFunction(
  { id: "on-signup", trigger: { event: userSignup } },
  async ({ event, step }) => {
    await step.sleep("grace", "5 seconds");
    await step.run(sendWelcome, event.data.email);
    return { userId: event.data.userId };
  },
);

export const functions = [onSignup];
