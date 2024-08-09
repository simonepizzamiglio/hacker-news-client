"use client";

import { useEffect, useState } from "react";
import { ClockLineIcon } from "./ui";
import { timeAgo } from "@/lib/utils";

const REVALIDATE_TIME = 1000 / 2; // 30 seconds

interface TimeAgoProps {
  time: number;
}

export function TimeAgo({ time }: TimeAgoProps) {
  const initialTime = timeAgo(time);
  const [liveTime, setLiveTime] = useState(initialTime);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(() => {
        setLiveTime(timeAgo(time));
      }, REVALIDATE_TIME);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [isMounted, time]);

  if (isMounted) {
    return (
      <div className="flex items-center gap-1">
        <ClockLineIcon className="h-4 w-4" />
        <time className="text-xs font-normal text-light">{liveTime}</time>
      </div>
    );
  }

  // We want to render the initial time on the server to avoid layout shift
  return (
    <div className="flex items-center gap-1">
      <ClockLineIcon className="h-4 w-4" />
      <time className="text-xs font-normal text-light">{initialTime}</time>
    </div>
  );
}
