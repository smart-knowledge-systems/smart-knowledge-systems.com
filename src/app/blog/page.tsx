import Featured from "@/components/blog/featured";

export default async function Page() {
  return (
    <div className="h-full pt-12">
      <Featured postCategories={[]} />
    </div>
  );
}
