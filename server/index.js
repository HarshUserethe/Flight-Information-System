const express = require('express');
const mysql = require('mysql');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.HOST_USER,
  password: process.env.HOST_PASSWORD,
  database: process.env.DATABASE
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database...');
});

// WebSocket server
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial data to client upon connection
  connection.query('SELECT * FROM flight', (error, results) => {
    if (error) {
      console.error('Error fetching initial data: ', error);
      return;
    }
    ws.send(JSON.stringify(results));
  });

  // Listen for close event
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
