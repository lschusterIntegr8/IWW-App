import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfoServiceHorizontalList from './InfoServiceHorizontalList';
import COLOR from '../config/colors';
import { setActiveSubFilter } from '../redux/actions/index';
import { storeSubscriptionArticles } from '../helpers/content';

const mapStateToProps = state => ({
	subscriptionServices: state.rootReducer.subscriptionServices,
	activeSubscriptionFilter: state.sessionReducer.activeSubscriptionFilter
});

const mapDispatchToProps = dispatch => {
	return {
		setActiveSubFilter: subId => {
			dispatch(setActiveSubFilter(subId));
		}
	};
};

class InfoServiceWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('INFOSERVICEWRAPPER: ', this.props.subscriptionServices);
	}

	render() {
		return (
			<View>
				<View style={styles.inhalteHeaderWrapper}>
					<Text style={styles.inhalteHeading}>Informationsdienste</Text>
				</View>
				<View style={{ marginBottom: 10 }}>
					<InfoServiceHorizontalList
						subscriptionServices={this.props.subscriptionServices}
						setActiveSubFilter={this.props.setActiveSubFilter}
						storeSubscriptionArticles={storeSubscriptionArticles}
						activeSubscriptionFilter={this.props.activeSubscriptionFilter}
					/>
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

const InfoServiceWrapperContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(InfoServiceWrapper);

export default InfoServiceWrapperContainer;
