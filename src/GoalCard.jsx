import React from 'react';

// Компонент приймає props: goal (дані цілі) та onToggle (функція кліку)
function GoalCard({ goal, onToggle }) {
  const isCompleted = goal.status === 'completed';

  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''}`}>
      <h3>{goal.title}</h3>
      <p className="deadline-text">Дедлайн: {goal.deadline}</p>
      
      <div className="progress-bar">
        {/* Якщо виконано - 100% заповнення, інакше - імітація прогресу */}
        <div 
          className="progress-fill" 
          style={{ width: isCompleted ? '100%' : '30%' }}
        ></div>
      </div>
      
      <button 
        className={`btn-outline ${isCompleted ? 'active' : ''}`}
        onClick={() => onToggle(goal.id)}
      >
        {isCompleted ? 'Відновити' : '✔ Виконано'}
      </button>
    </div>
  );
}

export default GoalCard;