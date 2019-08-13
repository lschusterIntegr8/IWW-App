import React, { Component } from 'react';
import { NavigationActions, DrawerItems, SafeAreaView } from 'react-navigation';
import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import COLOR from '../config/colors';

const CustomSidebarMenu = props => (
	<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
		<View style={styles.imageContainer}>
			<View style={styles.drawerHeader}>
				<Text style={{ fontSize: 22 }}>N.J.</Text>
			</View>
		</View>
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'space-between'
			}}
		>
			<DrawerItems {...props} />

			<View style={styles.bottomContainer}>
				<Image
					style={styles.bottomLogo}
					source={require('../assets/images/iww-logo-splash.png')}
				/>
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
