# Geography and History Trivia Globe

### Background

I have a cousin who, like myself, is very into history and geography. We are always quizzing each other, so I thought it would be fun to create a 3D trivia game using a moveable globe.

### Functionality & MVP

* Click and drag to spin the globe
* Hover over a country to highlight it and see its name
* Receive trivia questions and answer them by clicking a country
* Enter their top score into a leaderboard

This project will also include:
* A production README

### Wireframes

The app will have the spinnable globe on the right hand side. The left will have animated text of the current question, along with a potential timer and current score.

![wireframe](./trivia.png)

### Architecture and Technologies

This game will be implemented with the following technologies:
* `JavaScript` for game logic and question rendering
* `D3.js` for drawing the canvas world map and the highlighted country map, using an equirectangular projection
* `THREE.js` (WebGL library) to use the canvas map as a texture, and to build the sphere the texture will be wrapped around, as well as making the globe interactive using ray casting and a wireframe on the globe for handling location of click events
* `GeoJSON` for country geometries (and determining if a click event is in a country)

`canvas.js` will hold the canvas map, and the code for creating a new map with the specific country highlighted

`scene.js` will create the sphere and wrap the canvas as a texture around the sphere

`country.js` will hold the code to look up a country from GeoJSON data

`game.js` will render the final globe and the actual game logic

### Implementation Timeline

**Day1:** Read the D3 and 3js API's thoroughly to get an intimate understanding. Get a sphere up and running, and try to create a canvas map

**Day2:** Get the wireframe around the globe and work on registering click events

**Day3:** Country lookup algorithm, look into ways of reducing performance cost (less segments on the wireframe vs difficulty clicking smaller countries)

**Day4:** Implement game logic and make it look pretty

### Bonus Features

* Non-game mode where clicking on a country yields a brief history, statistics, and the current headlines from top news outlets for the country

* Demographic map overlays (ie, WW2 participants for both sides, religion data)
