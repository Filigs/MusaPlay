"use client";
import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import pop from "../public/images/carousel/pop.svg";

export default function Carousel() {
  const filler = () => {
    for (let i = 0; i < 20; i++) i = i + 1;
  };
  return (
    <div className={styles.container}>
      {!filler && (
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={pop}
              alt="Pop Music"
              width={30}
              height={30}
              className={styles.image}
            />
          </div>
          <h4>Estilo</h4>
        </div>
      )}
    </div>
  );
}
