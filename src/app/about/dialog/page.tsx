import { redirect } from "next/navigation";

export default function DialogPage() {
  redirect("/about?section=dialog");
}
