import styles from "./GlobalErrorComponent.module.css";

export const GlobalErrorComponent = ({ error, resetErrorBoundary }) => {
  console.log(error);
  return (
    <div className={styles.globalErrorComponent}>
      <h1>Error!!!🌍</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Recargar página</button>
    </div>
  );
};
