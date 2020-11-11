import '../sass/resultsPage.scss';

import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { TypingTest } from '../actions';

interface ResultsPageProps {
  typingTests: TypingTest[];
  completedTests: TypingTest[];
}

const _ResultsPage = ({ typingTests, completedTests }: ResultsPageProps): JSX.Element => {
  
  const renderCompletedTestList = (): JSX.Element => {
    const listMarkup = completedTests.map((test: TypingTest): JSX.Element => { 
      return (
        <li key={test.id}>
          <h4>{test.title}</h4>
          <p>{test.correctWordsCount || 0} correct words out of {test.totalWordsCount || 0}</p>
        </li>
      )
    });

    return (
      <ul>
        {listMarkup}
      </ul>
    )
  }

  const renderAverageScore = (): JSX.Element => {
    let totalWords = 0;
    let wpm = 0;

    completedTests.forEach((test: TypingTest): void => {
      totalWords += test.correctWordsCount || 0;
    });

    wpm = totalWords ? totalWords / completedTests.length : 0;

    return (
      <React.Fragment>
        with an average of {wpm} words per minute
      </React.Fragment>
    )
  }

  return (
    <div className="results-page">
      <h1>Here Are Your Results!</h1>
      <h4 className="results-page_summary">
        You completed {completedTests.length} out of {typingTests.length} tests {renderAverageScore()}.
      </h4>
      {renderCompletedTestList()}
      <p>
        <a href="/">Return to the test</a>
      </p>
    </div>
  );
}

// created this interface more for legibility than anything. The mapStateToProps 
// method was tough to read with the state object deconstructed
interface ResultsState {
  typingTests: TypingTest[];
  completedTests: TypingTest[];
}

const mapStateToProps = (state: StoreState): ResultsState => {
  return { 
    typingTests: state.typingTests, 
    completedTests: state.completedTests
  };
};

// Named this "TypingTestPage" to distinguish from the TypingTest interface
export const ResultsPage = connect(
  mapStateToProps,
  {}
)(_ResultsPage);