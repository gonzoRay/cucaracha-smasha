# Cucaracha Smasha!

This project is a game that was created as an exercise to demonstrate skills with Vuejs and Firebase. It is a south-of-the-border spin on the classic "whack a mole" game.

## Technology

This project is written in ES6 using Vuejs. It is styled w/ the Vuetify Material design library and leverages Firebase for authentication and backend database. It uses Jest for unit tests and relies on EditorConfig, ESLint and Prettier for code consistency.

### Endpoints

The following endpoints are implemented as Cloud Functions in Firebase.

| Function                       | Endpoint               | Method | Description                                  |
| ------------------------------ | ---------------------- | :----: | -------------------------------------------- |
| `saveScore(playerId, score)`   | scores                 |  POST  | store each finished game to document         |
| `getPlayerHighScore(playerId)` | scores/**{playerId}**  |  GET   | retrieve high score for a given **playerId** |
| `getHighScores(count)`         | scores/top/**{count}** |  GET   | retrieve a list of the highest scores        |

### Requirements

- [x] basic layout
- [x] mobile layout
- [x] core game functionality
- [x] difficulty slider
- [x] game scoring logic
- [x] login/signup support
- [x] add routing
- [x] extract state logic into helper
- [x] Implement saveScore as cloud function
- [ ] Implement getPlayerHighScore as cloud function
- [ ] Implement getHighScores as cloud function

### Enhancements

- [ ] restrict CORS to hosted site only
- [ ] add validation to login/signup
- [ ] refactor Gameboard into separate components (GameControls and Scoreboard)
- [ ] Implement login as cloud function
- [ ] Implement signup as cloud function
- [ ] Deploy to Firebase hosting
- [ ] Add custom theme/colors
- [ ] Break out Vuex store into separate files
- [ ] Add cloud firestore permissions
- [ ] implement onAuthStateChanged to save player
- [ ] use onAuthStateChanged event to persist displayName for player

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
