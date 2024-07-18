import { Button } from "./ui/button";
import { ArrowDownIcon } from "./ui/icons";
import NextLink from "next/link";

interface LoadMoreButtonProps {
  text?: string;
  nextPage: number;
  loading?: boolean;
}

export function LoadMoreButton({
  text = "More",
  nextPage,
  loading,
}: LoadMoreButtonProps) {
  return (
    <Button asChild variant="outline" className="self-start" disabled={loading}>
      <NextLink href={{ query: { page: nextPage } }} scroll={false}>
        {text}
        <ArrowDownIcon className="ml-1" />
      </NextLink>
    </Button>
  );
}
