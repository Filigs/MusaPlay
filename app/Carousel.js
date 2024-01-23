"use client";
// app\Carousel.js
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";
import styles from "../styles/Carousel.module.css";
import { importAll } from "@/utils/importImages";
export default function Carousel() {
  const controls = useAnimation();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [totalCarouselWidth, setTotalCarouselWidth] = useState(0);
  const x = useMotionValue(0);
  const cardWidth = 100; // Assuming this is your card width & gap
  const numberOfDuplicatedImages = 5; // Number of images duplicated for the infinite loop

  // Calculate the width of the duplicated images
  const duplicatedImagesWidth = numberOfDuplicatedImages * cardWidth;

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop(); // Stop the ongoing animation
  };

  // Function to resume the animation
  const handleDragEnd = () => {
    setIsDragging(false);
    startAnimation(); // Start the animation again
  };

  // Adjusted startAnimation to reset the carousel's position
  const startAnimation = useCallback(
    (delay = 0) => {
      setTimeout(() => {
        controls.start({
          x: [-totalCarouselWidth, 0],
          transition: {
            duration: (images.length * cardWidth) / 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      }, delay);
    },
    [controls, totalCarouselWidth, images.length, cardWidth]
  );

  useEffect(() => {
    // After images have been set, calculate the total width with the duplicated images
    if (images.length > 0) {
      // We multiply by 2 because we will duplicate the images for the infinite effect
      setTotalCarouselWidth(images.length * cardWidth);
    }
  }, [images]); // This effect runs whenever 'images' changes

  const carouselRef = useRef();

  useEffect(() => {
    // Dynamically import images and calculate the total width
    const importedImages = importAll(
      require.context("../public/images/carousel", false, /\.svg$/)
    );
    setImages(importedImages);
    setTotalCarouselWidth(importedImages.length * cardWidth);

    // Adjust the total width calculation to include duplicated images
    if (images.length > 0) {
      setTotalCarouselWidth(
        (images.length + numberOfDuplicatedImages) * cardWidth
      );
    }
  }, [images]);
  useEffect(() => {
    // Start the animation when the component mounts
    startAnimation();

    // Check if controls.x is defined before attaching the onChange listener
    if (controls && controls.x) {
      const unsubscribeX = controls.x.onChange((x) => {
        if (x < -totalCarouselWidth) {
          controls.set({ x: 0 });
        }
      });

      return () => {
        unsubscribeX();
      };
    }
  }, [controls, totalCarouselWidth, startAnimation]);

  useEffect(() => {
    // Only set the transform style if 'carouselRef' and 'totalCarouselWidth' are set
    if (carouselRef.current && totalCarouselWidth) {
      const midPoint = -totalCarouselWidth / 2;
      carouselRef.current.style.transform = `translateX(${midPoint}px)`;
    }
  }, [totalCarouselWidth]); // This effect runs whenever 'totalCarouselWidth' changes

  // Animation function for the infinite loop
  const animateCarousel = () => {
    controls.start({
      x: -totalCarouselWidth,
      transition: {
        duration: (images.length * cardWidth) / 20, // Adjust speed here
        ease: "linear",
      },
      onComplete: () => {
        // Reset to start when the animation completes (end of original set)
        controls.set({ x: 0 });
        if (!isDragging) {
          // Restart the animation if not currently dragging
          animateCarousel();
        }
      },
    });
  };

  useEffect(() => {
    if (!isDragging) {
      animateCarousel();
    }
  });
  useEffect(() => {
    // Attach the onChange listener to the x motion value
    const unsubscribeX = x.onChange((value) => {
      // Check if the carousel has reached the reset point
      if (value < -totalCarouselWidth + duplicatedImagesWidth) {
        // Reset x to start without animation
        x.set(0, false);
      }
    });

    return () => unsubscribeX(); // Unsubscribe on unmount
  }, [x, totalCarouselWidth, duplicatedImagesWidth]);

  return (
    <motion.div
      ref={carouselRef}
      className={styles.container}
      initial={false}
      animate={controls}
      drag="x"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Render the original set of images */}
      {images.map(({ src, fileName }, index) => (
        <CarouselItem src={src} fileName={fileName} key={index} />
      ))}
      {/* Render the duplicated set for the infinite effect */}
      {images.slice(0, 5).map(({ src, fileName }, index) => (
        <CarouselItem
          src={src}
          fileName={fileName}
          key={`duplicate-${index}`}
        />
      ))}
    </motion.div>
  );
}

// Extract the item to a new functional component for better readability
function CarouselItem({ src, fileName, key }) {
  return (
    <div key={key} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={`${fileName} Music`}
          width={30}
          height={30}
          className={styles.image}
        />
      </div>
      <h4 className="capitalize">{fileName}</h4>
    </div>
  );
}
