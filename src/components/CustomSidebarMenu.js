import React, { Component } from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ScrollView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Header, Left, Icon } from 'native-base';
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
					top: -4
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

			<DrawerItems {...props} />

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
					>
						Datenschutz
					</Text>
					<Text
						style={{
							flex: 1,
							textAlign: 'left',
							marginLeft: 10
						}}
					>
						Impressum
					</Text>
				</View>
			</View>
		</ScrollView>
	</SafeAreaView>
);

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
