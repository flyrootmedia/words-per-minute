import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { 
  TypingTest, 
  fetchTypingTests, 
  setTypingTest,
  setWordsArray,
  setTestStarted,
  setInputValue,
  setCorrectWords
} from '../actions';
import { StoreState } from '../reducers';
import { Timer } from './Timer';
import '../sass/app.scss';

interface AppProps {
  typingTests: TypingTest[];
  typingTest: TypingTest | null;
  wordsArray: string[];
  testStarted: boolean;
  inputValue: string;
  correctWords: number;
  fetchTypingTests: Function;
  setTypingTest: Function;
  setWordsArray: Function;
  setTestStarted: Function;
  setInputValue: Function;
  setCorrectWords: Function;
}

interface AppState {
  typingTests: TypingTest[];
  typingTest: TypingTest | null;
  wordsArray: string[];
  testStarted: boolean;
  inputValue: string;
  correctWords: number;
}

export const _App = (props: AppProps): JSX.Element => {
  const { 
    typingTests, 
    typingTest, 
    wordsArray,
    testStarted,
    inputValue,
    correctWords,
    fetchTypingTests, 
    setTypingTest,
    setWordsArray,
    setTestStarted,
    setInputValue,
    setCorrectWords
  } = props;

  const typingTestIndex = useRef(0);
  const userTestField = useRef<HTMLTextAreaElement>(null);
  
  const setCurrentTypingTest = useCallback(() => {

    if (typingTests.length) {
      setTypingTest(typingTests[typingTestIndex.current]);

      // increment the index of the current test or go back to the beginning
      if (typingTestIndex.current === typingTests.length - 1) {
        typingTestIndex.current = 0;
      } else {
        typingTestIndex.current = typingTestIndex.current + 1;
      }

      // make sure the input field is re-enabled if it was disabled by the timer expiring
      if (userTestField.current) {
        userTestField.current.disabled = false;
      }
      
      // reset state values
      setTestStarted(false);
      setInputValue('');
      setCorrectWords(0);
    }
  }, [typingTests, typingTestIndex, setTypingTest, setTestStarted, setInputValue, setCorrectWords]);

  const setCurrentWordsArray = useCallback(() => {
    if (typingTest) {
      setWordsArray(typingTest.content.split(' '));
    }
  }, [typingTest, setWordsArray]);

  const startTest = (): void => {
    if (!testStarted) {
      setTestStarted(true);
    }
  };

  const stopTest = (): void => {
    // TODO: why is the inputValue state not correct when it gets into this function??
    // in getTestResults I instead had to access the dom element to get the value of the textarea
    if (userTestField.current) {
      userTestField.current.disabled = true;
    }

    getTestResults();
  }

  const getTestResults = (): void => {
    if (!wordsArray.length || !userTestField.current) {
      return;
    }

    let correctWordCount = 0;

    const inputWordsArray = userTestField.current.value?.split(' ');

    inputWordsArray.forEach((word, index) => {
      if (word === wordsArray[index]) {
        correctWordCount++;
      }
    });

    setCorrectWords(correctWordCount);
  }

  useEffect(() => {
    fetchTypingTests();
  }, [fetchTypingTests]);

  useEffect(() => {
    setCurrentTypingTest();
  }, [setCurrentTypingTest]);

  useEffect(() => {
    setCurrentWordsArray();
  }, [setCurrentWordsArray]);

  if (!typingTests.length) {
    return (
      <div className="app">Loading Tests</div>
    );
  }
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Words Per Minute</h1>
        <p>A timed test to evaluate your typing speed.</p>
        <Timer timerShouldRun={testStarted} onCountdownComplete={stopTest} />
        <h3>{typingTest?.title}</h3>
        <p>Source: <a href={typingTest?.source} rel="noreferrer" target="_blank">{typingTest?.source}</a></p>
        <p>{typingTest?.content}</p>
        <div>
          <textarea 
            id="userInput"
            ref={userTestField}
            style={{width: '100%', height: '300px'}}
            onKeyUp={startTest} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}>
          </textarea>
        </div>
        <div>
          <button onClick={setCurrentTypingTest}>Next Test</button>
        </div>
        <div>
          Number of correctly typed words: {correctWords}
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = (state: StoreState): AppState => {
  return { 
    typingTests: state.typingTests, 
    typingTest: state.typingTest,
    wordsArray: state.wordsArray,
    testStarted: state.testStarted,
    inputValue: state.inputValue,
    correctWords: state.correctWords
  };
};

export const App = connect(
  mapStateToProps,
  { 
    fetchTypingTests, 
    setTypingTest,
    setWordsArray,
    setTestStarted,
    setInputValue,
    setCorrectWords
  }
)(_App);
