import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';

class SingleArticleMain extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log(this.props.navigation);
	}

	render() {
		/* Get parameter that is passed via navigation */
		const { navigation } = this.props;
		const article = navigation.getParam('article', {});

		return (
			<View style={{ flex: 1 }}>
				<Text>{article.content}</Text>
			</View>
		);
	}
}

SingleArticleMain.propTypes = {
	navigation: PropTypes.object
};

export default SingleArticleMain;
