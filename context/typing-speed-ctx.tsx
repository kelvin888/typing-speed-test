import {
  ChangeEvent,
  createContext,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { calculateTypingSpeed } from "../utils/calculateTypingSpeed";

type TypingModel = {
  testContent: string;
  typedText: string;
  accuracy: number;
  speed: number;
  timeSec: number;
};

export type TypingContextType = {
  typingState: TypingModel;
  contentHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  typingHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  timeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  startTest: () => void;
  stopTest: () => void;
  dispSecondsAsMins: (seconds: number) => string;
  timer: number;
  testInProgress: boolean;
};

export const TypingContext = createContext<TypingContextType | null>(null);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TypingCtxProvider: FC<Props> = ({ children }) => {
  const [testInProgress, setTestInProgress] = useState(false);
  const [timer, setTimer] = useState(0);
  const firstStart = useRef(true);
  const tick = useRef<any>(null);
  const [typingState, setTypingState] = useState<TypingModel>({
    testContent: "",
    typedText: "",
    speed: 0,
    accuracy: 0,
    timeSec: 0,
  });

  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTypingState({
      ...typingState,
      testContent: e.target.value,
    });
  };
  const typingHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTypingState({
      ...typingState,
      typedText: e.target.value,
    });
  };

  const timeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimer(parseInt(e.target.value));
    setTypingState({ ...typingState, timeSec: parseInt(e.target.value) });
  };

  const computeAccuracy = async () => {
    const { typedText, testContent } = typingState;
    let testContentArr = testContent.split(" ");
    let typedTextArr = typedText.split(" ");
    let errors = 0;
    let correctEntries = 0;

    testContentArr.forEach((char, index) => {
      if (char === typedTextArr[index]) {
        correctEntries++;
      } else {
        errors++;
      }
    });

    return Math.round((correctEntries / testContentArr.length) * 100);
  };

  const startTest = () => {
    setTypingState({
      ...typingState,
      speed: 0,
      accuracy: 0,
      typedText: "",
    });
    setTestInProgress(true);
    setInterval(updateTime, 1000);
  };

  const updateTime = () => {
    const time = typingState.timeSec * 60;
    let seconds: string | number = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
  };

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }

    if (testInProgress) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => {
      if (tick.current !== null) {
        clearInterval(tick.current);
      }
    };
  }, [testInProgress]);

  const stopTest = async () => {
    const { typedText, timeSec } = typingState;
    setTestInProgress(!testInProgress);
    let computedAccuracy = await computeAccuracy();
    let computedSpeed = await calculateTypingSpeed(typedText, timeSec);
    setTypingState({
      ...typingState,
      accuracy: computedAccuracy,
      speed: computedSpeed,
    });
  };

  useEffect(() => {
    if (testInProgress && timer === 0) {
      stopTest();
    }
  }, [timer]);

  const dispSecondsAsMins = (seconds: number) => {
    console.log("seconds " + seconds);
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
  };

  return (
    <TypingContext.Provider
      value={{
        typingState,
        typingHandler,
        contentHandler,
        timeHandler,
        startTest,
        stopTest,
        dispSecondsAsMins,
        testInProgress,
        timer,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export default TypingCtxProvider;
