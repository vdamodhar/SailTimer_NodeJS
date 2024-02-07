const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res)=>{
    res.render('/views/index.html');
})

app.get('/st', (req, res) => {

    var data = req.url.split("?")[1];
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: "http://sailtimerdataapi.eastus.azurecontainer.io:8080/dataapi?" + data,
        headers: 
            { 
                'Authorization': 'zWT3dCzx28LlAKsqyIixk2MJ0iOC6J'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                res.send(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
});