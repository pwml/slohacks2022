const { Client } = require("pg");

(async () => {
  const client = new Client(process.env.DATABASE_URL);

  const statements = [
    "DROP TABLE IF EXISTS messages",
    // CREATE the messages table
    "CREATE TABLE messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message STRING)",
    // INSERT a row into the messages table
    "INSERT INTO messages (message) VALUES ('Hello world!')",
    // SELECT a row from the messages table
    "SELECT message FROM messages",
  ];

  const createTable = [
    "DROP TABLE IF EXISTS Organization",

    "CREATE TABLE Organization (" +
      "Name varchar(100) NOT NULL, " +
      "City varchar(100) NOT NULL, " +
      "State varchar(50) NOT NULL, " +
      "Email varchar(100) NOT NULL, " +
      "Phone Int NOT NULL, " +
      "MinimumDonation Int NOT NULL, " +
      "Description varchar(1073741824) NOT NULL, " +
      "URLWebsite varchar(100), " +
      "URLLogo varchar(5000) NOT NULL, " +
      "Contacted Int NOT NULL, " +
      "PRIMARY KEY (Name, City, State)" +
    ")"
  ]

  try {
    // Connect to CockroachDB
    await client.connect();
    for (let n = 0; n < createTable.length; n++) {
      // console.log(createTable[n]);
      let result = await client.query(createTable[n]);
      if (result.rows[0]) { console.log(result.rows[0].message); }
    }
    await client.end();
  } catch (err) {
    console.log(`error connecting: ${err}`);
  }

  // Exit program
  process.exit();
})().catch((err) => console.log(err.stack));
