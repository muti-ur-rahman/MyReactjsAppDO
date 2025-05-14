import { MongoClient } from 'mongodb';  

// Retrieve the password from environment variables and encode it  
// const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());  
// const connectionString = `mongodb+srv://integration_ninjas:${password}@devcluster.f9gv.mongodb.net/?retryWrites=true&w=majority`; // Connection string  

let conn;  

async function connect() {  
    const client = new MongoClient(connectionString);  
    try {  
        conn = await client.connect();  
        console.log("Connection successful");  
    } catch (e) {  
        console.error("Connection error:", e);  
    }  

    let db = conn.db('integration_ninjas'); // Reference your database  
    return db;  
}  

export default connect;  