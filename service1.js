const express = require('express');
const app = express();
const kue = require('kue');
const queue = kue.createQueue();
const port = 3000;

app.get('/test', (req, res) => {
  const job = queue.create('test', {
    title: 'test message',
    user: 1,
    frames: 200,
  })
  .priority('high');

  job.on('complete', function(result) {
    // handle normal complete
    console.log('Job completed with data ', result);
    res.send('Hello World!');
  }).on('failed', function(errorMessage) {
    console.log('Job failed!', 'error: ', errorMessage);
    errorMessage = JSON.parse(errorMessage);
    
    // handle custom complete with return value
    if (errorMessage.status)
      return res.send('Hello World! ' + errorMessage.message);
    
    // handle error
    return res.send('Failed! ' + errorMessage.message);
  }).on('progress', function(progress, data) {
    console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
  });

  job.save();
});

app.use('/kue-api/', kue.app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});