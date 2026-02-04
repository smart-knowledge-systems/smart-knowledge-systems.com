import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Synthialog | Smart Knowledge Systems",
  description:
    "Learn about Synthialog, our collaborative platform for democratic document creation and knowledge synthesis.",
};

export default function SynthialogPage() {
  redirect("/about?section=synthialog");
}
