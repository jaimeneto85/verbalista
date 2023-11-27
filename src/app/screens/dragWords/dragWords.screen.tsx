import { SafeAreaView, KeyboardAvoidingView, Pressable } from "react-native";

import { HStack, Input, InputField, Text, View } from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import { homeStyle } from "../home/home.style";
import { DraggableWord } from "./dragWords.component";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WordListContext, WordListProvider } from "./dragWords.context";
import { FailValidation, SucessValidation } from "../home/home.component";

const WordstoTest = [
  {
    word: "to play",
    answers: ["brincar"],
  },
  {
    word: "to surf",
    answers: ["surfar"],
  },
  {
    word: "to relax",
    answers: ["relaxar"],
  },
  {
    word: "to go",
    answers: ["ir"],
  },
  {
    word: "to dive",
    answers: ["mergulhar"],
  },
];

const words = [
  "ir",
  "nadar",
  "tomar sol",
  "fotografar",
  "surfar",
  "brincar",
  "relaxar",
  "lista",
  "pegar onda",
  "fotografar",
  "mergulhar",
];

export const DragWords = () => {
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const { answers, statuses, resetStatus } = useContext(WordListContext);

  function translateStatus(status: string) {
    switch (status) {
      case "iddle":
        return "$secondary200";
      case "success":
        return "$tertiary500";
      case "fail":
        return "$rose700";
    }
  }

  const success_ocurrences = statuses.reduce((count, word) => {
    return word == "success" ? count + 1 : count;
  }, 0);

  const fail_ocurrences = statuses.reduce((count, word) => {
    return word == "fail" ? count + 1 : count;
  }, 0);

  const success = success_ocurrences == statuses.length;
  const fail =
    fail_ocurrences == statuses.length ||
    (fail_ocurrences > 0 &&
      success_ocurrences > 0 &&
      fail_ocurrences + success_ocurrences == statuses.length);

  const handleContinue = () => {
    resetStatus();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View
            flex={1}
            paddingHorizontal={20}
            paddingBottom={100}
            paddingTop={50}
          >
            {WordstoTest.map((wordObject, indexWord) => {
              return (
                <HStack
                  key={wordObject.word}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical={10}
                  borderBottomWidth={1}
                  borderBottomColor="$secondary200"
                  marginBottom={15}
                >
                  <Text fontSize={20} fontWeight="700">
                    {wordObject.word}
                  </Text>
                  <Input
                    flex={1}
                    marginLeft={20}
                    borderColor={translateStatus(statuses[indexWord])}
                    backgroundColor={"$secondary200"}
                    borderRadius={10}
                  >
                    <InputField />
                  </Input>
                </HStack>
              );
            })}
            <View style={homeStyle.wordsWrapper}>
              <View style={homeStyle.wordsContainer}>
                {words.map((word, index) => (
                  <DraggableWord
                    key={index}
                    index={index}
                    word={word}
                    length={WordstoTest.length}
                  />
                ))}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        {success && <SucessValidation handleContinue={handleContinue} />}
        {fail && <FailValidation handleContinue={handleContinue} />}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export function DragWordsScreen() {
  return (
    <WordListProvider WordstoTest={WordstoTest}>
      <DragWords />
    </WordListProvider>
  );
}
