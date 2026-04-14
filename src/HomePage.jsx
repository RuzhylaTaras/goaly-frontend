import React, { useState, useEffect } from 'react';

function HomePage() {
  // Стан для збереження тексту таймера
  const [timeLeft, setTimeLeft] = useState('');

  // Запуск таймера при завантаженні сторінки
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Встановлюємо кінець поточного дня (23:59:59)
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = endOfDay - now;

      // Вираховуємо години, хвилини та секунди
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      // Оновлюємо стан красивим текстом
      setTimeLeft(`⏳ До кінця дня залишилося: ${h} год ${m} хв ${s} сек. Дій!`);
    }, 1000); // Оновлення щосекунди

    // Очищення таймера при переході на іншу сторінку
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <section id="hero">
        <div className="hero-content">
          <h2>Досягай своїх цілей швидше</h2>
          <p>Плануй дедлайни, відстежуй прогрес та знаходь мотивацію у нашій спільноті.</p>
          <a href="/goals" className="btn">Перейти до моїх цілей</a>
          {/* Сюди виводиться наш працюючий таймер */}
          <p id="daily-timer" style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: '700', color: '#f1c40f' }}>
            {timeLeft}
          </p>
        </div>
      </section>

      <section id="progress" className="content-section bg-light">
        <div className="section-header">
          <h2>Ваш Прогрес</h2>
          <div className="divider"></div>
        </div>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          "Прогрес" містить візуалізацію досягнень (графіки, списки, нагороди).
        </p>
        
        <div className="cards-container">
          <div className="card">
            <h3>📊 Графіки</h3>
            <p>Аналітика вашої продуктивності</p>
            <button className="btn-outline">Переглянути</button>
          </div>
          <div className="card">
            <h3>📋 Списки</h3>
            <p>Усі виконані завдання</p>
            <button className="btn-outline">Відкрити</button>
          </div>
          <div className="card">
            <h3>🏆 Нагороди</h3>
            <p>Отримані бейджі та досягнення</p>
            <button className="btn-outline">До колекції</button>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <section className="footer-column">
            <h2>Goaly</h2>
            <ul>
              <li><a href="#">Про платформу</a></li>
              <li><a href="#">Правила спільноти</a></li>
              <li><a href="#">Політика конфіденційності</a></li>
            </ul>
          </section>
          
          <section className="footer-column">
            <h2>Розділи</h2>
            <ul>
              <li><a href="/goals">Мої цілі</a></li>
              <li><a href="#progress">Статистика</a></li>
              <li><a href="/community">Спільнота</a></li>
            </ul>
          </section>
          
          <section className="footer-column">
            <h2>Контакти</h2>
            <ul>
              <li><a href="mailto:support@goaly.ua">support@goaly.ua</a></li>
              <li><a href="tel:+380000000000">+380 68 541 8467</a></li>
              <li><a href="#">м. Львів, вул. Полуботка, 19</a></li>
            </ul>
          </section>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Goaly. Усі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;