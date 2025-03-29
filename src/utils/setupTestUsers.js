import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrS95acuX_wVaQj_1qH8HKwKrm_E2Pgy8",
  authDomain: "start-up-newbiez.firebaseapp.com",
  projectId: "start-up-newbiez",
  storageBucket: "start-up-newbiez.firebasestorage.app",
  messagingSenderId: "1043949779045",
  appId: "1:1043949779045:web:e066c0c8e541670760ee8c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const testUsers = [
  {
    email: "user1@startupnewbiez.com",
    password: "Test123!",
    name: "John Doe"
  },
  {
    email: "user2@startupnewbiez.com",
    password: "Test123!",
    name: "Jane Smith"
  }
];

async function createTestUsers() {
  try {
    for (const user of testUsers) {
      // Create user
      const userCredential = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );

      // Update profile
      await userCredential.user.updateProfile({
        displayName: user.name
      });

      // Store in Firestore
      await db.collection('users').doc(userCredential.user.uid).set({
        name: user.name,
        email: user.email,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user'
      });

      console.log(`Created user: ${user.email}`);
    }
    console.log('Test users created successfully!');
  } catch (error) {
    console.error('Error creating test users:', error);
  }
}

// Run the function
createTestUsers();
