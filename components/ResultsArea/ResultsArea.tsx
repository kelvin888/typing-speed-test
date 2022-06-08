import React, { useContext } from "react";
import {
  TypingContext,
  TypingContextType,
} from "../../context/typing-speed-ctx";
import styles from "./ResultsArea.module.css";

export default function ResultsArea() {
  const { typingState } = useContext(TypingContext) as TypingContextType;
  const { accuracy, speed } = typingState;
  return (
    <div className={styles.resultsArea}>
      <div className={styles.accuracyContainer}>
        <div data-testid="accuracy">Accuracy:</div>
        <div>{accuracy}%</div>
      </div>
      <div className={styles.speedContainer}>
        <div>Speed:</div>
        <div data-testid="wpm">{Math.round(speed)} WPM</div>
      </div>
    </div>
  );
}
