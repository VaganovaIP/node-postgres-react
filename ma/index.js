const express = require('express');
const app = express();
const port = 8080;
const {Pool} = require('pg');
const cors = require('cors');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'albums_manager',
    password:'passwd',
    port:5432,
});

app.use(express.json());
app.use(cors());


async function createAlbumsTable() {
    try {
        const query = 'CREATE TABLE IF NOT EXISTS albums (\n' +
            '          id SERIAL PRIMARY KEY,\n' +
            '          title VARCHAR(255) NOT NULL,\n' +
            '          artist VARCHAR(255) NOT NULL,\n' +
            '          price NUMERIC(10, 2)\n' +
            '        );'
      ;

        await pool.query(query);
        console.log('Albums table created');
    } catch (err) {
        console.error(err);
        console.error('Albums table creation failed');
    }
}

createAlbumsTable();


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/albums', async (req, res) => {
    // Validate the incoming JSON data
    const { title, artist, price } = req.body;
    console.log(req.body);
    if (!title || !artist || !price) {
        return res.status(400).send('One of the title, or artist, or price is missing in the data');
    }

    try {
        // try to send data to the database
        const query = `
        INSERT INTO albums (title, artist, price)
        VALUES ($1, $2, $3)
        RETURNING id;
      `;
        const values = [title, artist, price];

        const result = await pool.query(query, values);
        res.status(201).send({ message: 'New Album created', albumId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).send('some error has occured');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/albums', async (req, res) => {
    try {
        const query = 'SELECT * FROM albums;';
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('failed');
    }
});