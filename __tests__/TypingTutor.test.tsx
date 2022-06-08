import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import TypingCtxProvider from "../context/typing-speed-ctx";
import Home from "../pages/index";

describe("<TypingTutor />", () => {
  let startBtn: HTMLElement;
  let timePicker: Node;
  let testContent: Node;
  let typingArea: Element | Node | Document;
  let accuracy: any;
  let wpm;

  beforeEach(async () => {
    render(
      <TypingCtxProvider>
        <Home />
      </TypingCtxProvider>
    );
    startBtn = screen.getByRole("button", {
      name: "Start Test",
    });
    timePicker = screen.getByTestId("timePicker");
    testContent = screen.getByPlaceholderText(
      "Enter the text you want to use for this test"
    );
    const typingArea = screen.getByPlaceholderText("Start typing...");
    const accuracy = await screen.findByTestId("accuracy");
    const wpm = await screen.findByTestId("wpm");
  });

  jest.useFakeTimers();

  afterEach(() => {
    cleanup();
  });

  test("Start button is didsabled if no test content is entered", () => {
    fireEvent.change(testContent, { target: { value: "" } });
    expect(startBtn).toHaveAttribute("disabled");
  });

  test("Start button is didsabled if no time is selected", () => {
    fireEvent.change(timePicker, { target: { value: "" } });
    expect(startBtn).toBeDisabled();
  });

  test("Start button is enabled if both time and test content are provided", () => {
    fireEvent.change(testContent, { target: { value: "Kelv typing tutor" } });
    fireEvent.change(timePicker, { target: { value: "10" } });
    expect(startBtn).not.toBeDisabled();
  });

  test("Compute accuracy", async () => {
    fireEvent.change(testContent, { target: { value: "Kelv typing tutor" } });
    fireEvent.change(timePicker, { target: { value: "10" } });
    // fireEvent.change(typingArea, { target: { value: "Kelv typing tutor" } });

    // userEvent.click(startBtn);
    // jest.advanceTimersByTime(10000);
    // jest.useRealTimers();

    // expect(accuracy).toHaveTextContent("100%");
  });
});
