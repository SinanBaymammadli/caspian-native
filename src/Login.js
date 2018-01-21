import React from "react";
import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import { Form, Item, Input, Button, Text } from "native-base";

import logo from "./images/logo.png";

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  login = () => {};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <Form>
            <View style={styles.imageWrapper}>
              <Image source={logo} style={styles.image} />
            </View>

            <Item style={styles.item}>
              <Input
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Item>
            <Item style={styles.item}>
              <Input
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>
            <Button
              full
              primary
              style={styles.button}
              onPress={() => navigate("Home")}
            >
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
  button: {
    marginHorizontal: 15,
    marginVertical: 15
  }
});
