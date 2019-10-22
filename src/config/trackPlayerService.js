/*
Every code tied directly to the player should be put here, this function runs
also in background when no UI is mounted
*/

import TrackPlayer from 'react-native-track-player';
import { store } from '../redux/store/index';
import { openAudioPlayerModal } from '../redux/actions/index';

module.exports = async function() {
	console.log('track player service init');
	TrackPlayer.addEventListener('remote-play', () => {
		console.log('Heard PLAY!');
		TrackPlayer.play();
	});

	TrackPlayer.addEventListener('remote-pause', () => {
		console.log('Heard PAUSE!');
		TrackPlayer.pause();
	});

	TrackPlayer.addEventListener('remote-stop', () => {
		console.log('Heard stop');
		TrackPlayer.reset();
		store.dispatch(openAudioPlayerModal([]));
	});

	TrackPlayer.addEventListener('remote-seek', value => TrackPlayer.seekTo(value));
};
