# FirePlate @ v0.0.0-**alpha**-0.3
### Help needed testing.
This is a React SSR ready boilerplate with Code Spliting, CSS Modules and Offline Support **made for firebase-cloud-functions**.

### Quick Start
The boilerplate is built on top of NPM, so getting ready to develop is incredbly simple. On your terminal/cmd type the following:
```
// Clone this repo
$ git clone https://github.com/flasd/fireplate.git myApp
    
// Cd to the folder
$  cd myApp
    
// Init your firebase project 
// (DO NOT REPLACE ANY FILE IF ASKED)
$ npm run init
    
// Install all dependencies
$ npm install
    
// Start dev server
$ npm start
```
It it should just work. Any changes you make to files inside the `/src` directory will trigger a reload. This setup uses Webpack's Hot Module Replacement plugin for faster developing expirience.

### Testing
This boilerplate comes with Mocha, Chai, Enzime, NYC and the Babel Rewire plugin to help you better test your code. You can write your tests in full ES6 glory thanks to the babel-register. You can config test plugins in the .babelrc file.

To run unit tests, open your terminal/cmd and run:
```
$ npm test
```

### Deploying

Deploying  your code to firebase is super simple, just open your terminal/cmd and run the following command. 
```
$ npm run deploy
...
```
Done. That easy.


----------


**MIT Licence** all the way (full licence at `LICENCE.md` file),
Let's make something awesome!
