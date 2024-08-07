import {
  ArrowLeftIcon,
  ArrowUpDoubleIcon,
  ChatLineIcon,
  ClockLineIcon,
  Link,
  PenLineIcon,
} from "./ui";
import { cn, timeAgo } from "@/lib/utils";
import { sanitize } from "isomorphic-dompurify";
import type { PropsWithChildren, ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

interface PostItemProps extends PropsWithChildren {
  title: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  text?: string;
}

export function PostItem({
  title,
  score,
  by,
  time,
  descendants,
  text,
  children,
}: PostItemProps) {
  return (
    <div className="flex flex-col items-stretch gap-y-12">
      <div className="flex items-center gap-4 self-stretch">
        <Link
          href="../../"
          className="flex items-center justify-center gap-1 pl-0 text-primary hover:text-orange-800 hover:no-underline"
        >
          <ArrowLeftIcon />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>
      <div className="flex flex-col items-stretch">
        <div className="flex flex-col gap-4 self-stretch">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <ArrowUpDoubleIcon className="h-4 w-4" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-light">{score}</span>
                <span className="text-xs font-normal text-light">points</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <PenLineIcon className="h-4 w-4" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-light">by</span>
                <span className="text-xs font-medium text-primary">{by}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ClockLineIcon className="h-4 w-4" />
              <time className="text-xs font-normal text-light">
                {timeAgo(time)}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <ChatLineIcon className="h-4 w-4" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-light">
                  {descendants}
                </span>
                <span className="text-xs font-normal text-light">comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {text && (
        <div
          className="text-lg text-light"
          dangerouslySetInnerHTML={{ __html: sanitize(text) }}
        />
      )}
      {children}
    </div>
  );
}

interface CommentProps extends PropsWithChildren {
  level: number;
  by?: string;
  time: number;
  text?: string;
}

function Comment({ level, by, time, text, children }: CommentProps) {
  return (
    <div
      className={cn("relative flex flex-col gap-3 py-4", {
        "comment py-2 pl-5": level !== 0,
        "border-b-2": level === 0,
      })}
    >
      <div
        className={cn("flex gap-x-1 text-sm", {
          "comment-heading": level !== 0,
        })}
      >
        {by && <span className="font-semibold">{by} &#183;</span>}
        <time className="text-light">{timeAgo(time)}</time>
      </div>
      {text && (
        <div
          dangerouslySetInnerHTML={{ __html: sanitize(text) }}
          className="text-wrap text-sm"
        />
      )}
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

function CommentsContainer({
  children,
  descendants,
}: {
  children: ReactNode;
  descendants: number;
}) {
  return (
    <div>
      <div className="border-t-2 py-4">
        <p className="font-medium">
          {`${descendants} comment${descendants > 1 ? "s" : ""}`}
        </p>
      </div>
      {children}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="relative flex flex-col gap-3 py-4">
      <Skeleton className="flex h-[15px] w-[150px] gap-x-1" />
      <Skeleton className="h-[80px] w-full" />
    </div>
  );
}

PostItem.Comment = Comment;
PostItem.CommentsContainer = CommentsContainer;
PostItem.CommentSkeleton = CommentSkeleton;
