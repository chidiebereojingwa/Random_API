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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  // converting id string to a number
  const id = req.params.id * 1;

  // for invalid id greater than the length of the tours
  const tour = tours.find((el) => el.id === id);

  // if(id > tours.length){
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});   

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

app.patch('/api/v1/tours/:id', (req, res) => {
 if(req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    },
  });
})

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null 
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running ${port}...`);
});
