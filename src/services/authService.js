import bcrypt from 'bcryptjs';

// Mock database
const mockDb = {
  users: [
    {
      id: "1",
      email: "user1@startupnewbiez.com",
      password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
      name: "John Doe",
      createdAt: "2025-03-29T06:46:05.000Z",
      lastLogin: "2025-03-29T06:46:05.000Z"
    },
    {
      id: "2",
      email: "user2@startupnewbiez.com",
      password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
      name: "Jane Smith",
      createdAt: "2025-03-29T06:46:05.000Z",
      lastLogin: "2025-03-29T06:46:05.000Z"
    }
  ],
  sessions: new Map()
};

// Test password: password123
const testPassword = 'password123';

// Hash the test password for the first time
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Initialize the database with hashed passwords
const initDatabase = async () => {
  const hashedPassword = await hashPassword(testPassword);
  mockDb.users = mockDb.users.map(user => ({
    ...user,
    password: hashedPassword
  }));
};

initDatabase();

export const login = async (email, password) => {
  try {
    console.log('Attempting login with email:', email);
    const user = mockDb.users.find(u => u.email === email);
    
    if (!user) {
      console.log('No user found with email:', email);
      throw new Error('Invalid email or password');
    }

    console.log('Found user:', user.id, user.name);
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password match:', isValidPassword);
    
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate a session token
    const token = Math.random().toString(36).substring(2);
    mockDb.sessions.set(token, user.id);

    // Update last login time
    const now = new Date().toISOString();
    const updatedUser = { ...user, lastLogin: now };
    mockDb.users = mockDb.users.map(u => u.id === user.id ? updatedUser : u);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastLogin: now
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (email, password, name) => {
  try {
    if (mockDb.users.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: (mockDb.users.length + 1).toString(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    // Add to mock database
    mockDb.users.push(newUser);

    // Login the new user
    return login(email, password);
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = (token) => {
  mockDb.sessions.delete(token);
};

export const verifyToken = (token) => {
  return mockDb.sessions.has(token);
};

export const getUser = (token) => {
  const userId = mockDb.sessions.get(token);
  if (!userId) return null;
  return mockDb.users.find(u => u.id === userId);
};
