import { Bodoni_Moda, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Opening from "@/components/Opening";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400", "500", "600", "700"], variable: "--font-bodoni" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat" });

export const metadata = {
  title: { default: "AIBEN Properties: Own your ground", template: "%s · AIBEN Properties" },
  description:
    "Concept website for AIBEN Properties: clear prices, flexible payment, verified titles and a team that answers.",
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: "#0A0A0A" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG" className={`${bodoni.variable} ${montserrat.variable}`}>
      <body>
        <Providers>
          <Opening />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
