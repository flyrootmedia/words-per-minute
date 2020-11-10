import { 
  FetchTypingTestsAction, 
  SetTypingTestAction,
  SetTestStartedAction,
  SetWordsArrayAction,
  SetCorrectWordsAction,
  SetInputValueAction
} from './typingTest';

export enum ActionTypes {
  fetchTypingTests = 'FETCH_TYPING_TESTS',
  setTypingTest = 'SET_TYPING_TEST',
  setWordsArray = 'SET_WORDS_ARRAY',
  setTestStarted = 'SET_TEST_STARTED',
  setInputValue = 'SET_INPUT_VALUE',
  setCorrectWords = 'SET_CORRECT_WORDS'
}

export type Action = 
  FetchTypingTestsAction | 
  SetTypingTestAction | 
  SetTestStartedAction | 
  SetWordsArrayAction | 
  SetCorrectWordsAction | 
  SetInputValueAction;
