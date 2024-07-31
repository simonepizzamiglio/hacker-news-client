import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const ArrowUpDoubleIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M8.00006 3.22395L3.86197 7.36199L4.80478 8.30486L8.00006 5.10957L11.1953 8.30486L12.1381 7.36199L8.00006 3.22395ZM8.00006 6.99053L3.86197 11.1286L4.80478 12.0715L8.00006 8.87619L11.1953 12.0715L12.1381 11.1286L8.00006 6.99053Z" />
    </svg>
  );
};
