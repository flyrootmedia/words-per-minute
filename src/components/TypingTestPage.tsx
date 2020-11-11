import '../sass/typingTestPage.scss';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import { 
  TypingTest, 
  fetchTypingTests, 
  setCompletedTests,
  setTypingTest,
  setWordsArray,
  setTestStarted,
  setInputValue,
  setCorrectWords
} from '../actions';

import { StoreState } from '../reducers';
import { Timer } from './Timer';

interface TypingTestProps {
  typingTests: TypingTest[];
  typingTest: TypingTest | null;
  wordsArray: string[];
  testStarted: boolean;
  inputValue: string;
  correctWords: number;
  fetchTypingTests: Function;
  setCompletedTests: Function;
  setTypingTest: Function;
  setWordsArray: Function;
  setTestStarted: Function;
  setInputValue: Function;
  setCorrectWords: Function;
}

const _TypingTestPage = (props: TypingTestProps): JSX.Element => {
  const [currentTestComplete, setCurrentTestComplete] = useState(false);

  const { 
    typingTests, 
    typingTest, 
    wordsArray,
    testStarted,
    inputValue,
    correctWords,
    fetchTypingTests, 
    setCompletedTests,
    setTypingTest,
    setWordsArray,
    setTestStarted,
    setInputValue,
    setCorrectWords
  } = props;

  const history = useHistory();
  const typingTestIndex = useRef<number>(0);
  const completedTests = useRef<TypingTest[]>([]);
  const userTestField = useRef<HTMLTextAreaElement>(null);

  // Helper methods

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
  };

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

    if (typingTest) {
      typingTest.correctWordsCount = correctWordCount;
      typingTest.totalWordsCount = wordsArray.length;
      completedTests.current.push(typingTest);
    }

    setCurrentTestComplete(true);
  };

  const showAllResults = (): void => {
    setCompletedTests(completedTests.current);
    history.push('/results');
  };

  // Element Render Methods

  const renderTestCount = (): JSX.Element | null => {
    if (typingTestIndex) {
      return (
        <span>
          ({`${typingTestIndex.current} of ${typingTests.length}`})
        </span>
      );
    }

    return null;
  };

  const renderResults = (): JSX.Element | null => {
    if (currentTestComplete) {
      return (
        <p>
          {correctWords} of {wordsArray.length} total words typed correctly.
        </p>
      );
    }

    return null;
  };

  const renderButton = (): JSX.Element => {
    const resultsButtonText = typingTest?.id === typingTests.length ? 'See My Results' : 'Skip To Results';

    return (
      <div className="typing-test_buttons">
        <button disabled={!currentTestComplete || typingTest?.id === typingTests.length} onClick={setCurrentTypingTest}>Next Test</button>
        <button onClick={showAllResults}>{resultsButtonText}</button>
      </div>
    );
  };
  
  // Memoized Callback Methods

  const setCurrentTypingTest = useCallback(() => {
    if (typingTests.length) {
      setTypingTest(typingTests[typingTestIndex.current]);

      // increment the index of the current test or go back to the beginning
      if (typingTestIndex.current === typingTests.length) {
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
      setCurrentTestComplete(false);
    }
  }, [typingTests, typingTestIndex, setTypingTest, setTestStarted, setInputValue, setCorrectWords]);

  const setCurrentWordsArray = useCallback(() => {
    if (typingTest) {
      setWordsArray(typingTest.content.split(' '));
    }
  }, [typingTest, setWordsArray]);

  // Lifecycle Methods

  useEffect(() => {
    fetchTypingTests();
  }, [fetchTypingTests]);

  useEffect(() => {
    setCurrentTypingTest();
  }, [setCurrentTypingTest]);

  useEffect(() => {
    setCurrentWordsArray();
  }, [setCurrentWordsArray]);


  // Return

  if (!typingTests.length) {
    return (
      <div className="app">Loading Tests</div>
    );
  }
  
  return (
    <div className="typing-test">
      <header className="typing-test_header">
        <h1>Words Per Minute</h1>
        <p className="typing-test_instructions">
          <em>A timed test to evaluate your typing speed.</em> Type as many words as you can in one minute. The timer will start 
          as soon as you begin typing and your results will be displayed when the countdown reaches 0:00 (only exactly matched 
          words will count). You can then proceed to the next test. There are a total of {typingTests.length} tests you may take. <strong>NOTE:</strong> you 
          must complete a test for it to count towards your final results. 
        </p>

        <div className="typing-test_title-timer">
          <h3>{typingTest?.title} {renderTestCount()}</h3>
          <Timer timerShouldRun={testStarted} time={60} onCountdownComplete={stopTest} />
        </div>
      </header>

      <p><strong>Source:</strong> <a href={typingTest?.source} rel="noreferrer" target="_blank">{typingTest?.source}</a></p>
      <p>{typingTest?.content}</p>

      <div className="typing-test_user-input">
        <textarea 
          ref={userTestField}
          style={{width: '100%', height: '300px'}}
          onKeyUp={startTest} 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}>
        </textarea>
      </div>

      <div className="typing-test_results">
        {renderButton()}
        {renderResults()}
      </div>
    </div>
  );
}

// created this interface more for legibility than anything. The mapStateToProps 
// method was tough to read with the state object deconstructed
interface TypingTestState {
  typingTests: TypingTest[];
  typingTest: TypingTest | null;
  wordsArray: string[];
  testStarted: boolean;
  inputValue: string;
  correctWords: number;
}

const mapStateToProps = (state: StoreState): TypingTestState => {
  return { 
    typingTests: state.typingTests, 
    typingTest: state.typingTest,
    wordsArray: state.wordsArray,
    testStarted: state.testStarted,
    inputValue: state.inputValue,
    correctWords: state.correctWords
  };
};

// Named this "TypingTestPage" to distinguish from the TypingTest interface
export const TypingTestPage = connect(
  mapStateToProps,
  { 
    fetchTypingTests, 
    setCompletedTests,
    setTypingTest,
    setWordsArray,
    setTestStarted,
    setInputValue,
    setCorrectWords
  }
)(_TypingTestPage);
