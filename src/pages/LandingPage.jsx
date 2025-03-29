import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      name: 'Startup Ideas',
      description: 'Get inspired by our curated collection of startup ideas',
      icon: LightBulbIcon,
      href: '/feed'
    },
    {
      name: 'Community',
      description: 'Connect with other entrepreneurs and share your journey',
      icon: UserGroupIcon,
      href: '/profile'
    },
    {
      name: 'Market Analysis',
      description: 'Access market research and industry insights',
      icon: ChartBarIcon,
      href: '/feed'
    },
    {
      name: 'Funding',
      description: 'Explore funding opportunities and investment options',
      icon: CurrencyDollarIcon,
      href: '/feed'
    },
    {
      name: 'News',
      description: 'Stay updated with the latest startup news',
      icon: NewspaperIcon,
      href: '/feed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <path
            fill="url(#6c63ff)"
            fillOpacity="0.3"
            d="M55.5039 119.313c-.879 0-1.751-.518-1.989-1.385C51.01 90.055 41.58 72.7 31.339 62.48a51.667 51.667 0 0 0-27.133 3.223C2.944 68.717.133 88.731.032 105.5c-.01 1.716.556 3.37 1.453 4.517C5.693 130.304 15.59 142 27.5 142c7.23 0 13.885-1.178 19.234-3.502a44.661 44.661 0 0 0 13.25-10.453c4.365-4.736 6.863-10.727 6.862-17.622a58.665 58.665 0 0 0 .21-11.796c0-8.075-3.087-15.405-9.244-21.087C58.524 103.83 56.373 102.828 55.504 101.438c-.869-1.39-1.763-1.39-2.66 0Z"
          />
          <defs>
            <linearGradient
              id="6c63ff"
              x1="64.06"
              x2="32.1"
              y1=".171"
              y2="47.208"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6C63FF" />
              <stop offset="1" stopColor="#6C63FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Welcome to StartupNewbiez
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Join our community of aspiring entrepreneurs and startup enthusiasts. Connect, learn, and grow together on your journey to success.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center gap-x-6"
            >
              <button
                onClick={() => navigate('/login')}
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:flex-none xl:ml-32"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[768px] rounded-md shadow-2xl ring-1 ring-gray-400/10"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8" id="features">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Get access to a comprehensive set of tools and resources designed to help you build and grow your startup.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm font-semibold leading-6 text-primary">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
