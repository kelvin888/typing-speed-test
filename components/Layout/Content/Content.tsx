import React from "react";
import ResultsArea from "../../ResultsArea/ResultsArea";
import TestContent from "../../TestContent/TestContent";
import TimePicker from "../../TimePicker/TimePicker";
import { TypingArea } from "../../TypingArea/TypingArea";
import styles from "./Content.module.css";

export const Content = () => {
  return (
    <main className={styles.main}>
      <TestContent />
      <TimePicker />
      <TypingArea />
      <ResultsArea />
    </main>
  );
};
