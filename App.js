/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
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
import Threads from "./screens/Threads"
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode={() => null}>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Threads" component={Threads} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isClear: false,
      LessonBoxWidth: "95%",
      LessonBoxBordLorRrad: 15,
      toDo: "",
      WroteLesson: "",
      onLongPress: false
    }
    this.Data = []

    this.renderItem = this.renderItem.bind(this)
    this.addItem = this.addItem.bind(this)
  }
  componentDidMount() {
    this.k = 53
    this.LongEdge = (Math.sqrt(5) + 1) * this.k
    this.shortEdge = 2 * this.k
    this.storeData()
    this.getData()
  }
  storeData = async () => {
    this.kerem = this.kerem + 1
    try {
      await AsyncStorage.setItem('@dokker', this.state.WhichButton)

      this.end = this.Data.length !== 0 ? this.Data : this.peoples
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(this.state.isClear === true ? [] : this.end))

    } catch (e) {
      // saving error
    }
  }

  getData = async () => {
    try {

      const value = await AsyncStorage.getItem('@storage_Key')

      if (value !== null) {
        // value previously stored
        this.peoples = value
        this.Data = eval(this.peoples)
        this.setState({ value: value })
      }
    } catch (e) {
      // error reading value
    }
  }
  addItem() {

    this.Data.push(this.state.WroteLesson)


    this.setState({ toDo: "" })



  }
  renderItem = (item) => {

    if (item !== 0) {

      return (

        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <View key={item} style={[styles.lessonsBox, { width: this.state.onLongPress ? "75%" : "90%", height: this.shortEdge, borderTopRightRadius: this.state.onLongPress ? 0 : 25, borderBottomRightRadius: this.state.onLongPress ? 0 : 25, borderColor: "white", borderWidth: 0.5, }]}>
            <TouchableOpacity style={{ width: "100%", height: 100, justifyContent: "center", alignItems: "center", borderRadius: 25, borderTopRightRadius: this.state.onLongPress ? 0 : 25, borderBottomRightRadius: this.state.onLongPress ? 0 : 25 }} onPress={() => {
              this.props.navigation.navigate("Threads")
              this.setState({ WhichButton: item })
              setInterval(() => this.storeData(), 20)
              this.storeData()
            }} onLongPress={() => { this.setState({ onLongPress: !this.state.onLongPress }) }}>
              <Text style={{ color: "black", fontSize: 30 }}>{(item)}</Text>
            </TouchableOpacity>
          </View>
          { this.state.onLongPress === true && <View style={[styles.deleteButton, { height: this.shortEdge, }]}>
            <TouchableOpacity style={{ borderTopRightRadius: 25, borderBottomRightRadius: 25, width: "100%", height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => {
            this.Data = eval(this.Data).filter(test => test !== item)
              this.storeData()
              this.getData()
            }}>
              <Text style={{ fontSize: 40, color: "white" }}>X</Text>
            </TouchableOpacity>
          </View> }
        </View>




      )
    }




  }


  render() {

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ImageBackground source={require("./pictures/sherlock.jpg")} style={styles.allOfScreen}>
            <View style={styles.views}>
              <View style={styles.TopLessonsBar}>
                <TouchableOpacity onPress={() => {
                  this.setState({ isClear: !this.state.isClear })
                  this.storeData()
                  this.getData()

                }}>
                  <Text style={styles.textStyle}>Derslerin</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.views} >
              <TextInput style={styles.textInputLesson} placeholder="Ders adı giriniz" placeholderTextColor="white" onChangeText={(d) => { this.setState({ WroteLesson: d }) }}></TextInput>
              <View style={styles.TopEditBar}>
                <TouchableOpacity style={{ height: 45, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} underlayColor="gray" onPress={() => {
                  this.addItem()
                  this.storeData();
                  this.getData();
                }}>
                  <Text style={styles.editTextStyle}>ekle</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ borderWidth: 1, width: "90%", marginTop: 10, borderColor: "white",opacity:0.5 }} />
            <ScrollView style={{ width: "100%", height: "83 %" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {this.peoples ? eval(this.peoples).map(item => this.renderItem(item)) : false}
              </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </>
    );

  }


};




const styles = StyleSheet.create({
  deleteButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    marginTop: 5,
    marginBottom: 20,
    width: "20%",
    backgroundColor: "#CE9178",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center"

  },
  allOfScreen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E"
  },
  views: {
    flexDirection: "row",
    marginTop: 10,
    width: "95%",
    backgroundColor: "transparent",

  },
  lessonsBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 20,
    opacity: 0.7


  },
  textStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold"

  },
  editTextStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 22,

  },
  TopLessonsBar: {
    height: 45, width: "100%",
    borderRadius: 20

    , justifyContent: "center"
    , alignItems: "center",



  },
  TopEditBar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    opacity:0.7,
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    backgroundColor: "gray",
    height: 22.5 * 2, 
    width: (Math.sqrt(5) + 1) * 22.5,
    borderRadius: 10
    , borderBottomLeftRadius: 0
    , borderTopLeftRadius: 0,
    borderWidth: 0.5,
    borderColor: "gray"



  },
  textInputLesson: {

    color: "white",
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    width: "75%",
    paddingLeft: 15,
    fontSize: 18,
    height: 45,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,

  }

});

