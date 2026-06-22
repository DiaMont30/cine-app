import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../themes/themes";
import { styles } from "./styles";

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
