import { Roboto_Serif, Roboto } from "next/font/google";
import "./globals.css";


const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weights: [400, 700, 900],
});

export const metadata = {
  title: "Gardener of Eden",
  description: "Generated by create next app, created by Kruemelkatze for TriJam 300.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoSerif.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}