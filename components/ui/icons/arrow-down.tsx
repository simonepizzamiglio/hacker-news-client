import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M11.1944 12.8971L14.9193 9.17208L15.9014 10.1542L10.4999 15.5557L5.09839 10.1542L6.08048 9.17208L9.80549 12.8971V4.44458H11.1944V12.8971Z" />
    </svg>
  );
};
