import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import Slides from '../components/slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
  { text: 'Welcome to job app', color: '#03A9F4' },
  { text: 'Your next career awaits', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
    // AsyncStorage.removeItem('fb_token');
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
