
const express = require('express');
const axios = require('axios').default;
const app = express()


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/rates', (req, res) => {
axios
    // connect to the exchange api
  .get("https://api.exchangeratesapi.io/latest?base=CZK&symbols=EUR,GBP,USD")
  .then(function (response) {
    const rawResponse = response.data;
    let results = { };
    results.base = rawResponse.base;
    results.date = rawResponse.date;
    results.rates = rawResponse.rates ;

    // successful response
    res.status(200).json({ results:  results});

    })
    .catch(function (error) {
      // handle error
    //   console.log(error);
    // check the status code returned by axios and forward it
    res.status(error.response.status).send(error.response.data).end();
      console.log(error.response);
    });

  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
