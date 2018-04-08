import React, { Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BlurView, LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const HEIGHT = 280;

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const Header = ({ animatedVal }) => (
  <Fragment>
    <Container animatedVal={animatedVal} />
    <Elements animatedVal={animatedVal} />
  </Fragment>
);

const Elements = ({ animatedVal }) => {
  const opacityAnim = animatedVal.interpolate({
    inputRange: [20, 200, HEIGHT],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  });
  return (
    <Fragment>
      <AnimatedIonicons
        style={{
          position: 'absolute',
          left: 16,
          top: 22,
          zIndex: 6,
          opacity: opacityAnim,
        }}
        name="ios-camera"
        size={36}
        color="white"
      />
      <Animated.View
        style={{
          height: HEIGHT,
          ...StyleSheet.absoluteFillObject,
          zIndex: 4,
          transform: [
            {
              translateY: animatedVal.interpolate({
                inputRange: [0, 140,200, 200],
                outputRange: [0, -60, -116, -116],
              }),
            },
          ],
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            padding: 16,
            alignItems: 'center',
          }}
        >
          <Animated.Text
            style={{
              marginTop: 76,
              marginBottom: 16,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 28,
              opacity: opacityAnim,
            }}
          >
            Photos for everyone
          </Animated.Text>
          <SearchBar animatedVal={animatedVal} />
        </View>
      </Animated.View>
    </Fragment>
  );
};

const SearchBar = ({ animatedVal }) => {
  const colorAnimation = animatedVal.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: ['white', 'rgba(0,0,0,0.6)'],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity style={{ width: '100%' }}>
      <BlurView
        intensity={100}
        tint="default"
        style={styles.textInputContainer}
      >
        <Animated.View
          style={{
            backgroundColor: 'rgb(240,240,240)',
            opacity: animatedVal.interpolate({
              inputRange: [100, HEIGHT],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            ...StyleSheet.absoluteFillObject,
          }}
        />
        <AnimatedIonicons
          size={22}
          style={{
            marginRight: 8,
            color: colorAnimation,
          }}
          name="ios-search"
        />
        <Animated.Text
          style={{
            fontSize: 15,
            color: colorAnimation,
          }}
        >
          Search photos
        </Animated.Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const Container = ({ animatedVal }) => (
  <Animated.View
    style={[
      styles.header,
      {
        transform: [
          {
            translateY: animatedVal.interpolate({
              inputRange: [0, 200],
              outputRange: [0, -200],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: animatedVal.interpolate({
              inputRange: [-400, 0],
              outputRange: [3, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ]}
  >
    <Overlays animatedVal={animatedVal} />
  </Animated.View>
);

const Overlays = ({ animatedVal }) => (
  <Fragment>
    <Gallery animatedVal={animatedVal} />
    {/* dark overlay */}
    <LinearGradient
      style={{ ...StyleSheet.absoluteFillObject }}
      colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.3)']}
      start={[0.5, 0]}
      end={[0.5, 1]}
    />
    {/* white overlay */}
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,1)',
        opacity: animatedVal.interpolate({
          inputRange: [40, HEIGHT],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      }}
    />
  </Fragment>
);

class Gallery extends React.Component {
  state = {
    evenAnimatedVal: new Animated.Value(1),
    oddAnimatedVal: new Animated.Value(0),
    index: 0,
  };
  componentDidMount() {
    global.setInterval(() => {
      this.setState({ index: (this.state.index + 1) % 2 });
      Animated.parallel([
        Animated.timing(this.state.oddAnimatedVal, {
          toValue: this.state.index % 2 === 0 ? 1 : 0,
          duration: 1300,
        }),
        Animated.timing(this.state.evenAnimatedVal, {
          toValue: this.state.index % 2 === 0 ? 0 : 1,
          duration: 1300,
        }),
      ]).start();
    }, 5000);
  }
  render() {
    const styles = {
      ...StyleSheet.absoluteFillObject,
      width: null,
      height: null,
    };
    const scaleAnim = this.props.animatedVal.interpolate({
      inputRange: [0, 40],
      outputRange: [1.3, 1.2],
      extrapolate: 'clamp',
    });
    return (
      <Fragment>
        <Animated.Image
          resizeMode="contain"
          style={{
            ...styles,
            opacity: this.state.evenAnimatedVal,
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          }}
          source={require('./pic1.jpg')}
        />
        <Animated.Image
          resizeMode="contain"
          style={{
            ...styles,
            opacity: this.state.oddAnimatedVal,
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          }}
          source={require('./pic4.jpg')}
        />
        ))}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'pink',
    height: HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    overflow: 'hidden',
  },
  textInputContainer: {
    paddingHorizontal: 14,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
