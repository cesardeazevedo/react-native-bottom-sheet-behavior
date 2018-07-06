module.exports = {
  "parser"  : "babel-eslint",
  "plugins": [
    "react-native"
  ],
  "extends" : [
    "airbnb"
  ],
  "rules": {
    // Soft some rules.
    "semi": 0,
    "max-len": 0,
    "global-require": 0, // Used by webpack-isomorphic-tools and React Native.
    "new-cap": [2, {"capIsNew": false, "newIsCap": true}], // For Record() etc.
    "no-class-assign": 0, // Class assign is used for higher order components.
    "no-nested-ternary": 0, // It's nice for JSX.
    "no-param-reassign": 0, // We love param reassignment. Naming is hard.
    "no-shadow": 0, // Shadowing is a nice language feature. Naming is hard.
    "no-underscore-dangle": 0, // It's classic pattern to denote private props.
    "object-curly-spacing": 2,
    "no-multi-spaces": 0,
    "react/prefer-stateless-function": 0, // We are not there yet.
    "import/imports-first": 0, // Este sorts by atom/sort-lines natural order.
    "react/jsx-filename-extension": 0, // No, JSX belongs to .js files
    "jsx-a11y/html-has-lang": 0, // Can't recognize the Helmet.
    // React Native.
    "no-use-before-define": 0,
    "comma-dangle": 0,
    "key-spacing": 0,
    "react/jsx-boolean-value": 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "react/jsx-closing-bracket-location": 0,
  }
};
