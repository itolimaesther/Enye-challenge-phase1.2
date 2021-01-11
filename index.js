
const express = require('express');
const axios = require('axios').default;
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/rates', (req, res) => {
axios
  .get("https://api.exchangeratesapi.io/latest?base=CZK&symbols=EUR,GBP,USD")
  .then(function (response) {
    const rawResponse = response.data;
    let results = { };
    results.base = rawResponse.base;
    results.date = rawResponse.date;
    results.rates = rawResponse.rates ;
    
    return res.status(200).json({ results:  results});
    })
    .catch(function (error) {
      // handle error
      res.status(404)
      console.log(error);
    });

  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
