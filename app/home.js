"use client";
import styles from "../styles/Home.module.css";
import SearchBar from "./SearchBar";
export default function Homepage() {
  return (
    <div className={`${styles.container} min-h-screen bg-primary-darker`}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          {">> Procura"}
          <span className="text-secondary-300">
            os melhores talentos da tua cidade
          </span>
        </h1>
        <p className={styles.body}>
          {
            "Nunca foi tão fácil ouvires a tua música preferida ao vivo e à distância de um clique."
          }
        </p>
        <SearchBar />
      </div>
    </div>
  );
}
