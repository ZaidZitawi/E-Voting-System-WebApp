import React, { useState } from 'react';
import styles from './Home.module.css';
import blockchan from '../assets/blockchan.jpg';
import mohammad from '../assets/Mohammad.jpg';
import zaid from '../assets/Mohammad.jpg';
import maen from '../assets/Mohammad.jpg';



function Home() {
  // State for managing form input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending form data (you can replace this with actual form submission logic)
    alert('Message sent!');
  };

  return (
    <>
      {/* Set title dynamically */}
      <head>
        <title>Birzeit Vote</title>
      </head>

      {/* Header Section */}
      <header className={styles.header}>
        <h1>Birzeit Vote</h1>
        <div className={styles.headerButtons}>
          <button className={styles.headerButton}>Login</button>
          <button className={styles.headerButton}>Register</button>
        </div>
      </header>

      {/* Why Birzeit Vote Section */}
      <section className={styles.whySection}>
        <h2>Why Birzeit Vote?</h2>
        <p>Experience a safe, transparent, and efficient way to participate in elections. With Birzeit Vote, you can be sure that your voice is counted.</p>
        <img src={blockchan} alt="Safe Elections" className={styles.whyImage} />
      </section>

      {/* Who We Are Section */}
      <section className={styles.whoWeAre}>
        <h2>Who We Are</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src={zaid} alt="Zaid Zetawi" className={styles.cardImage} />
            <h3>Zaid Zetawi</h3>
            <p>Lead Developer</p>
          </div>
          <div className={styles.card}>
            <img src={maen} alt="Maen Al-Amlah" className={styles.cardImage} />
            <h3>Maen Al-Amlah</h3>
            <p>Project Manager</p>
          </div>
          <div className={styles.card}>
            <img src={mohammad} alt="Mohammad Obeid" className={styles.cardImage} />
            <h3>Mohammad Obeid</h3>
            <p>Designer</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className={styles.contactSection}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.inputField}
            rows="4"
            required
          ></textarea>
          <button type="submit" className={styles.contactButton}>
            Send Message
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        © 2024/25 BirzeitVote 
      </footer>
    </>
  );
}

export default Home;
