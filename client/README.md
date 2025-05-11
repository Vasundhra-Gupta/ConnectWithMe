# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

-   We can use axios to get requests from api , it is preffered because it handles many intermediate functionalaties by itself, and it automatically parse json!

-   Common concepts:

    -   Components,
    -   JSX,
    -   Router,
    -   Props,
    -   state,
    -   component life cycle,
    -   react hooks,
    -   global state,
    -   virtual DOM,
    -   key Props,
    -   handling events,
    -   handling forms,
    -   conditional rendering.

-   manifest.json provides meta data used when web app is installed on a mobile device oe desktop.

###  Context-API
```js
export const demoContext = createContext();
<demoContext>
    <comp1/>
    <comp2/>
    <comp2/>
</demoContext>
//Now this demoContext act as a provider for each of these components!!! means these components have access to all states and data provided by demoContext
```

- useRef is used to reference other object, we shouldnt read or write refs instead we can do so in evenet handlers or useEffects kinda...
- return an object with curent property
