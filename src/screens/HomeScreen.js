import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderMenu from '../components/HeaderMenu';
import NewsFeedWrapper from '../components/NewsFeedWrapper';
import InfoServiceWrapper from '../components/InfoServiceWrapper';
import { addArticle } from '../redux/actions/index';
import { SafeAreaView } from 'react-navigation';

const mapStateToProps = state => {
	return { articles: state.articles };
};

const mapDispatchToProps = dispatch => {
	return {
		addArticle: article => dispatch(addArticle(article))
	};
};

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};
	}

	/* TODO: Fetch fresh articles and set to store */
	_onRefresh = () => {
		this.setState({ refreshing: true });

		setTimeout(() => {
			this.props.addArticle({
				articleId: '12346',
				title: 'Qualität des Operateurs hängt von der Methode ab?',
				category: 'TeamManagement',
				published_on: 'Wednesday, 21 Jul 2019',
				author: 'CB',
				thumbnail: require('../assets/images/test-article-1.png')
			});
			this.setState({ refreshing: false });
		}, 3000);
	};

	componentDidMount() {}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<HeaderMenu />
					<ScrollView
						style={{}}
						contentContainerStyle={{
							flexGrow: 1,
							paddingVertical: 30
						}}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
								style={{ zIndex: 99 }}
								zIndex={99}
							/>
						}
					>
						{/* 
					Informationsdienste
					*/}

						<InfoServiceWrapper articles={this.props.articles} />

						{/* 
					Meine Inhalte
					*/}
						<NewsFeedWrapper
							articles={this.props.articles}
							refreshing={this.state.refreshing}
						/>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}

HomeScreen.propTypes = {
	navigation: PropTypes.object,
	articles: PropTypes.array
};

const HomeScreenContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

export default HomeScreenContainer;
