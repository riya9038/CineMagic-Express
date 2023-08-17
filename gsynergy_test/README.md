# Project Name

Cinemagic Express Hub

# Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode. To use Jest for unit testing,

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
My app is ready to be deployed!

# Features

Movies App created from scratch using create-react-app
Well responsive and structured website compatible for all devices
Maintained an organised folder structure to store components
Used Redux Toolkit for State Management
Integrated TMDB Api to fetch data
Added Tailwind CSS for styling
For smooth user experience, implemented infinite scrolling to show data list
Added debouncing for search functionality
Routing using latest version of React Router DOM
Added loading screens using Shimmer UI
Handled errors using Error Components
Integrated React Testing Library for Unit Testing

# Redux Toolkit

npm install @reduxjs/toolkit library
create a separate folder for redux store, slices, reducers, actions
inside store, configure the store and add reducers to it
created movieSlice to add all the actions and associated reducers
used createAsyncThunk from redux toolkit to handle async operations
added actions inside reducers
added cases for async operations states(pending, fulfilled, rejected) inside extraReducers
export actions and slices (important)

# Infinite Scrolling

npm install react-infinite-scroll-component
added the boilerplate code inside the component
created corresponding next function that makes a next api call to fetch subsequent list of data
added appropriate condition inside hasMore according to use case
infinite scroll is ready!!

# Routing

npm install react-router-dom
destructured createBrowserRouter and RouteProvider from the library
added paths and corresponding elements inside the createBrowserRoute array
addded children and error elements
Used Links to navigate between different screens

# Debouncing

Added setTimeout to dispatch action that fetches content based on search text
Added a delay of 500ms
Cleared timeout(component unmounting) inside useEffect

# Tailwind Css

npm install tailwindcss
Configured tailwind.config.js
Added postcssrc
Changed VS Code settings to read tailwind css
Used tailwind intellisense extension for suggestions

# Unit Testing

npm install @testing-library/react and @testing-library/jest-dom
Added test cases inside App.test.js
npm run test to check

# Challenges

Implementing Infinite Scroll with Tailwind CSS was an incredibly engaging and enjoyable experience for me. It was a new concept that allowed me to delve into a new skillset. Despite having more straightforward choices like pagination and using libraries such as Mui or Bootstrap, I intentionally chose to tackle Infinite Scroll with Tailwind CSS in order to expand my knowledge. Learning is paramount!!.

Throughout the implementation, I faced challenges and made continuous improvements to my approach. While the final UI might not be flawless, especially considering my status as a beginner with these libraries, I'm proud of my efforts and the progress I've made. I consider this experience a significant achievement, showcasing my willingness to explore and learn new techniques in the world of web development.

Given more time, I would have surely worked upon improving the UI with the combination of MUI and Tailwind Css and add more advanced features like filter, authentication, animations to make it more smooth and functional.
