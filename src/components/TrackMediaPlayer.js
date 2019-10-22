import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Button, Text } from 'react-native';
import { Icon } from 'native-base';
import { useTrackPlayerProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import COLOR from '../config/colors';

const TrackMediaPlayer = props => {
	const { position, duration } = useTrackPlayerProgress(500);
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<Slider
					style={{ width: 300, height: 20 }}
					minimumValue={0}
					maximumValue={duration}
					value={position}
					minimumTrackTintColor={COLOR.RED}
					maximumTrackTintColor={COLOR.WHITE}
					thumbTintColor={COLOR.WHITE}
					onSlidingComplete={value => props.audioPositionHandler(value)}
				/>
			</View>

			<View style={styles.container}>
				{/* <View style={{ width: 20 }} /> */}
				<TouchableOpacity onPress={props.pauseHandler} style={styles.audioControl}>
					<View style={styles.playButton}>
						<Icon name="ios-pause" style={styles.icons} />
					</View>
				</TouchableOpacity>

				{/* <View style={{ width: 20 }} /> */}
				<TouchableOpacity onPress={props.playHandler} style={styles.audioControl}>
					<View style={styles.playButton}>
						<Icon name="ios-play" style={styles.icons} />
					</View>
				</TouchableOpacity>

				{/* <View style={{ width: 20 }} /> */}
				<TouchableOpacity onPress={props.stopHandler} style={styles.audioControl}>
					<View style={styles.playButton}>
						<Icon name="ios-square" style={styles.icons} />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TrackMediaPlayer;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 8
	},
	playButton: {
		height: 42,
		width: 42,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 72 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white'
	},
	audioControl: { paddingHorizontal: 20 },
	secondaryControl: {
		height: 18,
		width: 18
	},
	off: {
		opacity: 0.3
	},
	icons: {
		color: '#FFFFFF',
		fontSize: 24
	}
});
