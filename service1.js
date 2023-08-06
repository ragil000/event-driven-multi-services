const express = require('express');
const app = express();
const kue = require('kue');
const queue = kue.createQueue();
const port = 3000;

app.get('/test', (req, res) => {
  const message = req.query.message;
  const job = queue.create('test', message)
  .priority('high');

  job.on('complete', function(result) {
    // handle normal complete
    res.status(200).json(result);
  }).on('failed', function(errorMessage) {
    errorMessage = JSON.parse(errorMessage);
    
    // handle custom complete with return value
    if (errorMessage.status) {
      return res.status(200).json(errorMessage);
    }
    
    // handle error
    return res.status(500).json(errorMessage);
  });

  job.save();
});

app.use('/kue-api/', kue.app);

app.listen(port, () => {
  console.log(`Service 1 listening on port ${port}`);
});