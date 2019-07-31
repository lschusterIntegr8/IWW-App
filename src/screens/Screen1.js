import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import { addArticle } from '../redux/actions/index';

const mapStateToProps = state => {
	return { articles: state.articles };
};

const mapDispatchToProps = dispatch => {
	return {
		addArticle: article => dispatch(addArticle(article))
	};
};

class Screen1 extends Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	static navigationOptions = {
		title: 'Screen1',
		header: null
	};

	componentDidMount() {
		this.props.addArticle('MOUNTED');
	}

	handleClick() {
		this.props.addArticle('New one.');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text
					style={styles.title}
					onPress={() => this.props.navigation.navigate('Screen2')}
				/>
				{this.props.articles.map(el => (
					<Text key={el}>{el}</Text>
				))}
				<Button dark onPress={this.handleClick}>
					<Text>Click me plz.</Text>
				</Button>
			</View>
		);
	}
}

Screen1.propTypes = {
	navigation: PropTypes.object,
	articles: PropTypes.array
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: 'red'
	}
});

const Screen1Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(Screen1);

export default Screen1Container;
