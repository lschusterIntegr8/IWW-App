/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App.js';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player'

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./src/config/trackPlayerService'));

