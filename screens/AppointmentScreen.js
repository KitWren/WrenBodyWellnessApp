import * as Animatable from "react-native-animatable";
import { FlatList, Text, View } from "react-native";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";

const AppointmentScreen = ({ navigation }) => {
  const appointments = useSelector((state) => state.appointments);

  if (appointments.isLoading) {
    return <Loading />;
  }
  if (appointments.errMess) {
    return (
      <View>
        <Text>{appointments.errMess}</Text>
      </View>
    );
  }

  const renderAppointmentItem = ({ item: appointment }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          title={appointment.name}
          caption={appointment.description}
          featured
          onPress={() =>
            navigation.navigate("AppointmentInfo", { appointment })
          }
          imageSrc={{ uri: baseUrl + appointment.image }}
        />
      </Animatable.View>
    );
  };

  return (
    <FlatList
      data={appointments.appointmentsArray}
      renderItem={renderAppointmentItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default AppointmentScreen;
