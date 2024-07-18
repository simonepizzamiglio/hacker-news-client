import { Briefcase } from "lucide-react";

export function NoPosts() {
  return (
    <div className="flex w-80 flex-col items-center gap-5 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow">
        <div className="h-6 w-6">
          <Briefcase className="text-primary" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 self-stretch">
        <span className="text-center text-xl font-medium text-neutral-900">
          No Posts Available
        </span>
        <span className="text-center text-base font-normal text-neutral-900">
          Hang tight! We&apos;ll have more for you soon.
        </span>
      </div>
    </div>
  );
}
