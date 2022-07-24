import styles from "./Options.module.css";

const Options = ({ options, title }) => {
  return (
    <div className={styles.containerOpt}>
      <p>{title}</p>
      {options.map((opt) => (
        <button className={styles.option} onClick={opt.handler} key={opt.id}>
          {opt.name}
        </button>
      ))}
    </div>
  );
};

export default Options;
