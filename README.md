# Ballcap-admin
Cloud Firestore support library for admin. 🧢


A library for defining Ballcap and Firestore's Document Scheme.
Define Scheme by inheriting `Document` or `Model`. Use the `@Feild` decorator to define the Document's Fields.

```typescript
export class User extends Document {
	@Field name?: string
	@Field thumbnailImage?: File
}
```

## Installation

```
npm add @1amageek/ballcap
```

## Usage

### Initialize
To use Ballcap, you need to initialize it.
```typescript
Ballcap.initialize(app.firestore())
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
const user: User = await User.fromSnapshot(documentSnapshot)
```

### Field

A Field can have another Document. In that case, use the `@Codable` decorator.

```typescript
export class Address extends Model {
	@Field postCode?: string
	@Field country?: string
}

export class User extends Document {
	@Field name?: string
	@Field thumbnailImage?: File
	@Codable(Address)
	@Field address: Address[] = []
}
```
