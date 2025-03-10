import { z } from "zod";
import { userRow } from "./user";

export const notificationRow = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  user_id: z.string(),
  type: z.string(),
  flight_request_id: z.string(),
  quotation_id: z.string(),
  from_user: userRow,
  created_at: z.string(),
});

const notificationRowWithPagination = z.object({
  data: notificationRow.array(),
  count: z.number(),
});

export type NotificationRowsWithPagination = z.infer<
  typeof notificationRowWithPagination
>;

export type NotificationRow = z.infer<typeof notificationRow>;

export const notificationStatusEnum = z.enum(["NEW_QUOTATION", "GENERAL"]);
