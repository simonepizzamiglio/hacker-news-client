import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const ChatLineIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M9.63331 12.6667L7.99998 15L6.36665 12.6667H1.99998C1.82317 12.6667 1.6536 12.5964 1.52857 12.4714C1.40355 12.3464 1.33331 12.1768 1.33331 12V2.66667C1.33331 2.48985 1.40355 2.32029 1.52857 2.19526C1.6536 2.07024 1.82317 2 1.99998 2H14C14.1768 2 14.3464 2.07024 14.4714 2.19526C14.5964 2.32029 14.6666 2.48985 14.6666 2.66667V12C14.6666 12.1768 14.5964 12.3464 14.4714 12.4714C14.3464 12.5964 14.1768 12.6667 14 12.6667H9.63331ZM8.93931 11.3333H13.3333V3.33333H2.66665V11.3333H7.06065L7.99998 12.6747L8.93931 11.3333Z" />
    </svg>
  );
};
