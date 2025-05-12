import * as dotenv from 'dotenv';
dotenv.config();

const { User } = require('../src/models/User');
const connectDB = require('../src/lib/db').default;

async function seed() {
  try {
    await connectDB();
    
    const defaultUser = {
      username: 'admin',
      password: 'happynotsad'
    };

    const existingUser = await User.findOne({ username: defaultUser.username });
    
    if (existingUser) {
      console.log('Default user already exists');
      process.exit(0);
    }

    const user = await User.create(defaultUser);
    console.log('Default user created successfully:', user);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed(); 