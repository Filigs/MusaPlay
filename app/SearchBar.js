"use client";

import styles from "../styles/Home.module.css";
import Image from "next/image";
import arrowDown from "../public/images/icons/arrowDown.svg";
import search from "../public/images/icons/search.svg";

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <div className={styles.searchBar}>
          <h4 className={styles.text}>Filtra a tua cidade</h4>
          <Image
            src={arrowDown}
            alt="Filtra a tua cidade"
            width={24}
            height={24}
          />
        </div>
        <div className={styles.searchBar}>
          <h4 className={styles.textPlaceholder}>O que desejas ouvir hoje?</h4>
          <Image
            src={search}
            alt="Filtra a tua cidade"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
