import { Dispatch } from 'redux';
import { ActionTypes } from './types';

// creating this utililty function so that we can cast the promise returned 
// by response.json() to, in this case, an array of TypingTest objects
export async function fetchJson<T> (request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export interface TypingTest {
  id: number;
  title: string;
  source: string;
  content: string;
  completed: boolean;
}

export interface FetchTypingTestsAction {
  type: ActionTypes.fetchTypingTests;
  payload: TypingTest[]
}

export interface SetTypingTestAction {
  type: ActionTypes.setTypingTest;
  payload: TypingTest;
}

export interface SetWordsArrayAction {
  type: ActionTypes.setWordsArray;
  payload: string[];
}

export interface SetTestStartedAction {
  type: ActionTypes.setTestStarted;
  payload: boolean;
}

export interface SetInputValueAction {
  type: ActionTypes.setInputValue;
  payload: string;
}

export interface SetCorrectWordsAction {
  type: ActionTypes.setCorrectWords;
  payload: number;
}

const typingTestsApiUrl = '/apis/typingTests.json';

export const fetchTypingTests = () => {
  return async (dispatch: Dispatch) => {
    const typingTests = await fetchJson<TypingTest[]>(typingTestsApiUrl);

    dispatch({
      type: ActionTypes.fetchTypingTests,
      payload: typingTests
    })
  };
};

export const setTypingTest = (test: TypingTest): SetTypingTestAction => {
  return {
    type: ActionTypes.setTypingTest,
    payload: test
  }
};

export const setWordsArray = (words: string[]): SetWordsArrayAction => {
  return {
    type: ActionTypes.setWordsArray,
    payload: words
  }
};

export const setTestStarted = (isStarted: boolean): SetTestStartedAction => {
  return {
    type: ActionTypes.setTestStarted,
    payload: isStarted
  }
};

export const setInputValue = (value: string): SetInputValueAction => {
  return {
    type: ActionTypes.setInputValue,
    payload: value
  }
};

export const setCorrectWords = (correctWordCount: number): SetCorrectWordsAction => {
  return {
    type: ActionTypes.setCorrectWords,
    payload: correctWordCount
  }
};