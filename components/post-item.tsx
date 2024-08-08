import {
  ArrowLeftIcon,
  ArrowUpDoubleIcon,
  ChatLineIcon,
  ClockLineIcon,
  Link,
  PenLineIcon,
} from "./ui";
import { cn, getDomain, timeAgo } from "@/lib/utils";
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
  link?: string;
}

export function PostItem({
  title,
  link,
  score,
  by,
  time,
  descendants,
  text,
  children,
}: PostItemProps) {
  const domain = link ? getDomain(link) : undefined;

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
      <article className="flex flex-col items-stretch">
        <div className="flex flex-col gap-4 self-stretch">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-semibold">
              {link ? (
                <a href={link} target="_blank" className="hover:underline">
                  {title}
                </a>
              ) : (
                title
              )}
            </h1>
            {domain && (
              <span className="text-sm font-normal text-light">({domain})</span>
            )}
          </div>
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
      </article>
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
    <li
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
          className="comment-text text-wrap text-sm"
        />
      )}
      {children && <ul className="relative">{children}</ul>}
    </li>
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
    <div data-testid="comments-section">
      <div className="border-t-2 py-4">
        <p className="font-medium">
          {`${descendants} comment${descendants > 1 ? "s" : ""}`}
        </p>
      </div>
      {children ? <ul>{children}</ul> : undefined}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <li className="relative flex flex-col gap-3 py-4">
      <Skeleton className="flex h-[15px] w-[150px] gap-x-1" />
      <Skeleton className="h-[80px] w-full" />
    </li>
  );
}

interface PollProps {
  items: {
    votes: number;
    label: string;
  }[];
}

let pollItemId = 0;
let pollItemSkeletonId = 0;
const POLL_ITEM_HEIGHT_CLASSNAME = "h-[36px]";

function percentage(partialValue: number, totalValue: number) {
  return Number((100 * partialValue) / totalValue).toFixed(2);
}

function Poll({ items }: PollProps) {
  const votesCount = items.reduce((count, item) => count + item.votes, 0);
  const maxVotesCount = Math.max(...items.map((item) => item.votes));
  const pointsColWidth = 50 + String(maxVotesCount).length * 12;

  return (
    <div className="flex w-full flex-col gap-y-2">
      {items.map((item) => (
        <div key={`poll-item-${pollItemId++}`} className="flex w-full gap-x-2">
          <div className="flex-grow-1 flex-shrink-1 relative flex h-[36px] w-full px-2">
            <div
              style={{ width: `${percentage(item.votes, votesCount)}%` }}
              className={`absolute left-0 top-0 z-0 ${POLL_ITEM_HEIGHT_CLASSNAME} rounded bg-orange-200`}
            />
            <span className="relative z-10 self-center text-sm">
              {item.label}
            </span>
          </div>
          <span
            className="flex-shrink-0 text-right"
            style={{ width: pointsColWidth }}
          >
            {item.votes} {`point${item.votes === 1 ? "" : "s"}`}
          </span>
        </div>
      ))}
    </div>
  );
}

function PollSkeleton({ count }: { count: number }) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      {[...new Array(count)].map(() => (
        <Skeleton
          className={`${POLL_ITEM_HEIGHT_CLASSNAME} w-full`}
          key={`poll-item-${pollItemSkeletonId++}`}
        />
      ))}
    </div>
  );
}

PostItem.Comment = Comment;
PostItem.CommentsContainer = CommentsContainer;
PostItem.CommentSkeleton = CommentSkeleton;
PostItem.Poll = Poll;
PostItem.PollSkeleton = PollSkeleton;
