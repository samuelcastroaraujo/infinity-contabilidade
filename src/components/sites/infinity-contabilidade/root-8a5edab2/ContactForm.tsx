"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// TODO: substitua pelos valores reais do seu Google Forms.
// - GOOGLE_FORM_ACTION_URL: pegue a URL do formulário (.../viewform) e troque
//   "viewform" por "formResponse" no final.
// - Os "entry.XXXXXXXXX" você encontra usando "Obter link pré-preenchido"
//   no menu de 3 pontinhos do Google Forms (preencha um valor de teste em
//   cada campo e copie o link gerado — cada campo vira um entry.NUMERO).
const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/SEU_FORM_ID_AQUI/formResponse";

const ENTRY_IDS = {
  nome: "entry.000000001",
  email: "entry.000000002",
  assunto: "entry.000000003",
  mensagem: "entry.000000004",
};

const INPUT_CLASS =
  "h-11 rounded-md border border-white/20 bg-background px-3 text-foreground placeholder:text-neutral-400 outline-none transition-shadow focus:border-primary-300 focus:ring-3 focus:ring-primary-200";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.append(ENTRY_IDS.nome, nome);
    formData.append(ENTRY_IDS.email, email);
    formData.append(ENTRY_IDS.assunto, assunto);
    formData.append(ENTRY_IDS.mensagem, mensagem);

    try {
      // Google Forms não permite ler a resposta via CORS — "no-cors" envia
      // o POST normalmente, só não conseguimos confirmar o status HTTP.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setStatus("sent");
      setNome("");
      setEmail("");
      setAssunto("");
      setMensagem("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-lg bg-primary-700 p-8 text-center text-white">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, var(--silver-light) 0%, var(--silver-dark) 50%, var(--silver-light) 100%)",
          }}
        />
        <p className="font-heading text-xl font-bold">Mensagem enviada!</p>
        <p className="mt-2 text-white/85">
          Obrigado pelo contato. Vamos te responder em breve.
        </p>
        <Button variant="inverted" className="mt-6" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-lg bg-primary-700 p-8 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, var(--silver-light) 0%, var(--silver-dark) 50%, var(--silver-light) 100%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-white/90">
          Nome
          <input
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={INPUT_CLASS}
            placeholder="Digite seu nome completo"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/90">
          E-mail
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT_CLASS}
            placeholder="exemplo@gmail.com"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/90">
          Assunto
          <input
            required
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            className={INPUT_CLASS}
            placeholder="Sobre o que você quer falar?"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/90">
          Mensagem
          <textarea
            required
            rows={4}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={INPUT_CLASS + " py-2"}
            placeholder="Escreva sua mensagem"
          />
        </label>
      </div>

      <Button
        type="submit"
        variant="inverted"
        disabled={status === "sending"}
        className="relative z-10 mt-6 w-full"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </Button>

      {status === "error" && (
        <p className="relative z-10 mt-3 text-sm text-red-200">
          Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
        </p>
      )}

      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-silver/10" />
    </form>
  );
}
