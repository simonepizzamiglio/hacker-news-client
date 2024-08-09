"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./ui";

export const BackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center justify-center gap-1 pl-0 text-primary hover:text-orange-800 hover:no-underline"
    >
      <ArrowLeftIcon />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};
