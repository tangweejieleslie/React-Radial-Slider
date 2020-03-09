## README for CS3249 
For submission, I've only included the source files rather than the entire repository. 

The repository is at: https://github.com/tangweejieleslie/React-Radial-Slider/tree/master
Github Pages: https://tangweejieleslie.github.io/React-Radial-Slider/

### Description of Files and Folders

In this submission, the folder structure (and important files) are as follow:
```
src/
├── model/
|   └── thermostat.js
├── view/
|   ├── components/
|   |   ├── controls/
|   |   |   ├── controls.css
|   |   |   ├── CurrentTempControlView.jsx
|   |   |   └── RadialSliderView.jsx
|   |   └── info/
|   |       ├── CurrentTemperatureView.jsx
|   |       ├── ModeView.jsx
|   |       └── TargetTemperatureView.jsx
|   └── MainViewPanel.jsx
|── App.js
└── MachineConfig.js

```

## src/model/thermostat.js 
Contains the business logic for the application. 
It gets invoke by the radial slider view which passes in the Target and Current Temperature.
It returns the computed mode.

## src/view/components/controls
This folder contains the main UI controls. 
CurrentTempControlView.jsx contains UI and controls for current temperature. This is for testing purposes.
RadialSliderView.jsx contains UI and controls for target temperature. This is the main feature of the Radial Thermostat. 

## src/view/components/info
This folders contains JSX classes which handles the rendering of SVG elements. 
The current temperature display, mode svg icon and target temperature are all rendered from files in this folder.

## src/view/MainViewPanel.jsx
This file is the anchor element which renders the other elements. 
After refactoring, this MainView Panel would render CurrentTempControlView.
CurrentTempControlView would render RadialSliderView.
RadialSliderView would then render the rest of the elements in src/view/components/info.
This is to structure the code in a way that takes advantage of React's one-way data binding. 
By structuring the data flow from parents to children, the code gets simplified.

## src/App.js
This is the entry point of the application. 

## arc/MachineConfig.js
This contains the state machine configuration for xstate


<hr>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
