import { 
  FetchTypingTestsAction, 
  SetCompletedTestsAction,
  SetTypingTestAction,
  SetTestStartedAction,
  SetWordsArrayAction,
  SetCorrectWordsAction,
  SetInputValueAction
} from './typingTest';

export enum ActionTypes {
  fetchTypingTests = 'FETCH_TYPING_TESTS',
  setCompletedTests = 'SET_COMPLETED_TESTS',
  setTypingTest = 'SET_TYPING_TEST',
  setWordsArray = 'SET_WORDS_ARRAY',
  setTestStarted = 'SET_TEST_STARTED',
  setInputValue = 'SET_INPUT_VALUE',
  setCorrectWords = 'SET_CORRECT_WORDS'
}

export type Action = 
  FetchTypingTestsAction | 
  SetCompletedTestsAction | 
  SetTypingTestAction | 
  SetTestStartedAction | 
  SetWordsArrayAction | 
  SetCorrectWordsAction | 
  SetInputValueAction;
