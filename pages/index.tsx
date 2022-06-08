import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { Content } from "../components/Layout/Content/Content";
import { TypingContext, TypingContextType } from "../context/typing-speed-ctx";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  const { typingState } = useContext(TypingContext) as TypingContextType;
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Speed Test</title>
        <meta name="description" content="Typing Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content />
    </div>
  );
};

export default Home;
