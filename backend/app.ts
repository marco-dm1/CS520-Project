const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`CS520 Survey App listening on port ${port}`)
})

app.get('/api/survey/:request', (req, res) => {
    switch(req.params.request){
        case 'create':
            // Performs create action of survey
            break;
        case 'delete':
            // Performs delete action of survey

            break;
        case 'edit':
            // Performs edit action of surevy
            break;
        case 'share':
            // Sends share link back.
            break;
        default:
            res.json({ status: 'Error', message: 'Unknown route!' });
    }
<<<<<<< Updated upstream
    res.send('Unknown')
})
=======
})

app.get('/api/user/:request', async (req, res) => {
    console.log(req.body);
    switch(req.params.request){
        case 'create':
            const databaseSignupResponse = await createUserDB(req.body.email, req.body.pass, req.body.name);
            res.json({ status: 'Received', response: databaseSignupResponse ? databaseSignupResponse["_id"] : "false" });
            break;
        case 'login':
            const databaseLoginResponse = await loginUserDB(req.body.email, req.body.pass);
            console.log(databaseLoginResponse)
            res.json({ status: databaseLoginResponse[0], response: databaseLoginResponse[1] });
            break;
        case 'getdata':
            const databaseDataResponse = await getNameUserDB(req.body.id);
            res.json({ status: databaseDataResponse[0], name: databaseDataResponse[1], email: databaseDataResponse[2] });
            break;
        default:
            res.json({ status: 'Error', message: 'Unknown route!' });
    }   
})


// DATABASE PART 2

const main = async () => {
    try {
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Connected to database");
  
    } finally{
        // done
    }
  }; 

main();


// USER DATABASE FUNCTIONS

const userSchema = new mongoose.Schema({ 
    //_id: {type: String, required: true},
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true }
}, {
  versionKey: false
});

const userModel = mongoose.model("users", userSchema);

async function createUserDB(emailInput, passwordInput, nameInput){
    const found = await userModel.find({ email: emailInput });
    if(found.length > 0){
        // User with that email already exists!
        console.log("User with email already exists in database!")
        return false;
    }

    const hashedPW = bcrypt.hashSync(passwordInput, 10);


    let newUser = new userModel({ 
        name: nameInput,
        email: emailInput,
        password: hashedPW,
      });

    await newUser.save();

    console.log("new user:");
    console.log(newUser);
    return newUser;
}

 async function loginUserDB(emailInput, passwordInput){
  const found = await userModel.find({ email: emailInput });

  // If a user with that email exists
  if(found.length > 0){
    // If the password matches
    console.log(found);
    if(bcrypt.compareSync(passwordInput, found[0].password)){
        return [true, found[0]._id];
    }
  }

  return [false, "Didn't find user or password is wrong"];
}

async function getNameUserDB(idInput){
    const found = await userModel.find({ _id: idInput });

  // If a user with that id exists
  if(found.length > 0){
    return [true, found[0].name, found[0].email];
  }

  return [false, "Couldn't find account", "Couldn't find account"];
}



// SURVEY DATABASE FUNCTIONS

const surveySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  questions: [{
    type: { type: String, required: true },
    question: { type: String, required: true },
    options: [String],
    required: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

const surveyModel = mongoose.model("surveys", surveySchema);

async function createSurveyDB(userId, surveyData) {
  try {
    const newSurvey = new surveyModel({
      userId: userId,
      title: surveyData.title,
      description: surveyData.description,
      questions: surveyData.questions
    });
    
    await newSurvey.save();
    return { status: true, surveyId: newSurvey._id };
  } catch (error) {
    console.error('Error creating survey:', error);
    return { status: false, error: error.message };
  }
}

function deleteSurveyDB(user, surveyID){
    return false;
}
function getShareCodeDB(surveyID){
    return false;
}

app.post('/api/survey/create', async (req, res) => {
  try {
    const accountInfo = JSON.parse(req.body.accountInfo);
    const result = await createSurveyDB(accountInfo.id, req.body.surveyData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});
>>>>>>> Stashed changes
