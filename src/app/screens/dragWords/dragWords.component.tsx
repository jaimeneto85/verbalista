import React, { useContext, useRef } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@gluestack-ui/themed";
import { dragWordStyle } from "./dragWords.style";
import { Dimensions, View } from "react-native";
import { WordListContext } from "./dragWords.context";

const containerWidth = Dimensions.get("window").width - 20 * 2;

export const DraggableWord = ({ word, children, length }) => {
  const startX = 0;
  const startY = 0;
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const animatedRef = useRef(null);
  const { setValueByPosition } = useContext(WordListContext);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      const position = Math.floor((event.absoluteY - 50) / 65);
      if (position <= length) {
        runOnJS(setValueByPosition)(word, position - 1);
      } else {
        translateX.value = withSpring(startX);
        translateY.value = withSpring(startY);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[dragWordStyle.word, animatedStyle]}>
        <Text>{word || children}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export const WordList = ({ children }) => {
  const [ready, setReady] = React.useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));
  if (!ready) {
    return (
      <View>
        {children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height },
                },
              }) => {
                const offset = offsets[index];
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  "worklet";
                  if (
                    offsets.filter((o) => o.order.value === -1).length === 0
                  ) {
                    runOnJS(setReady)(true);
                  }
                });
              }}
            >
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View>
      {children.map((child, index) => (
        <DraggableWord
          key={index}
          offsets={offsets}
          index={index}
          containerWidth={containerWidth}
        >
          {child}
        </DraggableWord>
      ))}
    </View>
  );
};
