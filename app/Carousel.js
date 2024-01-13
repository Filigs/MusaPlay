"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import pop from "../public/images/carousel/pop.svg";
import styles from "../styles/Carousel.module.css";

export default function Carousel() {
  const cards = Array(50).fill(null);
  const controls = useAnimation();

  // Calculate the total width of the carousel based on the number of cards
  const cardWidth = 100; // Adjust based on your card size
  const totalCarouselWidth = cards.length * cardWidth;

  // Animation for infinite loop
  const startAnimation = (delay = 0) => {
    setTimeout(() => {
      controls.start({
        x: [-totalCarouselWidth, 0],
        transition: {
          duration: 60,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }, delay);
  };

  useEffect(() => {
    startAnimation();
    return () => controls.stop(); // Cleanup on unmount
  }, []);

  return (
    <motion.div
      className={styles.container}
      initial={false}
      animate={controls}
      drag="x"
      dragConstraints={{ left: -totalCarouselWidth, right: 0 }}
      onDragEnd={(event, info) => {
        // Continue from where the user left off after a short delay
        const delay = 2000; // 2 seconds delay
        startAnimation(delay);
      }}
    >
      {cards.map((_, index) => (
        <div key={index} className={styles.card}>
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
      ))}
    </motion.div>
  );
}
