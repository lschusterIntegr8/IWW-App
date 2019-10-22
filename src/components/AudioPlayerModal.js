import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import TrackMediaPlayer from './TrackMediaPlayer';

const AudioPlayerModal = props => {
	if (props.article) {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>{props.article && props.article.title}</Text>
					<TrackMediaPlayer
						playHandler={props.playHandler}
						stopHandler={props.stopHandler}
						pauseHandler={props.pauseHandler}
						audioPositionHandler={props.audioPositionHandler}
						source={props.article.content}
					/>
				</View>
			</View>
		);
	} else {
		return (
			<View style={styles.indicatorContainer}>
				<ActivityIndicator size="large" color="#E3001B" />
			</View>
		);
	}
};

export default AudioPlayerModal;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		minHeight: '30%',
		width: '100%',
		bottom: 0,
		zIndex: 99,
		backgroundColor: 'rgba(52, 52, 52, 0.94)',
		padding: 16
	},
	title: {
		flex: 0,
		fontSize: 14,
		fontWeight: 'bold',
		lineHeight: 19,
		color: 'white',
		textAlign: 'center'
	}
});
