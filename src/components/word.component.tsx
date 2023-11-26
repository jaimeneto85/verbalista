import React from "react";
import {Text} from '@gluestack-ui/themed';
import {TextProps, ViewProps} from 'react-native';
import Animated, from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

interface WordProps extends TextProps {
  children: string;
}
export const Word = ({children, ...props} : WordProps) => {
  return (
    <Text {...props}>
      {children}
    </Text>
  )
};
interface WordBoxProps extends ViewProps {
  word: string;
}

export const WordBox = ({word, ...props} : WordBoxProps) => {
  return (
    <Animated.View {...props}>
      <Word>{word}</Word>
    </Animated.View>
  )
}

export const DraggableWord = ({word, ...props} : WordBoxProps) => {
  return (
    <PanGestureHandler>
      <Animated.View {...props}>
        <Word>{word}</Word>
      </Animated.View>
    </PanGestureHandler>
  )
}