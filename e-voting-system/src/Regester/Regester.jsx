import React, { useState } from 'react';
import styles from './Regester.module.css';

function Register() {
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null); // State to store the uploaded image

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the registration logic here
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    if (file) {
      setImage(file); // Save the selected file in state
    }
  };

  return (
    <div className={styles.container}>
      <h1>Birzeit Vote Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Student Email"
          className={styles.inputField}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student Number"
          className={styles.inputField}
          required
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          className={styles.inputField}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={styles.inputField}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="date" // Changed input type to 'date' for calendar picker
          placeholder="Date of Birth"
          className={styles.inputField}
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.inputField}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <select
          className={styles.inputField}
          required
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        >
          <option value="" disabled>Select Faculty</option>
          <option value="Faculty of Engineering">Faculty of Engineering</option>
          <option value="Faculty of Science">Faculty of Science</option>
          <option value="Faculty of Arts">Faculty of Arts</option>
        </select>

        <select
          className={styles.inputField}
          required
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="" disabled>Select Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mathematics">Mathematics</option>
        </select>

        {/* Updated input type to 'file' and restrict to image files */}
        <div className={styles.inputUpload}>
          <input
            type="file"
            accept="image/*" // Only allow image files
            onChange={handleImageChange} // Handle file change
          />
          {/* Display "No file chosen" only if no file is selected */}
          <span className={styles.fileName}>
            {image ? image.name : ""}
          </span>
        </div>

        <button type="submit" className={styles.registerButton}>Register</button>
        <button type="button" className={styles.cancelButton}>Cancel</button>
      </form>
      <div>
        <label>Already have an account?</label>
        <button type="button" className={styles.loginButton}>Login</button>
      </div>
      <footer>© 2024/25 BirzeitVote</footer>
    </div>
  );
}

export default Register;
