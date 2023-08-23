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
                            <Text>1 Nucamp Way</Text>
                            <Text>Seattle, WA 98001</Text>
                            <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
                            <Text>Phone: 1-206-555-1234</Text>
                            <Text>Email: campsites@nucamp.co</Text>
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

export default ContactScreen;