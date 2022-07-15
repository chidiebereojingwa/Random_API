const fs = require('fs')
const express = require('express');

const app = express();

// middleware
app.use(express.json())

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server side!', app: 'Node.s' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('you can post on this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
})

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
     res.status(201).json({
      status: 'success',
      data: newTour
     })
  });

})

const port = 3000;
app.listen(port, () => {
  console.log(`App is running ${port}...`);
});
