import { cn } from "@/utils";
import type { SVGProps } from "react";

export const ArticleLineIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M16.6667 18.3333H3.33333C2.8731 18.3333 2.5 17.9602 2.5 17.5V2.49999C2.5 2.03976 2.8731 1.66666 3.33333 1.66666H16.6667C17.1269 1.66666 17.5 2.03976 17.5 2.49999V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333ZM15.8333 16.6667V3.33332H4.16667V16.6667H15.8333ZM5.83333 4.99999H9.16667V8.33332H5.83333V4.99999ZM5.83333 9.99999H14.1667V11.6667H5.83333V9.99999ZM5.83333 13.3333H14.1667V15H5.83333V13.3333ZM10.8333 5.83332H14.1667V7.49999H10.8333V5.83332Z" />
    </svg>
  );
};
