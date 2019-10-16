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
		selectedFilter: undefined,
		FILTER_DATA: [[]]
	};

	componentDidMount() {
		this.returnFilteredData();
		console.log('UPDATED FILTER_DATA');
		console.log(this.state.FILTER_DATA);
	}

	componentWillReceiveProps(nextProps) {
		/* Reinit dropdown menu when content changes */
		if (nextProps.issues !== this.props.issues) {
			this.returnFilteredData(nextProps.issues);
		}
	}

	returnFilteredData(nextIssues = undefined) {
		console.log('ISSUES props: ', this.props.issues);
		// const issues = this.props.issues ? this.props.issues : [];
		const issues = nextIssues ? nextIssues : this.props.issues ? this.props.issues : [];
		let tmpFilteredData =
			issues && issues.length > 0
				? issues.map(issue => {
						if (issue.title) return issue.title;
						else if (issue.label) return issue.label;
				  })
				: undefined;

		if (!tmpFilteredData) return this.setState({ FILTER_DATA: [[]] });

		tmpFilteredData = tmpFilteredData.slice(0, 10);
		// return [FILTER_DATA];
		return this.setState({ FILTER_DATA: [tmpFilteredData] }, () => {
			this.setState({ selectedFilter: this.state.FILTER_DATA[0][0] });
		});
	}

	mapTitleToIssueId(title, issues) {
		for (const issue of issues) {
			if (this.props.activeView === 'archive' && issue.title === title) {
				console.log('Mapped archive issue to ', issue.id);
				return issue.id;
			} else if (this.props.activeView === 'rubriken' && issue.label === title) {
				console.log('Mapped category issue to ', issue.id);
				return issue.id;
			}
		}

		return undefined;
	}

	render() {
		return (
			<View style={{ flex: 1, position: 'relative' }}>
				<DropdownMenu
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
						this.setState(
							{ selectedFilter: this.state.FILTER_DATA[selection][row] },
							() => {
								console.log('ACTIVE VIEW:', this.props.activeView);
								console.log('props: ', this.props);
								console.log(this.props.activeSubscriptionFilter);
								console.log(
									'ONCHANGE AUDIO: ',
									this.props.activeSubscriptionFilter.audio &&
										this.props.activeSubscriptionFilter.audio === true
										? true
										: undefined
								);

								/* If current view is Archiv */
								if (this.props.activeView === 'archive') {
									getArchiveContent(
										this.props.activeSubscriptionFilter.id,
										this.mapTitleToIssueId(
											this.state.selectedFilter,
											this.props.issues
										),
										this.props.activeSubscriptionFilter.audio &&
											this.props.activeSubscriptionFilter.audio === true
											? true
											: undefined
									);
								} /* Rubriken */ else if (this.props.activeView === 'rubriken') {
									getCategoryContent(
										this.props.activeSubscriptionFilter.id,
										this.mapTitleToIssueId(
											this.state.selectedFilter,
											this.props.issues
										),
										this.props.activeSubscriptionFilter.audio &&
											this.props.activeSubscriptionFilter.audio === true
											? true
											: undefined
									);
								}
							}
						);
					}}
					data={this.state.FILTER_DATA}
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
	issues: PropTypes.array
};

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(DropdownFilter);
