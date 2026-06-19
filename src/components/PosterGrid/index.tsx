import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../themes/themes";

interface PosterGridProps {
  posteres: string[];
  theme: Theme;
}

export function PosterGrid({ posteres, theme }: PosterGridProps) {
  return (
    <View style={styles.blocoPosteres}>
      <View style={styles.grade}>
        {(posteres.length ? posteres : Array(6).fill(null)).map((uri, i) => (
          <View
            key={i}
            style={[styles.posterSlot, { backgroundColor: theme.surface }]}
          >
            {uri && <Image source={{ uri }} style={styles.poster} />}
          </View>
        ))}
      </View>

      <LinearGradient
        colors={["transparent", theme.background]}
        style={styles.fade}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
