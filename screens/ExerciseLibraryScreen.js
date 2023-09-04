import * as Animatable from "react-native-animatable";
import { FlatList, Text, View, Alert, StyleSheet } from "react-native";
import { Tile, Icon } from "react-native-elements";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";
import YoutubePlayer from "react-native-youtube-iframe";

const ExerciseLibraryScreen = ({ navigation }) => {
  const exercises = useSelector((state) => state.exercises);

  if (exercises.isLoading) {
    return <Loading />;
  }
  if (exercises.errMess) {
    return (
      <View>
        <Text>{exercises.errMess}</Text>
      </View>
    );
  }

  const YoutubeApp = () => {
    const [playing, setPlaying] = useState(false);
    const [isMute, setMute] = useState(false);
    const controlRef = useRef();

    const onStateChange = (state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
      if (state !== "playing") {
        setPlaying(false);
      }
    };

    const togglePlaying = () => {
      setPlaying((prev) => !prev);
    };

    const seekBackAndForth = (control) => {
      console.log("currentTime");
      controlRef.current?.getCurrentTime().then((currentTime) => {
        control === "forward"
          ? controlRef.current?.seekTo(currentTime + 15, true)
          : controlRef.current?.seekTo(currentTime - 15, true);
      });
    };

    const muteVideo = () => setMute(!isMute);

    const ControlIcon = ({ name, onPress }) => (
      <Icon onPress={onPress} name={name} size={40} color="#fff" />
    );

    return (
      <View style={styles.container}>
        <YoutubePlayer
          height={300}
          ref={controlRef}
          play={playing}
          mute={isMute}
          videoId={"GBn41J3WlME"}
          onChangeState={onStateChange}
        />
        <View style={styles.controlContainer}>
          <ControlIcon
            onPress={() => seekBackAndForth("rewind")}
            name="skip-previous"
          />
          <ControlIcon
            onPress={togglePlaying}
            name={playing ? "pause" : "play-arrow"}
          />
          <ControlIcon
            onPress={() => seekBackAndForth("forward")}
            name="skip-next"
          />
        </View>
        <ControlIcon
          onPress={muteVideo}
          name={isMute ? "volume-up" : "volume-off"}
        />
      </View>
    );
  };

  const renderExerciseItem = ({ item: exercise }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          title={exercise.name}
          caption={exercise.description}
          featured
          onPress={() =>
            navigation.navigate("ExerciseLibraryInfo", { exercise })
          }
          imageSrc={{ uri: baseUrl + exercise.image }}
        />
      </Animatable.View>
    );
  };

  return (
    <FlatList
      data={exercises.exercisesArray}
      renderItem={renderExerciseItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkblue",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ExerciseLibraryScreen;
