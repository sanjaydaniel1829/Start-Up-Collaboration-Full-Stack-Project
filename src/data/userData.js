export const userProfile = {
  id: '1',
  name: 'John Doe',
  username: '@johndoe',
  bio: 'Entrepreneur | Tech Enthusiast | Building the future one line of code at a time',
  location: 'San Francisco, CA',
  website: 'https://johndoe.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
  cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  followers: 1250,
  following: 850,
  posts: 56,
  joined: 'March 2023',
  stats: {
    views: 25000,
    likes: 12000,
    comments: 3500
  },
  socialLinks: {
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe'
  }
};

export const userPosts = [
  {
    id: 1,
    content: 'Just launched our new AI-powered platform! Excited to see how it performs in the market.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    likes: 256,
    comments: 45,
    timestamp: '2 hours ago',
    type: 'text',
    stats: {
      views: 1200,
      shares: 35
    }
  },
  {
    id: 2,
    content: 'Tech news: Web3 startups are revolutionizing the industry! Exploring the possibilities.',
    image: 'https://images.unsplash.com/photo-1549213875-8284d0336c4f',
    likes: 189,
    comments: 32,
    timestamp: '4 hours ago',
    type: 'text',
    stats: {
      views: 850,
      shares: 20
    }
  },
  {
    id: 3,
    content: 'Just closed our seed funding round! Thank you to everyone who believed in our vision.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    likes: 321,
    comments: 56,
    timestamp: '6 hours ago',
    type: 'text',
    stats: {
      views: 1500,
      shares: 45
    }
  },
  {
    id: 4,
    content: 'Tech trends: The future of work is here! Exploring remote-first strategies.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    likes: 215,
    comments: 28,
    timestamp: '8 hours ago',
    type: 'text',
    stats: {
      views: 950,
      shares: 30
    }
  },
  {
    id: 5,
    content: 'Just launched our MVP! Can\'t wait to see how it performs in the market.',
    image: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e',
    likes: 198,
    comments: 38,
    timestamp: '10 hours ago',
    type: 'text',
    stats: {
      views: 1100,
      shares: 32
    }
  }
];
