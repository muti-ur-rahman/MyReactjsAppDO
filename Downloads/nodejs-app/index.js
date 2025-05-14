import express from 'express';  
import bodyParser from 'body-parser';  
import connect from './mongoc.js'; // MongoDB connection module  

const app = express();  
const PORT = 4000;  

// Middleware to parse JSON requests  
app.use(bodyParser.json());  

// Root route example  
app.get('/', (req, res) => {  
    res.send('Hello World, from express!');  
});  

// POST route to add a new user  
app.post('/addUser', async (req, res) => {  
    const db = await connect();  
    const collection = db.collection('users');  
    let newDocument = req.body;  
    newDocument.date = new Date();  
    const result = await collection.insertOne(newDocument);  
    console.log('Result:', result);  
    res.status(201).send(result.ops[0]); // Send the created user  
});  

// GET route to retrieve all users  
app.get('/getUsers', async (req, res) => {  
    const db = await connect();  
    const collection = db.collection('users');  
    let results = await collection.find({}).toArray();  
    res.status(200).send(results); // Send the list of users  
});  

// Start the server  
app.listen(PORT, () => {  
    console.log('Server is listening on port ' + PORT);  
});  