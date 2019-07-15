# With Expo

## How to use

```
expo init my-new-project
```

```
cd my-new-project
```

```
npm add @1amageek/ballcap firebase
```

__Edit tsconfig.json__

```json
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

```
expo start
```