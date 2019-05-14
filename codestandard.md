# Code Standard

## Indentation Size
* Spaces: 2

## Naming
* Functions, variables etc: camelCase
* Classes and interfaces: PascalCase

## Functions
* Spaces before and after curly braces
* Space between parameters
* Nested calls shall have spaces before and after
* Empty line between logical blocks
* If there's no code between two closing curly braces, there is no need for an empty line between

## Example
```javascript
functionName(parameterOne, parameterTwo) {
  let variableName = x;

  if() {

  } else {

  }

  secondFunction() {

  }
}
```

## Objects
* Objects may be declared on one row if it only contains one key and value
* When an object contains two key/values or more, use linebreak after curly brace

## Example
```javascript
let objectName = {
  key: value,
  key: value
}; 
```