import type { AppProps } from "next/app";
import { Footer } from "../components/Layout/Footer/Footer";
import { Header } from "../components/Layout/Header/Header";
import TypingCtxProvider from "../context/typing-speed-ctx";
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TypingCtxProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </TypingCtxProvider>
  );
}

export default MyApp;
