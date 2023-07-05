import { z } from "zod";

export const editCommentSchema = z.object({
    content: z.string().optional()
});

export type EditComment = z.infer<typeof editCommentSchema>