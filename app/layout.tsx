import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScaleConnect",
  description: "Plataforma ScaleConnect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
