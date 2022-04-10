import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(
    {
        email: '',
        password: '',
    }
);

function handleChange(event) {
    const value = event.target.value;
    setUser({
        ...user,
        [event.target.name]: value
    });
}


return (
  <div>
      <form className="container">
          <label>Log in</label>
          <br></br>
          <label>Cal Poly Email</label>
              <input
                  className="inputBox"
                  type="text"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange} />
          <label>Password</label>
              <input
                  className="inputBox"
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleChange} />
      </form>
  </div>
)
}

export default App;