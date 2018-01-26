import React from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  Keyboard,
  BackHandler
} from "react-native";
import { Form, Item, Input, Button, Text, Spinner } from "native-base";
import axios from "axios";

import logo from "./images/logo.png";

export default class Login extends React.Component {
  state = {
    loaded: true,
    data: {
      id: "",
      password: ""
    },
    error: ""
  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  };

  login = async () => {
    Keyboard.dismiss();

    this.setState({
      loaded: false
    });

    const data = {
      driver_id: parseInt(this.state.data.id),
      password: this.state.data.password
    };

    try {
      const response = await axios.post("/drivers/auth", data);
      const result = response.data.data;

      if (result) {
        try {
          await AsyncStorage.setItem("driver_id", result.id.toString());
          this.setState({
            error: "",
            loaded: true
          });

          this.props.navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      } else {
        this.setState({
          error: response.data[0],
          loaded: true
        });
      }
    } catch (error) {
      this.setState({
        error: "Network error happened.",
        loaded: true
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <Form>
            <View style={styles.imageWrapper}>
              <Image source={logo} style={styles.image} />
            </View>

            <View style={styles.error}>
              <Text style={styles.errorText}>{this.state.error}</Text>
            </View>

            {!this.state.loaded && <Spinner color="blue" />}

            <Item style={styles.item}>
              <Input
                onChangeText={id =>
                  this.setState({ data: { ...this.state.data, id } })
                }
                value={this.state.data.id}
                placeholder="Driver id"
                keyboardType="numeric"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Item>
            <Item style={styles.item}>
              <Input
                onChangeText={password =>
                  this.setState({ data: { ...this.state.data, password } })
                }
                value={this.state.data.password}
                placeholder="Password"
                keyboardType="numeric"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>
            <Button full primary style={styles.button} onPress={this.login}>
              <Text>Login</Text>
            </Button>
          </Form>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20
  },
  image: {
    width: 100,
    height: 115
  },
  item: {
    marginRight: 15
  },
  error: {
    margin: 15
  },
  errorText: {
    color: "red",
    textAlign: "center"
  },
  button: {
    margin: 15
  }
});
