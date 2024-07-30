import { cn } from "@/utils";
import { Button } from "./ui/button";
import { ArrowDownIcon } from "./ui/icons";
import NextLink from "next/link";

interface LoadMoreButtonProps {
  text?: string;
  nextPage: number;
  loading?: boolean;
  className?: string;
}

export function LoadMoreButton({
  text = "More",
  nextPage,
  loading,
  className,
}: LoadMoreButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn("self-start", className)}
      disabled={loading}
    >
      <NextLink href={{ query: { page: nextPage } }} scroll={false}>
        {text}
        <ArrowDownIcon className="ml-1" />
      </NextLink>
    </Button>
  );
}
