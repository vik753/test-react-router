import React from "react";
import styles from "./loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.container_header}>Loading...</h4>
      <div className={styles.coffee}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
