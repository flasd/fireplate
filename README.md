# FirePlate
Firebase Cloud Functions + React SSR ready boilerplate with Code Spliting, SCSS Modules and Offline Support!

### Quick Start
First, as you may know, just clone this repository:
```
$ git clone https://github.com/flasd/fireplate.git nextBigThing
```
Now cd to nextBigThing and run
```
$ node setup
```
This will pretty much do all the setup for you. Now just
```
$ npm start
```
And remember, have fun! Entry for the SSR app is src/server.js and entry for the browser app is src/index.js.

### Testing
This boilerplate comes with Mocha, Chai, Enzime, NYC and the Babel Rewire plugin to help you better test your code. You can write your tests in full ES6 glory! Plus, it uses eslint to lint your code, making sure you keep up with good practices!

To test: `$ npm test`
To lint: `$ npm run lint`

### Deploying

Deploying  your code to firebase is super simple, assuming you completed the setup correctly. Just
```
$ npm run deploy
...
```
Done. That easy.


### Licence
**MIT Licence** all the way!
Let's make something awesome! :rocket:
