import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm'; 
import './MessageList.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

  useEffect(() => {
    fetchMessages();
    scrollToBottom(); // Scroll to the bottom of the message list container after content has loaded
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/messages/user/${encodeURIComponent(loggedInUserEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSubmit = async (newMessage) => {
    try {
      const response = await fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
      });
      if (response.ok) {
        console.log('Message sent successfully');
        fetchMessages(); // Refresh messages after sending
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Function to scroll to the bottom of the message list container
  const scrollToBottom = () => {
    const messageListContainer = document.querySelector('.message-list');
    messageListContainer.scrollTop = messageListContainer.scrollHeight;
  };

  return (
    <div className="message-list-container">
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${message.sender === loggedInUserEmail ? 'message-right' : 'message-left'}`}
          >
            <p><strong>{message.subject}</strong></p>
            <p>{message.body}</p>
            <p><em>From: {message.sender}</em></p>
            <p><em>To: {message.receiver}</em></p>
          </div>
        ))}
      </div>
      <div className="message-form-container">
        <MessageForm onMessageSubmit={handleMessageSubmit} />
      </div>
    </div>
  );
};

export default MessageList;
