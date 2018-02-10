# FirePlate
<del>get it?</del>

React SSR app boilerplate made to work with Firebase Cloud Functions with Code Spliting, SCSS Modules and Offline Support!

[![Build Status](https://travis-ci.org/flasd/fireplate.svg?branch=master)](https://travis-ci.org/flasd/fireplate)
[![Coverage Status](https://coveralls.io/repos/github/flasd/fireplate/badge.svg?branch=master)](https://coveralls.io/github/flasd/fireplate?branch=master)
[![license](https://img.shields.io/badge/Licence-MIT-blue.svg)](https://github.com/flasd/fireplate/blob/master/LICENSE)
[![code style](https://img.shields.io/badge/Code%20Style-Airbnb-orange.svg)](https://www.npmjs.com/package/eslint-config-airbnb)

##### **Keep in mind that this project is currently in beta.**

### What does this offer, you ask? :fire:
- ES6, 7, NEXT Support with Babel
- Webpack Bundling
- Service Worker and Offline Support
- Server Side Rendering
- Code Spliting and Dynamic Imports
- SCSS Modules & PostCss post-processing
- NYC, Mocha & Chai for testing

### Quick Start
This needs Nodejs v6.12.3 or latter!

First, as you might expect, just clone this repo:
```
$ git clone https://github.com/flasd/fireplate.git nextBigThing
```
Now cd to nextBigThing and run
```
$ sudo npm install firebase-tools -g && npm run setup
...
```
This will pretty much do all the setup for you. Now just
```
$ npm start
```
And remember, have fun! 

Entry for the SSR app is `src/index.js` and entry for the browser app is `src/app/index.js`.

### Caveat
**DLL build will fail when the any of the dependencies depend on NodeJs's core modules.**

Example: Let's assume you are adding express to your project. Express depends on NodeJs's modules. To make the project build, open `webpack/dll.config.js` and add 'express' to the exclude array.

### Tips
**Critical Path (s)Css**

There are two SCSS loaders, the regular one configured to leave the css inside the component's Js module and the critical path one, configured to inline the css into the index.html template used to render the app.
```
Examples:
    myStyles.scss           - Regular CSS, will be injected when component loads.
    myStyles.critical.scss  - Critical path CSS, will be inlined inside index.html
```

### Testing
This boilerplate comes with Mocha, Chai, Enzime, NYC and the Babel Rewire plugin to help you better test your code. You can write your tests in full ES6 glory! Plus, it uses eslint to lint your code, making sure you keep up with good practices!

To test: `$ npm test`
To lint: `$ npm run lint`

### Building & Deploying
To build your project to a production build, just run
```
$ npm run build
```
To checkout your built app running in a similiar environment as when you deploy it to Firebase, you can
```
$ npm run serve
```
Deploying  your code to Firebase is as simple as building, assuming you completed the setup correctly. Just
```
$ npm run deploy
```
Done. That easy. :cake:

> "For my part I know nothing with any certainty, but the sight of the stars makes me dream." Vincent Van Gogh

:wink::star:

### Licence
**MIT Licence** all the way!
Let's make something awesome! :rocket:
