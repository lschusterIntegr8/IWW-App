import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderMenu from '../components/HeaderMenu';
import NewsFeedWrapper from '../components/NewsFeedWrapper';
import InfoServiceWrapper from '../components/InfoServiceWrapper';
import { addArticle } from '../redux/actions/index';

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

	static navigationOptions = {
		header: null
	};

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
			<View style={{ flex: 1 }}>
				<HeaderMenu />
				<SafeAreaView>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
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
				</SafeAreaView>
			</View>
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
