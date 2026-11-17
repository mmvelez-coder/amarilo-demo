"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, CheckCheck, FileText, MapPin, MessageCircle, MoreVertical, Phone, Send, ShieldCheck, Sparkles, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type Message = { id: string; content: string; isBot: boolean; timestamp: string }

const officialUrl = "https://amarilo.com.co/grandes-desarrollos/jardines-del-rio"
const amariloLogoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20amarilo%201-FeCt1RLSbDNxIxi7IdTZe3OLpC9mrs.png"
const smDigitalLogoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-smdigital-color-pU333YCUDSP4WRRP9Bd9PuWgB8w5Kr.png"
const starterQuestions = ["¿Qué proyectos hay y en qué se diferencian?", "¿Cuánto cuesta un apartamento?", "¿Me compartes el brochure?"]
const projects = [
  { name: "Palma", tag: "Desde $1.429,5 M", detail: "103 m² · 2 torres", color: "#e9f0e9" },
  { name: "Arrayán", tag: "Desde $575 M", detail: "30 m² · 1 torre", color: "#f2ede1" },
  { name: "Samán", tag: "Desde $740 M", detail: "56 m² · 4 torres", color: "#e7efef" },
]

function formatMessage(content: string) {
  return content.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} target="_blank" rel="noreferrer" className="break-all text-[#176950] underline">{part}</a>
    return part.split("\n").map((line, lineIndex) => <span key={`${index}-${lineIndex}`}>{line}{lineIndex < part.split("\n").length - 1 && <br />}</span>)
  })
}

