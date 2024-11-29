import React, { useState } from 'react';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getCalendarDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // For empty spaces before the first day of the month
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getCalendarDays();
    const rows = [];
    let cells = [];
    days.forEach((day, index) => {
      if (index % 7 === 0 && index !== 0) {
        rows.push(cells);
        cells = [];
      }
      cells.push(day);
    });
    if (cells.length) rows.push(cells); // Add the last row if necessary

    return rows;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}> 
        <h1>Birzeit Vote</h1>
        <nav>
          <button className={styles.navButton}>Dashboard</button>
          <button className={styles.navButton}>Profile</button>
          <button className={styles.logoutButton}>Logout</button>
        </nav>
      </header>

      <section className={styles.latestNews}>
        <h2>Latest News</h2>
        <ul>
          <li>New election announced for Student Council</li>
          <li>Voting system upgrade completed</li>
          <li>Candidate registration opens next week</li>
        </ul>
      </section>

      <section className={styles.liveElections}>
        <h2>Live Elections</h2>
        <ul>
          <li>
            <strong>Student Council Elections</strong> - 
            <a href="#">Go to Election</a>
          </li>
          <li>
            <strong>Sports Club Elections</strong> - 
            <a href="#">Go to Election</a>
          </li>
        </ul>
      </section>

      <section className={styles.upcomingEvents}>
        <h2>Upcoming Events</h2>
        <div className={styles.calendar}>
          <p>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          <button className={styles.nextMonthButton} onClick={getNextMonth}>Next Month</button>
          <table>
            <thead>
              <tr>
                <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
              </tr>
            </thead>
            <tbody>
              {renderCalendar().map((week, index) => (
                <tr key={index}>
                  {week.map((day, dayIndex) => (
                    <td key={dayIndex}>{day}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.candidatePosts}>
        <h2>Candidate Posts</h2>
        <div className={styles.postsContainer}>
          <article className={styles.post}>
            <h3>Candidate A</h3>
            <p>Promoting better campus facilities...</p>
          </article>
          <article className={styles.post}>
            <h3>Candidate B</h3>
            <p>Stronger student representation...</p>
          </article>
        </div>
      </section>

      <section className={styles.electionResults}>
        <h2>Election Results</h2>
        <ul>
          <li><strong>Student Council</strong>: Candidate A (60% votes)</li>
          <li><strong>Sports Club</strong>: Candidate C (55% votes)</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        © 2024/25 BirzeitVote - All Rights Reserved
      </footer>
    </div>
  );
};

export default Dashboard;
