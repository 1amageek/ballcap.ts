import Link from 'next/link'
import React from 'react'
import Item from '../models/item'

interface Props { }

interface State { items: Item[] }

export default class Index extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		(async () => {
			const snapshot = await Item.collectionReference()
				.limit(30)
				.get()
			const items: Item[] = snapshot.docs.map(value => Item.fromSnapshot(value))
			this.setState({
				items: items
			})
		})()
	}

	render() {
		return (
			<ul>
				{this.state.items.map(item => (
					<li key={item.id}>
						<Link href="/items/[id]" as={`/items/${item.id}`}>
							<a>{item.name || ""}</a>
						</Link>
					</li>
				))}
			</ul>
		)
	}
}
