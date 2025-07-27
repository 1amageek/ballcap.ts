# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Ballcap is a database schema design framework for Cloud Firestore that provides type-safe document modeling for TypeScript. It uses decorators to define document schemas and handles serialization/deserialization between TypeScript objects and Firestore documents.

## Common Development Commands

### Build
```bash
npm run build      # Compiles TypeScript source from src/ to lib/ with declaration files
npm run prepare    # Runs build automatically (used by npm on install)
```

### Lint
```bash
npm run lint       # Runs tslint with project configuration
```

### Test
```bash
# Start Firestore emulator first (required for tests)
npm run serve:firestore    # Starts Firebase emulator for Firestore

# Run tests
npm test                   # Runs all Jest tests
jest path/to/test.ts      # Run a specific test file
jest -t "test name"       # Run tests matching a pattern
```

## Architecture Overview

### Core Class Hierarchy

The library follows a clear inheritance pattern:
- `Model` - Base class for data representation with encoding/decoding logic
- `Doc` (extends Model) - Represents a Firestore document with ID, path, and CRUD operations
- User classes extend Doc to define specific document types

### Decorator System

The library uses TypeScript decorators with reflect-metadata to define document schemas:

- `@Field` - Marks a property as a Firestore field to be serialized
- `@Codable(Type, convertDocument?)` - Enables nested model serialization with type information
- `@SubCollection` - Defines subcollections within a document

### Key Design Patterns

1. **Automatic Collection Naming**: Document classes automatically generate collection names by converting the class name to lowercase (e.g., `User` → `users` collection)

2. **Field Tracking**: The @Field decorator registers properties with reflect-metadata, allowing the framework to know which properties to serialize/deserialize

3. **Nested Document Handling**: @Codable decorator with `convertDocument: true` preserves document structure with id/path/data for nested Doc instances

4. **Type Safety**: All operations maintain TypeScript type information through generics and decorators

### Data Flow

1. **Encoding** (TypeScript → Firestore):
   - Model.data() collects all @Field decorated properties
   - Nested Models/Docs are recursively encoded
   - Files and special types have custom encoding logic

2. **Decoding** (Firestore → TypeScript):
   - Document data is passed to Model._set()
   - @Codable metadata determines how to reconstruct nested objects
   - Document references can be optionally converted

## Testing Guidelines

- Tests require Firebase Firestore emulator to be running
- Test files use @firebase/testing for initialization
- Each test file typically tests a specific aspect (fields, CRUD, codable behavior, etc.)
- Tests use a test project ID and clean state between runs

## Important Implementation Details

- The library supports both Web and Admin SDKs (this is the Web version)
- Document IDs can be auto-generated or specified
- Batch operations are supported through the Batch class
- SubCollections are lazily initialized when accessed
- The library uses Firebase v9 compatibility mode imports