"use client";

import { fetchItem } from "@/lib/api";
import { isCommentItem, type CommentItem } from "@/lib/schemas";
import { PostItem } from "./post-item";
import { Suspense, useState, useCallback, useEffect } from "react";
import { Button } from "./ui";

interface PaginatedCommentsProps {
  initialCommentIds: number[];
  descendants: number;
}

const INITIAL_COMMENTS_COUNT = 10;
const COMMENTS_PAGE_SIZE = 10;
const REPLIES_PAGE_SIZE = 5;

export function PaginatedComments({
  initialCommentIds,
  descendants,
}: PaginatedCommentsProps) {
  const [visibleCommentIds, setVisibleCommentIds] = useState(
    initialCommentIds.slice(0, INITIAL_COMMENTS_COUNT),
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreComments = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    const currentCount = visibleCommentIds.length;
    const nextBatch = initialCommentIds.slice(
      currentCount,
      currentCount + COMMENTS_PAGE_SIZE,
    );

    setVisibleCommentIds((prev) => [...prev, ...nextBatch]);
    setIsLoadingMore(false);
  }, [initialCommentIds, visibleCommentIds.length, isLoadingMore]);

  const hasMoreComments = visibleCommentIds.length < initialCommentIds.length;

  return (
    <PostItem.CommentsContainer descendants={descendants}>
      {visibleCommentIds.map((id) => (
        <Suspense
          key={`paginated-comment-${id}`}
          fallback={<PostItem.CommentSkeleton />}
        >
          <PaginatedComment id={id} level={0} />
        </Suspense>
      ))}
      {hasMoreComments && (
        <div className="border-t py-4">
          <Button
            variant="link"
            onClick={loadMoreComments}
            disabled={isLoadingMore}
            aria-label={`Load more comments (${initialCommentIds.length - visibleCommentIds.length} remaining)`}
          >
            {isLoadingMore
              ? "Loading..."
              : `Load More Comments (${initialCommentIds.length - visibleCommentIds.length} remaining)`}
          </Button>
        </div>
      )}
    </PostItem.CommentsContainer>
  );
}

interface PaginatedCommentProps {
  id: number;
  level: number;
}

function PaginatedComment({ id, level }: PaginatedCommentProps) {
  const [comment, setComment] = useState<CommentItem | null>(null);
  const [visibleReplyIds, setVisibleReplyIds] = useState<number[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load the comment on mount
  useEffect(() => {
    fetchItem(id).then((item) => {
      if (item && isCommentItem(item) && item.text) {
        setComment(item);
        // If there are less than 3 replies, show them all
        if (item.kids && item.kids.length <= 2) {
          setVisibleReplyIds(item.kids.slice(0, 3));
          // Otherwise, show only the first one
        } else if (item.kids && item.kids.length > 0) {
          setVisibleReplyIds(item.kids.slice(0, 1));
        }
      }
      setIsLoading(false);
    });
  }, [id]);

  const loadMoreReplies = useCallback(async () => {
    if (!comment?.kids || isLoadingReplies) return;

    setIsLoadingReplies(true);
    const currentCount = visibleReplyIds.length;
    const nextBatch = comment.kids.slice(
      currentCount,
      currentCount + REPLIES_PAGE_SIZE,
    );

    setVisibleReplyIds((prev) => [...prev, ...nextBatch]);
    setIsLoadingReplies(false);
  }, [comment?.kids, visibleReplyIds.length, isLoadingReplies]);

  if (isLoading) {
    return <PostItem.CommentSkeleton />;
  }

  if (!comment) {
    return null;
  }

  const hasMoreReplies =
    comment.kids && visibleReplyIds.length < comment.kids.length;

  return (
    <PostItem.Comment
      level={level}
      by={comment.by}
      time={comment.time}
      text={comment.text}
    >
      {visibleReplyIds.map((replyId) => (
        <PaginatedComment
          key={`paginated-reply-${id}-${replyId}`}
          id={replyId}
          level={level + 1}
        />
      ))}
      {hasMoreReplies && (
        <li className="py-2 pl-5">
          <Button
            variant="link"
            onClick={loadMoreReplies}
            disabled={isLoadingReplies}
            aria-label={`Load more replies (${comment.kids!.length - visibleReplyIds.length} remaining)`}
          >
            {isLoadingReplies
              ? "Loading..."
              : `Load More Replies (${comment.kids!.length - visibleReplyIds.length})`}
          </Button>
        </li>
      )}
    </PostItem.Comment>
  );
}
