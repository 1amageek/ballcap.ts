import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Item from '../models/item'

const Index: React.FC = () => {

	const router = useRouter()
	const id: string = router.query.id as string
	const [item, setItem] = useState(new Item(id))

	useEffect(() => {
		if (!item.snapshot) {
			(async () => {
				const item = await (new Item(id)).fetch()
				console.log(item)
				setItem(item)
			})()
		}
	})

	return (
		<h2>{item.name || "Loading"}</h2>
	)
}
export default Index