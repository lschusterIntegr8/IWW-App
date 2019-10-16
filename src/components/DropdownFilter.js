import React, { Component } from 'react';
import {
	FlatList,
	View,
	InteractionManager,
	ActivityIndicator,
	StyleSheet,
	Text,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DropdownMenu from './util/react-native-dropdown-menu';
import { getArchiveContent, getCategoryContent } from '../helpers/content';
import COLOR from '../config/colors';

// const IC_ARR_DOWN = require('./icons/ic_arr_down.png');
// const IC_ARR_UP = require('./icons/ic_arr_up.png');

// const FILTER_DATA = [
// 	['Ausgabe 01 / 2019', 'Ausgabe 12 / 2018', 'Ausgabe 11 / 2018', 'Ausgabe 10 / 2018']
// ];

const mapStateToProps = state => {
	return {
		activeSubscriptionFilter: state.sessionReducer.activeSubscriptionFilter
	};
};

class DropdownFilter extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		selectedFilter: undefined
	};

	returnFilteredData() {
		let FILTER_DATA = this.props.archiveIssues
			? this.props.archiveIssues.map(issue => issue.title)
			: [];

		FILTER_DATA = FILTER_DATA.slice(0, 10);
		return [FILTER_DATA];
	}

	mapTitleToIssueId(title, issues) {
		for (const issue of issues) {
			if (issue.title === title) {
				console.log('Mapped to ', issue.id);
				return issue.id;
			}
		}

		return undefined;
	}

	render() {
		// console.log(this.props.activeView);
		// console.log(this.props.archiveIssues ? this.props.archiveIssues : 'No archive issues');
		// console.log(this.props.categoryIssues ? this.props.categoryIssues : 'No category issues');
		let FILTER_DATA = this.returnFilteredData();
		console.log('UPDATED FILTER_DATA');
		console.log(FILTER_DATA);
		// this.setState({ selectedFilter: FILTER_DATA[0][0] });

		return (
			<View style={{ flex: 1, position: 'relative' }}>
				<DropdownMenu
					dropdownPosition={0}
					style={{ flex: 2, position: 'relative' }}
					bgColor={'white'}
					tintColor={'#666666'}
					activityTintColor={'green'}
					maxHeight={200}
					// arrowImg={}
					// checkImage={}
					// optionTextStyle={{color: '#333333'}}
					// titleStyle={{color: '#333333'}}
					// maxHeight={300}
					handler={(selection, row) => {
						this.setState({ selectedFilter: FILTER_DATA[selection][row] }, () => {
							console.log('ACTIVE VIEW:', this.props.activeView);
							console.log('props: ', this.props);
							console.log(this.props.activeSubscriptionFilter);

							/* If current view is Archiv */
							if (this.props.activeView === 'archive') {
								getArchiveContent(
									this.props.activeSubscriptionFilter.id,
									this.mapTitleToIssueId(
										this.state.selectedFilter,
										this.props.archiveIssues
									)
								);
							} /* Rubriken */ else if (this.props.activeView === 'rubriken') {
								getCategoryContent(
									this.props.activeSubscriptionFilter.id,
									this.mapTitleToIssueId(
										this.state.selectedFilter,
										this.props.categoryIssues
									)
								);
							}
						});
					}}
					data={FILTER_DATA}
				></DropdownMenu>
				<View style={{ flex: 1 }}>
					<Text style={{ textAlign: 'center' }}>
						Selected: {this.state.selectedFilter}
					</Text>
				</View>
			</View>
		);
	}
}

DropdownFilter.propTypes = {
	activeView: PropTypes.string,
	archiveIssues: PropTypes.array,
	categoryIssues: PropTypes.array
};

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(DropdownFilter);
