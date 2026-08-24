import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kontera Regnskap AS — regnskapsfører med fast kontaktperson";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          background:
            "radial-gradient(70% 90% at 50% -10%, rgba(255,213,5,0.16), transparent 58%), linear-gradient(160deg, #1C4F2D 0%, #143D22 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: "0.3em",
            color: "#FFD505",
            fontWeight: 700,
          }}
        >
          KONTERA REGNSKAP
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          Når vi sier inkludert, mener vi inkludert.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 32,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 900,
          }}
        >
          Fast regnskapsfører som kjenner deg — ingen faktura for korte spørsmål
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              background: "#FFD505",
              color: "#1E2A20",
              padding: "14px 36px",
              borderRadius: 999,
              display: "flex",
              boxShadow: "0 10px 34px rgba(255,213,5,0.45)",
            }}
          >
            Ring 960 00 400
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
