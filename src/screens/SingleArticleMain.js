import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';

class SingleArticleMain extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text>Test</Text>
			</View>
		);
	}
}

SingleArticleMain.propTypes = {
	navigation: PropTypes.object,
	article: PropTypes.array
};

export default SingleArticleMain;
