const express = require("express");
const fetch = require("node-fetch");
const apicache = require("apicache");
const cache = apicache.middleware;
const router = express.Router();

var myHeaders = {
    "x-apisports-key": process.env.APIKEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
};

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

const url = "https://v3.football.api-sports.io";
const endpoint1 = "/leagues";
const endpoint2 = "/leagues/:leagueId";
const endpoint3 = "/standings/:leagueId/:season";

async function loadData(endpoint) {
    try {
        return (await fetch(url + endpoint, requestOptions)).json();
    } catch (error) {
        return {
            Error: error.stack
        };
    }
}

router.get("/", (req, res) => {
    res.json({
        success: "Yoo wassup"
    });
});

router.get(endpoint1, cache(30000), async (req, res) => {
    const data = await loadData(endpoint1);
    res.json(data);
});

router.get(endpoint2, cache("1 minute"), async (req, res) => {
    const leagueId = req.params.leagueId;
    const data = await loadData(`/leagues?id=${leagueId}`);
    res.json(data);
});

router.get(endpoint3, cache("2 minutes"), async (req, res) => {
    const id = req.params.leagueId;
    const season = req.params.season;
    const data = await loadData(`/standings?league=${id}&season=${season}`);
    res.json(data);
});

module.exports = router;