import { useState } from 'react';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Stories() {
  const [stories] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      viewed: false,
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      viewed: false,
    },
    // Add more sample stories
  ]);

  const scrollContainer = (direction) => {
    const container = document.getElementById('stories-container');
    const scrollAmount = 200;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => scrollContainer('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={() => scrollContainer('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Stories Container */}
        <div
          id="stories-container"
          className="flex space-x-4 overflow-x-auto scrollbar-hide py-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Add Story Card */}
          <div className="flex flex-col items-center space-y-2 min-w-[150px]">
            <div className="relative w-40 h-56 bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary rounded-full p-3">
                  <PlusIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900">Add Story</span>
          </div>

          {/* Story Cards */}
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-2 min-w-[150px]">
              <div className="relative w-40 h-56 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <img
                  src={story.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center">
                    <img
                      src={story.user.avatar}
                      alt={story.user.name}
                      className={`h-8 w-8 rounded-full border-2 ${
                        story.viewed ? 'border-gray-400' : 'border-primary'
                      }`}
                    />
                    <span className="ml-2 text-sm font-medium text-white truncate">
                      {story.user.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
