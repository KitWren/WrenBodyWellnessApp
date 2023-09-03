import { useState } from "react";
import { Text, 
    View, 
    ScrollView, 
    StyleSheet, 
    Switch, 
    Button, 
    Alert
    // Modal 
} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker'; 
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    // const [showModal, setShowModal] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };        
    
    const handleReservation = () => {
        
        const stringMsg = `Number of Campers: ${campers} \n Hike-In: ${hikeIn} \n Date: ${date.toLocaleString('en-US')}`;
        Alert.alert(
            'Begin Search?',
            stringMsg,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { 
                        resetForm();
                    }
                },
                {
                    text: 'OK',
                    onPress: () => {
                        presentLocalNotification(
                            date.toLocaleDateString('en-US')
                        );
                        resetForm();
                    }
                }
            ],
            { cancelable: false }
        )
        
        
        console.log('campers: ', campers);
        console.log('hikeIn: ', hikeIn);
        console.log('date: ', date);
        // setShowModal(!showModal)
    }

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    const presentLocalNotification = async (reservationDate) => {
        const sendNotification = () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true
                })
            });
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${reservationDate} requested`
                },
                trigger: null //causes notification to fire immediately-property can be used to schedule a notification in future
            });
        };

        let permissions = await Notifications.getPermissionsAsync(); //await keyword is only used in asynch function. It is similar in concept to then method. You use it followed by a promise from notifications API. This code returns a promise that will fulfill with the result of checking that this device has permissions to show notifications. Await keyword causes code to pause and wait for promise to be fulfilled. It assign promise result to permissions variable.  
        if (!permissions.granted) { //weren't able to verify permissions (yet)
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    };

    return(
        <ScrollView>
            <Animatable.View
                animation='zoomIn'
                duration={2000}
                delay={1000}
            >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers:</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={campers}
                        onValueChange={(itemValue) => setCampers(itemValue)}
                    >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={hikeIn}
                        trackColor={{ true: '#5637DD', false: null }}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date:</Text>
                    <Button 
                        onPress={() => setShowCalendar(!showCalendar)}
                        title={date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>
                {showCalendar && (
                    <DateTimePicker
                        style={styles.formItem}
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                    />
                )}
                <View style={styles.formRow}>
                    <Button
                        onPress={() => handleReservation()}
                        title='Search Availability'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsite to reserve'
                    />
                </View>
            </Animatable.View>
            {/* <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                    Search Campsite Reservations
                    </Text>
                    <Text style={styles.modalText}>
                        Number of Campers: {campers}
                    </Text>
                    <Text style={styles.modalText}>
                        Hike-In?: {hikeIn ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.modalText}>
                        Date: {date.toLocaleDateString('en-US')}
                    </Text>   
                    <Button 
                        onPress={() => {
                            setShowModal(!showModal);
                            resetForm();
                        }}
                        color='#5637DD'
                        title='Close' 
                    />
                </View>
            </Modal> */}
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }, 
    // modal: {
    //     justifyContent: 'center',
    //     margin: 20
    // },
    // modalTitle: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     backgroundColor: '#5637DD',
    //     textAlign: 'center',
    //     color: '#fff',
    //     marginBottom: 20
    // },
    // modalText: {
    //     fontSize: 18,
    //     margin: 10
    // }
});

export default ReservationScreen;