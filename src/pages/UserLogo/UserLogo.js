import styles from "./userLogo.module.scss";

export const UserLogo = ({ userName }) => {
  const logoSymbols = userName
    .split(" ")
    .map((w) => w.slice(0, 1))
    .join("")
    .toUpperCase();

  const getRandomRGBColor = () => {
    let val = 0;
    do {
      val = Number((Math.random() * 250).toFixed(0));
    } while (val < 100);
    return val;
  };

  return (
    <span
      className={styles.logo}
      style={{
        background: `rgb(${getRandomRGBColor()},${getRandomRGBColor()},${getRandomRGBColor()})`,
      }}
    >
      <span>{logoSymbols}</span>
    </span>
  );
};
