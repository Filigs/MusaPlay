"use client";
import styles from "../styles/Home.module.css";
import Carousel from "./Carousel";
export default function Homepage() {
  return (
    <div className={`${styles.container} min-h-screen bg-primary-darker`}>
      <h1>Hello world</h1>
      <Carousel />
    </div>
  );
}
