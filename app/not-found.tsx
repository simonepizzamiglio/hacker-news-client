import { NotFoundSection } from "@/components/not-found";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return <NotFoundSection />;
}
