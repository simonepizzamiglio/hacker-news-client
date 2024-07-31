import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const BarChartIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M1.66666 9.99996H3.33332V17.5H1.66666V9.99996ZM4.16666 11.6666H5.83332V17.5H4.16666V11.6666ZM13.3333 6.66663H15V17.5H13.3333V6.66663ZM15.8333 8.33329H17.5V17.5H15.8333V8.33329ZM7.49999 1.66663H9.16666V17.5H7.49999V1.66663ZM9.99999 3.33329H11.6667V17.5H9.99999V3.33329Z" />
    </svg>
  );
};
