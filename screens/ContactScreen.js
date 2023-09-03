import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { Card, Button, Icon } from 'react-native-elements';

const ContactScreen = () => {
    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['kit@wrenbody.com'],
            subject: 'Wren Body Wellness Inquiry',
            body: 'Wren Body Wellness, '
        });
    };
return (
        <ScrollView>
            <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
            >
                <Card wrapperStyle={{ margin: 20 }}>
                    <Card.Title>Contact Information</Card.Title>
                        <Card.Divider />
                            <Text>720 14th Street</Text>
                            <Text>Golden, CO 80401</Text>
                            <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
                            <Text>Phone: 1-720-443-0998</Text>
                            <Text>Email: kit@wrenbody.com</Text>
                            <Button
                                title='Send Email'
                                buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
                                icon={
                                    <Icon
                                        name='envelope-o'
                                        type='font-awesome'
                                        color='#fff'
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                onPress={() => sendMail()}
                            />
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

export default ContactScreen;