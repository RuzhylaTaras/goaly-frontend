import React, { useState } from 'react';

function CommunityPage() {
  const [comments, setComments] = useState([
    { id: 1, text: 'Діліться своїми історіями успіху!' },
    { id: 2, text: 'Допоможіть іншим або знайдіть ментора.' }
  ]);
  const [newComment, setNewComment] = useState('');

  const addComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    setComments([...comments, { id: comments.length + 1, text: newComment }]);
    setNewComment('');
  };

  return (
    <div className="content-section">
      <h2 style={{ textAlign: 'center' }}>Спільнота</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
        Обмінюйтеся досвідом, давати поради та підтримувати інших користувачів.
      </p>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={addComment} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Напишіть коментар..." 
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button type="submit" className="btn">Надіслати</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {comments.map(c => (
            <div key={c.id} style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #ff6347' }}>
              <p style={{ margin: 0 }}>💬 {c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;