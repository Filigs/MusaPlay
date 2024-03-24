"use client";

import Input from "@/utils/frontend/Input";
import forms from "../../styles/Forms.module.css";

export default function Cadastro() {
  return (
    <div className="w-[546px] h-[1083px] px-12 py-10 bg-purple-950 rounded-tl-[30px] rounded-bl-[30px] flex-col justify-start items-center gap-8 inline-flex">
      <div className="w-[450px] flex-col justify-start items-center gap-8 flex">
        <div className="flex-col justify-start items-center gap-[52px] flex">
          <div className="flex flex-col items-center justify-start gap-5">
            <div className="text-center text-white text-[28px] font-bold font-['Darker Grotesque'] leading-7">
              Entrar na Musa
            </div>
            <div className="text-center text-white text-xl font-normal font-['Darker Grotesque'] leading-tight">
              Usar Google, Facebook ou Apple
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-4">
          <div className="w-[450px] px-5 py-4 bg-purple-900 rounded justify-center items-center gap-2.5 inline-flex">
            <div className="relative w-6 h-6" />
            <div className="text-white text-[22px] font-bold font-['Darker Grotesque'] leading-[33px]">
              Entrar com Gmail
            </div>
          </div>
          <div className="self-stretch h-14 px-5 py-4 bg-purple-800 rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-[22px] font-bold font-['Darker Grotesque'] leading-[33px]">
              Entrar com Facebook
            </div>
          </div>
          <div className="self-stretch h-14 px-5 py-4 bg-purple-700 rounded justify-center items-center gap-2.5 inline-flex">
            <div className="w-6 h-[28.94px] relative" />
            <div className="text-white text-[22px] font-bold font-['Darker Grotesque'] leading-[33px]">
              Entrar com Apple
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-start gap-2">
          <div className="text-center text-white text-xl font-normal font-['Darker Grotesque'] leading-tight">
            Ou criar conta com e-mail
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-3">
          <Input
            label={"Nome e Sobrenome"}
            name={""}
            onChange={""}
            placeholder={"Nome e Sobrenome"}
            type={"text"}
            value={""}
          />
          <Input
            label={"E-mail"}
            name={""}
            onChange={""}
            placeholder={"E-mail"}
            type={"email"}
            value={""}
          />
          <Input
            label={"Repita o seu E-mail"}
            name={""}
            onChange={""}
            placeholder={"Repita o seu E-mail"}
            type={"email"}
            value={""}
          />

          <div className="inline-flex items-start justify-center gap-2">
            <Input
              label={"Password"}
              name={""}
              onChange={""}
              placeholder={"Password"}
              type={"password"}
              value={""}
            />
            <Input
              label={"Repita a sua Password"}
              name={""}
              onChange={""}
              placeholder={"Repita a sua Password"}
              type={"password"}
              value={""}
            />
          </div>
        </div>
        <div className="inline-flex items-start justify-center gap-2">
          <div className="h-11 px-5 py-4 rounded border border-white justify-center items-center gap-2.5 flex">
            <div className="text-white text-[22px] font-bold font-['Darker Grotesque'] leading-[33px]">
              Entrar
            </div>
          </div>
          <div className="h-11 px-5 py-4 bg-gradient-to-r from-fuchsia-700 to-fuchsia-500 rounded justify-center items-center gap-2.5 flex">
            <div className="text-white text-[22px] font-bold font-['Darker Grotesque'] leading-[33px]">
              Criar Conta
            </div>
          </div>
        </div>
        <div className="w-[450px] text-center">
          <span style="text-white text-lg font-normal font-['Darker Grotesque'] leading-[18px]">
            Ao Clicar “Criar Conta”, certifico que tenho 16 anos ou mais e
            aceito os{" "}
          </span>
          <span style="text-fuchsia-500 text-lg font-normal font-['Darker Grotesque'] underline leading-[18px]">
            Termos de uso
          </span>
          <span style="text-white text-lg font-normal font-['Darker Grotesque'] leading-[18px]">
            {" "}
            e{" "}
          </span>
          <span style="text-fuchsia-500 text-lg font-normal font-['Darker Grotesque'] underline leading-[18px]">
            Políticas de Privacidade
          </span>
        </div>
      </div>
    </div>
  );
}
