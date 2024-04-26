import React, { useState, useContext } from 'react';

// Create a context for user authentication
const UserContext = React.createContext();

// Login component
const Login = () => {
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    setUser({ name: 'rohan', isAuthenticated: true });
  };

  return <button id="login-btn" onClick={handleLogin}>Login</button>;
};

// Signout component
const Signout = () => {
  const { setUser } = useContext(UserContext);

  const handleSignout = () => {
    setUser({ name: '', isAuthenticated: false });
  };

  return <button id="signout" onClick={handleSignout}>Signout</button>;
};

// Input component
const Input = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    addItem(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input id="shopping-input" type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
};

// Item component
const Item = ({ id, text, removeItem }) => {
  return (
    <li id={`item-${id}`}>
      {text}
      <button id={`remove-${id}`} onClick={() => removeItem(id)}>Remove</button>
    </li>
  );
};

// List component
const List = ({ items, removeItem }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <Item key={index} id={index} text={item} removeItem={removeItem} />
      ))}
    </ul>
  );
};

// Application component
const App = () => {
  const [user, setUser] = useState({ name: '', isAuthenticated: false });
  const [items, setItems] = useState([]);

  const addItem = (text) => {
    setItems([...items, text]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item, index) => index !== id));
  };

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <div id="current-user">
          Current user: {user.isAuthenticated ? `${user.name}, isAuthenticated: Yes` : '' }
        </div>
        <Login />
        <Signout />
      </UserContext.Provider>
      <Input addItem={addItem} />
      <List items={items} removeItem={removeItem} />
      <button id="clear-list" onClick={() => setItems([])}>Clear list</button>
    </div> //hii
  );
};

export default App;
