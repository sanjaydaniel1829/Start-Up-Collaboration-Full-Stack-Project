import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  UserCircleIcon,
  ChatBubbleOvalLeftIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      name: 'Startup Ideas',
      description: 'Get inspired by our curated collection of startup ideas',
      icon: LightBulbIcon,
      path: '/feed'
    },
    {
      name: 'Community',
      description: 'Connect with other entrepreneurs and share your journey',
      icon: UserGroupIcon,
      path: '/profile'
    },
    {
      name: 'Market Analysis',
      description: 'Access market research and industry insights',
      icon: ChartBarIcon,
      path: '/feed'
    },
    {
      name: 'Funding',
      description: 'Explore funding opportunities and investment options',
      icon: CurrencyDollarIcon,
      path: '/feed'
    },
    {
      name: 'News',
      description: 'Stay updated with the latest startup news',
      icon: NewspaperIcon,
      path: '/feed'
    }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-primary">StartupNewbiez</span>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {features.map((feature) => (
                <a
                  key={feature.name}
                  href={feature.path}
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-primary hover:text-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(feature.path);
                  }}
                >
                  {feature.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.profilePicture || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'}
                      alt="User avatar"
                    />
                  </button>
                </div>

                {isMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                    >
                      Your Profile
                    </a>
                    <a
                      href="/chat"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/chat');
                        setIsMenuOpen(false);
                      }}
                    >
                      Messages
                    </a>
                    <button
                      onClick={signout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Sign in
              </button>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {features.map((feature) => (
              <a
                key={feature.name}
                href={feature.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(feature.path);
                  setIsMenuOpen(false);
                }}
              >
                {feature.name}
              </a>
            ))}

            {user ? (
              <div className="border-t border-gray-200">
                <button
                  onClick={signout}
                  className="block w-full px-3 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="block w-full rounded-md bg-primary px-3 py-2 text-base font-medium text-white hover:bg-primary-dark"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
