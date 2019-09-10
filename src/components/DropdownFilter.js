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
import DropdownMenu from './util/react-native-dropdown-menu';

import COLOR from '../config/colors';

// const IC_ARR_DOWN = require('./icons/ic_arr_down.png');
// const IC_ARR_UP = require('./icons/ic_arr_up.png');

class DropdownFilter extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		selectedFilter: undefined
	};

	render() {
		var data = [
			['Ausgabe 01 / 2019', 'Ausgabe 12 / 2018', 'Ausgabe 11 / 2018', 'Ausgabe 10 / 2018']
		];

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
					handler={(selection, row) =>
						this.setState({ selectedFilter: data[selection][row] })
					}
					data={data}
				>
					<View style={{ flex: 1 }}>
						<Text>{this.state.selectedFilter} is the best language in the world</Text>
					</View>
				</DropdownMenu>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default DropdownFilter;
