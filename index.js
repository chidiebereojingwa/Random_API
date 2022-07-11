const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('I could not find that file ');
            resolve(data)
        })
    })
}

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Random dog image to file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
