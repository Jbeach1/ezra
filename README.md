# Ezra Monorepo

This repository contains two projects:
- **frontend**: React app (TypeScript, Material-UI)
- **backend**: Express server

## Running the Frontend

1. Open a terminal in the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

## Running the Backend

1. Open a terminal in the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Express server:
   ```sh
   node index.js
   ```
   The server will run at [http://localhost:3001](http://localhost:3001).

---

## Notes
- Make sure Node.js and npm are installed.
- You can run both servers simultaneously in separate terminals.

## Backend notes

Express is temporary, eventually we need a DB, for now to demo its using files. 
To reset the data call `node resetData.js` to get a clean data set. 