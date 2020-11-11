import { combineReducers } from 'redux';
import { TypingTest } from '../actions';
import { 
  TypingTestsReducer, 
  CompletedTestsReducer,
  TypingTestReducer,
  WordsArrayReducer,
  TestStartedReducer,
  InputValueReducer,
  CorrectWordsReducer 
} from './typingTest';

export interface StoreState {
  typingTests: TypingTest[];
  completedTests: TypingTest[];
  typingTest: TypingTest | null;
  wordsArray: string[];
  testStarted: boolean;
  inputValue: string;
  correctWords: number;
}

export const reducers = combineReducers<StoreState>({
  typingTests: TypingTestsReducer,
  completedTests: CompletedTestsReducer,
  typingTest: TypingTestReducer,
  wordsArray: WordsArrayReducer,
  testStarted: TestStartedReducer,
  inputValue: InputValueReducer,
  correctWords: CorrectWordsReducer
});