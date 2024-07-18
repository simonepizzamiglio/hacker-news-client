import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { buttonVariants } from "./button";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type LinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & NextLinkProps
>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return (
    <NextLink
      ref={ref}
      {...props}
      className={cn(buttonVariants({ variant: "link" }), props.className)}
    />
  );
});
Link.displayName = "Button";

export { Link };
export type { LinkProps };
