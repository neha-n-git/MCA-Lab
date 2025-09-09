const express = require('express');
const mysql = require('mysql2/promise'); 
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the database!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });


app.get('/api/movies', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM movies');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Failed to retrieve movies' });
    }
});

app.post('/api/movies', async (req, res) => {
    try {
        const { title, director, genre, release_year, rating } = req.body;
        if (!title || !director || !release_year || !rating) {
            return res.status(400).json({ error: 'Missing required fields: title, director, release_year, and rating.' });
        }
        const [result] = await pool.execute(
            'INSERT INTO movies (title, director, genre, release_year, rating) VALUES (?, ?, ?, ?, ?)',
            [title, director, genre, release_year, rating]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: 'Failed to add movie' });
    }
});

app.put('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, director, genre, release_year, rating } = req.body;
        const [result] = await pool.execute(
            'UPDATE movies SET title=?, director=?, genre=?, release_year=?, rating=? WHERE id=?',
            [title, director, genre, release_year, rating, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie updated successfully' });
    } catch (err) {
        console.error('Error updating movie:', err);
        res.status(500).json({ error: 'Failed to update movie' });
    }
});

app.delete('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute('DELETE FROM movies WHERE id=?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        console.error('Error deleting movie:', err);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});