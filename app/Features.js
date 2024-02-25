"use client";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import checkbox from "../public/images/icons/fi-rr-checkbox.svg";
import whiteLogo from "../public/images/logo-branco.png";
export default function Features() {
  return (
    <section
      className={
        "flex flex-col xl:flex-row xl:flex-1 xl:gap-14 items-center justify-between px-40 min-h-screen bg-primary-darker z-0"
      }
    >
      <div className={`w-[610px] h-[586.80px] relative ${styles.waveFeatures}`}>
        <div className="w-[610px] h-[586.80px] left-0 top-0 absolute mix-blend-screen justify-center items-center inline-flex">
          <div className="w-[610.01px] h-[586.87px] relative">
            <div className="w-[610.01px] h-[540.57px] left-[-0px] top-[46.30px] absolute"></div>
            <div className="w-[502.72px] h-[549.59px] left-[5.52px] top-0 absolute"></div>
          </div>
        </div>
        <div className="w-[153.88px] h-[153.88px] left-[204px] top-[218.05px] absolute">
          <div className="w-[153.88px] h-[153.88px] left-0 top-0 absolute bg-gradient-to-r from-purple-900 via-fuchsia-700 to-fuchsia-500 rounded-full shadow blur-[6.10px]" />
          <Image
            alt="Versão branca do logotipo"
            src={whiteLogo}
            className="w-[83.92px] h-[90.38px] left-[36.76px] top-[32.06px] absolute"
            width={83.92}
            height={90.38}
          />
        </div>
      </div>

      <div className="w-[535px] h-[407px] flex-col justify-center items-start gap-[50px] inline-flex">
        <div className="flex-col justify-center items-start gap-[30px] flex">
          <div className="flex-col justify-center items-start gap-[15px] flex">
            <div className="w-[530px] text-fuchsia-400 text-6xl font-bold font-['Darker Grotesque'] leading-[60px]">
              Conhece a Musa
            </div>
            <div className="w-[535px] h-[92px] text-white text-3xl font-normal font-['Darker Grotesque'] leading-[30px]">
              Aqui podes encontrar todos os talentos numa única plataforma. Além
              disso tens a possibilidade de te conectares com eles e com o mundo
              da música.
              <br />
              <br />
            </div>
          </div>
          <div className="h-[142px] flex-col justify-center items-start gap-5 my-7 flex">
            <div className="w-[535px] justify-start items-center gap-5 inline-flex">
              <Image
                src={checkbox}
                alt="Checkbox icon"
                className="relative "
                width={24}
                height={24}
              />
              <div className="w-[464px] h-[34px] text-white text-3xl font-normal font-['Darker Grotesque'] leading-[30px]">
                Contrata os melhores talentos musicais;
              </div>
            </div>
            <div className="w-[535px] justify-start items-center gap-5 inline-flex">
              <Image
                src={checkbox}
                alt="Checkbox icon"
                className="relative "
                width={24}
                height={24}
              />
              <div className="w-[486px] h-[34px] text-white text-3xl font-normal font-['Darker Grotesque'] leading-[30px]">
                Eleva o teu evento para outro patamar;
              </div>
            </div>
            <div className="w-[535px] justify-start items-center gap-5 inline-flex">
              <Image
                src={checkbox}
                alt="Checkbox icon"
                className="relative "
                width={24}
                height={24}
              />
              <div className="w-[464px] h-[34px] text-white text-3xl font-normal font-['Darker Grotesque'] leading-[30px]">
                Pagamento fácil e seguro;
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 bg-gradient-to-r from-fuchsia-700 to-fuchsia-500 rounded justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-[22px] font-bold font-['Darker Grotesque'] leading-[33px]">
            Criar Conta
          </div>
        </div>
      </div>
    </section>
  );
}
