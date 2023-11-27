import {
  Box,
  Button,
  ButtonText,
  FormControl,
  Input,
  InputField,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Form } from "react-hook-form";
import { Platform, TextInputProps } from "react-native";
import Animated, {
  BounceIn,
  SlideInDown,
  ZoomIn,
  useAnimatedProps,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

import { homeStyle } from "./home.style";

import Confetti from "../../../../assets/confetti.json";
import Fail from "../../../../assets/fail.json";

interface InputProps extends TextInputProps {
  errorMessage?: string | null;
  isInvalid?: boolean;
}

export const InputText = ({
  errorMessage = null,
  isInvalid,
  ...rest
}: InputProps) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <Input>
        <InputField fontSize={20} placeholder="Escolha sua palavra" {...rest} />
      </Input>
    </FormControl>
  );
};

export const SucessValidation = ({ handleContinue }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      style: {
        transform: [{ scale: 2 }],
      },
    };
  });

  return (
    <Animated.View
      entering={BounceIn.springify().damping(30)}
      style={homeStyle.successContainer}
    >
      {Platform.OS !== "web" && <LottieView source={Confetti} autoPlay loop />}

      <Animated.Text
        entering={BounceIn.springify().damping(40).delay(500)}
        style={{ fontSize: 36, fontWeight: 700, marginBottom: 50 }}
      >
        Awesome! Great job!!
      </Animated.Text>
      <Button borderRadius={15} onPress={handleContinue}>
        <ButtonText>Continue</ButtonText>
      </Button>
    </Animated.View>
  );
};

export const FailValidation = ({ handleContinue }) => {
  return (
    <Animated.View
      entering={BounceIn.springify().damping(30)}
      style={homeStyle.failContainer}
    >
      {Platform.OS !== "web" && <LottieView source={Fail} autoPlay loop />}

      <Animated.Text
        entering={BounceIn.springify().damping(40).delay(500)}
        style={{
          fontSize: 36,
          fontWeight: 700,
          marginTop: 500,
          marginBottom: 50,
        }}
      >
        Ouch! Sorry, try again!
      </Animated.Text>
      <Button borderRadius={15} onPress={handleContinue}>
        <ButtonText>Try again!</ButtonText>
      </Button>
    </Animated.View>
  );
};
