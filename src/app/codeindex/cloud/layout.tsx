import { CloudConvexProvider } from "./convex-provider";

export default function CloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CloudConvexProvider>{children}</CloudConvexProvider>;
}
