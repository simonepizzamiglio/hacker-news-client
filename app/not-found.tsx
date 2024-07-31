import { Button, SadLine } from "@/components/ui";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 rounded-full bg-white">
          <div className="h-6 w-6">
            <SadLine height={54} width={54} className="text-primary" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 self-stretch">
          <h2 className="text-center text-2xl font-medium">Not Found</h2>
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
    </div>
  );
}
