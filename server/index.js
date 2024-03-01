const express = require('express');
const mysql = require('mysql');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());

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

app.get('/', (req, res) => {
  res.send("Home");
});

app.get('/api/data' (req, res) => {
  connection.query('SELECT * FROM flight', (error, results) => {
    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Send data as JSON response
    res.json(results);
  });
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
