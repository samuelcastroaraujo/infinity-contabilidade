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
      <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground">
        <p className="font-heading text-xl font-bold">Mensagem enviada!</p>
        <p className="mt-2 text-primary-foreground/85">
          Obrigado pelo contato. Vamos te responder em breve.
        </p>
        <Button
          className="mt-6 h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
          onClick={() => setStatus("idle")}
        >
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground"
    >
      <div className="relative z-10 grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          Nome
          <input
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
            placeholder="Digite seu nome completo"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          E-mail
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
            placeholder="exemplo@gmail.com"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Assunto
          <input
            required
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
            placeholder="Sobre o que você quer falar?"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Mensagem
          <textarea
            required
            rows={4}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="rounded-lg border border-primary-foreground/20 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Escreva sua mensagem"
          />
        </label>
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="relative z-10 mt-6 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </Button>

      {status === "error" && (
        <p className="relative z-10 mt-3 text-sm text-destructive">
          Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
        </p>
      )}

      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary-foreground/10" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-primary-foreground/10" />
    </form>
  );
}
