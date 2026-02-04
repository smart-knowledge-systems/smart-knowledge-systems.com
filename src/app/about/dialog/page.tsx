import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dialog | Smart Knowledge Systems",
  description:
    "Learn about Dialog, our social platform designed for meaningful, context-rich conversations.",
};

export default function DialogPage() {
  redirect("/about?section=dialog");
}
