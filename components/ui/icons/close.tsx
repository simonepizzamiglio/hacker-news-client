import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export const CloseIcon = (props: CloseIconProps) => {
  const { title, width = 14, height = 14, className, ...rest } = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={height}
        height={width}
        className={cn("block fill-current", className)}
        viewBox="0 0 10 10"
        {...rest}
      >
        {title && <title>{title}</title>}
        <path d="M5 4.018 8.438.581l.982.982L5.983 5 9.42 8.438l-.982.982L5 5.983 1.563 9.42l-.982-.982L4.018 5 .581 1.563l.982-.982L5 4.018Z" />
      </svg>
    </>
  );
};
