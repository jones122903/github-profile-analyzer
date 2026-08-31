# GitHub Profile Analyzer API

A RESTful backend API built with **Node.js, Express.js, and MySQL** that integrates with the **GitHub REST API** to retrieve, process, and store public GitHub profile statistics.

The application accepts a GitHub username, retrieves profile and repository information from GitHub, calculates repository star statistics, and stores the analyzed profile in a MySQL database for later retrieval.

## Features

- Fetch public GitHub profile information by username
- Retrieve public repository data using the GitHub REST API
- Calculate total stars across retrieved repositories
- Store analyzed profile statistics in MySQL
- Update existing profile data when a username is analyzed again
- Retrieve all previously analyzed profiles
- Retrieve a specific stored profile by username
- Environment-based database configuration
- Postman collection for API testing

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **External API:** GitHub REST API
- **HTTP Client:** Axios
- **Database Driver:** mysql2
- **Configuration:** dotenv
- **Middleware:** CORS
- **API Testing:** Postman

## Architecture

```text
Client / Postman
       |
       v
Express Application
       |
       v
Routes
       |
       v
Controller
      / \
     /   \
    v     v
GitHub   MySQL
Service  Database
   |
   v
GitHub REST API
```

## Request Flow

When a profile analysis request is made:

```text
POST /api/analyze/:username
        |
        v
GitHub Route
        |
        v
GitHub Controller
        |
        v
GitHub Service
        |
        v
GitHub REST API
        |
        +--> Profile information
        |
        +--> Repository information
        |
        v
Calculate repository star statistics
        |
        v
Controller
        |
        v
MySQL Database
        |
        v
JSON Response
```

## Project Structure

```text
github-profile-analyzer/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── githubController.js
│   ├── routes/
│   │   └── githubRoutes.js
│   ├── services/
│   │   └── githubService.js
│   └── app.js
├── database.sql
├── github-analyzer.postman_collection.json
├── package.json
├── package-lock.json
└── README.md
```

## API Endpoints

### Analyze a GitHub Profile

```http
POST /api/analyze/:username
```

Example:

```http
POST /api/analyze/octocat
```

The API retrieves the user's public GitHub profile and repository information, calculates repository star statistics, and stores the result in MySQL.

### Get All Analyzed Profiles

```http
GET /api/profiles
```

Returns all profiles currently stored in the database.

### Get Profile by Username

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

Returns the stored profile matching the specified GitHub username.

## Stored Profile Data

The application stores:

- GitHub username
- Name
- Bio
- Public repository count
- Followers
- Following
- Repository star statistics
- GitHub account creation date
- GitHub profile URL
- Analysis timestamp

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jones122903/github-profile-analyzer.git
cd github-profile-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_analyzer
```

The `.env` file is ignored by Git and should not be committed to the repository.

### 4. Create the Database

Create a MySQL database:

```sql
CREATE DATABASE github_analyzer;
```

Import the provided `database.sql` file to create the required table.

### 5. Start the Development Server

```bash
npm run dev
```

The API will be available locally at:

```text
http://localhost:5000
```

## API Testing

A Postman collection is included:

```text
github-analyzer.postman_collection.json
```

Import the collection into Postman to test the available API endpoints.

## Database

The application uses MySQL to persist analyzed GitHub profiles.

The `username` field is unique. When an existing username is analyzed again, the stored profile statistics are updated and the analysis timestamp is refreshed.

## Future Improvements

- Add pagination when retrieving GitHub repositories
- Add GitHub API authentication for improved rate limits
- Improve API error handling
- Add automated tests
- Add filtering and pagination for stored profiles
