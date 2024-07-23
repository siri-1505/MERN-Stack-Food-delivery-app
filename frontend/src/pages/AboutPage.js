import React from 'react';

export default function AboutPage() {
  const styles = {
    container: {
      backgroundColor: 'black',
      color: 'white',
      padding: '20px',
      minHeight: '100vh',
    },
    section: {
      marginBottom: '20px',
    },
    title: {
      fontSize: '2em',
      marginBottom: '10px',
      color:'orange'
    },
    text: {
      fontSize: '1em',
      lineHeight: '1.6',
    },
    teamContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    teamMember: {
      flex: '1 1 200px',
      margin: '10px',
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    teamMemberTitle: {
      fontSize: '1.2em',
      marginBottom: '5px',
      color:'purple'
    },
    teamMemberText: {
      fontSize: '1em',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.title}>About Us</h2>
        <p style={styles.text}>
          Our company, Craving Hunt, is dedicated to providing the best service in the industry. Our mission is to make life easier and more enjoyable for our customers. 
        </p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.title}>Our History</h3>
        <p style={styles.text}>
          Craving Hunt was founded in 2010 with the aim of bringing innovation and quality to the market. Over the years, we have grown significantly, reaching new heights and achieving numerous milestones.
        </p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.title}>Our Team</h3>
        <div style={styles.teamContainer}>
          <div style={styles.teamMember}>
            <h4 style={styles.teamMemberTitle}>John Doe - CEO</h4>
            <p style={styles.teamMemberText}>
              John is the visionary behind Craving Hunt, leading the company with his innovative ideas and extensive experience in the industry.
            </p>
          </div>
          <div style={styles.teamMember}>
            <h4 style={styles.teamMemberTitle}>Jane Smith - CTO</h4>
            <p style={styles.teamMemberText}>
              Jane heads our technology department, ensuring we stay at the forefront of technological advancements.
            </p>
          </div>
          <div style={styles.teamMember}>
            <h4 style={styles.teamMemberTitle}>Robert Brown - COO</h4>
            <p style={styles.teamMemberText}>
              Robert oversees our operations, making sure everything runs smoothly and efficiently.
            </p>
          </div>
        </div>
      </div>
      <div style={styles.section}>
        <h3 style={styles.title}>Our Achievements</h3>
        <p style={styles.text}>
          Over the years, Craving Hunt has been recognized with several industry awards and accolades, a testament to our commitment to excellence.
        </p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.title}>Mission and Vision</h3>
        <p style={styles.text}>
          Our mission is to deliver unparalleled service and products that meet the highest standards. Our vision is to be a global leader in our field, continuously innovating and improving.
        </p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.title}>Contact Us</h3>
        <p style={styles.text}>
          If you have any questions or need further information, feel free to contact us at info@cravinghunt.com.
        </p>
      </div>
    </div>
  );
}
