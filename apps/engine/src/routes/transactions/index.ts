import { ErrorSchema } from "@/common/schema";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { TransactionsParamsSchema, TransactionsSchema } from "./schema";

const app = new OpenAPIHono();

const indexRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: TransactionsParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TransactionsSchema,
        },
      },
      description: "Retrieve transactions",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Returns an error",
    },
  },
});

app.openapi(indexRoute, (c) => {
  return c.json(
    {
      data: [],
    },
    200
  );
});

export default app;
