import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  BackHandler
} from "react-native";
import {
  Container,
  Card,
  CardItem,
  Text,
  Body,
  H1,
  H2,
  H3,
  CheckBox,
  Button,
  Drawer,
  List,
  ListItem,
  Left,
  Icon,
  Toast,
  Spinner
} from "native-base";
import axios from "axios";

export default class Home extends React.Component {
  state = {
    loaded: false,
    fast: true,
    urgently: true,
    data: [],
    refreshing: false
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    this.getOrders();
  };

  getOrders = async () => {
    this.setState({
      loaded: false,
      refreshing: true
    });

    try {
      const driverId = await AsyncStorage.getItem("driver_id");
      if (driverId !== null) {
        axios.get(`/drivers/${driverId}/orders`).then(res => {
          this.setState({
            data: res.data.data,
            loaded: true,
            refreshing: false
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  _keyExtractor = (item, index) => item.id;

  logout = () => {
    AsyncStorage.removeItem("driver_id", () => {
      this.props.navigation.navigate("Login");
    });
  };

  orderCompleted = async order_id => {
    try {
      const response = await axios.post("orders/complete", { order_id });
      const isCompleted = response.data[0] === "true" ? true : false;
      if (isCompleted) {
        this.getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const list = this.state.data.filter(data => {
      if (data.delivery_type) {
        return this.state.fast;
      } else {
        return this.state.urgently;
      }
    });

    let main;

    if (!this.state.loaded) {
      main = <Spinner color="blue" />;
    } else {
      main =
        list.length <= 0 ? (
          <Text style={styles.noOrder}>Sifaris yoxdur.</Text>
        ) : (
          <FlatList
            data={list}
            keyExtractor={this._keyExtractor}
            onRefresh={this.getOrders}
            refreshing={this.state.refreshing}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>Adress: {item.address}</Text>
                      <Text>Odenis: {item.fee}</Text>
                      <Text>
                        Status: {item.delivery_type ? "Tecili" : "Suretli"}
                      </Text>
                      <Text>Mehsul: {item.product}</Text>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Button
                      primary
                      onPress={() => {
                        this.orderCompleted(item.id);
                        Toast.show({
                          text: "Sifaris silindi",
                          position: "bottom",
                          buttonText: "Okay"
                        });
                      }}
                    >
                      <Text>Sifarisi bitir</Text>
                    </Button>
                  </CardItem>
                </Card>
              </View>
            )}
          />
        );
    }

    return (
      <Container>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <View style={styles.sidebar}>
              <List>
                <ListItem icon>
                  <Left>
                    <Icon android="md-log-out" ios="ios-log-out" />
                  </Left>
                  <Body>
                    <Button full transparent dark onPress={() => this.logout()}>
                      <Left>
                        <Text>Logout</Text>
                      </Left>
                    </Button>
                  </Body>
                </ListItem>
              </List>
            </View>
          }
          onClose={() => this.closeDrawer()}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerMain}>
                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => this.openDrawer()}
                >
                  <Icon name="md-menu" />
                </TouchableOpacity>
                <H1>Sifarisler</H1>
              </View>

              <View style={styles.actions}>
                <View style={styles.action}>
                  <Text>Tecili</Text>
                  <CheckBox
                    checked={this.state.fast}
                    style={styles.checkbox}
                    onPress={() =>
                      this.setState(prevState => ({
                        fast: !prevState.fast
                      }))
                    }
                  />
                </View>

                <View style={styles.action}>
                  <Text>Suretli</Text>
                  <CheckBox
                    checked={this.state.urgently}
                    style={styles.checkbox}
                    onPress={() =>
                      this.setState(prevState => ({
                        urgently: !prevState.urgently
                      }))
                    }
                  />
                </View>
              </View>
            </View>
            {main}
          </View>
        </Drawer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#fff"
  },
  noOrder: {
    textAlign: "center",
    paddingVertical: 15
  },
  header: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  headerMain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  menuBtn: {
    position: "absolute",
    left: 0,
    top: 0,
    paddingHorizontal: 10
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  action: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
    // borderWidth: 1,
    // borderColor: "red"
  },
  checkbox: {
    //paddingHorizontal: 10
  },
  card: {
    paddingHorizontal: 15
  },
  sidebar: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50
  }
});
