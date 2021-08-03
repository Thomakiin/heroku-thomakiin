var express = require('express');
var cors = require('cors');
const fetch = require('node-fetch');

var router = express.Router();
router.use(cors());

var corsOptions = {
    // only allow specified domains to request data
    //origin: [""], 
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/', cors(), function (req, res, next) {
    console.log("req.get(endpoint) : ", req.get("endpoint"));

    if (!req.get("endpoint")) {
        res.status(400);
        res.send("invalid endpoint");
        return;
    }

    let url = "https://coingecko.p.rapidapi.com" + req.get("endpoint");
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.RAPID_API_KEY,
            "x-rapidapi-host": "coingecko.p.rapidapi.com"
        }
    })
        .then(res => res.json())
        .then(json => {
            res.json(json);
        })
        .catch(err => console.error(err));
});

module.exports = router;