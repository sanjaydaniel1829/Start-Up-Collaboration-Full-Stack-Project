import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'userProfile.json');

export const saveUserProfile = (userData) => {
  localStorage.setItem('userProfile', JSON.stringify(userData));
};

export const loadUserProfile = () => {
  const data = localStorage.getItem('userProfile');
  return data ? JSON.parse(data) : null;
};
