import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "ECP - Daily Quiz",
  description: "Practice your english everyday with ECP Quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en" >
      <body

      >
          {children}
          <Toaster />
      </body>
    </html>
  );
}
