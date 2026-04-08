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
      <body>{children}</body>
    </html>
  );
}
