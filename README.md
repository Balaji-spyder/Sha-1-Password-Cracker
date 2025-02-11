

# SHA-1 Password Cracker Console

![Hacking Theme](https://img.shields.io/badge/Theme-Hacking-green) 

A web-based hacking-themed console that allows users to crack SHA-1 hashes using a backend API. The application features a sleek terminal-like interface with animations and supports optional salted hashes.

---

## Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
   - [Frontend](#frontend)
   - [Backend](#backend)
5. [How It Works](#how-it-works)
6. [API Endpoints](#api-endpoints)
   
---

## Features

- **SHA-1 Hash Cracking**: Enter a hash and let the system attempt to crack it.
- **Salt Support**: Optionally include salts for enhanced cracking.
- **Validation**: Ensures only valid SHA-1 hashes are processed.
- **Typing Animation**: A dynamic "typing effect" for a thematic touch.
- **Responsive Design**: Works seamlessly on different screen sizes.
- **CORS Handling**: Properly configured for cross-origin requests.

---

## Demo

You can try out the live version of the application here:

- **Frontend**: [https://balaji-spyder.github.io](https://balaji-spyder.github.io)
- **Backend**: [https://balaji-spyder-github-io.onrender.com](https://balaji-spyder-github-io.onrender.com)

---

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 
  - JavaScript
    
- **Backend**:
  - Node.js
  - Express.js
  - CORS Middleware

- **Hosting**:
  - Frontend: GitHub Pages
  - Backend: Render

---

## Setup Instructions

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/<repository>.git
   cd <repository>
   ```
2. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/<repository>.git
   cd <repository>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
---

## How It Works

1. The user enters a SHA-1 hash into the input field.
2. The frontend validates the hash format using a regular expression.
3. If valid, the frontend sends a POST request to the backend API with the hash and salt options.
4. The backend processes the request and attempts to crack the hash using a preloaded password database.
5. The result is sent back to the frontend and displayed to the user.

---

## API Endpoints

### POST `/crack`

Cracks a given SHA-1 hash.

#### Request Body

```json
{
    "hash": "b305921a3723cd5d70a375cd21a61e60aabb84ec",
    "useSalts": false
}
```

#### Response

```json
{
    "result": "sammy123"
}
```

---

## Acknowledgments

- Inspired by hacking-themed applications and tools.
- Thanks to [Render](https://render.com/) and [GitHub Pages](https://pages.github.com/) for free hosting.

---
