const request = require('request');
const csv = require('csv');
const moment = require('moment');
const colorClasses = ['orr1', 'orr2', 'orr3', 'orr4'];

exports.handler = function(event, context, callback) {

  const oneMonthAgo = moment().subtract(2, 'month');
  const lines = [];

  const stream = request.get(process.env.DOCS_API_URL); // fetch csv

  stream
    .pipe(csv.parse({ columns: true }))
    .pipe(csv.transform(data => {
      if (moment(data.Timestamp, 'L').isAfter(oneMonthAgo)) lines.push(data['Who rocks?'])
    }));

  stream.on('end', () => {
    const output = [];

    lines.forEach(currentLine => {

      let dimentions;
      if (currentLine.length < 15) dimentions = { min: 1, max: 1 };
      else if (currentLine.length < 100) dimentions = { min: 2, max: 2 };
      else dimentions = { min: 3, max: 1 };

      const outputData = { 
        length: randomize(dimentions), 
        width: randomize(dimentions), 
        color: colorClasses[randomize({ min: 0, max: colorClasses.length })], 
        message: currentLine 
      };

      output.push(outputData);
    });

    console.log(`Returned ${output.length} values on ${new Date()}`);
    callback(null, output); // SUCCESS with message
  });
};

function randomize({ min, max}) {
  return Math.floor((Math.random() * max) + min);
}
