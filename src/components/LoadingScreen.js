import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import COLOR from '../config/colors';

const LoadingScreen = props => (
	<View style={styles.loading}>
		<ActivityIndicator size="large" color={COLOR.RED} />
	</View>
);

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(256,256,256,0.4)'
	}
});

export default LoadingScreen;
