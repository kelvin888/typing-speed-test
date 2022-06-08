export const calculateTypingSpeed = async (
  typedText: string,
  timeSec: number
) => {
  let allTypedEntries = typedText.length;

  let allWords = allTypedEntries / 5;

  let typingSpeed = allWords / (timeSec / 60);

  return typingSpeed;
};
