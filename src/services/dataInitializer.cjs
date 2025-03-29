const mongoose = require('mongoose');
const { MONGODB_URI, DATABASE_NAME } = require('../config/mongoConfig.cjs');
const { User, Post, Chat, Message } = require('./mongoService.cjs');

// Sample data
const sampleUsers = [
  {
    name: 'Sanjay Daniel',
    username: 'sanjaydaniel',
    email: 'sanjay@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    bio: 'Entrepreneur and tech enthusiast',
    location: 'Mumbai',
    website: 'https://sanjaydaniel.com',
    followers: 0,
    following: 0,
    socialLinks: {
      twitter: 'https://twitter.com/sanjaydaniel',
      instagram: 'https://instagram.com/sanjaydaniel',
      linkedin: 'https://linkedin.com/in/sanjaydaniel',
      github: 'https://github.com/sanjaydaniel'
    }
  }
];

const samplePosts = [
  {
    content: 'Starting my journey with Start-Up Newbiez!',
    imageUrl: null,
    likes: 0,
    comments: 0
  },
  {
    content: 'Excited to connect with other entrepreneurs!',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    likes: 0,
    comments: 0
  }
];

const sampleChats = [
  {
    participantIds: ['user1', 'user2'],
    lastMessage: {
      content: 'Hello!',
      timestamp: new Date().toISOString(),
      senderId: 'user1'
    }
  }
];

const sampleMessages = [
  {
    chatId: 'chat1',
    senderId: 'user1',
    content: 'Hi there!',
    timestamp: new Date().toISOString()
  }
];

async function initializeData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB. Initializing data...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Chat.deleteMany({}),
      Message.deleteMany({})
    ]);

    // Create users
    const users = await User.insertMany(sampleUsers);
    console.log('Created users:', users.length);

    // Create posts for each user
    for (const user of users) {
      const posts = samplePosts.map(post => ({
        ...post,
        author: {
          id: user._id,
          name: user.name,
          username: user.username,
          avatar: user.profilePicture
        },
        timestamp: new Date().toISOString()
      }));
      await Post.insertMany(posts);
    }

    // Create chats
    const chats = await Chat.insertMany(sampleChats);
    console.log('Created chats:', chats.length);

    // Create messages
    const messages = await Message.insertMany(sampleMessages);
    console.log('Created messages:', messages.length);

    console.log('Data initialization completed successfully!');

  } catch (error) {
    console.error('Error initializing data:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

// Run the initialization
initializeData();
