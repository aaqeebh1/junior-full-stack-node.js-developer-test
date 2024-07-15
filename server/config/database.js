import { connect } from 'mongoose';

// Connection URL
const databaseUri = 'mongodb+srv://aaqeebh1:KIi3Ps9Wtzm4jGrA@cluster0.upgyzfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//  Connect to the database

const connectToDatabase = async () => { 
    try {
        const connection = await connect(databaseUri);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error )
    }
}

export default connectToDatabase;