import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Підключаємо наш Firebase
import './App.css';
// Імпортуємо всі наші сторінки
import HomePage from './HomePage';
import GoalsPage from './GoalsPage';
import CommunityPage from './CommunityPage';
import AuthPage from './AuthPage';
import ProfilePage from './ProfilePage';

// 🛡️ Наш "Охоронець": перевіряє, чи є користувач. Якщо ні - кидає на сторінку входу
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Перевіряємо статус користувача при завантаженні додатку
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Закінчили перевірку
    });
    
    return () => unsubscribe();
  }, []);

  // Поки Firebase перевіряє статус, показуємо текст завантаження
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2rem' }}>Завантаження... ⏳</div>;
  }

  return (
    <Router>
      <div>
        {/* НОВЕ: Оновлена навігація з клікабельними посиланнями (Link) */}
        <nav style={{ padding: '15px 50px', background: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h2 style={{ margin: 0, cursor: 'pointer' }}>Goaly</h2>
          </Link>
          
          <div>
            {user && (
              <Link to="/profile" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', borderBottom: '1px dashed white', paddingBottom: '2px' }}>
                Привіт, {user.displayName || user.email}!
              </Link>
            )}
          </div>
        </nav>

        <Routes>
          {/* Відкриті сторінки (доступні всім) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* 🔒 Захищені сторінки (доступні тільки зареєстрованим) */}
          <Route 
            path="/goals" 
            element={
              <ProtectedRoute user={user}>
                <GoalsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute user={user}>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/community" 
            element={
              <ProtectedRoute user={user}>
                <CommunityPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;