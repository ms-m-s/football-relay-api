const express = require("express");
const fetch = require("node-fetch");
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
const endpoint1 = "/leagues/seasons";
const endpoint2 = "/leagues/:leagueName/:country";
const endpoint3 = "/standings/:leagueId/:season";

async function loadData(endpoint) {
    try {
        return (await fetch(url + endpoint, requestOptions)).json();
    } catch (err) {
        return {
            Error: err.stack
        };
    }
}

router.get("/", (req, res) => {
    res.json({
        success: "Yoo wassup"
    });
});

router.get(endpoint1, async (req, res) => {
    const data = await loadData(endpoint1);
    res.json(data);
});

router.get(endpoint2, async (req, res) => {
    const name = req.params.leagueName;
    const country = req.params.country;
    const data = await loadData(`/leagues?name=${name}&country=${country}`);
    res.json(data);
});

router.get(endpoint3, async (req, res) => {
    const id = req.params.leagueId;
    const season = req.params.season;
    const data = await loadData(`/standings?league=${id}&season=${season}`);
    res.json(data);
});

module.exports = router;