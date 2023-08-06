const express = require('express');
const app = express();
const kue = require('kue');
const queue = kue.createQueue();
const port = 3100;

queue.process('test', (job, done) => {
  const messageCallback = JSON.stringify({ status: true, message: job.data });
  done(messageCallback);
  return;
});

app.use('/kue-api/', kue.app);

app.listen(port, () => {
  console.log(`Service 2 listening on port ${port}`);
});