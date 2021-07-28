var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', function (req, res, next) {
    //console.log(req);
    res.send("coingecko");
});

router.get('/global', function (req, res, next) {
    console.log("headers: ", req.headers);
    fetch("https://coingecko.p.rapidapi.com/global", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.DEV_RAPID_API_KEY,
            "x-rapidapi-host": "coingecko.p.rapidapi.com"
        }
    })
        .then(res => res.json())
        .then(json => {
            res.json(json);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;