import React, { useContext } from "react";
import {
  TypingContext,
  TypingContextType,
} from "../../context/typing-speed-ctx";
import { timeOptions } from "./time";
import styles from "./TimePicker.module.css";

export default function TimePicker() {
  const {
    typingState,
    timeHandler,
    startTest,
    stopTest,
    timer,
    testInProgress,
    dispSecondsAsMins,
  } = useContext(TypingContext) as TypingContextType;
  const { testContent } = typingState;

  return (
    <div className={styles.timeContainer}>
      {testInProgress ? (
        <div className={styles.counterContainer}>
          <div>{dispSecondsAsMins(timer)}</div>
          <button
            disabled={typingState.testContent.length === 0 || timer === 0}
            onClick={stopTest}
            className={styles.stopButton}
            name="stop-button"
          >
            Stop Test
          </button>
        </div>
      ) : (
        <>
          <select
            name="timePicker"
            id="timePicker"
            data-testid="timePicker"
            value={timer}
            onChange={timeHandler}
            disabled={!testContent}
          >
            <option value="">-choose time-</option>
            {timeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* {typingState?.timeMins !== 0 && ( */}
          <button
            disabled={typingState.testContent.length === 0 || timer === 0}
            onClick={startTest}
            name="start-button"
          >
            Start Test
          </button>

          {/* )} */}
        </>
      )}
    </div>
  );
}
