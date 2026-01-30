const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/check-skins', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Replace with your actual API endpoint and authentication details
        const response = await axios.post('https://auth.riotgames.com/api/v1/authorization', {
            type: 'auth',
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const token = response.data.token;

        // Use the token to fetch account details
        const accountResponse = await axios.get('https://ripe.riotgames.com/riot/account/v1/accounts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const accountId = accountResponse.data[0].puuid;

        // Fetch skin data for the account
        const skinsResponse = await axios.get(`https://pd.riotgames.com/api/lol/skin/${accountId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const skins = skinsResponse.data.skins;
        res.json({ skins });
    } catch (error) {
        console.error('Error fetching skins:', error);
        res.status(500).json({ error: 'Unable to fetch skins' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
