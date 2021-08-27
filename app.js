const express = require('express');
const app = express();
const axios = require('axios');
const asyncHandler = require('express-async-handler');

app.use(express.json());

const ANURA_API_ENDPOINT = "https://dozi-staging.zoominfo.com";

app.all('/*', asyncHandler(async function (req, res){
    // console.log(`original url: ${req.originalUrl}`);
    // console.log(`method: ${req.method}`);
    // console.log(`path: ${req.path}`);
    // console.log(`query: ${JSON.stringify(req.query)}`);
    // console.log(`body: ${JSON.stringify(req.body)}`);
    // console.log(`headers: ${JSON.stringify(req.headers)}`);

    let requestOptions = {
        method: req.method,
        baseURL: ANURA_API_ENDPOINT,
        url: req.originalUrl,
        data: JSON.stringify(req.body),
        headers: {
            'x-zisession': req.headers['x-zisession'],
            'user': req.headers['user'],
            'session-token': req.headers['session-token'],
            'content-type': req.headers['content-type'],
            'x-ziid': req.headers['x-ziid']
        }
    };

    console.log(`requestOptions: ${JSON.stringify(requestOptions)}`);

    try {
        let result = await axios(requestOptions);
        console.log('success');

        return res.status(result.status).send(result.data);
    } catch(e) {
        console.log(`error from api: ${e.message}`);
        return res.status(400).send(e.message);
    }
}));

app.listen(8000, function() {
    console.log('server running on port ' + 8000);
});