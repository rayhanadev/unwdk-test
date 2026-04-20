import { Unwdk, eventType } from "unwdk";
import { z } from "zod";

export const userSignup = eventType("user/signup", {
  schema: z.object({ userId: z.string(), email: z.string().email() }),
});

export const unwdk = new Unwdk<typeof userSignup>({ id: "unwdk-test" });
