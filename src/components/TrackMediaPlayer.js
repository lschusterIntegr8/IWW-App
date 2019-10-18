import React, { Component } from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Button, Text} from 'react-native';
import { useTrackPlayerProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider'

 const TrackMediaPlayer = (props)=>{
    const { position, duration } = useTrackPlayerProgress(500)
    return (
        <View>
            <View style={styles.container}>
                <Slider
                    style={{width: 300, height: 20}}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    minimumTrackTintColor="#E83812"
                    maximumTrackTintColor="#DEDCDC"
                    onSlidingComplete={(value) => props.audioPositionHandler(value)}
                />
            </View>
            
            <View style={styles.container}>
                <View style={{width: 20}} />
                <TouchableOpacity onPress={props.pauseHandler}>
                    <View style={styles.playButton}>
                    <Text style={{color: "white"}}>Pause</Text>
                    </View>
                </TouchableOpacity> 

                <View style={{width: 20}} />
                <TouchableOpacity onPress={props.playHandler}>
                    <View style={styles.playButton}>
                        <Text style={{color: "white"}}>Play</Text>
                    </View>
                </TouchableOpacity>

                <View style={{width: 20}} />
                <TouchableOpacity onPress={props.stopHandler}>
                    <View style={styles.playButton}>
                        <Text style={{color: "white"}}>End</Text>
                    </View>
                </TouchableOpacity>
            </View>
      </View>
    );
  
}

export default TrackMediaPlayer;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 8,
    },
    playButton: {
      height: 42,
      width: 42,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 72 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      color: "white",
    },
    secondaryControl: {
      height: 18,
      width: 18,
    },
    off: {
      opacity: 0.30,
    }
  })