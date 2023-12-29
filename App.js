import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, Image, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function App() {
	const [pokemons, setPokemons] = useState(null)

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon')
			.then(response => response.json())
			.then(result => setPokemons(result.results))
	}, [])

	return (
		<FlatList
			data={pokemons}
			renderItem={({ item: pokemon }) => (
				<View style={styles.card}>
					<Image
						style={styles.img}
						source={{
							uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
								pokemon.url.split('/').reverse()[1]
							}.png`,
						}}
					/>
					<Text style={styles.text}>{pokemon.name}</Text>
				</View>
			)}
			ItemSeparatorComponent={<Text> </Text>}
			style={styles.container}
		>
			<StatusBar style='auto' />
		</FlatList>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
	},
	card: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		textTransform: 'uppercase',
	},
	img: {
		width: 99,
		height: 99,
	},
})
