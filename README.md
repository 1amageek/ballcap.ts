# ballcap for TypeScript

<img src="https://github.com/1amageek/Ballcap-iOS/blob/master/Ballcap.png" width="100%">

Ballcap is a database schema design framework for Cloud Firestore. This repository supports the __WEB__ and __Admin__.


__Why Ballcap__

Cloud Firestore is a great schema-less and flexible database that can handle data. However, its flexibility can create many bugs in development. Ballcap can assign schemas to Cloud Firestore to visualize data structures. This plays a very important role when developing as a team.

```typescript
export class User extends Doc {
	@Field name?: string
	@Field thumbnailImage?: File
	@SubCollection items: Collection<Item> = new Collection()
}
```

## Installation

__Web__

```
npm add @1amageek/ballcap
```

__Admin(node.js)__

```
npm add @1amageek/ballcap-admin
```

## Get Started

- [Expo](#Expo)
- [React](#React)

### Expo

#### Create your first project

```shell
expo init new-project
cd my-new-project
npm add firebase @1amageek/ballcap
```

#### Edit `tsconfig.json`

```JSON
{
  "compilerOptions": {
    "noEmit": true,
    "target": "esnext",
    "module": "commonjs",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "lib": ["dom", "esnext"],
    "jsx": "react-native",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  }
}
```

#### Firebase and Ballcap initialize

```typescript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import '@firebase/firestore'
import * as Ballcap from '@1amageek/ballcap'

const config = { ... }  // apiKey, authDomain, etc. (see above)
const app = firebase.initializeApp(config)
Ballcap.initialize(app)
```

### React

#### Create your first project

```shell
npx create-react-app my-new-project
cd my-new-project
npm add firebase @1amageek/ballcap ts-loader
react-scripts eject
```

#### Edit `webpack.config.js`

https://gist.github.com/1amageek/184a6054f00f1a722d37f7b4cba406a0

#### Edit `tsconfig.json`

```JSON
{
  "compilerOptions": {
    "target": "es2015",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

## Usage

### Initialize
To use Ballcap, you need to initialize it.
```typescript
Ballcap.initialize(app.firestore())
```

### RootReference

Considering the extensibility of DB, it is recommended to provide a method of version control.

```typescript
Ballcap.initialize(app.firestore(), app.firestore().collection("version").doc("1"))
```

### CRUD

__Document__
```typescript

// autoID
const user: User = new User()

// with ID
const user: User = new User("ID")

// with DocumentReference
const user: User = new User(firestore.doc("a/a"))

// save
await user.save()

// update
await user.upate()

// delete
await user.delete()
```

Get JSON

```typescript
const data = user.data()
```

__Batch__

```typescript
const user: User = new User()
const batch: Batch = new Batch()

batch.save(user)
await batch.commit()
```

#### Retrive document

```typescript
// with id
const user?: User = await User.get("id")

// with DocumentReference
const user?: User = await User.get(firestore.doc("a/a"))
```

##### Convert from DocumentSnapshot

```typescript
const user: User = User.fromSnapshot(documentSnapshot)
```

### Field
Use Field to represent a field in a document.
A Field can have another Document. In that case, use the `@Codable` decorator.

```typescript
export class Address extends Model {
  @Field postCode?: string
  @Field country?: string
}

export class Shipping extends Doc {
  @Codable(Address)
  @Field address?: Address
  @Field phone?: string
}

export class User extends Doc {
  @Field name?: string
  @Field thumbnailImage?: File
  @Codable(Address)
  @Field address: Address[] = []
  @Codable(Shipping, true)
  @Field shipping?: Shipping
}
```

### Codable
A Document in Ballcap can have nested Documents and Models. Use Codable to provide `type` to Ballcap

```typescript
@Codable(Address)
@Field address: Address[] = []
```

If the nested object is a Document, it can have the following structure because the Document contains an ID.

```typescript
{
  id: "shipping id",
  path: "shipping path",
  data: {
    // shipping data
  }
}
```

If you want to keep the structure, set the second argument to Codable to true. By default, it is false. If false, only the data is retained.

```typescript
@Codable(Shipping, true)
@Field shipping?: Shipping
```

### SubCollecion
Use SubCollection and Collection to represent SubCollection.


```typescript
class Charge extends Doc {
  @Field amount: number = 0
  @Field userID!: string
}
class User extends Doc {
  @SubCollection charges: Collection<Charge> = new Collection()
}
```

# Test

## Admin

```
cd web
jest
```

## Web

```
firebase setup:emulators:firestore
firebase serve --only firestore
```

```
cd web
jest
```