export function WhatsAppDemo() {
  const [messages, setMessages] = useState<Message[]>([{ id: "welcome", content: "¡Hola! Soy **Adriana**, tu asesora comercial para Jardines del Río.\n\nCuéntame, ¿estás buscando un lugar para vivir o estás explorando opciones de inversión? Si ya tienes en mente **Palma, Arrayán o Samán**, con gusto te cuento qué ofrece cada uno.", isBot: true, timestamp: "Ahora" }])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight }, [messages, isTyping])

  async function sendMessage(text: string) {
    const cleanText = text.trim()
    if (!cleanText || isTyping) return
    const nextMessages = [...messages, { id: crypto.randomUUID(), content: cleanText, isBot: false, timestamp: "Ahora" }]
    setMessages(nextMessages)
    setInputValue("")
    setIsTyping(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12).map(({ content, isBot }) => ({ role: isBot ? "assistant" : "user", content })) }),
      })
      const data = await response.json()
      if (data.billingRequired) {
        setMessages((current) => [...current, { id: crypto.randomUUID(), content: "Ya tengo preparada la información de Jardines del Río, pero Vercel AI Gateway todavía necesita un método de pago válido en el equipo para activar las respuestas de IA. Puedes habilitarlo aquí: https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fai%3Fmodal%3Dadd-credit-card\n\nMientras tanto, los precios y áreas de referencia están visibles en esta página. Para confirmar disponibilidad, llama al **601 634 0000**.", isBot: true, timestamp: "Ahora" }])
        return
      }
      if (!response.ok) throw new Error("No se pudo generar la respuesta")
      setMessages((current) => [...current, { id: crypto.randomUUID(), content: data.text, isBot: true, timestamp: "Ahora" }])
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), content: "Se me cayó la conexión un momento. ¿Me repites tu pregunta? Si prefieres, puedes consultar la información oficial en https://amarilo.com.co/grandes-desarrollos/jardines-del-rio o llamar al **601 634 0000**.", isBot: true, timestamp: "Ahora" }])
    } finally {
      setIsTyping(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(inputValue)
  }

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-4 py-8 text-[#193d35] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md bg-white px-1 py-0" aria-label="Amarilo, abrir sitio oficial">
            <img src={amariloLogoUrl} alt="Amarilo" className="h-16 w-auto object-contain" />
          </a>
          <a href={officialUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-[#dce5dd] bg-white px-4 py-2 text-sm font-medium text-[#33574d] transition hover:border-[#1f735c] sm:flex">Sitio oficial <ArrowUpRight className="h-4 w-4" /></a>
        </header>

        <section className="grid items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
          <div className="order-2 max-w-xl lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#e6f0e8] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#287458]"><Sparkles className="h-3.5 w-3.5" /> Asesora comercial · Jardines del Río</div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#174c3e] sm:text-5xl">Un nuevo capítulo <span className="text-[#bd8a16]">comienza</span> en Ciudad del Río.</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#64766e]">Conoce Palma, Arrayán y Samán en una conversación real. Pregunta a tu ritmo; te ayudo a encontrar la información y el espacio que hacen sentido para ti.</p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-3" aria-label="Proyectos destacados">
              {projects.map((project) => <div key={project.name} className="rounded-2xl border border-[#e3e9e3] p-3.5" style={{ backgroundColor: project.color }}><div className="mb-5 h-1 w-8 rounded-full bg-[#d5a723]" /><p className="font-semibold text-[#1b4c3e]">{project.name}</p><p className="mt-1 text-[11px] font-medium text-[#356d58]">{project.tag}</p><p className="mt-1 text-[10px] text-[#718078]">{project.detail}</p></div>)}
            </div>
            <div className="mt-8 flex items-start gap-3 border-t border-[#e1e8e1] pt-5 text-sm leading-6 text-[#6a7a71]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#328269]" /><p>Información comercial orientativa. Precios, disponibilidad y condiciones se confirman directamente con Amarilo.</p></div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative w-full max-w-[360px] rounded-[44px] bg-[#202321] p-[9px] shadow-[0_28px_70px_-22px_rgba(29,64,50,0.35)] ring-1 ring-black/10">
              <div className="absolute left-1/2 top-[14px] z-10 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#202321]" />
              <div className="flex h-[560px] flex-col overflow-hidden rounded-[36px] bg-[#f4f0e9]">
                <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-9 text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4c344] text-sm font-semibold text-[#174c3e]" aria-hidden="true">A</div>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Adriana · Jardines del Río</p><p className="text-[11px] text-white/75">Asesora comercial · en línea</p></div>
                  <Video className="h-[18px] w-[18px]" aria-hidden="true" /><Phone className="h-[18px] w-[18px]" aria-hidden="true" /><MoreVertical className="h-[18px] w-[18px]" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center gap-1.5 bg-[#fff8df] px-3 py-2 text-[10px] text-[#786f58]"><ShieldCheck className="h-3 w-3" /> Tus datos y esta conversación son privados</div>
                <div ref={chatRef} className="flex-1 space-y-2 overflow-y-auto bg-[#eee9e0] p-3.5" style={{ backgroundImage: "radial-gradient(rgba(49,72,57,.055) 1px, transparent 1px)", backgroundSize: "16px 16px" }} aria-live="polite" aria-label="Conversación de WhatsApp">
                  <p className="mx-auto mb-3 w-fit rounded-md bg-[#fff9e9] px-2.5 py-1 text-[10px] text-[#857d69] shadow-sm">HOY</p>
                  {messages.map((message) => <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}><div className={`max-w-[88%] rounded-xl px-3 py-2 text-[12px] leading-[1.55] shadow-sm ${message.isBot ? "rounded-tl-sm bg-white text-[#293b34]" : "rounded-tr-sm bg-[#d9f4c9] text-[#273d2e]"}`}><div>{formatMessage(message.content)}</div><div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#829087]">{message.timestamp}{!message.isBot && <CheckCheck className="h-3 w-3 text-[#4c8f7e]" />}</div></div></div>)}
                  {isTyping && <div className="flex justify-start"><div className="flex gap-1 rounded-xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm" aria-label="Amarilo está escribiendo">{[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#829087]" style={{ animationDelay: `${dot * 0.15}s` }} />)}</div></div>}
                  {messages.length === 1 && <div className="space-y-1.5 pt-2">{starterQuestions.map((question) => <button key={question} type="button" onClick={() => void sendMessage(question)} className="block w-fit max-w-[94%] rounded-2xl border border-[#b8d5ca] bg-white px-3 py-2 text-left text-[11px] font-medium leading-4 text-[#176950] transition hover:bg-[#f4fff9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25866a]">{question}</button>)}</div>}
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-[#f6f6f3] px-3 py-2.5">
                  <button type="button" aria-label="Pedir brochure" onClick={() => void sendMessage("¿Me compartes el brochure de Jardines del Río?")} className="grid h-9 w-8 place-items-center text-[#6e7d75] hover:text-[#176950]"><FileText className="h-[18px] w-[18px]" /></button>
                  <Input value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault() }} placeholder="Escribe un mensaje" aria-label="Escribe un mensaje" className="h-10 rounded-full border-0 bg-white px-4 text-xs shadow-none focus-visible:ring-1 focus-visible:ring-[#1b8067]" disabled={isTyping} />
                  <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping} aria-label="Enviar mensaje" className="h-9 w-9 shrink-0 rounded-full bg-[#087e68] text-white hover:bg-[#066a58] disabled:opacity-50"><Send className="h-4 w-4" /></Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 border-t border-[#e2e8e2] pt-7 sm:grid-cols-3">
          {[{ icon: MapPin, title: "Todo conectado", detail: "Ciudad del Río, Medellín: cultura, comercio, transporte y vida urbana a pocos pasos." }, { icon: MessageCircle, title: "A tu manera", detail: "Pregunta con tus palabras. La conversación se adapta a lo que te interesa." }, { icon: FileText, title: "Siguiente paso claro", detail: "Consulta el sitio oficial, pide información comercial o habla con Amarilo." }].map(({ icon: Icon, title, detail }) => <Card key={title} className="flex gap-3 border-[#e4eae3] bg-white/70 p-4 shadow-none"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e8f2e9] text-[#26775e]"><Icon className="h-4 w-4" /></span><div><h2 className="text-sm font-semibold text-[#204e40]">{title}</h2><p className="mt-1 text-xs leading-5 text-[#728078]">{detail}</p></div></Card>)}
        </section>
        <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#e2e8e2] pt-5 text-xs text-[#78867e] sm:flex-row"><span>Jardines del Río · Medellín · Comercializa Amarilo</span><div className="flex flex-wrap items-center justify-center gap-4"><a className="inline-flex items-center gap-1 font-medium text-[#24745d] hover:underline" href={officialUrl} target="_blank" rel="noreferrer">Conoce más en Amarilo <ArrowUpRight className="h-3.5 w-3.5" /></a><div className="flex items-center gap-2 border-l border-[#dfe5e1] pl-4"><span>Una propuesta de</span><img src={smDigitalLogoUrl} alt="SM Digital" className="h-5 w-auto object-contain" /></div></div></footer>
      </div>
    </main>
  )
}
