import { fetchItem, fetchItems } from "@/lib/api";
import { PollOptItemSchema, PostTypeEnum } from "@/lib/schemas";
import { exhaustiveGuard } from "@/lib/utils";
import type { Metadata } from "next";
import "./page.css";
import { NotFoundSection } from "@/components/not-found";
import { Suspense } from "react";
import { z } from "zod";
import { PostItem } from "@/components/post-item";
import { PaginatedComments } from "@/components/paginated-comments";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const item = await fetchItem(Number(params.id));

  if (!item) {
    return {
      title: "Item not found",
    };
  }

  if (
    item.type === PostTypeEnum.comment ||
    item.type === PostTypeEnum.pollopt ||
    item.type === PostTypeEnum.job
  ) {
    return { title: "Hacker News" };
  }

  return {
    title: item.title,
  };
}

export default async function Page({ params }: PageProps) {
  const item = await fetchItem(Number(params.id));

  if (!item) {
    return <NotFoundSection />;
  }

  const { type } = item;

  switch (type) {
    case PostTypeEnum.story:
      return (
        <PostItem
          id={item.id}
          title={item.title}
          score={item.score}
          by={item.by}
          time={item.time}
          descendants={item.descendants}
          text={item.text}
          link={item.url}
        >
          {item.descendants > 0 && (
            <PaginatedComments
              initialCommentIds={item.kids || []}
              descendants={item.descendants}
            />
          )}
        </PostItem>
      );
    case PostTypeEnum.poll:
      return (
        <PostItem
          id={item.id}
          title={item.title}
          score={item.score}
          by={item.by}
          time={item.time}
          descendants={item.descendants}
          text={item.text}
        >
          <Suspense
            fallback={<PostItem.PollSkeleton count={item.parts.length} />}
          >
            <AsyncPoll ids={item.parts} />
          </Suspense>
          {item.descendants > 0 && (
            <PaginatedComments
              initialCommentIds={item.kids || []}
              descendants={item.descendants}
            />
          )}
        </PostItem>
      );
    case PostTypeEnum.job:
      return (
        <PostItem
          id={item.id}
          title={item.title}
          time={item.time}
          text={item.text}
          link={item.url}
        />
      );
    case PostTypeEnum.comment:
    case PostTypeEnum.pollopt:
      return <></>;
    default:
      return exhaustiveGuard(type);
  }
}

async function AsyncPoll({ ids }: { ids: number[] }) {
  const pollOptions = await fetchItems(ids);
  const safePollOpts = z.array(PollOptItemSchema).parse(pollOptions);
  const sortedPollOpts = safePollOpts.sort((a, b) => b.score - a.score);

  return (
    <PostItem.Poll
      items={sortedPollOpts.map((opt) => ({
        votes: opt.score,
        label: opt.text || "",
      }))}
    />
  );
}
