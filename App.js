import React, { Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  StatusBar,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BlurView, LinearGradient } from 'expo';
import Header from './Header';

const { width: windowWidth } = Dimensions.get('window');

const HEIGHT = 280;

export default class App extends React.Component {
  state = { scrollValue: new Animated.Value(0) };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar animated barStyle={'dark-content'} />
        <Header animatedVal={this.state.scrollValue} />
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollValue } } },
          ])}
        >
          <Row title="Explore" />
          <Row title="Explore" />
          <Row title="Explore" />
          <Row title="Explore" />
          <Row title="Explore" />
          <Row title="Explore" />
          <Row title="Explore" />
        </Animated.ScrollView>
      </View>
    );
  }
}

const Row = ({ title }) => (
  <View>
    <Text
      style={{
        paddingTop: 16,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        fontSize: 18,
      }}
    >
      {title}
    </Text>
    <ScrollView
      contentContainerStyle={{ padding: 12 }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Card imageSrc={require('./pic2.jpg')} title="Just Add type" />
      <Card imageSrc={require('./pic3.jpg')} title="Sky" />
    </ScrollView>
  </View>
);

const Card = ({ title, imageSrc }) => (
  <TouchableOpacity>
    <ImageBackground
      source={imageSrc}
      style={{
        width: windowWidth - 30,
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: 'white',
        }}
      >
        {title}
      </Text>
    </ImageBackground>
  </TouchableOpacity>
);
