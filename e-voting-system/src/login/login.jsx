import React, { useState } from 'react';
import styles from './login.module.css';

function Login() {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className={styles.container}>
      {/* <button className={styles.backButton}>&#x2190;</button> */}
      <h1>Birzeit Vote Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Number / Student Email"
          className={styles.inputField}
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.nextButton}>Login</button>
      </form>
      <div>
        <label>Don't have an account?</label>
        <button className={styles.registerButton}>Register</button>
      </div>
      <footer>© 2024/25 BirzeitVote</footer>
    </div>
  );
}

export default Login;
