import React, { useState } from 'react';
import { auth } from './firebase';
import { updateProfile, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const user = auth.currentUser;
  // Якщо в користувача вже є ім'я - беремо його, якщо ні - залишаємо порожнім
  const [name, setName] = useState(user?.displayName || '');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Функція для збереження нового імені
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName: name });
      setMessage('✅ Профіль успішно оновлено! (Оновіть сторінку, щоб побачити зміни зверху)');
    } catch (error) {
      setMessage('❌ Помилка оновлення: ' + error.message);
    }
  };

  // Функція для виходу з акаунта (вимога з методички!)
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth'); // Після виходу кидаємо на сторінку логіну
  };

  return (
    <div className="content-section bg-light" style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="custom-form" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h2>Налаштування профілю</h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>Ваш Email: <strong>{user?.email}</strong></p>

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Ім'я відображення:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Як до вас звертатися?"
            />
          </div>
          <button type="submit" className="btn">Зберегти зміни</button>
        </form>

        {message && <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#2c3e50' }}>{message}</p>}

        <div style={{ marginTop: '40px', borderTop: '2px solid #ecf0f1', paddingTop: '20px' }}>
          <button onClick={handleLogout} className="btn-outline" style={{ color: '#e74c3c', borderColor: '#e74c3c', width: '100%' }}>
            🚪 Вийти з акаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;