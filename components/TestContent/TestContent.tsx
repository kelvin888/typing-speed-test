import React, { useContext } from "react";
import {
  TypingContext,
  TypingContextType,
} from "../../context/typing-speed-ctx";
import styles from "./TestContent.module.css";

export default function TestContent() {
  const { typingState, contentHandler, testInProgress } = useContext(
    TypingContext
  ) as TypingContextType;
  const { testContent } = typingState;
  return (
    <textarea
      name="testContent"
      className={styles.testContent}
      id="testContent"
      cols={30}
      rows={6}
      value={testContent}
      readOnly={testInProgress}
      onChange={contentHandler}
      placeholder="Enter the text you want to use for this test"
    ></textarea>
  );
}
