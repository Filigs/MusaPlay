"use client";
import styles from "../styles/Home.module.css";
import Carousel from "./Carousel";
import SearchBar from "./SearchBar";
export default function Homepage() {
  return (
    <div>
      <div className={`${styles.container}`}>
        <div className={styles.homeContainer}>
          <h1 className="flex-shrink-0 text-6xl font-bold leading-tight text-white">
            {`>> Procura os `}
            <span className="text-secondary-300">{`melhores talentos da tua cidade`}</span>
          </h1>
          <h3 className="text-3xl font-normal leading-7 text-white">
            {`Nunca foi tão fácil ouvires a tua música preferida ao vivo e à
          distância de um clique.`}
          </h3>
          <SearchBar />
        </div>
      </div>
      <Carousel />
    </div>
  );
}
