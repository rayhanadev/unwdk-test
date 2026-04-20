import { Hono } from "hono";
import { serve } from "unwdk";
import { unwdk } from "./lib/workflows/client.js";
import { functions } from "./lib/workflows/functions.js";

const workflowHandler = serve({ functions });

const app = new Hono();

app.get("/", (c) => c.text("unwdk + hono test :)"));

app.post("/signup", async (c) => {
  const body = await c.req.json();
  const run = await unwdk.send({
    name: "user/signup",
    data: { userId: body.userId, email: body.email },
  });
  return c.json({ runId: run });
});

app.all("/.well-known/workflow/v1/*", (c) => workflowHandler(c.req.raw));

export default app;
