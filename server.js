const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the "Public" folder
const publicServedFilesPath = path.join(__dirname, 'Public');
server.use(express.static(publicServedFilesPath));

// Fun route to test random number generator
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route for Mad Lib from Lab_7 form
server.post('/Lab_7/index.html', (req, res) => {
  const { name, adjective, pluralNoun, food, nickname, verb, thing, weirdAction } = req.body;

  // Basic form validation
  if (!name || !adjective || !pluralNoun || !food || !nickname || !verb) {
    return res.send(`
      <h1>Oops!</h1>
      <p>Please fill out <strong>ALL</strong> fields.</p>
      <a href="/Lab_7/index.html">Back to the form</a>
    `);
  }

  // Captain SmartGuy story — Mad Lib style!
  const madLib = `
    <p>Captain <strong>${name}</strong> of the SS Brayne soared through the <strong>${adjective}</strong> galaxy in pursuit of <strong>${pluralNoun}</strong>.</p>
    <p>Fueled by <strong>${food}</strong> and questionable choices, he left a trail of gas so powerful that his parents nicknamed him "<strong>${nickname}</strong>".</p>
    <p>His mission? To boldly <strong>${verb}</strong> where no <strong>${thing}</strong> has <strong>${weirdAction}</strong> before!</p>
  `;

  res.send(`
    <h1>🛸 Your Mad Lib Result!</h1>
    ${madLib}
    <a href="/Lab_7/index.html">Re-Enter the Brayne</a>
  `);
});

// ✅ Use PORT provided by Render, or 8080 locally
const PORT = process.env.PORT || 8080;
//Route to serve the home page
server.get('/', (req, res) => {
    res,sendFile(path.join(__dirname, 'Public', 'Lab_7', 'index.html'))
})

server.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});