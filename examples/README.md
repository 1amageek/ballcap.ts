# With Next and Firebase Hosting


## How to use

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```
npx create-next-app --example with-firebase-hosting-and-typescript hosting
cd hosting
```

Install React, Next, Firebase and Ballcap
```
npm add react react-dom next firebase @1amageek/ballcap
```

Install devDependency
```
npm install --save-dev @types/react @types/node typescript ts-loader
```

__Edit `next.config.js`.__

```javascript
module.exports = {
  distDir: '../../dist/functions/next',
  webpack: (config, options) => {
    const { dev, isServer, buildId, dir } = options
    config.module.rules.push(
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: dir,
            exclude: /node_modules/,
            use: [{
              loader: 'ts-loader'
            }]
          }
        ]
      }
    )
    return config;
  }
}
```

__Add `.babelrc`.__

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {
          "targets": {
            "esmodules": true
          },
          "loose": false
        }
      }
    ]
  ]
}
```

__Edit `src/app/tsconfig.json`__

1. Change `noEmit` from true to false.
2. Add `"experimentalDecorators": true,`.
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "allowJs": false,
    "jsx": "preserve",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": false,
    "strict": true,
    "strictNullChecks": true,
    "experimentalDecorators": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveConstEnums": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "noEmit": false,
    "outDir": "../../dist/app",
    "lib": [
      "es6",
      "dom",
      "es2016"
    ],
    "baseUrl": ".",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
}

```

__Create Firebase's Models__

```
mkdir models
```

```
src/app/models/item.ts
```

```typescript
import { Doc, Field } from '@1amageek/ballcap'

export default class Item extends Doc {
  @Field name?: string
}
```


__Edit `src/app/firebase-config.ts`.__

```typescript
const config = {
  apiKey: "******",
  authDomain: "******",,
  databaseURL: "******",,
  projectId: "******",,
  storageBucket: "******",,
  messagingSenderId: "******",,
  appId: "******",
};
```
