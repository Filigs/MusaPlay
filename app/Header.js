"use client";

import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import buttons from "../styles/Buttons.module.css";
import Image from "next/image";
import logoWhite from "../public/images/logo-branco.png";
export default function Header() {
  return (
    <nav className={styles.container}>
      <div>
        <Image src={logoWhite} alt="Logotipo branco" width={80} height={86} />
      </div>
      <div className={styles.buttonsContainer}>
        <button className={buttons.primary}>Entrar</button>

        <button className={buttons.colored}>Criar conta grátis</button>
      </div>
    </nav>
  );
