import { SafeAreaView, KeyboardAvoidingView, Pressable } from "react-native";
import { Box, FormControl, InputField, Text, View } from "@gluestack-ui/themed";
import Animated from "react-native-reanimated";
import React, { useState } from "react";
import { Input } from "@gluestack-ui/themed";
import { homeStyle } from "./home.style";
import { MaterialIcons } from "@expo/vector-icons";
import { FailValidation, SucessValidation } from "./home.component";

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
const WordToTest = {
  word: "To play",
  answers: ["brincar"],
};
export const Home = () => {
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");

  function handleAnswer(answer: string) {
    setAnswer(answer);
    validateAnswer(answer);
  }

  const validateAnswer = (answer: string) => {
    if (WordToTest.answers.includes(answer)) {
      setStatus("success");
    } else {
      setStatus("fail");
    }
  };
  const handleStatus = () => {
    if (status == "success") {
      return "$tertiary500";
    } else if (status == "fail") {
      return "$rose700";
    } else {
      return "$secondary200";
    }
  };
  const handleContinue = () => {
    setStatus("idle");
    setAnswer("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View flex={1} paddingHorizontal={20} paddingBottom={100}>
          <Box
            backgroundColor={handleStatus()}
            height={200}
            alignItems="center"
            justifyContent="center"
            borderRadius={40}
            marginTop={50}
          >
            <Text fontSize={20} fontWeight="700">
              {WordToTest.word}
            </Text>
          </Box>
          <View style={homeStyle.wordsWrapper}>
            <View style={homeStyle.wordsContainer}>
              {words.map((word, index) => (
                <Pressable key={index} onPress={() => handleAnswer(word)}>
                  <View
                    style={[
                      homeStyle.word,
                      { backgroundColor: answer == word ? "#AAA" : "white" },
                    ]}
                  >
                    <Text fontSize={20}>{word}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
          <Box justifyContent="flex-end" style={homeStyle.inputBox}>
            <FormControl>
              <Input style={homeStyle.inputField}>
                <InputField
                  placeholder="Escolha sua palavra"
                  value={answer}
                  onChange={setAnswer}
                />
                <MaterialIcons
                  name="mic"
                  size={20}
                  style={homeStyle.icon}
                  color={"#999"}
                />
              </Input>
            </FormControl>
          </Box>
        </View>
        {status == "success" && (
          <SucessValidation handleContinue={handleContinue} />
        )}
        {status == "fail" && <FailValidation handleContinue={handleContinue} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
