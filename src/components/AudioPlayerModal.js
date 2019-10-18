import React, { Component } from 'react';
import {Modal, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import TrackMediaPlayer from './TrackMediaPlayer';



const AudioPlayerModal = (props) => {
    if (props.article){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{props.article && props.article.title}</Text>
                        <TrackMediaPlayer 
                            playHandler={props.playHandler}
                            stopHandler={props.stopHandler}
                            pauseHandler={props.pauseHandler}
                            audioPositionHandler={props.audioPositionHandler}
                            source={props.article.content}/>
            </View>
        );
    } else {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size="large" color="#E3001B" />
            </View>
        );
    }
}

export default AudioPlayerModal;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: 25+'%',
        width: 100+'%',
        bottom: 0,
        zIndex: 99,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    }
  })