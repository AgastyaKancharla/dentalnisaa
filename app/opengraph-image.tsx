import { ImageResponse } from "next/og";
import { clinic } from "@/lib/site-data";

export const runtime = "edge";
export const alt = clinic.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
          backgroundColor: "#2A2723",
          color: "#FDFCF9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "#D4B483",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Since {clinic.foundedYear}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {clinic.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 28,
            color: "rgba(250,249,247,0.75)",
            maxWidth: 800,
          }}
        >
          {clinic.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 48,
            color: "#D4B483",
          }}
        >
          ★ {clinic.rating} · {clinic.reviewCount}+ Google reviews
        </div>
      </div>
    ),
    { ...size }
  );
}
