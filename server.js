const express = require('express');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors({
    origin: 'https://Balaji-spyder.github.io',
}));
app.options('*', cors());

// Validation function for SHA-1 hash
function isValidSHA1(hash) {
    const sha1Regex = /^[a-fA-F0-9]{40}$/; // Regex for 40-character hexadecimal string
    return sha1Regex.test(hash);
}

// Function to read salts from a file and return them as an array
function readSalts(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}

// Function to read passwords from a file and return them as an array
function readPasswords(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}

/**
 * Password cracker function
 */
function crackSha1Hash(hash, useSalts = false) {
    const passwords = readPasswords('top-10000-passwords.txt');
    const salts = useSalts ? readSalts('known-salts.txt') : [];

    for (let password of passwords) {
        if (useSalts) {
            for (let salt of salts) {
                let hp = crypto.createHash('sha1').update(password + salt).digest('hex');
                if (hp === hash) return password;

                hp = crypto.createHash('sha1').update(salt + password).digest('hex');
                if (hp === hash) return password;
            }
        } else {
            let hp = crypto.createHash('sha1').update(password).digest('hex');
            if (hp === hash) return password;
        }
    }
    return "PASSWORD NOT IN DATABASE";
}

// API endpoint to handle password cracking
app.post('/crack', (req, res) => {
    const { hash, useSalts } = req.body;

    if (!hash) {
        return res.status(400).json({ error: "Hash is required" });
    }

    // Validate the hash format
    if (!isValidSHA1(hash)) {
        return res.status(400).json({ error: "Invalid SHA-1 hash format" });
    }

    try {
        const result = crackSha1Hash(hash, useSalts);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});

// Start the server
app.listen(port, () => {});
