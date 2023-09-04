import * as Animatable from "react-native-animatable";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Alert,
  Share,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

const RenderExercise = (props) => {
  const { exercise } = props;

  const view = useRef();

  const isRightSwipe = ({ dx }) => dx > 200;

  const isLeftSwipe = ({ dx }) => dx < -200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        ); //THIS IS A PROMISE
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (isLeftSwipe(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + exercise.name + " to favorites?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.isFavorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite(),
            },
          ],
          { cancelable: false }
        );
      } else if (isRightSwipe(gestureState)) {
        props.onShowModal();
        console.log("swiped right");
      }
    },
  });

  const shareExercise = (title, message, url) => {
    Share.share(
      {
        title,
        message: `${title}: ${message} ${url}`,
        url,
      },
      {
        dialogTitle: "Share " + title,
      }
    );
  };

  if (exercise) {
    return (
      <Animatable.View
        animation="fadeInDownBig"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card containerStyle={styles.cardContainer}>
          <Card.Image source={{ uri: baseUrl + exercise.image }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={styles.cardText}>{exercise.name}</Text>
            </View>
          </Card.Image>
          <Text style={{ margin: 20 }}>{exercise.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.isFavorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.isFavorite
                  ? console.log("Already set as favorite")
                  : props.markFavorite()
              }
            />
            <Icon
              name="pencil"
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
            <Icon
              name="share"
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() =>
                shareExercise(
                  exercise.name,
                  exercise.description,
                  baseUrl + exercise.image
                )
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardText: {
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default RenderExercise;
