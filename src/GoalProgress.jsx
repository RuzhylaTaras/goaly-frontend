import React from 'react';

// Компонент приймає загальну кількість цілей і кількість виконаних
function GoalProgress({ total, completed }) {
  // Вираховуємо відсоток успіху (захист від ділення на 0)
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ textAlign: 'center', marginBottom: '30px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Загальний прогрес</h3>
      <p style={{ fontWeight: '600', color: '#7f8c8d', marginBottom: '15px' }}>
        Виконано: {completed} з {total} ({percentage}%)
      </p>
      
      {/* Велика лінія прогресу */}
      <div className="progress-bar" style={{ maxWidth: '600px', margin: '0 auto', height: '12px', backgroundColor: '#ecf0f1' }}>
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%`, backgroundColor: '#27ae60', transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
}

export default GoalProgress;