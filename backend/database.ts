
/*
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const uri = process.env.URI;
const clientOptions = { dbName: 'surveydatabase' };
*/

// SCHEMA

// P/N: The schema can likely be moved out into a separate file
//   and imported to make them easier to parse

// A schema has the instructions for a collection/table
// 'versionKey' is false b/c otherwise we'd have an extra attribute '__v'
/*
const userSchema = new mongoose.Schema({ 
    //_id: {type: String, required: true},
    fname: { type: String, required: true }, 
    lname: { type: String, default: "" }, 
    balance: { type: Number, default: 0 }
}, {
  versionKey: false
});

const ticketSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  eventName: { type: String, default: null }, 
  eventDate: { type: Date, default: null }
}, {
  versionKey: false
});

// P/N: Offers and bids have the same attributes and as such can use the same schema
const tradeSchema = new mongoose.Schema({ 
  ticketId: { type: mongoose.ObjectId, required: true }, 
  userId: { type: String, required: true }, 
  price: { type: Number, required: true }
}, {
  versionKey: false
});

// MODEL

// A model uses a created schema to define a collection/table
// Note that the name of the model is singular, but is plural in MongoDB Atlas
const userModel = mongoose.model("user", userSchema);
const ticketModel = mongoose.model("ticket", ticketSchema);
const offerModel = mongoose.model("offer", tradeSchema);
const bidModel = mongoose.model("bid", tradeSchema);

// INSERT

// Create a variable of type 'userModel' which prepares data to be inserted into the collection
// In order for it to be fully added, you must use '.save()'
const createUser = async (_id, fname = "", lname = "", balance = 0) => {
  let user = new userModel({ 
    _id: _id,
    fname: fname,
    lname: lname, 
    balance: balance 
  });
  if (boolShowUserLogs) console.log("User has been created:\n  _id:", _id, "\n  fname:", user.fname, "\n  lname:", user.lname, "\n  balance:", balance);
  await user.save();
  if (boolShowUserLogs) console.log("User has been saved");
  return user;
};

const createTicket = async (sellerId, eventName = "", eventDate = null) => {
  let ticket = new ticketModel({ 
    sellerId: sellerId,
    eventName: eventName, 
    eventDate: eventDate 
  }); 
  if (boolShowTicketLogs) console.log("Ticket has been created:\n  sellerId:", sellerId, "\n  eventName:", eventName, "\n  eventDate:", eventDate);
  await ticket.save();
  if (boolShowTicketLogs) console.log("Ticket has been saved");
  return ticket;
};

const createOffer = async (ticketId, userId, price) => {
  let offer = new offerModel({ 
    ticketId: ticketId,
    userId: userId, 
    price: price
  }); 
  if (boolShowTradeLogs) console.log("Offer has been created:\n  ticketId:", ticketId, "\n  userId:", userId, "\n  price:", price);
  await offer.save();
  if (boolShowTradeLogs) console.log("Offer has been saved");
};

const createBid = async (ticketId, userId, price) => {
  let bid = new bidModel({ 
    ticketId: ticketId,
    userId: userId, 
    price: price
  }); 
  if (boolShowTradeLogs) console.log("Bid has been created:\n  ticketId:", ticketId, "\n  userId:", userId, "\n  price:", price);
  await bid.save();
  if (boolShowTradeLogs) console.log("Bid has been saved");
};

// DELETE

const deleteUser = async (_id) => {
  await userModel.deleteOne({ _id: _id });
}

const clearUsers = async () => {
  await userModel.deleteMany({ });
}

// UPDATE

const updateUserName = async (userId, fname = "", lname = "") => {
    await userModel.updateOne({ _id: userId }, { fname: fname , lname: lname});
}

const changeUserBalance = async (userId, change) => {
  await userModel.updateOne({ _id: userId }, { balance: balance + change });
}

const incrementUserBalance = async (userId, inc) => {
  await changeUserBalance(userId, inc); //userModel.updateOne({ _id: _id }, { balance: balance + inc });
}

const decrementUserBalance = async (userId, dec) => {
  await changeUserBalance(userId, -dec); //userModel.updateOne({ _id: _id }, { balance: balance - dec });
}

const setUserBalance = async (userId, newBalance) => {
  await userModel.updateOne({ _id: userId }, { balance: newBalance });
}

const resetUserBalance = async (userId) => {
  await setUserBalance(userId, 0);
}

const updateTicketEventName = async (ticketId, newEventName) => {
  await ticketModel.updateOne({ _id: ticketId }, { eventName: eventName });
}

const updateTicketEventDate = async (ticketId, newEventDate) => {
  await ticketModel.updateOne({ _id: ticketId }, { eventDate: eventDate });
}

// GET DATA

const getUserBalance = async (userId) => {
  const userBalance = await userModel.findById(userId, 'balance');
  return userBalance;
}

const getUserTickets = async (userId) => {
  const userTickets = await ticketModel.find({ sellerId: userId });
  return userTickets;
}

const getUserTicketIDs = async (userId) => {
  const userTicketIDs = await ticketModel.find({ sellerId: userId }, '_id');
  return userTicketIDs;
}

const getUserOffers = async (userId) => {
  const userOffers = await offerModel.find({ userId: userId });
  return userOffers;
}

const getUserOfferIDs = async (userId) => {
  const userOfferIDs = await offerModel.find({ userId: userId }, '_id');
  return userOfferIDs;
}

const getUserBids = async (userId) => {
  const userBids = await bidsModel.find({ userId: userId });
  return userBids;
}

const getUserBidIDs = async (userId) => {
  const userBidIDs = await bidsModel.find({ userId: userId });
  return userBidIDs;
}

const getTicketOffers = async (ticketId) => {
  const ticketOffers = await offerModel.find({ ticketId: ticketId });
  return ticketOffers;
}

const getTicketBids = async (ticketId) => {
  const ticketBids = await bidsModel.find({ ticketId: ticketId });
  return ticketBids;
}

// MAIN CODE

// Determines if console.logs run for insertions
boolShowUserLogs = false
boolShowTicketLogs = false
boolShowTradeLogs = false

// These boolean variables change if different tests are run
boolTestAllQuick = false
boolTestUser = false

const main = async () => {
  // We use try/finally so that we automatically disconnect once the promises are completed
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to database");

    // Runs any desired tests
    if (boolTestAllQuick) await testAllQuick();
    if (boolTestUser) await testAddUser();

  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Client Closed")
    await mongoose.disconnect();
  }
}; 

// Example test for functions
const testAddUser = async () => {
  await createUser("Seth", "Brown", "150");
  await createUser("Tim", undefined, 30);
  await createUser("Tom");
  await createUser("Paul", "Smith", 100);
  await createUser("Mary", "Jane", 20);
};

const testAllQuick = async () => {
  const testUserOne = await createUser("045", "Franklin", "Roosevelt", 300);
  const testUserTwo = await createUser("038", "George", "Washington", 250);
  if (boolShowUserLogs) console.log("Test User One:", testUserOne, "\nTest User Two:", testUserTwo);
  const testTicket = await createTicket(testUserOne._id, "Patriotic Event");
  const testOffer = await createOffer(testTicket._id, testUserOne._id, 40);
  const testBid = await createBid(testTicket._id, testUserTwo._id, 20);
}

const clearAll = async () => {
  await clearUsers();
  await clearTickets();
  await clearOffers();
  await clearBids();
}

main();

*/
/*

const userSchema = new mongoose.Schema({ 
    //_id: {type: String, required: true},
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: Number, required: true }
}, {
  versionKey: false
});

const userModel = mongoose.model("users", userSchema);

async function createUserDB(emailInput, passwordInput, nameInput){
    const found = await userModel.find({ email: emailInput });
    if(found.length > 0){
        // User with that email already exists!
        return false;
    }

    let newUser = new userModel({ 
        name: nameInput,
        email: emailInput,
        password: passwordInput,
      });

    await newUser.save();

    return newUser;
}

 async function loginUserDB(emailInput, passwordInput){
  const found = await userModel.find({ email: emailInput });

  // If a user with that email exists
  if(found.length > 0){
    // If the password matches
    if(found[0].password == passwordInput){
        return [true, found.token];
    }
  }

  return [false, "Didn't find user or password is wrong"];
}

 function createSurveyDB(user, surveyName){
    return false;
}

 function deleteSurveyDB(user, surveyID){
    return false;
}
 function getShareCodeDB(surveyID){
    return false;
}
    */