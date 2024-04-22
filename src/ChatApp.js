import React, { useState, useEffect, useRef } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [userList, setUserList] = useState([]);
  const [lastThreeUserLists, setLastThreeUserLists] = useState([]);
  const [emojis, setEmojis] = useState(['😀', '😂', '😍', '👍', '❤️', '🎉']);

  useEffect(() => {
    generateRandomUserList();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateRandomUserList = () => {
    const allUsers = ["Gautham", "Meghana", "Danny", "Harshi", "Rakesh", "Phani", "Gyani", "SK", "Jaggu Bhai", "Vinnie"];
    const shuffledUsers = shuffle(allUsers);
    const uniqueUsers = shuffledUsers.slice(0, 10);
    setUserList(uniqueUsers);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      const randomUser = getRandomUser();
      const newMessage = {
        user: randomUser,
        text: inputValue,
        likes: 0,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const getRandomUser = () => {
    let randomUser = userList.pop();
    if (userList.length === 0) {
      generateRandomUserList();
    }
    return randomUser;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleLike = (index) => {
    const newMessages = [...messages];
    newMessages[index].likes++;
    setMessages(newMessages);
  };

  const handleEmojiClick = (emoji) => {
    setInputValue(inputValue + emoji);
  };

  const renderEmojiOptions = () => {
    return (
      <div>
        {emojis.map((emoji, index) => (
          <span key={index} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => handleEmojiClick(emoji)}>{emoji}</span>
        ))}
      </div>
    );
  };

  const renderEmoji = (text) => {
    return text.split(/(:[a-zA-Z0-9_]+:)/g).map((part, index) => {
      if (part.startsWith(':') && part.endsWith(':')) {
        return <span key={index} role="img" aria-label={part}>{part}</span>;
      } else {
        return part;
      }
    });
  };

  const getUserLogo = (userName) => {
    const initial = userName.charAt(0).toUpperCase();
    return (
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" fill="#3498db" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="#fff">{initial}</text>
      </svg>
    );
  };

  return (
    <div style={{ maxWidth: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#EDF1F5' }}>
      <div style={{ flex: '0 0 auto', padding: '11px', backgroundColor: '#f9f9f9', borderBottom: '01px solid #ccc', textAlign: 'center' }}>
        <h1 style={{ margin: '0', marginLeft: '10px' }}>Snap Chat</h1>
      </div>
      <div style={{ flex: '1', overflowY: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ marginRight: '10px' }}>{getUserLogo(message.user)}</div>
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '10px', marginRight: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ marginBottom: '5px' }}>
                <strong style={{ color: '#333' }}>{message.user}</strong> ({message.timestamp})
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: '1' }}>{renderEmoji(message.text)}</div>
                <button style={{ backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleLike(index)}>Like ({message.likes})</button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ flex: '0 0 auto', padding: '20px', borderTop: '1px solid #ccc', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '5px 0 0 5px', fontSize: '14px', marginRight: '0' }}
          placeholder="Type your message here..."
        />
        <button style={{ width: '80px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '0 5px 5px 0', padding: '10px', cursor: 'pointer', fontSize: '14px' }} onClick={handleMessageSend}>Send</button>
        {renderEmojiOptions()}
      </div>
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export default ChatApp;
