# json-plus

An extended JSON serialiser/deserialiser

Calling `JsonPlus()`, with or without arguments, return an object containing two methods similar to those provided by the standard `JSON` namespace.

**parse(stringifiedJavaScriptObject)**: Deserialises a JSON string into a JS object.

**stringify(standardJavaScriptObject, ?spaces)**: Serialises a JS object into a string.

## Basic usecase `JsonPlus()`

By default, JSON serialisation/deserialisation is extended to include BigInt and Date objects.

## Advanced usecase `JsonPlus(propertyTransformers)`

**propertyTransformers** is an object that defines two collections:

- _revivers_: maps properties from the input to functions to transform the values `(val, context)` during `parse` operations.

- _replacers_: maps properties from the input to functions to transform the values `(val)` during `stringify` operations.
