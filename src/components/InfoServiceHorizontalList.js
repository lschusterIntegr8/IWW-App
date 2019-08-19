import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InfoTile from './InfoTile';

const mapStateToProps = state => ({
	articles: state.articles
});

class InfoServiceHorizontalList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FlatList
				data={this.props.articles}
				renderItem={({ item }) => <InfoTile key={item.articleId} article={item} />}
				keyExtractor={item => item.url}
				horizontal
			/>
		);
	}
}
InfoServiceHorizontalList.propTypes = {
	articles: PropTypes.array
};

const InfoServiceHorizontalListContainer = connect(mapStateToProps)(InfoServiceHorizontalList);

export default InfoServiceHorizontalListContainer;
