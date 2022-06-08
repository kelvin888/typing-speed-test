import React, { useContext } from "react";
import {
  TypingContext,
  TypingContextType,
} from "../../context/typing-speed-ctx";
import styles from "./TypingArea.module.css";

export const TypingArea = () => {
  const { typingState, typingHandler, testInProgress } = useContext(
    TypingContext
  ) as TypingContextType;
  const { typedText } = typingState;

  return (
    <textarea
      name="typingArea"
      className={styles.typingArea}
      id="typingArea"
      cols={30}
      rows={6}
      value={typedText}
      onChange={typingHandler}
      disabled={!testInProgress}
      placeholder="Start typing..."
    ></textarea>
  );
};
