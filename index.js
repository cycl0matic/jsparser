// parser state update
const updateParserState = (state, index, result) => ({
  ...state,
  index,
  result,
});

const updateParserResult = (state, result) => ({
  ...state,
  result,
});

// parsing error updation
const updateParserError = (state, errorMsg) => ({
  ...state,
  isError: true,
  error: errorMsg,
});

class Parser {
  constructor(parserStateTransformerFn) {
    this.parserStateTransformerFn = parserStateTransformerFn;
  }

  run(targetString) {
    const initialState = {
      targetString,
      index: 0,
      result: null,
      isError: false,
      error: null,
    };
    return this.parserStateTransformerFn(initialState);
  }

  map(fn){
    return new Parser(parserState => {
      const nextState = this.parserStateTransformerFn(parserState);

      if(nextState.isError){
        return nextState;
      }

      return updateParserResult(nextState, fn(nextState.result));
    })
  }

  errormap(fn){
    return new Parser(parserState => {
      const nextState = this.parserStateTransformerFn(parserState);

      if(!nextState.isError){
        return nextState;
      }

      return updateParserResult(nextState, fn(nextState.error, nextState.index));
    })
  }
}

const str = new Parser((parserState) => {
  const { targetString, index, isError } = parserState;

  if (isError) {
    return parserState;
  }

  const slicedTarget = targetString.slice(index);

  if (slicedTarget.length === 0) {
    return updateParserError(
      parserState,
      `str : Tried to match ${s} but got an unexpected input end . `
    );
  }

  if (slicedTarget.startsWith("s")) {
    return updateParserState(parserState, index + s.length, s);
  }

  return updateParserError(
    parserState,
    `str : Tried to match ${s} but got ${targetString.slice(index, index + 10)}`
  );
});

const sequenceOf = (parsers) => new Parser((parserState) => {
  if (parserState.isError) {
    return parserState;
  }

  const results = [];
  let nextState = parserState;

  for (let p of parsers) {
    nextState = p.parserStateTransformerFn(nextState);
    results.push(nextState.result);
  }

  return updateParserResult(nextState, results);
};

// run method

const run = (parser, targetString) => {
  const initialState = {
    targetString,
    index: 0,
    result: null,
    isError: false,
    error: null,
  };
  return parser(initialState);
})

// Test

const parser = str("hello from the other side").map(result => result.toUpperCase());



