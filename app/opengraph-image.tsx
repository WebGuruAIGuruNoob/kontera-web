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
          background: "linear-gradient(150deg, #062F45 0%, #084666 45%, #0C71C3 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: "0.3em",
            color: "#7EBEC5",
            fontWeight: 700,
          }}
        >
          KONTERA REGNSKAP
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          Regnskapet i orden. Alltid.
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
              background: "#FFFFFF",
              color: "#084666",
              padding: "14px 36px",
              borderRadius: 10,
              display: "flex",
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
