import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const SadLine = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      viewBox="0 0 54 54"
      className={cn("block fill-current", className)}
      {...rest}
    >
      <g filter="url(#a)">
        <path
          fill="#fff"
          d="M3 26C3 12.745 13.745 2 27 2s24 10.745 24 24-10.745 24-24 24S3 39.255 3 26Z"
        />
        <path d="M27 16c5.523 0 10 4.477 10 10 0 .727-.078 1.435-.225 2.118l-1.782-1.782a8 8 0 1 0-4.374 6.801 3.998 3.998 0 0 0 1.555 1.423A9.955 9.955 0 0 1 27 36c-5.523 0-10-4.477-10-10s4.477-10 10-10Zm7 12.172 1.414 1.414a2 2 0 1 1-2.93.11l.102-.11L34 28.172ZM27 29c1.466 0 2.785.631 3.7 1.637l-.945.86C28.965 31.182 28.018 31 27 31c-1.018 0-1.965.183-2.755.496l-.945-.86A4.987 4.987 0 0 1 27 29Zm-3.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </g>
      <defs>
        <filter
          id="a"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_92_38405"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_dropShadow_92_38405"
            result="effect2_dropShadow_92_38405"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_92_38405"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
