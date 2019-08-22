import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import InfoServiceHorizontalList from './InfoServiceHorizontalList';

import COLOR from '../config/colors';

class InfoServiceWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<View style={styles.inhalteHeaderWrapper}>
					<Text style={styles.inhalteHeading}>Informationsdienste</Text>
				</View>
				<View style={{ marginBottom: 10 }}>
					<InfoServiceHorizontalList />
				</View>
			</View>
		);
	}
}

InfoServiceWrapper.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	inhalteHeaderWrapper: {
		paddingHorizontal: 16,
		// marginBottom: 30,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	inhalteHeading: {
		fontSize: 20,
		fontWeight: 'bold',
		color: COLOR.DARK_GREY_HEADING,
		flex: 1,
		justifyContent: 'flex-end'
	}
});

export default InfoServiceWrapper;
