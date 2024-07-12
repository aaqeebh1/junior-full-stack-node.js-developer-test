import { connect } from 'mongoose';

// Connection URL
const databaseUrl = 'mongodb+srv://aaqeebh1:KIi3Ps9Wtzm4jGrA@cluster0.upgyzfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//  Connect to the database
connect(databaseUrl, {
})
.then(() => {console.log('Connected to MongoDB')})
.catch((error) => {console.error('Error connecting to MongoDB:', error)});