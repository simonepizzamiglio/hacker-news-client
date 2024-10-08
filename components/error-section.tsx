import { SadLine } from "./ui/icons";
import { Button } from "@/components/ui";

export function ErrorComponent() {
  return (
    <div className="flex w-80 flex-col items-center gap-5 p-6">
      <div className="h-12 w-12 rounded-full bg-white">
        <div className="h-6 w-6">
          <SadLine height={54} width={54} className="text-primary" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 self-stretch">
        <span className="text-center text-xl font-medium text-neutral-900">
          Unexpected error
        </span>
        <span className="text-center text-base font-normal">
          We&apos;re facing some issues at the moment.
        </span>
      </div>
    </div>
  );
}

interface ErrorSectionProps {
  reset?: () => void;
}

export function ErrorSection({ reset }: ErrorSectionProps) {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <div className="flex flex-col items-center">
        <ErrorComponent />
        {reset && (
          <Button variant="outline" onClick={reset}>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
