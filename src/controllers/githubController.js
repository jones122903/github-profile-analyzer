const githubService =
require("../services/githubService");


const db =
require("../config/database");



exports.analyzeProfile = async(req,res)=>{


try{


const username = req.params.username;


const data =
await githubService(username);


// convert GitHub datetime to MySQL DATE
data.account_created =
data.account_created.split("T")[0];



const sql = `

INSERT INTO profiles

(
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

VALUES (?,?,?,?,?,?,?,?,?)

ON DUPLICATE KEY UPDATE

followers=?,
public_repos=?,
total_stars=?

`;



db.query(sql,[

data.username,
data.name,
data.bio,
data.public_repos,
data.followers,
data.following,
data.total_stars,
data.account_created,
data.profile_url,

data.followers,
data.public_repos,
data.total_stars

],(err,result)=>{


if(err){

console.log("Insert Error:",err);

return res.status(500).json({

error:"Database insert failed"

});

}


console.log("Saved to database");


res.json({

message:"Profile analyzed successfully",

data:data

});


});



}

catch(error){

console.log(error);

res.status(500).json({

error:"Github user not found"

});

}


};

// Get all analyzed profiles

exports.getProfiles = (req,res)=>{


db.query(
"SELECT * FROM profiles ORDER BY analyzed_at DESC",

(err,result)=>{


if(err){

return res.status(500).json({
error:"Database error"
});

}


res.json(result);


});


};



// Get single profile

exports.getProfile = (req,res)=>{


const username = req.params.username;


db.query(

"SELECT * FROM profiles WHERE username=?",

[username],

(err,result)=>{


if(err){

return res.status(500).json({
error:"Database error"
});

}


if(result.length === 0){

return res.status(404).json({

message:"Profile not found"

});

}


res.json(result[0]);


});


};