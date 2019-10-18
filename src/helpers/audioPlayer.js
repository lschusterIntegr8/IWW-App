

import TrackPlayer from 'react-native-track-player';

export const addTrackToQueu = async (articleObj) => {
    await TrackPlayer.reset(); 
    let track = {
        id: articleObj.title,
        title: articleObj.title,
        url: "https://"+articleObj.content,
        artist: "MeinIWW"
    }
    console.log("Audio To play", track)
    await TrackPlayer.add(track);
    await TrackPlayer.play();
}