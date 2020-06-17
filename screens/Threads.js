import React from "react"
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack"

export default class Threads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null


        }
    }
    componentDidMount() {
        setTimeout(this.getData.bind(this), 100)
    }

    getData = async () => {
        try {
            const value1 = await AsyncStorage.getItem('@dokker')

            if (value1 !== null) {
                // value previously stored
                this.value = value1
                this.setState({ value: value1 })
                setTimeout(() => console.warn(this.value), 1000)
            }
        } catch (e) {
            // error reading value
        }
    }

    render() {
        return (
            <>

                <ImageBackground source={require("../pictures/sherlock.jpg")} style={{ width: "100%", height: "100%" }}>
                  
                    <View style={{ alignItems: "center", height: "100%" }}>
                        <View style={styles.header}>
                            <Text style={{ fontSize: 25 }}>Mind Palaces Parts</Text>
                        </View>
                        <View style={styles.WhiteStick} />
                        <ScrollView>

                        <View style={styles.Partsinstructions}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.photoMind}></View>
                                <View style={styles.HeaderTopic}></View>
                            </View>
                            <View style={styles.TopicInfo}></View>
                        </View>
                        <View style={styles.Partsinstructions}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.photoMind}></View>
                                <View style={styles.HeaderTopic}></View>
                            </View>
                            <View style={styles.TopicInfo}></View>
                        </View>
                        <View style={styles.Partsinstructions}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.photoMind}></View>
                                <View style={styles.HeaderTopic}></View>
                            </View>
                            <View style={styles.TopicInfo}></View>
                        </View>

                        </ScrollView>
                      
                    </View>
              
              
                </ImageBackground>


            </>


        )
    }


}
const k = 95
const longEdge = (Math.sqrt(5) + 1) * k
const shortEdge = 2 * k
const styles = StyleSheet.create({

    header: {
        width: longEdge,
        height: 75,
        backgroundColor: "white",
        opacity: 0.5,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    WhiteStick: {
        margin: 10,
        marginBottom:0,
        borderWidth: 1,
        borderColor: "white",
        width: "90%",
        opacity: 0.5

    },
    HeaderTopic: {
        width: 197,
        height: 65,
        backgroundColor: "black",
        opacity: 0.5,
        borderRadius: 20,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    photoMind: {
        marginLeft: 15,
        marginLeft: 15,
        marginTop: 15,
        height: 65,
        width: 65,
        borderRadius: 20,
        backgroundColor: "black",
        opacity: 0.5


    },
    TopicInfo: {
        width: 80 + 197,
        height: 77,
        margin: 15,
        backgroundColor: "black",
        borderRadius: 20,
        opacity: 0.5


    },
    Partsinstructions: {
        backgroundColor: "white",
        width: longEdge,
        height: shortEdge,
        borderRadius: 25,
        opacity: 0.5,
        marginTop:15,
        marginBottom:10


    }



}) 