# JavaScript Parser Combinators Library

a work in progress javascript library that includes parsers specifically for working with binary data.

# API

this lib uses Hindley–Milner type system to show the types of function arguments read more about it here

- https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system

## main "Type" in jsparser is Parser e s:

`e` refers to a possible error which this parser may generate
`s` refers to a general user-defined state associated with the parser

# Methods:

.run
`.run :: Parser e s ~> x -> Either e `

.run is a method in every parser library that takes input here (string,DataView) and returns the result of parsing that input using the parser.

### Example:

`str('hello').run('hello') `

.map
this method takes a function and returns a parser does not consume input

### Example:

`const newParser = letters.map(x => ({
matchType: 'string',
value: x
});

newParser.run('hello world')`
