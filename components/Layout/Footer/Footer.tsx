import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>&copy; {new Date().getFullYear()} Kev</div>
  );
};
