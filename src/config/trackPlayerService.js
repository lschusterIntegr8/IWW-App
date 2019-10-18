


/*
Every code tied directly to the player should be put here, this function runs
also in background when no UI is mounted
*/ 
import TrackPlayer from 'react-native-track-player'

module.exports = async function() {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    TrackPlayer.addEventListener('remote-seek', (value) => TrackPlayer.seekTo(value))
}