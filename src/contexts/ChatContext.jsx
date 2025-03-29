import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Initialize chat messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || {};
    setMessages(storedMessages);
  }, []);

  const sendMessage = (message, chatId) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: true,
      timestamp: new Date().toISOString(),
      isUser: true,
      type: 'text'
    };

    setMessages(prev => {
      const updatedMessages = { ...prev };
      if (!updatedMessages[chatId]) {
        updatedMessages[chatId] = [];
      }
      updatedMessages[chatId] = [...updatedMessages[chatId], newMessage];
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const value = {
    messages,
    activeChat,
    setActiveChat,
    sendMessage,
    typing,
    setTyping
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
