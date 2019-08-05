import React from 'react';
import { Image, StyleSheet } from 'react-native';

class HeaderBackImage extends React.Component<any, any> {
	render() {
		const source = require('../assets/images/back_arrow.png');
		return <Image source={source} style={styles.image} />;
	}
}

const styles = StyleSheet.create({
	image: {
		height: 14.5,
		width: 24,
		marginRight: 12,
		marginVertical: 12,
		resizeMode: 'contain'
	}
});

export default HeaderBackImage;
