import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  blocoPosteres: {
    height: 320,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  posterSlot: {
    width: "33.333%",
    height: "50%",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  fade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
});
