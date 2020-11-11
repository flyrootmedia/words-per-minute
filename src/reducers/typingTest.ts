import { ActionTypes, Action, TypingTest } from '../actions';

export const TypingTestsReducer = ( state: TypingTest[] = [], action: Action ) => {
  switch (action.type) {
    case ActionTypes.fetchTypingTests:
      return action.payload;
    default:
      return state;
  }
};

export const CompletedTestsReducer = ( state: TypingTest[] = [], action: Action ) => {
  switch (action.type) {
    case ActionTypes.setCompletedTests:
      return action.payload;
    default: 
      return state;
  }
}

export const TypingTestReducer = ( state: TypingTest | null = null, action: Action ) => {
  switch (action.type) {
    case ActionTypes.setTypingTest:
      return action.payload;
    default: 
      return state;
  }
}

export const WordsArrayReducer = ( state: string[] = [], action: Action ) => {
  switch (action.type) {
    case ActionTypes.setWordsArray:
      return action.payload;
    default:
      return state;
  }
}

export const TestStartedReducer = ( state: boolean = false, action: Action ) => {
  switch (action.type) {
    case ActionTypes.setTestStarted:
      return action.payload;
    default:
      return state;
  }
}

export const InputValueReducer = ( state: string = '', action: Action ) => {
  switch (action.type) {
    case ActionTypes.setInputValue:
      return action.payload;
    default:
      return state;
  }
}

export const CorrectWordsReducer = ( state: number = 0, action: Action ) => {
  switch (action.type) {
    case ActionTypes.setCorrectWords:
      return action.payload;
    default:
      return state;
  }
}