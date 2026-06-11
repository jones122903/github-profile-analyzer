const axios = require("axios");


const fetchGithubProfile = async(username)=>{


    const profileResponse = await axios.get(
        `https://api.github.com/users/${username}`
    );


    const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );


    let totalStars = 0;


    reposResponse.data.forEach(repo=>{

        totalStars += repo.stargazers_count;

    });


    return {

        username: profileResponse.data.login,

        name: profileResponse.data.name,

        bio: profileResponse.data.bio,

        public_repos: profileResponse.data.public_repos,

        followers: profileResponse.data.followers,

        following: profileResponse.data.following,

        total_stars: totalStars,

        account_created:
        profileResponse.data.created_at,

        profile_url:
        profileResponse.data.html_url

    };

}


module.exports = fetchGithubProfile;