import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const HomeIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M17.5 16.666c0 .46-.373.834-.833.834H3.333a.833.833 0 0 1-.833-.834V7.907c0-.257.119-.5.322-.657l6.666-5.186a.833.833 0 0 1 1.024 0l6.666 5.186c.203.158.322.4.322.657v8.76Zm-1.667-.833V8.315L10 3.778 4.167 8.315v7.518h11.666Zm-10-3.333h8.334v1.666H5.833V12.5Z" />
    </svg>
  );
};
