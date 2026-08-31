const db = require("../config/database");
const githubService = require("../services/githubService");


// Analyze GitHub profile
exports.analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const data = await githubService(username);

    // Convert GitHub ISO timestamp to MySQL DATE format
    const accountCreated = data.account_created
      ? data.account_created.split("T")[0]
      : null;

    const sql = `
      INSERT INTO profiles (
        username,
        name,
        bio,
        public_repos,
        followers,
        following,
        total_stars,
        account_created,
        profile_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        name = ?,
        bio = ?,
        public_repos = ?,
        followers = ?,
        following = ?,
        total_stars = ?,
        account_created = ?,
        profile_url = ?,
        analyzed_at = CURRENT_TIMESTAMP
    `;

    db.query(
      sql,
      [
        // INSERT values
        data.username,
        data.name,
        data.bio,
        data.public_repos,
        data.followers,
        data.following,
        data.total_stars,
        accountCreated,
        data.profile_url,

        // UPDATE values
        data.name,
        data.bio,
        data.public_repos,
        data.followers,
        data.following,
        data.total_stars,
        accountCreated,
        data.profile_url
      ],
      (err, result) => {
        if (err) {
          console.error("Database insert/update error:", err);

          return res.status(500).json({
            error: "Database operation failed"
          });
        }

        console.log("Profile saved to database");

        res.json({
          message: "Profile analyzed successfully",
          data: data
        });
      }
    );
  } catch (error) {
    console.error("GitHub analysis error:", error.message);

    res.status(500).json({
      error: "GitHub user not found"
    });
  }
};


// Get all analyzed profiles
exports.getProfiles = (req, res) => {
  const sql = "SELECT * FROM profiles ORDER BY analyzed_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);

      return res.status(500).json({
        error: "Failed to fetch profiles"
      });
    }

    res.json(results);
  });
};


// Get one analyzed profile by username
exports.getProfile = (req, res) => {
  const username = req.params.username;

  const sql = "SELECT * FROM profiles WHERE username = ?";

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);

      return res.status(500).json({
        error: "Failed to fetch profile"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "Profile not found"
      });
    }

    res.json(results[0]);
  });
};
