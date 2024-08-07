import { fetchItem } from "@/lib/api";
import { isCommentItem, PostTypeEnum } from "@/lib/schemas";
import { exhaustiveGuard } from "@/lib/utils";
import type { Metadata } from "next";
import "./page.css";
import { NotFoundSection } from "@/components/not-found";
import { Suspense } from "react";
import { PostItem } from "@/components/post-item";

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
          title={item.title}
          score={item.score}
          by={item.by}
          time={item.time}
          descendants={item.descendants}
          text={item.text}
        >
          {item.descendants > 0 && (
            <PostItem.CommentsContainer descendants={item.descendants}>
              {(item.kids || []).map((kid) => (
                <Suspense
                  key={`item-suspense-${params.id}-comment-${kid}`}
                  fallback={<PostItem.CommentSkeleton />}
                >
                  <AsyncComment id={kid} level={0} />
                </Suspense>
              ))}
            </PostItem.CommentsContainer>
          )}
        </PostItem>
      );
    case PostTypeEnum.poll:
    case PostTypeEnum.pollopt:
    case PostTypeEnum.job:
    case PostTypeEnum.comment:
      return <></>;
    default:
      return exhaustiveGuard(type);
  }
}

async function AsyncComment({ id, level }: { id: number; level: number }) {
  const item = await fetchItem(id);

  if (!item) {
    return null;
  }

  if (!isCommentItem(item) || !item.text) {
    return null;
  }

  return (
    <PostItem.Comment
      level={level}
      by={item.by}
      time={item.time}
      text={item.text}
    >
      {item.kids?.map((kid) => (
        <AsyncComment
          id={kid}
          key={`reply-${id}-kid-${kid}`}
          level={level + 1}
        />
      ))}
    </PostItem.Comment>
  );
}
