import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import {
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
  Icon
} from "native-base";

const data = [
  {
    key: "a",
    address: "Dilare Eliyeva 21.",
    price: "250 man.",
    status: "Tecili",
    item: "Armain Geo"
  },
  {
    key: "b",
    address: "Dilare Eliyeva 21.",
    price: "250 man.",
    status: "Tecili",
    item: "Armain Geo"
  },
  {
    key: "1",
    address: "Dilare Eliyeva 21.",
    price: "250 man.",
    status: "Tecili",
    item: "Armain Geo"
  },
  {
    key: "2",
    address: "Dilare Eliyeva 21.",
    price: "250 man.",
    status: "Tecili",
    item: "Armain Geo"
  },
  {
    key: "3",
    address: "Dilare Eliyeva 21.",
    price: "250 man.",
    status: "Tecili",
    item: "Armain Geo"
  }
];

const Sidebar = () => (
  <View style={styles.sidebar}>
    <List>
      <ListItem icon>
        <Left>
          <Icon android="md-log-out" ios="ios-log-out" />
        </Left>
        <Body>
          <Button full transparent dark>
            <Left>
              <Text>Logout</Text>
            </Left>
          </Button>
        </Body>
      </ListItem>
    </List>
  </View>
);

export default class Home extends React.Component {
  state = {
    important: true,
    quick: true
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar />}
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
                  checked={this.state.important}
                  style={styles.checkbox}
                  onPress={() =>
                    this.setState(prevState => ({
                      important: !prevState.important
                    }))
                  }
                />
              </View>

              <View style={styles.action}>
                <Text>Suretli</Text>
                <CheckBox
                  checked={this.state.quick}
                  style={styles.checkbox}
                  onPress={() =>
                    this.setState(prevState => ({
                      quick: !prevState.quick
                    }))
                  }
                />
              </View>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>Adress: {item.address}</Text>
                      <Text>Odenis: {item.price}</Text>
                      <Text>Status: {item.status}</Text>
                      <Text>Mehsul: {item.item}</Text>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Button primary>
                      <Text>Sifarisi bitir</Text>
                    </Button>
                  </CardItem>
                </Card>
              </View>
            )}
          />
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#fff",
    justifyContent: "center"
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
