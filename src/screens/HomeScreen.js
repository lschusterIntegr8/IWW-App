import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import HeaderMenu from '../components/HeaderMenu';
import ArticleCard from '../components/ArticleCard';
import COLOR from '../config/colors';

const mapStateToProps = state => {
	return { articles: state.articles };
};

class HomeScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// alert(slides[0]);
		// alert(this.props.articles);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<HeaderMenu />
				<ScrollView
					style={{}}
					contentContainerStyle={{
						flexGrow: 1,
						paddingVertical: 30
					}}
				>
					{this.props.articles.map(el => (
						<ArticleCard key={el.articleId} article={el} />
					))}
				</ScrollView>
			</View>
		);
	}
}

HomeScreen.propTypes = { navigation: PropTypes.object, articles: PropTypes.array };

const HomeScreenContainer = connect(mapStateToProps)(HomeScreen);

export default HomeScreenContainer;
