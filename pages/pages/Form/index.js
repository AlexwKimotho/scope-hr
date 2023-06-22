import React from 'react';
import styles from './Form.module.css';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h1 className={styles.heading}>Employee Data</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="emp_fname">First Name</label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="emp_fname"
                  placeholder="Enter the First Name"
                  name="emp_fname"
                />
              </div>
              {/* Rest of the personal details fields */}
            </div>

            {/* Work Details */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="staff_no">Staff No</label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="staff_no"
                  name="staff_no"
                />
              </div>
              {/* Rest of the work details fields */}
            </div>

            {/* Contact */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="tel_no">Telephone No</label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="tel_no"
                  name="tel_no"
                />
              </div>
              {/* Rest of the contact fields */}
            </div>

            {/* Other Details */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="beneficiary_name">Beneficiary Name</label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="beneficiary_name"
                  name="beneficiary_name"
                />
              </div>
              {/* Rest of the other details fields */}
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.submitButton}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
