import { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const { messages, sendMessage, activeChat, setActiveChat } = useChat();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);

  // Sample contacts data
  const contacts = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      lastMessage: 'Hi there!',
      timestamp: '10:30 AM',
      unread: 2
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      lastMessage: 'How are you?',
      timestamp: '9:45 AM',
      unread: 0
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && activeChat) {
      sendMessage(message, activeChat.id);
      setMessage('');
    }
  };

  const handleEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmoji(false);
  };

  const handleGif = (gif) => {
    const newMessage = {
      id: Date.now().toString(),
      content: gif,
      sender: true,
      timestamp: new Date().toISOString(),
      isUser: true,
      type: 'gif'
    };
    if (activeChat) {
      sendMessage(newMessage, activeChat.id);
    }
    setShowGif(false);
  };

  const handleContactClick = (contact) => {
    setActiveChat(contact);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Contacts Sidebar */}
      <div className="w-64 h-full border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user.profilePicture || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'}
                alt={user.name}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="px-4">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
                placeholder="Search"
              />
            </div>
          </div>

          <nav className="mt-5 px-2" aria-label="Contacts">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className={`group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  activeChat?.id === contact.id ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={contact.avatar}
                    alt={contact.name}
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <span className="truncate font-medium">{contact.name}</span>
                  <span className="mt-1 truncate text-sm text-gray-500">{contact.lastMessage}</span>
                </div>
                <div className="ml-4 flex-shrink-0 text-right">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {contact.timestamp}
                  </span>
                  {contact.unread > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-200">
          <div className="px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={activeChat?.avatar || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'}
                      alt={activeChat?.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {activeChat?.name || 'Select a contact'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          {activeChat && messages[activeChat.id] ? (
            <div className="px-4 py-2">
              {messages[activeChat.id].map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mt-4`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      msg.isUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.type === 'gif' ? (
                      <img
                        src={msg.content}
                        alt="GIF"
                        className="max-w-[300px]"
                      />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                    <p className="text-xs mt-1 text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a contact to start chatting</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex flex-1 items-center gap-x-3 bg-white px-4 py-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              😊
            </button>

            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setShowGif(!showGif)}
            >
              🎭
            </button>

            <div className="flex-1 min-w-0">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={activeChat ? 'Type a message' : 'Select a contact to start chatting'}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!message.trim() || !activeChat}
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                !message.trim() || !activeChat
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              Send
            </button>
          </form>

          {/* Emoji Picker */}
          {showEmoji && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="grid grid-cols-8 gap-2 p-2">
                {['😊', '😂', '😍', '🤔', '😎', '🥳', '🥰', '🤩'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmoji(emoji)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GIF Picker */}
          {showGif && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-2">
                <p className="text-sm text-gray-500 mb-2">Popular GIFs</p>
                <div className="grid grid-cols-2 gap-2">
                  {['https://media.tenor.com/1234567890/gif', 'https://media.tenor.com/0987654321/gif'].map((gif) => (
                    <button
                      key={gif}
                      onClick={() => handleGif(gif)}
                      className="relative aspect-square"
                    >
                      <img
                        src={gif}
                        alt="GIF"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
