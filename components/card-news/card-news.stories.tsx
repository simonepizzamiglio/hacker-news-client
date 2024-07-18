import type { Meta, StoryObj } from "@storybook/react";

import { CardNews } from "./card-news";
import { PostTypeEnum } from "@/schemas";

const meta: Meta<typeof CardNews> = {
  component: CardNews,
};

export default meta;

type Story = StoryObj<typeof CardNews>;

export const Primary: Story = {
  args: {
    title: "My title",
    href: "#",
    points: 34,
    by: "Bill Gates",
    timestamp: 1721059974754,
    postType: PostTypeEnum.story,
    commentsCount: 7,
  },
};
