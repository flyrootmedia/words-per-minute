import '../sass/app.scss';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { TypingTestPage } from './TypingTestPage';
import { ResultsPage } from './ResultsPage';

export const App = (): JSX.Element => {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={TypingTestPage} />
        <Route path="/results" exact component={ResultsPage} />
      </BrowserRouter>
    </div>
  );
};
