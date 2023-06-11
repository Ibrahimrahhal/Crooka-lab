import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import SwipeAnimation from "../../assets/animations/swipe";
import AppTourSwiper from "./app-tour-swiper-scene";
import config from "../../config";

const styles = StyleSheet.create({
  heighContainer: {
    flex: 1,
    backgroundColor: config.mainColor,
  },
  innerView: {
    flex: 1,
  },
  swipHintContainer: {
    position: "absolute",
    bottom: "3%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

const Animation: { Ref: any; play: any } = {
  Ref: null,
  play() {
    try {
      if (this.Ref) this.Ref.play();
    } catch (e) {
      console.log(e.toString());
      console.log("not inited");
    }
  },
};
const slideShouldActivate = Platform.OS !== "ios" ? 2 : 0;
const lastSlide = 2 - slideShouldActivate;

export default (props) => {
  const [activeSlide, setActiveSlide] = useState(slideShouldActivate);
  var prevActiveSlide;
  if (!prevActiveSlide) prevActiveSlide = useRef(activeSlide);
  useEffect(() => {
    setTimeout(() => Animation.play(), 1000);
  }, []);
  useEffect(() => {
    if (
      prevActiveSlide == slideShouldActivate &&
      activeSlide != slideShouldActivate
    )
      Animation.play();
    if (prevActiveSlide) prevActiveSlide.Ref = activeSlide;
  }, [activeSlide]);
  return (
    <>
      <View style={styles.heighContainer}>
        <View style={styles.innerView}>
          <AppTourSwiper
            activeSlide={(index) => setTimeout(() => setActiveSlide(index), 0)}
            navigate={() => {
              props.navigation.replace("loginSignup");
            }}
          />
        </View>
        {activeSlide != lastSlide && (
          <View style={{ ...styles.swipHintContainer } as any}>
            <LottieView
              ref={(animation) => {
                Animation.Ref = animation;
              }}
              style={{
                height: 100,
                alignItems: "center",
              }}
              loop={false}
              onAnimationFinish={() => setTimeout(() => Animation.play(), 1000)}
              source={SwipeAnimation}
            />
          </View>
        )}
      </View>
      <StatusBar style={"light"} />
    </>
  );
};
