# Description project
 

# Project stack (Full description of package.json)
- React 19.0.0;
- React Dom 19.0.0;
- React Router Dom 7.1.5;

# Project development tools (Full description of package.json)
- Vite 6.1.0;
- TypeScript 5.7.2;

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
