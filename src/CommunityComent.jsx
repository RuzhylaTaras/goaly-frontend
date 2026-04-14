import React from 'react';

// Приймаємо автора, текст та час створення
function CommunityComment({ author, text, time }) {
  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '15px 20px', 
      borderRadius: '8px', 
      marginBottom: '15px',
      borderLeft: '4px solid #3498db'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <strong style={{ color: '#2c3e50' }}>{author}</strong>
        <span style={{ color: '#95a5a6', fontSize: '0.85rem' }}>{time}</span>
      </div>
      <p style={{ margin: 0, color: '#333', lineHeight: '1.5' }}>{text}</p>
    </div>
  );
}

export default CommunityComment;