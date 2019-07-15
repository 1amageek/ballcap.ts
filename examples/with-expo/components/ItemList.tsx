import React from 'react'
import { Text, FlatList } from 'react-native';
import Item from '../models/item'

interface Props { }

interface State { items: Item[], timestamp: Date }

export default class Index extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			items: [],
			timestamp: new Date()
		}
	}

	componentDidMount() {
		(async () => {
			const snapshot = await Item.collectionReference()
				.limit(30)
				.get()
			const items: Item[] = snapshot.docs.map(value => Item.fromSnapshot(value))
			this.setState({
				items: items,
				timestamp: new Date()
			})
		})()
	}

	render() {
		return (
			<FlatList 
			data={this.state.items}
			renderItem={
				({item}) => <Text>{item.name || "hoge"}</Text>
			}
			extraData={this.state.timestamp}
			keyExtractor={(item, index) => index.toString()}
			/>
		)
	}
}
