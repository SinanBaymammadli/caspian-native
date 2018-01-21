import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";

import Login from "./src/Login";
import Home from "./src/Home";

const RootNavigator = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  state = {
    loaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    this.setState({ loaded: true });
  }

  render() {
    return (
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
