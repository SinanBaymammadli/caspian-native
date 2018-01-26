import React from "react";
import { StyleSheet, View, StatusBar, AsyncStorage } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import axios from "axios";

import Login from "./src/Login";
import Home from "./src/Home";

axios.defaults.baseURL = "http://192.168.1.107:8080/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdlNGU0NWRhM2M2ZTc4M2M5NGU3MmVjNTAxZmY0MGI5OGRiOTI4ZGU3ZmVmYWQ3NmUxYmZiZDA5YzY4MzhlNjUxZTk4OTdlNWM5ZmFmN2JlIn0.eyJhdWQiOiIxIiwianRpIjoiN2U0ZTQ1ZGEzYzZlNzgzYzk0ZTcyZWM1MDFmZjQwYjk4ZGI5MjhkZTdmZWZhZDc2ZTFiZmJkMDljNjgzOGU2NTFlOTg5N2U1YzlmYWY3YmUiLCJpYXQiOjE1MTY5NjMxNzMsIm5iZiI6MTUxNjk2MzE3MywiZXhwIjoxNTQ4NDk5MTczLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.DRpgFyIhTr-P9CClVCUyP5a3qWz3jqhSVep05cDg6k7A2Tcbkbj2eJVEkvRwOaUfGxmR76bP_KvVjfB3sSpRDwm0kP0yz_xxsdaf_D6SYSZjdxlxKNgRQh4XUCMnh-6zxNVG_xNEkWuHwJWDKfuVHHW8_nNe-MjnX58yo6DzGQrofWU_otQOz8EUewuoeKra1mKOYpU0P3UGY1yMqE3Qm4w3HhBVmO3KyI-i5nwsRe5w-SsYiLb73YpqK16T-DBrSr3m_fzcB--Qo_qBLonMAoGnt0GLHZcmAOJLmB0jaAvVJ3Bk-rt6r17E5SI32NKjY-0W2P6tspcTz6-yrnZMKGJqnW__0r8UURdf_Feg3sebW_vKOdOndAZ5rk1G2QxA9W15BOzksaUE1cSc63gZzxvWiaNAlukH4ZPMKaLT2L22R1HVS-uOMQhi6FARy6936zGUBDkZAiV01NGB2Dj74XGeXUAxwnfe-2Q8c1hh2P-JUMfJQHFiZx4lxqavMbCD7-NSCJorl7Pyzo-98mWRdGgjFZdFV9MCA-uBLHyZay8OhgnAbTEtNHAd0ypCsxz4BPNMbrD3EpzdHGfIJ-9sUQHXpxUhfCbeaNHLh8QGukH8yY1sXQAmMSV8B3dLceIn_-ltxPwPgqwmFb7SU4LV-frYaRUkmHj1xbhXpEjAwoQ";
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
