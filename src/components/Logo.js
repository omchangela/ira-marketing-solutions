import styles from './Logo.module.css';

export default function Logo({ size = 'md' }) {
  return (
    <span className={`${styles.badge} ${styles[size]}`} aria-label="IRA Digital Marketing Solutions">
      <img
        src="/logo.png"
        alt="IRA Digital Marketing Solutions"
        className={styles.image}
        width="180"
        height="40"
      />
    </span>
  );
}
