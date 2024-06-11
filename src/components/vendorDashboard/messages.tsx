import React, { useState, useEffect } from 'react';
import Nav from '@/components/vendorDashboard/nav';
import Aside from '@/components/vendorDashboard/Aside';
import styles from '@/styles/MessageList.module.css';
import axios from 'axios';

interface Message {
    id: string;
    sender: string;
    recipient: string;
    content: string;
    timestamp: string;
    read: boolean;
    archived: boolean;
    documents: string[];
  }
  
  interface MessageItemProps {
    message: Message;
  }
  
  const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

    const toggleMobileVisibility = () => {
      setIsMobileVisible(!isMobileVisible);
    };
    return (
      <div className="message-item bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="sender font-semibold text-gray-800">{message.sender}</div>
          <div className="timestamp text-gray-500 text-sm">{message.timestamp}</div>
        </div>
        <div className="content text-gray-700">{message.content}</div>
        {message.documents.length > 0 && (
          <div className="mt-2">
            <span className="text-gray-500 font-semibold">Attachments:</span>
            <ul className="list-disc list-inside">
              {message.documents.map((doc, index) => (
                <li key={index} className="text-blue-500 hover:underline">
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

interface InputBoxProps {
  onSendMessage: (content: string, documents: string[]) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [content, setContent] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);

  const handleSendMessage = () => {
    onSendMessage(content, documents);
    setContent('');
    setDocuments([]);
  };

  return (
    <div className="input-box">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        className="message-input flex-1 p-2 border border-gray-300 rounded outline-none text-base"
      />
      {/* Add input for documents */}
      <button onClick={handleSendMessage}
        className="send-button ml-2 px-4 py-2 bg-gray-800 text-white rounded transition-colors hover:bg-gray-700">
            Send
        </button>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  currentCategory: 'read' | 'archived' | 'all' | 'unread';
  onMessageClick: (message: Message) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentCategory, onMessageClick }) => {
  const filteredMessages = messages.filter((message) => {
    switch (currentCategory) {
      case 'read':
        return message.read;
      case 'archived':
        return message.archived;
      case 'unread':
        return !message.read;
      default:
        return true;
    }
  });

  return (
    <div className="message-list">
      {filteredMessages.map((message) => (
        <div key={message.id} onClick={() => onMessageClick(message)}>
          <MessageItem message={message} />
        </div>
      ))}
    </div>
  );
};

const API_BASE_URL = 'http://localhost:5000/api/v1/message';

const MessagingLayout: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentCategory, setCurrentCategory] = useState<'all' | 'read' | 'unread' | 'archived'>('all');
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [currentRecipient, setCurrentRecipient] = useState<string | null>(null);
  const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

    const toggleMobileVisibility = () => {
      setIsMobileVisible(!isMobileVisible);
    };

  useEffect(() => {
    const fetchMessages = async () => {
      const userId = 'user123'; // Replace with the actual user ID
      const response = await axios.get(`${API_BASE_URL}/messages/${userId}`);
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  const sendMessage = async (content: string, documents: string[]) => {
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

    const toggleMobileVisibility = () => {
      setIsMobileVisible(!isMobileVisible);
    };

    const newMessage: Omit<Message, 'id'> = {
      sender: 'user123', // Replace with the actual user ID
      recipient: 'user456', // Replace with the desired recipient ID
      content,
      timestamp: new Date().toLocaleString(),
      read: false,
      archived: false,
      documents,
    };
    const response = await axios.post(`${API_BASE_URL}/messages`, newMessage);
    setMessages((prevMessages) => [...prevMessages, response.data]);
  };

  const handleSendMessage = (content: string, documents: string[]) => {
    sendMessage(content, documents);
  };

  const handleMessageClick = async (clickedMessage: Message) => {
    setCurrentMessage(clickedMessage);
  
    // Fetch all messages from the sender of the clicked message
    const userId = clickedMessage.sender; // Replace with the actual user ID
    const senderId = 'user556';
    const response = await axios.get(`${API_BASE_URL}/messages/sender/${senderId}?userId=${userId}`);
    const senderMessages = response.data;
  
    // Update the messages state with the fetched sender messages
    setMessages(senderMessages);
  };

//   const handleMessageClick = (message: Message) => {
//     setCurrentMessage(message);
//   };

//   const handleMessageClick = (recipient: string, message: Message) => {
//     setCurrentRecipient(recipient);
//     setCurrentMessage(message);
//   };

  const handleCategoryChange = (category: 'all' | 'read' | 'unread' | 'archived') => {
    setCurrentCategory(category);
    setCurrentMessage(null);
  };

  return (
    <div className="messaging-layout w-[100%] h-screen bg-gray-100 font-sans">
        <Nav toggleMobileVisibility={toggleMobileVisibility} />
        <Aside isMobileVisible={isMobileVisible} />
        <div className='ml-8 mr-4'>
        <h1 className='text-red-900 mt-8 mb-2 font-bolder'>Messaging</h1>
        <p>Check here for your messages</p>
        <div className="sidebar-container w-95 text-gray-800 font-bolder p-5 mt-6">
  <div className="sidebar flex w-full">
    <div
      className={`category p-2 cursor-pointer rounded transition-colors ${
        currentCategory === 'all' ? 'text-red-900 border-b-2 border-red-900' : 'bg-transparent hover:bg-gray-700'
      }`}
      onClick={() => handleCategoryChange('all')}
    >
      All (14)
    </div>
    <div
      className={`category p-2 cursor-pointer rounded transition-colors ${
        currentCategory === 'read' ? 'text-red-900 border-b-2 border-red-900' : 'bg-transparent hover:bg-gray-700'
      }`}
      onClick={() => handleCategoryChange('read')}
    >
      Read
    </div>
    <div
      className={`category p-2 cursor-pointer rounded transition-colors ${
        currentCategory === 'unread' ? 'text-red-900 border-b-2 border-red-900' : 'bg-transparent hover:bg-gray-700'
      }`}
      onClick={() => handleCategoryChange('unread')}
    >
      Unread
    </div>
    <div
      className={`category p-2 cursor-pointer rounded transition-colors ${
        currentCategory === 'archived' ? 'text-red-900 border-b-2 border-red-900' : 'bg-transparent hover:bg-gray-700'
      }`}
      onClick={() => handleCategoryChange('archived')}
    >
      Archived
    </div>
  </div>
</div>


      {/* <div className="main-container flex-1 p-5 flex flex-col justify-between">
        {currentMessage ? (
          <div className="message-details flex bg-red-900 rounded p-5 shadow-md">
            <div className="message-content text-base leading-relaxed mb-4">{currentMessage.content}</div>
            <div className="message-info bg-red-900 flex justify-between text-sm text-gray-600">
              <span className={styles.messageSender}>{currentMessage.sender}</span>
              <span className={styles.messageTimestamp}>{currentMessage.timestamp}</span>
            </div>
          </div>
        ) : (
          <MessageList
            messages={messages}
            currentCategory={currentCategory}
            onMessageClick={handleMessageClick}
          />
        )}
        <InputBox onSendMessage={handleSendMessage} />
      </div> */}

<div className="chat-container bg-gray-100 rounded-lg shadow-md p-4">
  {currentMessage ? (
    <div className="message-details mb-4">
      <div className="message-content bg-white rounded-lg p-4 mb-2">
        {currentMessage.content}
      </div>
      <div className="message-info flex justify-between text-sm text-gray-500">
        <span className="message-sender font-semibold">
          {currentMessage.sender}
        </span>
        <span className="message-timestamp">
          {currentMessage.timestamp}
        </span>
      </div>
    </div>
  ) : (
    <MessageList
      messages={messages}
      currentCategory={currentCategory}
      onMessageClick={handleMessageClick}
    />
  )}

  <div className="chat-input flex">
    <input
      type="text"
      placeholder="Type your message..."
      className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button onClick={() => handleSendMessage}
        className="send-button ml-2 px-4 py-2 bg-gray-800 text-white rounded transition-colors hover:bg-gray-700">
            Send
        </button>
  </div>
</div>
    </div>
    </div>
  );
};

export default MessagingLayout;