# Words Per Minute

A simple timed typing test built with React, Redux, and Typescript.

[Project Site on Heroku](https://words-per-minute.herokuapp.com/)

I acknowledge that the code for this project is probably WAY more complex than it needs to be for the functionality, but my goal was to practice integrating Typescript with React and Redux, so as much as possible I used Redux for managing state and created interfaces and types for all of the actions and components, so it definitely feels verbose.

### Possible Improvements / TODOs

- add highlighting of incorrect words at the end of each completed test
- make the matching of the last test index-based (as opposed to ID based as it is now), because if the tests were created in a DB I can't count on them to be in order or match up
- Figure out how to do a production build to Heroku. Is an Express server required for this?
