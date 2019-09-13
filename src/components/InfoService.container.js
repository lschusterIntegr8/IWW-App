import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfoServiceHorizontalList from './InfoServiceHorizontalList';
import COLOR from '../config/colors';
import { setActiveSubFilter } from '../redux/actions/index';

const mapStateToProps = state => ({
	subscriptionServices: state.subscriptionServices,
	activeSubscriptionFilter: state.activeSubscriptionFilter
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

	componentDidMount() {}

	render() {
		return (
			<View>
				<View style={styles.inhalteHeaderWrapper}>
					<Text style={styles.inhalteHeading}>
						Informationsdienste (selected: {this.props.activeSubscriptionFilter})
					</Text>
				</View>
				<View style={{ marginBottom: 10 }}>
					<InfoServiceHorizontalList
						subscriptionServices={this.props.subscriptionServices}
						setActiveSubFilter={this.props.setActiveSubFilter}
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
