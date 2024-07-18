import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => {
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
      <path d="M7.10306 9.30524H15.5555V10.6941H7.10306L10.828 14.4191L9.84596 15.4011L4.44443 9.99969L9.84596 4.59814L10.828 5.58023L7.10306 9.30524Z" />
    </svg>
  );
};
