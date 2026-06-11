# GitHub Profile Analyzer API

Backend service that analyzes GitHub user profiles using GitHub Public API and stores useful insights in MySQL.

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios


## Features

- Fetch public GitHub profile data using username
- Analyze GitHub repository information
- Calculate total repository stars
- Store analyzed profile data in MySQL database
- Retrieve all analyzed profiles
- Retrieve single analyzed profile
- Update existing profile analysis automatically


## Project Structure

github-profile-analyzer


src
|
|-- app.js
|
|-- config
| |-- database.js
|
|-- controllers
| |-- githubController.js
|
|-- routes
| |-- githubRoutes.js
|
|-- services
|-- githubService.js

.env
package.json
README.md
database.sql



## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

Go inside project:

cd github-profile-analyzer

Install dependencies:

npm install
Environment Variables

Create a .env file in the root directory.

Add:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

GITHUB_API=https://api.github.com
Database Setup

Create MySQL database:

CREATE DATABASE github_analyzer;

Use database:

USE github_analyzer;

Import the provided database file:

mysql -u root -p github_analyzer < database.sql
Run Application

Start development server:

npm run dev

Start production server:

npm start

Server will run on:

http://localhost:5000
API Documentation
1. Analyze GitHub Profile

Method:

POST

Endpoint:

/api/analyze/:username

Example:

POST http://localhost:5000/api/analyze/octocat

Response:

{
    "message": "Profile analyzed successfully",
    "data": {
        "username": "octocat",
        "name": "The Octocat",
        "public_repos": 8,
        "followers": 22913,
        "following": 9,
        "total_stars": 21534
    }
}
2. Get All Analyzed Profiles

Method:

GET

Endpoint:

/api/profiles

Example:

GET http://localhost:5000/api/profiles

Response:

[
    {
        "id":1,
        "username":"octocat",
        "name":"The Octocat",
        "followers":22913
    }
]
3. Get Single Profile

Method:

GET

Endpoint:

/api/profiles/:username

Example:

GET http://localhost:5000/api/profiles/octocat

Response:

{
    "id":1,
    "username":"octocat",
    "name":"The Octocat",
    "public_repos":8,
    "followers":22913,
    "total_stars":21534,
    "profile_url":"https://github.com/octocat"
}
Database Table

Database:

github_analyzer

Table:

profiles

Stored Information:

Username
Name
Bio
Public repositories count
Followers
Following
Total repository stars
Account creation date
GitHub profile URL
Analysis timestamp
Author

Your Name

License

This project is created for assignment purposes.


Save it as:


README.md