import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; 
import { doc, updateDoc } from 'firebase/firestore';

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [filter, setFilter] = useState('all');

  // 1. GET ЗАПИТ: Отримуємо цілі з НАШОГО Node.js сервера (Вимога 5-ї лаби)
  const fetchGoals = async () => {
    if (!auth.currentUser) return;
    try {
      const response = await fetch(`https://goaly-backend.onrender.com/api/goals?userId=${auth.currentUser.uid}`);
      const data = await response.json();
      
      // Сортуємо цілі за датою створення (найновіші зверху)
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setGoals(sortedData);
    } catch (error) {
      console.error("Помилка завантаження з сервера:", error);
    }
  };

  // Завантажуємо цілі при відкритті сторінки
  useEffect(() => {
    fetchGoals();
  }, []);

  // 2. POST ЗАПИТ: Зберігаємо нову ціль через НАШ сервер (Вимога 5-ї лаби)
  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!title || !deadline) return;

    const newGoal = {
      title: title,
      deadline: deadline,
      userId: auth.currentUser.uid
    };

    try {
      const response = await fetch("https://goaly-backend.onrender.com/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal)
      });

      if (response.ok) {
        setTitle('');
        setDeadline('');
        fetchGoals(); // Оновлюємо список після додавання
      }
    } catch (error) {
      console.error("Помилка збереження на сервер:", error);
    }
  };

  // Зміна статусу залишається (щоб не ламати UI)
  const toggleGoalStatus = async (id, currentStatus) => {
    try {
      const goalRef = doc(db, "goals", id);
      await updateDoc(goalRef, {
        status: currentStatus === 'completed' ? 'active' : 'completed'
      });
      fetchGoals(); // Оновлюємо список
    } catch (error) {
      console.error("Помилка оновлення статусу:", error);
    }
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return goal.status === 'active';
    if (filter === 'completed') return goal.status === 'completed';
    return true;
  });

  const completedCount = goals.filter(g => g.status === 'completed').length;

  return (
    <div className="content-section bg-light">
      <div className="section-header">
        <h2>Мої Цілі</h2>
        <div className="divider"></div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3>Загальний прогрес: Виконано {completedCount} з {goals.length}</h3>
      </div>

      <form className="custom-form" onSubmit={handleAddGoal} style={{ marginBottom: '40px' }}>
        <div className="form-row">
          <div className="form-group">
            <label>Назва цілі:</label>
            <input type="text" placeholder="Наприклад: Вивчити React" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Дедлайн:</label>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn submit-btn">Додати ціль</button>
      </form>

      <div style={{ textAlign: 'center', marginBottom: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button className={`btn-outline ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Всі</button>
        <button className={`btn-outline ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Активні</button>
        <button className={`btn-outline ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Завершені</button>
      </div>

      <div className="goals-container">
        {filteredGoals.map(goal => (
          <div key={goal.id} className={`goal-card ${goal.status === 'completed' ? 'completed' : ''}`}>
            <h3>{goal.title}</h3>
            <p className="deadline-text">Дедлайн: {goal.deadline}</p>
            <button className={`btn-outline ${goal.status === 'completed' ? 'active' : ''}`} onClick={() => toggleGoalStatus(goal.id, goal.status)}>
              {goal.status === 'completed' ? 'Відновити' : '✔ Виконано'}
            </button>
          </div>
        ))}
        {filteredGoals.length === 0 && <p style={{ textAlign: 'center', width: '100%' }}>Цілей поки немає. Додайте першу!</p>}
      </div>
    </div>
  );
}

export default GoalsPage;