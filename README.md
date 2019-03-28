# Cucaracha Smasha!

This project is a game that was created as an exercise to demonstrate skills with Vuejs and Firebase. It is a south-of-the-border spin on the classic "whack a mole" game.

## Demo

Visit here for a [live demo](https://cockroach-smash.firebaseapp.com).

## Technology

This project is written in ES6 using Vuejs. It is styled w/ the Vuetify Material design library and leverages Firebase for authentication and backend database. It uses Jest for unit tests and relies on EditorConfig, ESLint and Prettier for code consistency.

### Endpoints

The following endpoint(s) are implemented as Cloud Functions in Firebase.

| Function                         | Endpoint             | Method | Description                          |
| -------------------------------- | -------------------- | :----: | ------------------------------------ |
| `saveScore(playerId, score)`     | saveScore            |  POST  | store each finished game to document |
| `getHighScoreByPlayer(playerId)` | getHighScoreByPlayer |  GET   | get high score for a given player    |

### Requirements

- [x] basic layout
- [x] mobile layout
- [x] core game functionality
- [x] difficulty slider
- [x] game scoring logic
- [x] login/signup support
- [x] add routing
- [x] extract state logic into helper
- [x] implement saveScore as cloud function
- [x] implement getPlayerHighScore as snapshot
- [x] get current user's high score on login
- [ ] create tests

### Bugs

- [ ] not loading player on signup

### Enhancements

- [x] deploy to Firebase hosting
- [x] create index for high score query
- [x] add loading indicator for high score endpoint
- [x] improve getHighScoreByPlayer function performance
- [ ] use onAuthStateChanged event to persist displayName for player
- [ ] implement onAuthStateChanged to save player
- [ ] restrict CORS to hosted site only
- [ ] add validation to login/signup
- [ ] refactor Gameboard into separate components (GameControls and Scoreboard)
- [ ] implement login as cloud function
- [ ] implement signup as cloud function
- [ ] add custom theme/colors
- [ ] break out Vuex store into separate files
- [ ] add cloud firestore permissions

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```
