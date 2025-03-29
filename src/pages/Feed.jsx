import { useState } from 'react';
import { posts } from '../data/feedData';

export default function Feed() {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest from the Startup Community
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Discover the latest news, insights, and updates from the startup world
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5"
              >
                <div className="p-6">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {post.author}
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

                  {post.image && (
                    <div className="mt-4">
                      <img
                        src={post.image}
                        alt={post.content}
                        className="w-full rounded-md"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                    >
                      <span className="mr-2">
                        {likedPosts.has(post.id) ? '✓' : '♥'}
                      </span>
                      {post.likes}
                    </button>
                    <button className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                      <span className="mr-2">💬</span>
                      {post.comments}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
