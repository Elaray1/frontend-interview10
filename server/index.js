const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const axios = require('axios')


const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const PROSPECT_CONFIG = {
  baseUrl: process.env.PROSPECT_BASE_URL,
  apiKey: process.env.PROSPECT_API_KEY
}

app.use(cors());
app.use(bodyParser.json());

app.get('/email-verifications', (req, res) => {
    pool.query(`select * from email_verification`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

app.post('/email-verification', (req, res) => {
    axios.post(
            PROSPECT_CONFIG.baseUrl + '/api/v1/email-verifier',
            {email: [req.body.email]},
            {headers: {'Authorization': 'Bearer ' + PROSPECT_CONFIG.apiKey}}
        )
        .then(function (response) {
            return res.send(response);
        })
        .catch(function (error) {
            return res.send(error);
        })
})

app.listen(8000, '0.0.0.0', () => {
  console.log(`App server now listening on port 8000`);
});


