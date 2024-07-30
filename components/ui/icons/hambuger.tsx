import { cn } from "@/utils";
import type { SVGProps } from "react";

interface HamburgerIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export const HamburgerIcon = (props: HamburgerIconProps) => {
  const { title, width = 20, height = 20, className, ...rest } = props;
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block fill-current", className)}
      width={width}
      height={height}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
    </svg>
  );
};
