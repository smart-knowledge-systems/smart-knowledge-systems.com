import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { fetchDocument } from "@/lib/atproto-feed";

export const alt = "Blog post cover image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchDocument(slug);

  let imgSrc: string | undefined;

  try {
    const imgBuffer = await readFile(
      join(process.cwd(), "src/assets", `${slug}.jpg`)
    );
    imgSrc = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;
  } catch {
    if (post?.coverImageUrl) {
      imgSrc = post.coverImageUrl;
    }
  }

  const textOverlay = (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "40px 48px",
        background: imgSrc
          ? "linear-gradient(transparent, rgba(0,0,0,0.75))"
          : "linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...(imgSrc ? {} : { top: 0 }),
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
        {post?.title ?? slug}
      </h1>
    </div>
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {textOverlay}
    </div>,
    { ...size }
  );
}
