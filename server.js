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
        const response = await axios.post('https://api.riotgames.com/valorant/v1/accounts', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const accountId = response.data.accountId;

        // Fetch skin data for the account
        const skinsResponse = await axios.get(`https://api.riotgames.com/valorant/v1/accounts/${accountId}/skins`, {
            headers: {
                'Content-Type': 'application/json'
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
