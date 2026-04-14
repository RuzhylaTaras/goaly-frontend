import React, { useState } from 'react';
import { auth } from './firebase'; // Підключаємо наш файл конфігурації
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Стан для перемикання між Входом і Реєстрацією
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Хук для перенаправлення на іншу сторінку

  // Функція, яка спрацьовує при натисканні кнопки "Відправити"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки
    setError(''); // Очищаємо попередні помилки

    try {
      if (isLogin) {
        // Логіка ВХОДУ
        await signInWithEmailAndPassword(auth, email, password);
        alert('Успішний вхід! Вітаємо!');
        navigate('/goals'); // Перекидаємо на сторінку цілей
      } else {
        // Логіка РЕЄСТРАЦІЇ
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Акаунт успішно створено!');
        navigate('/goals');
      }
    } catch (err) {
      // Якщо пароль надто короткий або такий email вже є - покажемо помилку
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? 'Вхід у Goaly' : 'Реєстрація'}
        </h2>
        
        {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Ваш Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            type="password" 
            placeholder="Пароль (мінімум 6 символів)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" className="btn" style={{ width: '100%' }}>
            {isLogin ? 'Увійти' : 'Створити акаунт'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          {isLogin ? 'Немає акаунта? ' : 'Вже маєте акаунт? '}
          <span 
            style={{ color: '#3498db', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Зареєструватися' : 'Увійти'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;