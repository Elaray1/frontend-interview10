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
    pool.query(
        `SELECT email_verification.*, email.email
        FROM email_verification 
        JOIN email ON email.id=email_verification.email_id
        ORDER BY email.last_verified_at`,
        (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        });
});

app.post('/email-verification', (req, res) => { // TODO: don't insert new email if it is already exists
    axios.post(
        PROSPECT_CONFIG.baseUrl + '/api/v1/email-verifier',
        { email: [req.body.email] },
        { headers: { 'Authorization': 'Bearer ' + PROSPECT_CONFIG.apiKey } },
    )
    .then(function (response) {
        pool.query('INSERT INTO email (email) VALUES (?)', [req.body.email], function (err, result) {
            const {
                result: responseResult, verifiedAt, isPrivate, catchall,
                disposable, freemail, rolebased, dnsValidMx,
                smtpValid, domainBanned, domainPrivacy, mailboxExists,
            } = response.data.result[0];

            pool.query(
                `INSERT INTO email_verification (
                    email_id, result, verified_at, is_private,
                    is_catchall, is_disposable, is_freemail, is_rolebased,
                    is_dns_valid_mx, is_smtp_valid, is_domain_banned, is_domain_privacy,
                    mailbox_exists)
                 VALUES (?, ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, ?, ?,
                    ?)`,
                [result.insertId, responseResult, verifiedAt, isPrivate,
                catchall, disposable, freemail, rolebased,
                dnsValidMx, smtpValid, domainBanned, domainPrivacy,
                mailboxExists],
                function (error, result) {
                    return res.send({ result, error });
            });
        });
    })
    .catch(function (error) {
        return res.send(error);
    })
})

app.listen(8000, '0.0.0.0', () => {
  console.log(`App server now listening on port 8000`);
});


