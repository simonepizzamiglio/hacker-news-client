import { cn } from "@/utils";
import type { SVGProps } from "react";

export const ClockLineIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className={cn("block fill-current", className)}
      {...rest}
    >
      <path d="M7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8C1.33331 4.31809 4.31808 1.33333 7.99998 1.33333C11.6818 1.33333 14.6666 4.31809 14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99998 14.6667ZM7.99998 13.3333C10.9455 13.3333 13.3333 10.9455 13.3333 8C13.3333 5.05447 10.9455 2.66666 7.99998 2.66666C5.05446 2.66666 2.66665 5.05447 2.66665 8C2.66665 10.9455 5.05446 13.3333 7.99998 13.3333ZM8.66665 8H11.3333V9.33333H7.33331V4.66666H8.66665V8Z" />
    </svg>
  );
};
