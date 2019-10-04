import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../config/colors';
import { getSearchResult, getArticleContent } from '../helpers/content';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from '../components/LoadingScreen';

class Search extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
		this.onInputChange = this.onInputChange.bind(this);
		this.openArticle = this.openArticle.bind(this);
		this.renderSearchResults = this.renderSearchResults.bind(this);
	}

	state = {
		typeTimeout: null,
		currentSearchResults: [],
		isFetchingResults: false
	};

	componentDidMount() {
		this.searchInput.current.focus();
	}

	onInputChange(val) {
		clearTimeout(this.state.typeTimeout);
		this.setState({
			typeTimeout: setTimeout(async () => {
				const searchQuery = val;
				console.log('Input is: ', searchQuery);
				/* FETCH SEARCH API + loading + focusing textinput after search */
				this.setState({ isFetchingResults: true });
				const searchResults = await getSearchResult(undefined, 100, undefined, searchQuery);
				this.setState({ isFetchingResults: false });
				this.setState({ currentSearchResults: searchResults });
				this.searchInput.current.focus();
				console.log('SEARCH RESULTS: ', searchResults);
			}, 750)
		});
	}

	async openArticle(article) {
		console.log('OPEN ARTICLE: ', article);
		const articleContent = getArticleContent(article.article_id, article.application_id);

		this.props.navigation.navigate('SingleArticle', {
			article: articleContent, // single article details (content / html)
			articleBasic: article // basic article info
		});
	}

	renderSearchResults({ item }) {
		return (
			<View style={styles.resultCardWrapper}>
				<TouchableOpacity onPress={() => this.openArticle(item)}>
					<Text style={styles.resultText}>{item.title}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.mainContent}>
				<TextInput
					ref={this.searchInput}
					style={styles.searchInput}
					placeholder="Search"
					onChangeText={this.onInputChange}
					editable={!this.state.isFetchingResults}
				></TextInput>
				<Image
					style={styles.searchIcon}
					source={require('../assets/images/search-icon.png')}
				></Image>
				<FlatList
					data={this.state.currentSearchResults}
					renderItem={this.renderSearchResults}
					keyExtractor={item => (item.article_id ? item.article_id.toString() : '')}
					initialNumToRender={5}
				/>
				{this.state.isFetchingResults ? <LoadingScreen /> : null}
			</View>
		);
	}
}

Search.propTypes = {
	navigation: PropTypes.object
};

const styles = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 16
	},
	searchInput: {
		borderBottomColor: COLOR.GREY_SEARCH_BORDER,
		borderBottomWidth: 1,
		width: '100%',
		fontSize: 26,
		paddingHorizontal: 32,
		paddingBottom: 6,
		marginBottom: 16
	},
	searchIcon: {
		width: 22,
		height: 22,
		resizeMode: 'contain',
		position: 'absolute',
		left: 16,
		top: 5
	},
	resultCardWrapper: {
		borderBottomColor: COLOR.GREY_SEARCH_BORDER,
		borderBottomWidth: 1,
		paddingVertical: 3,
		marginVertical: 6
	},
	resultText: {
		fontSize: 16
	}
};

export default Search;
