
import React, { useState } from 'react';
import styles from './Profile.module.css';

function Profile() {
    const [name, setName] = useState("John Smith");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div className={styles.container}>
            <title>Profile - Birzeit Vote</title>

            <header className={styles.header}>
                <h1>Birzeit Vote</h1>
                <nav className={styles.nav}>
                    <button className={styles.navButton}>Dashboard</button>
                    <button className={`${styles.navButton} ${styles.active}`}>Profile</button>
                    <button className={`${styles.navButton} ${styles.logoutButton}`}>Logout</button>
                </nav>
            </header>

            <main className={styles.profileContainer}>
                <h2>Profile</h2>
                <div className={styles.profileContent}>
                    <div className={styles.profileImage}>
                        <img src="https://via.placeholder.com/150" alt="Profile Picture" />
                    </div>
                    <div className={styles.profileInfo}>
                        <h3>Information</h3>
                        <div className={styles.infoItem}>
                            <label htmlFor="name">Name</label>
                            <div className={styles.infoContent}>
                                <input type="text" id="name" value={name} onChange={handleNameChange} />
                                <button className={styles.editButton}>✏️</button>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <label>University Number</label>
                            <p>1202661</p>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Email</label>
                            <p>1202661@student.birzeit.edu</p>
                        </div>
                    </div>
                </div>
                <div className={styles.securitySection}>
                    <h3>Password and Security</h3>
                    <button className={styles.updatePasswordButton}>Update Password</button>
                </div>
                <button className={styles.logoutButton}>Log Out</button>
            </main>

            <footer className={styles.footer}>
                © 2024/25 BirzeitVote - All Rights Reserved
            </footer>
        </div>
    );
}

export default Profile;