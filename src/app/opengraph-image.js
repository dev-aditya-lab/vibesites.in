import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#14110c",
          color: "#fcfaf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#c4592b" }} />
          <span style={{ fontSize: 28, color: "#e4d8be", letterSpacing: 2, textTransform: "uppercase" }}>
            {siteConfig.name}
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 72, marginTop: 40, maxWidth: 980, lineHeight: 1.1 }}>
          Websites and apps built to convert.
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 32, color: "#b8a47d" }}>
          Web &amp; App Development Agency — vibesites.in
        </div>
      </div>
    ),
    { ...size }
  );
}
