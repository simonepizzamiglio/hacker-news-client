import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const BriefcaseIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      className={cn("block fill-current", className)}
      {...rest}
    >
      <path d="M5.83332 4.16659V1.66659C5.83332 1.20635 6.20642 0.833252 6.66666 0.833252H13.3333C13.7936 0.833252 14.1667 1.20635 14.1667 1.66659V4.16659H17.5C17.9602 4.16659 18.3333 4.53969 18.3333 4.99992V16.6666C18.3333 17.1268 17.9602 17.4999 17.5 17.4999H2.49999C2.03976 17.4999 1.66666 17.1268 1.66666 16.6666V4.99992C1.66666 4.53969 2.03976 4.16659 2.49999 4.16659H5.83332ZM12.5 5.83325H7.49999V15.8333H12.5V5.83325ZM5.83332 5.83325H3.33332V15.8333H5.83332V5.83325ZM14.1667 5.83325V15.8333H16.6667V5.83325H14.1667ZM7.49999 2.49992V4.16659H12.5V2.49992H7.49999Z" />
    </svg>
  );
};
