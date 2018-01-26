import React from "react";
import { StyleSheet, View, StatusBar, AsyncStorage } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import axios from "axios";
import { BASE_URL, API_TOKEN } from "react-native-dotenv";

import Login from "./src/Login";
import Home from "./src/Home";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default class App extends React.Component {
  state = {
    loaded: false,
    loggedIn: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    const driverId = await AsyncStorage.getItem("driver_id");
    if (driverId !== null) {
      this.setState({ loaded: true, loggedIn: true });
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    const RootNavigator = StackNavigator(
      {
        Login: {
          screen: Login
        },
        Home: {
          screen: Home,
          backBehavior: "none"
        }
      },
      {
        headerMode: "none",
        initialRouteName: this.state.loggedIn ? "Home" : "Login"
      }
    );

    return (
      <Root>
        <View style={styles.container}>
          <StatusBar
            translucent={false}
            animated={false}
            hidden={false}
            backgroundColor="black"
            barStyle="light-content"
          />
          {this.state.loaded && <RootNavigator />}
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
