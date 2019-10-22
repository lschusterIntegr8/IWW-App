import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import {
	ScrollView,
	StyleSheet,
	Text,
	Image,
	View,
	TouchableOpacity,
	Platform,
	Linking
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import COLOR from '../config/colors';

const CustomSidebarMenu = props => (
	<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
		<TouchableOpacity
			style={{
				display: 'flex',
				alignItems: 'flex-end',
				width: 64,
				height: 40,
				marginHorizontal: 0,
				textAlign: 'center',
				padding: 0
			}}
			onPress={() => props.navigation.closeDrawer()}
		>
			<Icon
				name="ios-close"
				style={{
					fontSize: 50,
					color: COLOR.BLUE,
					alignSelf: 'center',
					top: Platform.OS === 'ios' ? -4 : 5,
					left: Platform.OS === 'ios' ? 2 : 5
				}}
			/>
		</TouchableOpacity>
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'space-between'
			}}
		>
			<View style={styles.imageContainer}>
				<View style={styles.drawerHeader}>
					<Text style={{ fontSize: 22 }}>N.J.</Text>
				</View>
			</View>

			{console.log('DRAWER PROPS: ', props)}
			<DrawerNavigatorItems {...props} />
			{/* <View>
				<TouchableOpacity>
					<Text>Favoriten</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Downloads</Text>
				</TouchableOpacity>
			</View> */}

			<View style={styles.bottomContainer}>
				<Image
					style={styles.bottomLogo}
					source={require('../assets/images/iww-logo-splash.png')}
				/>
				<View
					style={{
						flexDirection: 'row'
					}}
				>
					<Text
						style={{
							flex: 1,
							textAlign: 'right',
							marginRight: 10
						}}
						onPress={() => {
							Linking.openURL('https://www.iww.de/datenschutz');
						}}
					>
						Datenschutz
					</Text>
					<Text
						style={{
							flex: 1,
							textAlign: 'left',
							marginLeft: 10
						}}
						onPress={() => {
							Linking.openURL('https://www.iww.de/impressum');
						}}
					>
						Impressum
					</Text>
				</View>
			</View>
		</ScrollView>
	</SafeAreaView>
);

CustomSidebarMenu.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	drawerHeader: {
		marginTop: 36,
		marginBottom: 36,
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: COLOR.WASHED_BLUE,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		alignItems: 'center'
	},
	bottomContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 36
	},
	bottomLogo: {
		width: '23%',
		resizeMode: 'contain'
	}
});

export default CustomSidebarMenu;
