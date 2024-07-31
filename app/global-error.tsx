"use client";

import { ErrorSection } from "@/components/error-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
};

export default function GlobalError({ reset }: { reset: () => void }) {
  return <ErrorSection reset={reset} />;
}
