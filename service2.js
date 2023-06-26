const express = require('express');
const app = express();
const kue = require('kue');
const queue = kue.createQueue();
const port = 3100;

queue.process('test', (job, done) => {
  console.log('job', job.data);

  const isError = false;

  const messageCallback = JSON.stringify({ status: true, message: 'falid' });
  if (isError) {
    messageCallback.status = false;
    messageCallback.message = 'failed';
    done(messageCallback);
    return;
  }

  done(messageCallback);
  return;
});

app.use('/kue-api/', kue.app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});