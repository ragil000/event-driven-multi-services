const axios = require('axios');

async function test(message) {
  setTimeout(async () => {
    const result = await axios.get(`http://localhost:3000/test?message=${message}`)
  
    console.log('original message: ', message, 'callback message: ', result.data.message);
  }, Math.random() * (3000 - 1000));
}

Promise.all([
  test(1),
  test(2),
  test(3),
  test(4),
  test(5),
  test(6),
]);