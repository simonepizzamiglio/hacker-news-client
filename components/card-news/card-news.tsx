import { exhaustiveGuard, getDomain } from "@/lib/utils";
import {
  ArticleLineIcon,
  BarChartIcon,
  ExternalLinkIcon,
} from "@/components/ui";
import { PostTypeEnum, type PostType } from "@/lib/schemas";
import NextLink from "next/link";
import { Skeleton } from "../ui/skeleton";
import { PostInfo } from "../post-info";

const iconClassName = "h-5 w-5";

function getIcon(postType: PostType, isExternalLink: boolean) {
  switch (postType) {
    case PostTypeEnum.story:
    case PostTypeEnum.job:
      if (isExternalLink) {
        return <ExternalLinkIcon className={iconClassName} />;
      }
      return <ArticleLineIcon className={iconClassName} />;
    case PostTypeEnum.poll:
      return <BarChartIcon className={iconClassName} />;
    case PostTypeEnum.pollopt:
    case PostTypeEnum.comment:
      return <></>;
    default:
      return exhaustiveGuard(postType);
  }
}

export interface CardNewsProps {
  id: number;
  title: string;
  timestamp: number;
  postType: PostType;
  href?: string;
  points?: number;
  by?: string;
  commentsCount?: number;
}

export function CardNews({
  id,
  title,
  href,
  points,
  by,
  timestamp,
  commentsCount,
  postType,
}: CardNewsProps) {
  const domain = href ? getDomain(href) : undefined;
  const isExternalLink = Boolean(href);

  return (
    <article className="flex items-center self-stretch">
      <NextLink
        href={href || `/item/${id}`}
        target={isExternalLink ? "_blank" : undefined}
        className="flex flex-1 gap-4 px-0 py-6 hover:bg-primary-foreground hover:no-underline"
      >
        <div className="flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-stone-50 p-2">
          <div className="text-base-color">
            {getIcon(postType, isExternalLink)}
          </div>
        </div>
        <div className="flex grow flex-col justify-center gap-2">
          <div className="flex flex-col gap-1 self-stretch md:flex-row md:items-center">
            <span
              className="text-sm font-medium text-base-color"
              style={{ wordBreak: "break-word" }}
            >
              {title}
            </span>
            {domain && (
              <span className="text-xs font-normal text-light">({domain})</span>
            )}
          </div>
          <PostInfo
            time={timestamp}
            score={points}
            by={by}
            commentsCount={commentsCount}
          />
        </div>
      </NextLink>
    </article>
  );
}

export function CardNewsSkeleton() {
  return (
    <div
      className="flex items-center space-x-4 py-6"
      tabIndex={0}
      role="status"
      aria-label="Loading article"
    >
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex w-full flex-col space-y-2">
        <Skeleton className="h-4 w-11/12 sm:w-[450px]" />
        <Skeleton className="h-4 w-9/12 sm:w-[350px]" />
      </div>
    </div>
  );
}
