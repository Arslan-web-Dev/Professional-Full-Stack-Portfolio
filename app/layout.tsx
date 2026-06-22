import type { Metadata } from "next";
import "./globals.css";
import BackgroundCanvas from "@/components/3d/BackgroundCanvas";

export const metadata: Metadata = {
  title: "Muhammad Arslan — Full Stack Developer",
  description: "Full Stack Developer | COMSATS University Islamabad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BackgroundCanvas />
        {children}
      </body>
    </html>
  );
}
