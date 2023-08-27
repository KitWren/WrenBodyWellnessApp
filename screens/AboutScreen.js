import * as Animatable from 'react-native-animatable';
import { ScrollView, Text } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from '../shared/baseUrl';
import Loading from "../components/LoadingComponent";

function Mission() {
    return (
        <Card>
            <Card.Title>
                Kit Wren LMT, CPT, PES, CES
            </Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
            Kit is a licensed massage therapist, personal trainer, and performance health coach specializing in metabolic testing and analysis, sports, structural, and therapeutic massage, injury rehabilitation, neuromuscular therapy and nervous system-based craniosacral unwinding. Since recovering from a serious injury in 2015, Kit discovered his passion for helping others heal, find wellbeing and get the most out of their body's by overcoming limitations. He has worked alongside physical therapists, acupuncturists, massage therapists, sports performance coaches, nutritionists and other holistic health practitioners across Los Angeles and Denver.
            
            Kit searches for the cause of imbalance and aims to correct it at its root, the results being optimal health and peak performance. He customizes every session to best suit the individual needs of each client. He strives to help people understand and integrate their body and mind to live full lives and not let injuries, pain or stress keep them from being their most joyful, happy, and healthy selves. Each session is given from a place of professionalism, compassion, heart and humor.
            </Text>
        </Card>
    )
}

const AboutScreen = () => {
    const partners = useSelector((state) => state.partners);

    if (partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    if (partners.errMess) {
        return (
            <ScrollView>
                <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
                >  
                    <Mission />
                    <Card>
                        <Card.Title>Community Partners</Card.Title>
                        <Card.Divider />
                        <Text>{partners.errMess}</Text>
                    </Card>
                </Animatable.View>  
            </ScrollView>
        );
    }
    
    return (
        <ScrollView>
            <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
            >
                <Mission />
                <Card>
                    <Card.Title>
                        Community Partners
                    </Card.Title>
                    <Card.Divider />
                    {partners.partnersArray.map((partner) => {
                        return (
                            <ListItem key={partner.id}>
                                <Avatar
                                    source={{ uri: baseUrl + partner.image }}
                                    rounded />
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {partner.name}
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        {partner.description}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        );
                    })}
                </Card>
            </Animatable.View>  
        </ScrollView>
    );
};

export default AboutScreen;