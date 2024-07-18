import { fetchItem } from "@/api-lib";
import { Link } from "@/components/ui";
import {
  ArrowUpDoubleIcon,
  ChatLineIcon,
  ClockLineIcon,
  PenLineIcon,
  ArrowLeftIcon,
} from "@/components/ui/icons";
import { isCommentItem, PostTypeEnum } from "@/schemas";
import { timeAgo } from "@/utils";
import type { Metadata } from "next";
import { sanitize } from "isomorphic-dompurify";
import { cn } from "@/lib/utils";
import "./page.css";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const item = await fetchItem(Number(params.id));

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

  if (
    item.type === PostTypeEnum.comment ||
    item.type === PostTypeEnum.pollopt ||
    item.type === PostTypeEnum.job
  ) {
    return null;
  }

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
          <h1 className="text-4xl font-semibold">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <ArrowUpDoubleIcon className="h-4 w-4" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-light">
                  {item.score}
                </span>
                <span className="text-xs font-normal text-light">points</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <PenLineIcon className="h-4 w-4" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-light">by</span>
                <span className="text-xs font-medium text-primary">
                  {item.by}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ClockLineIcon className="h-4 w-4" />
              <time className="text-xs font-normal text-light">
                {timeAgo(item.time)}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <ChatLineIcon className="h-4 w-4" />
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-light">
                  {item.descendants}
                </span>
                <span className="text-xs font-normal text-light">comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {item.text && (
        <div
          className="text-lg text-light"
          dangerouslySetInnerHTML={{ __html: sanitize(item.text) }}
        />
      )}
      {item.descendants > 0 && (
        <div>
          <div className="border-t-2 py-4">
            <p className="font-medium">
              {`${item.descendants} comment${item.descendants > 1 ? "s" : ""}`}
            </p>
          </div>
          {(item.kids || []).map((kid) => (
            <Comment
              id={kid}
              key={`item-${params.id}-comment-${kid}`}
              level={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

async function Comment({ id, level }: { id: number; level: number }) {
  const item = await fetchItem(id);

  if (!isCommentItem(item) || !item.text) {
    return null;
  }

  return (
    <div
      className={cn("relative flex flex-col gap-3 pt-4", {
        "comment py-2 pl-5": level !== 0,
        "border-b-2": level === 0,
      })}
    >
      <div
        className={cn("flex gap-x-1 text-sm", {
          "comment-heading": level !== 0,
        })}
      >
        <span className="font-semibold">{item.by} &#183;</span>
        <time className="text-light">{timeAgo(item.time)}</time>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(item.text) }}
        className="text-wrap text-sm"
      />
      <div className="relative">
        {item.kids?.map((kid) => (
          <Comment id={kid} key={`reply-${id}-kid-${kid}`} level={level + 1} />
        ))}
      </div>
    </div>
  );
}
