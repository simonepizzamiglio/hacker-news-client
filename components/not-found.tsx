import NextLink from "next/link";
import { Button, SadLine } from "./ui";

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-12 w-12 rounded-full bg-white">
        <div className="h-6 w-6">
          <SadLine height={54} width={54} className="text-primary" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 self-stretch">
        <h1 className="text-center text-2xl font-medium">Not Found</h1>
        <p className="text-center text-base font-normal">
          Could not find requested resource
        </p>
      </div>
      <Button asChild variant="outline">
        <NextLink href="/" scroll={false}>
          Return Home
        </NextLink>
      </Button>
    </div>
  );
}

export function NotFoundSection() {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <NotFound />
    </div>
  );
}
