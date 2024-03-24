"use client";
// utils\frontend\Modal.js
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

const fadeInOut = {
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  visible: {
    scale: 0.9,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: 0.9,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Modal = ({ children, isOpen, onClose, className }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => document.body.removeEventListener("keydown", closeOnEscapeKey);
  }, [onClose]); // Make sure to add dependencies here if `onClose` changes
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center bg-black bg-opacity-50 justify-evenly"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={`p-4 xl:p-7 border justify-start shadow-lg rounded-primary bg-neutral-lighter border-neutral-border dark:border-neutral-dark dark:bg-neutral-darker ${className}`}
            variants={fadeInOut}
          >
            <MdClose
              className="box-content absolute z-50 w-5 h-5 text-black rounded-full cursor-pointer bg-danger top-3 right-3"
              onClick={onClose}
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
