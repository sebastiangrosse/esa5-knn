const fs = require('fs');
const kNN = require('./kNN')

fs.readFile('./kicks_kisses_data.json', 'utf8', (err, kicks_kisses) => {
    if (err) throw err;
    let data = JSON.parse(kicks_kisses);
    console.log('Data:',data);
    let input = [18, 90];
    console.log('Input:',input)
    let k = 3;
    console.log('k value:',k);
    result = kNN.classify(input, data, k);
    console.log('Result:',result);
})