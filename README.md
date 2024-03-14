
# Chess App with Video Calling

This is a chess app that allows users to play chess with others while engaging in video calls for social interaction. The app provides the following features:

- Chess gameplay using an intuitive interface
- Integrated video calling for real-time communication during games
- Trash talk feature for friendly banter
- Random matchmaking to find opponents
- Guest mode for playing without creating an account

## Routes

- `/`: Main page for starting a game or joining a game
- `/game/:gameId`: Chess game page for a specific game ID
- `/api/games`: API endpoint for creating and joining games
- `/api/games/:gameId/move`: API endpoint for making moves in a game
- `/api/games/:gameId/trash-talk`: API endpoint for sending trash talk messages

## Technologies Used

- Backend: Node.js with TypeScript, Express, Socket.IO, SQLite (sqlite3 library)
- Frontend: React 18 with TypeScript
- Shared types (DTO) between backend and frontend

## Running the App

To run the app, use the following command:

```
bun server/run.ts
```

This will start the server on port 8001. Open http://localhost:8001 in your browser to access the app.

