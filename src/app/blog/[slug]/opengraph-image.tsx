import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getPost } from "@/lib/post-filters";

export const alt = "Blog post cover image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(`/blog/${slug}`);

  const imgBuffer = await readFile(
    join(process.cwd(), "src/assets", `${slug}.jpg`)
  );
  const imgSrc = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "40px 48px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <p style={{ color: "#a5b4fc", fontSize: 20, margin: 0 }}>
          Smart Knowledge Systems
        </p>
        <h1
          style={{
            color: "white",
            fontSize: 44,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {post?.title}
        </h1>
      </div>
    </div>,
    { ...size }
  );
}
