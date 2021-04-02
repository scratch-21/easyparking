const express = require('express');
const path = require('path');


// Controllers


//Establish Port and Server (Why is "new" keyword not needed?)
const PORT = 3000;
const app = express();


// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static file build route 
app.use('/build', express.static(path.join(__dirname, '../build')));


// Initial Page Request
app.get('/', (req, res) => {

  // res.send('Helloooooooo')

  res.status(200).sendFile(path.join(__dirname, '../index.html'))
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
})

app.listen(PORT, () => { console.log(`Listening on port' ${PORT}...`)});