
const express = require('express');
const axios = require('axios').default;
const app = express()
const port = 5000

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

    res.status(200).json({ results:  results});

    // if(req){
    //     res.status(200).json({ results:  results});
    // }else{
    //     res.status(404).send({message : "This resource was not found"})
    // }

    })
    .catch(function (error) {
      // handle error
    //   console.log(error);
    res.status(error.response.status).send(error.response.data).end();
      console.log(error.response);
    });

  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
