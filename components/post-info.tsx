import { ArrowUpDoubleIcon, ChatLineIcon, PenLineIcon } from "./ui/icons";
import { TimeAgo } from "./time-ago";

interface PostInfoProps {
  time: number;
  score?: number;
  by?: string;
  commentsCount?: number;
}

export function PostInfo({ time, score, by, commentsCount }: PostInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {score && (
        <div className="flex items-center gap-1">
          <ArrowUpDoubleIcon className="h-4 w-4" />
          <div className="flex items-center gap-0.5">
            <span className="text-xs font-normal text-light">{score}</span>
            <span className="text-xs font-normal text-light">points</span>
          </div>
        </div>
      )}
      {by && (
        <div className="flex items-center gap-1">
          <PenLineIcon className="h-4 w-4" />
          <div className="flex items-center gap-0.5">
            <span className="text-xs font-normal text-light">by</span>
            <span className="text-xs font-medium text-primary">{by}</span>
          </div>
        </div>
      )}
      <TimeAgo time={time} />
      {commentsCount && commentsCount > 0 ? (
        <div className="flex items-center gap-1">
          <ChatLineIcon className="h-4 w-4" />
          <div className="flex items-center gap-0.5">
            <span className="text-xs font-normal text-light">
              {commentsCount}
            </span>
            <span className="text-xs font-normal text-light">comments</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
