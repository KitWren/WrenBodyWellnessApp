import * as Animatable from 'react-native-animatable';
import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { Card } from 'react-native-elements';

const ContactScreen = () => {
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
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

export default ContactScreen;