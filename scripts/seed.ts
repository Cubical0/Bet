import * as dotenv from 'dotenv';
// Load env variables
dotenv.config();

const { User } = require('../src/models/User');
const connectDB = require('../src/lib/db').default;

// Log the MONGODB_URI to verify it's loaded (we'll remove this after confirming)
console.log('MONGODB_URI:', process.env.MONGODB_URI);

async function seed() {
  try {
    await connectDB();
    
    // Default user credentials
    const defaultUser = {
      username: 'admin',
      password: 'happynotsad'  // you can change this to your preferred password
    };

    // Check if user already exists
    const existingUser = await User.findOne({ username: defaultUser.username });
    
    if (existingUser) {
      console.log('Default user already exists');
      process.exit(0);
    }

    // Create new user
    const user = await User.create(defaultUser);
    console.log('Default user created successfully:', user);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed(); 