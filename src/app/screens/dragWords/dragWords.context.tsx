import { set } from "@gluestack-style/react";
import { createContext, useCallback, useState } from "react";

export const WordListContext = createContext({});

export const WordListProvider = ({ WordstoTest, children }) => {
  const [answers, setAnswers] = useState<string[]>(WordstoTest.map(() => ""));
  const [statuses, setStatuses] = useState<string[]>(
    WordstoTest.map(() => "iddle")
  );

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
  };

  const validateAnswer = (answer: string, index: number) => {
    const indexValidated = index < 0 ? 0 : index;
    if (WordstoTest[indexValidated].answers.includes(answer)) {
      setStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[indexValidated] = "success";
        return newStatuses;
      });
    } else {
      setStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[indexValidated] = "fail";
        return newStatuses;
      });
    }
  };

  const setValueByPosition = (word, index) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = word;
      validateAnswer(word, index);
      return newAnswers;
    });
  };

  const resetStatus = () => {
    setStatuses(WordstoTest.map(() => "iddle"));
  };

  return (
    <WordListContext.Provider
      value={{
        answers,
        statuses,
        wordsToTest: WordstoTest,
        setValueByPosition,
        validateAnswer,
        resetStatus,
      }}
    >
      {children}
    </WordListContext.Provider>
  );
};
