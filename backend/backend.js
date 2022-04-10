const { Client } = require("pg");
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/partner-form', async (req, res) => {
    const org = req.body;
    console.log(process.env.DATABASE_URL);
    console.log("get into post\n");
    
    (async () => {
        const client = new Client(process.env.DATABASE_URL);
        console.log("get into async function\n");

        const addOrganization =
            "INSERT INTO Organization " +
                "(Name, City, State, Email, Phone, MinimumDonation, Description, URLWebsite, URLLogo, Contacted)" +
                "VALUES ('" + org.Name + "', '" + org.City + "', '" + org.State + "', '" + org.Email + "', " +
                org.Phone + ", " + org.MinimumDonation + ", '" + org.Description + "', '" +
                org.URLWebsite + "', '" + org.URLLogo + "', " + org.Contacted + ")"
      
        try {
          // Connect to CockroachDB
            console.log("get into try\n");
            await client.connect();
            let result = await client.query(addOrganization);
            console.log("send sql to DB\n");
            if (result.rows[0]) { console.log(result.rows[0].message); }
            await client.end();
            console.log("get result from DB\n");
            res.status(201).send(org);
        } catch (err) {
            console.log(`error connecting: ${err}`);
            res.status(500).end();
        }
      
        // Exit program
        process.exit();
      })().catch((err) => console.log(err.stack));
})