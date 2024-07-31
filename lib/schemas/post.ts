import { z } from "zod";

export const PostTypeSchema = z.enum([
  "story",
  "job",
  "poll",
  "pollopt",
  "comment",
]);
export const PostTypeEnum = PostTypeSchema.Enum;
export type PostType = z.infer<typeof PostTypeSchema>;

const descObj = {
  kids: "The ids of the item's comments, in ranked display order.",
  text: "The comment, story or poll text. HTML.",
  score: "The story's score, or the votes for a pollopt.",
  title: "The title of the story, poll or job. HTML.",
  descendants: "In the case of stories or polls, the total comment count.",
  url: "The URL of the story.",
} as const;

const BaseItemSchema = z.object({
  by: z.string().describe("The username of the item's author."),
  id: z.number().describe("The item's unique id."),
  time: z.number().describe("Creation date of the item, in Unix Time."),
  type: PostTypeSchema.describe("The type of item."),
  deleted: z.boolean().default(false).describe("true if the item is deleted."),
  dead: z.boolean().default(false).describe("true if the item is dead."),
});

export const StoryItemSchema = BaseItemSchema.extend({
  type: z.literal(PostTypeEnum.story),
  descendants: z.number().describe(descObj.descendants),
  kids: z.array(z.number()).optional().describe(descObj.kids),
  score: z.number().describe(descObj.score),
  title: z.string().describe(descObj.title),
  url: z.string().optional().describe(descObj.url),
  text: z.string().optional().describe(descObj.text), // This can be HTML code, mak sure to have Content Security Policy (CSP) enabled
});
export type StoryItem = z.infer<typeof StoryItemSchema>;

export const CommentItemSchema = BaseItemSchema.extend({
  type: z.literal(PostTypeEnum.comment),
  kids: z.array(z.number()).optional().describe(descObj.kids),
  parent: z
    .number()
    .describe(
      "The comment's parent: either another comment or the relevant story.",
    ),
  text: z.string().optional().describe(descObj.text),
  by: z.string().optional().describe("The username of the item's author."),
});
export type CommentItem = z.infer<typeof CommentItemSchema>;

export const JobItemSchema = BaseItemSchema.extend({
  type: z.literal(PostTypeEnum.job),
  score: z.number().describe(descObj.score),
  text: z.string().optional().describe(descObj.text),
  title: z.string().describe(descObj.title),
  url: z.string().optional().describe(descObj.url),
});

export const PollItemSchema = BaseItemSchema.extend({
  type: z.literal(PostTypeEnum.poll),
  descendants: z.number().describe(descObj.descendants),
  kids: z.array(z.number()).optional().describe(descObj.kids),
  parts: z
    .array(z.number())
    .describe("A list of related pollopts, in display order."),
  score: z.number().describe(descObj.score),
  text: z.string().optional().describe(descObj.text),
  title: z.string().describe(descObj.title),
});

export const PollOptItemSchema = BaseItemSchema.extend({
  type: z.literal(PostTypeEnum.pollopt),
  poll: z.number().describe("The pollopt's associated poll."),
  score: z.number().describe(descObj.score),
  text: z.string().optional().describe(descObj.text),
});

export const PostItemSchema = z.discriminatedUnion("type", [
  StoryItemSchema,
  CommentItemSchema,
  JobItemSchema,
  PollItemSchema,
  PollOptItemSchema,
]);
export type PostItem = z.infer<typeof PostItemSchema>;

export function isStoryItem(item: PostItem): item is StoryItem {
  return item.type === PostTypeEnum.story;
}

export function isCommentItem(item: PostItem): item is CommentItem {
  return item.type === PostTypeEnum.comment;
}
