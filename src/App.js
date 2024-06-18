import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Redirect, Navigate } from 'react-router-dom';
import './App.css';
import Post from './Post';
import Login from './Login';

const BASE_URL = 'http://localhost:8000/';

function App() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + 'posts/')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        console.log("Fetched data: ", data); // Log the data to check its structure
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        alert("Error fetching posts");
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="/"
            element={
              auth ? (
                <div className="app_posts">
                  {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                      <Post key={post.id} post={post} />
                    ))
                  ) : (
                    <p>No posts available</p>
                  )}
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;