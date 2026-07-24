import { ImageResponse } from "next/og";

export const alt = "Phatcharadanai Tangoan — Full-stack Developer, frontend-focused";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0d",
          color: "#e9eaed",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#9298a3" }}>
          <div style={{ width: 22, height: 22, background: "#3bc0f0", transform: "rotate(45deg)" }} />
          P. Tangoan
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Phatcharadanai Tangoan
          </div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#3bc0f0" }}>
            Full-stack developer, frontend-focused
          </div>
        </div>

        <div style={{ display: "flex", gap: 22, fontSize: 26, color: "#9298a3" }}>
          <span>Next.js</span>
          <span>·</span>
          <span>React</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>Bangkok</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
