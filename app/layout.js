import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

const darker_grotesque = Darker_Grotesque({
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* social open graph content */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </head>
      <body
        className={`${darker_grotesque.className} min-h-screen mx-auto bg-primary-darker `}
      >
        <Header />
        <main className="w-full h-full overflow-hidden bg-primary-darker">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
