// Mock database for development
const mockData = {
  users: [],
  posts: [],
  chats: [],
  messages: []
};

// Mock User model
const User = {
  findById: async (id) => {
    return mockData.users.find(user => user._id === id);
  },
  findByIdAndUpdate: async (id, updates) => {
    const user = mockData.users.find(user => user._id === id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }
};

// Mock Post model
const Post = {
  find: async (query) => {
    return mockData.posts.filter(post => post.author.id === query['author.id']);
  },
  create: async (post) => {
    post._id = Date.now().toString();
    mockData.posts.push(post);
    return post;
  }
};

// Mock Chat model
const Chat = {
  find: async (query) => {
    return mockData.chats.filter(chat => chat.participantIds.includes(query.participantId));
  },
  create: async (chat) => {
    chat._id = Date.now().toString();
    mockData.chats.push(chat);
    return chat;
  }
};

// Mock Message model
const Message = {
  find: async (query) => {
    return mockData.messages.filter(message => message.chatId === query.chatId);
  },
  create: async (message) => {
    message._id = Date.now().toString();
    mockData.messages.push(message);
    return message;
  }
};

// Initialize mock data
if (mockData.users.length === 0) {
  mockData.users.push({
    _id: 'user1',
    name: 'Sanjay Daniel',
    username: 'sanjaydaniel',
    email: 'sanjay@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    bio: '',
    location: '',
    website: '',
    followers: 0,
    following: 0
  });
}

console.log('Using mock database for development');

export { User, Post, Chat, Message };
