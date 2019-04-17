import { Model } from "../src/Model"
import { Codable } from "../src/Field"
import { } from "reflect-metadata"

export class Foo extends Model {

}
@Codable({
	name: Foo
})
class Bar extends Model {

}


describe("main", async () => {
	test("main", async () => {

		const bar: Bar = new Bar()


		console.log(bar)


	}, 10000000)
})

