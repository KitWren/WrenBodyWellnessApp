import { useEffect, useRef } from "react";
import { Text, Image, View, Animated, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";
import PlainLogoItalicsFont from "../assets/images/PlainLogoItalicsFont.png";

const FeaturedItem = (props) => {
  const { item } = props;

  if (props.isLoading) {
    return <Loading />;
  }

  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }

  if (item) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={{ uri: baseUrl + item.image }}>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
};

const HomeScreen = () => {
  const appointments = useSelector((state) => state.appointments);
  const promotions = useSelector((state) => state.promotions);
  const partners = useSelector((state) => state.partners);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const scaleAnimation = Animated.timing(scaleValue, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  });

  const featAppointment = appointments.appointmentsArray.find(
    (item) => item.featured
  );
  const featPromotion = promotions.promotionsArray.find(
    (item) => item.featured
  );
  const featPartner = partners.partnersArray.find((item) => item.featured);

  useEffect(() => {
    scaleAnimation.start();
  }, []);

  return (
    <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
      <View style={styles.container}>
        <Image style={styles.cover} source={PlainLogoItalicsFont} />
      </View>

      <FeaturedItem
        item={featAppointment}
        isLoading={appointments.isLoading}
        errMess={appointments.errMess}
      />
      <FeaturedItem
        item={featPromotion}
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
      />
      <FeaturedItem
        item={featPartner}
        isLoading={partners.isLoading}
        errMess={partners.errMess}
      />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  cover: {
    width: 430,
    height: 250,
    resizeMode: "cover",
  },
  resizeMethod: {
    scale: "scale",
  },
});

export default HomeScreen;
