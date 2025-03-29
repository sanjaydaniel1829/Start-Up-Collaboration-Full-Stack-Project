import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Post, User } from '../services/mongoService.js';
import PostForm from '../components/PostForm';

export default function Profile() {
  const { user, signout, loading } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80');
  const [name, setName] = useState('Sanjay Daniel');
  const [username, setUsername] = useState('sanjaydaniel');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load posts from MongoDB
    const loadPosts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const userPosts = await Post.find({ 'author.id': userId });
        setPosts(userPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      // Save profile updates to MongoDB
      const userId = localStorage.getItem('userId');
      await User.findByIdAndUpdate(userId, {
        name,
        username,
        profilePicture: profilePic,
        bio,
        location,
        website
      });

      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              {editMode && (
                <>
                  <button
                    className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1 hover:bg-primary-dark"
                    onClick={() => setShowProfilePicModal(true)}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    className="absolute -bottom-2 -left-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-500"
                    onClick={() => setProfilePic('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {editMode ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full max-w-md text-3xl font-bold text-gray-900 focus:outline-none"
                  />
                ) : (
                  <span>{name}</span>
                )}
              </h1>
              <p className="text-xl text-gray-500">
                {editMode ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full max-w-md text-xl text-gray-500 focus:outline-none"
                  />
                ) : (
                  <span>{username}</span>
                )}
              </p>
              <p className="mt-2 text-gray-600">
                {editMode ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full max-w-md text-gray-600 focus:outline-none"
                  />
                ) : (
                  <span>{location}</span>
                )}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-500">Following</p>
              </div>
            </div>

            {/* Bio and Actions */}
            <div className="mt-8">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                {editMode ? (
                  <div className="mt-2">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="3"
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-gray-600">{bio}</p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Location</h2>
                {editMode ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-gray-600">{location}</p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Website</h2>
                {editMode ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-gray-600">{website}</p>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
                {editMode && (
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Post Form */}
            <div className="mt-8">
              <PostForm onPostCreated={handlePostCreated} />
            </div>

            {/* Posts */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts</h2>
              <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-x-4 mb-4">
                        <img
                          src={profilePic}
                          alt={name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {name}
                          </p>
                          <p className="text-xs leading-5 text-gray-500">
                            {post.timestamp}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm leading-6 text-gray-900">
                          {post.content}
                        </p>
                      </div>

                      {post.imageUrl && (
                        <div className="mt-4">
                          <img
                            src={post.imageUrl}
                            alt={post.content}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                          <button className="text-gray-500 hover:text-gray-900">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="ml-1">{post.likes}</span>
                          </button>
                          <button className="text-gray-500 hover:text-gray-900">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="ml-1">{post.comments}</span>
                          </button>
                          <button className="text-gray-500 hover:text-gray-900">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-x-4">
                          <button className="text-gray-500 hover:text-gray-900">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-900">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Picture Upload Modal */}
      {showProfilePicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload a new profile picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowProfilePicModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowProfilePicModal(false);
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
