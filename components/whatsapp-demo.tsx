"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, CheckCheck, Clock, FileText, MapPin, MessageCircle, MoreVertical, Phone, Send, ShieldCheck, Video } from "lucide-react"

type Message = { id: string; content: string; isBot: boolean; timestamp: string }

const officialUrl = "https://amarilo.com.co/grandes-desarrollos/jardines-del-rio"
const smDigitalLogoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-smdigital-color-pU333YCUDSP4WRRP9Bd9PuWgB8w5Kr.png"
const starterQuestions = ["¿Qué tiene de especial Palma?", "¿Cuánto cuesta un apartamento en Palma?", "¿Es buena inversión en Ciudad del Río?"]
const projects = [
  { name: "Palma", price: "Desde $1.429,5 M", area: "Desde 103 m²", detail: "2 torres · 229 hogares", note: "Los apartamentos más amplios de la zona", url: "https://amarilo.com.co/proyecto/palma" },
  { name: "Arrayán", price: "Desde $575 M", area: "Desde 30 m²", detail: "1 torre · 216 hogares", note: "Habilitado para rentas cortas", url: "https://amarilo.com.co/proyecto/arrayan" },
  { name: "Samán", price: "Desde $740 M", area: "Desde 56 m²", detail: "4 torres · 676 hogares", note: "Estrato 5 · 26 pisos", url: "https://amarilo.com.co/proyecto/saman-jardines-del-rio" },
]
const highlights = ["Respuestas al instante, 24/7", "Precios y áreas oficiales", "Te conecta con un asesor"]

function AmariloLogo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center gap-1.5 ${className}`} aria-label="Amarilo">
      <svg viewBox="12 0 45 44" className="h-9 w-auto" aria-hidden="true">
        <path d="M51.2056 0H17.5927H12.7328V4.84725V38.3729H17.5927V4.84725H51.2056V0Z" fill="#FFC900" />
        <path d="M17.6598 43.2375H51.2727H56.1326V38.3902V4.86377H51.2727V38.3902H17.6598V43.2375Z" fill="#FFC900" />
      </svg>
      <span className={`text-[13px] font-light tracking-[0.28em] ${light ? "text-white" : "text-[#160B29]"}`}>AMARILO</span>
    </span>
  )
}

function formatMessage(content: string) {
  return content.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} target="_blank" rel="noreferrer" className="break-all font-medium text-[#160B29] underline decoration-[#FFC900] decoration-2 underline-offset-2">{part}</a>
    return part.split("\n").map((line, lineIndex) => <span key={`${index}-${lineIndex}`}>{line}{lineIndex < part.split("\n").length - 1 && <br />}</span>)
  })
}

const fallbackMessage = "Se me cayó la conexión un momento. ¿Me repites tu pregunta? Si prefieres, puedes consultar la información oficial en https://amarilo.com.co/grandes-desarrollos/jardines-del-rio o llamar al **601 634 0000**."

export function WhatsAppDemo() {
  const [messages, setMessages] = useState<Message[]>([{ id: "welcome", content: "¡Hola! Qué bueno tenerte por acá 😊 Soy **Adriana**, de Amarilo.\n\nTe cuento de **Palma**, en Ciudad del Río: los apartamentos más amplios del sector, a pasos del parque y del MAMM. ¿Lo estás mirando para vivir o como inversión?", isBot: true, timestamp: "Ahora" }])
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
        body: JSON.stringify({ messages: nextMessages.slice(-24).map(({ content, isBot }) => ({ role: isBot ? "assistant" : "user", content })) }),
      })
      const data = await response.json()
      if (!response.ok || typeof data.text !== "string") throw new Error("No se pudo generar la respuesta")
      setMessages((current) => [...current, { id: crypto.randomUUID(), content: data.text, isBot: true, timestamp: "Ahora" }])
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), content: fallbackMessage, isBot: true, timestamp: "Ahora" }])
    } finally {
      setIsTyping(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(inputValue)
  }

  return (
    <main className="min-h-screen bg-white font-sans text-[#160B29]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#160B29] text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FFC900] opacity-[0.12]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-56 -left-32 h-[380px] w-[380px] rounded-full border-[40px] border-[#FFC900]/10" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-10 lg:pb-20">
          <header className="flex items-center justify-between gap-4">
            <a href={officialUrl} target="_blank" rel="noreferrer" aria-label="Amarilo, abrir sitio oficial"><AmariloLogo light /></a>
            <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC900] px-4 py-2 text-xs font-semibold text-[#160B29] transition hover:bg-[#ffd633] sm:text-sm">Sitio oficial <ArrowUpRight className="h-4 w-4" /></a>
          </header>

          <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FFC900] sm:text-xs">Asesora virtual · Jardines del Río</p>
              <h1 className="mt-4 text-[2.15rem] font-bold leading-[1.15] sm:text-5xl">Tu próximo hogar en <span className="text-[#FFC900]">Ciudad del Río</span> empieza con una conversación.</h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/75">Conoce Palma, Arrayán y Samán a tu ritmo. Pregunta lo que quieras por WhatsApp y encuentra el espacio que se ajusta a tu etapa de vida.</p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {highlights.map((item) => <li key={item} className="rounded-full bg-[#FFC900] px-4 py-1.5 text-xs font-semibold text-[#160B29] sm:text-sm">{item}</li>)}
              </ul>
              <p className="mt-8 flex items-start gap-2.5 text-xs leading-5 text-white/55"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC900]" /> Información comercial orientativa. Precios, disponibilidad y condiciones se confirman directamente con Amarilo.</p>
            </div>

            {/* Phone */}
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative w-full max-w-[360px]">
                <div className="absolute -left-4 -top-4 h-24 w-24 border-l-[6px] border-t-[6px] border-[#FFC900]" aria-hidden="true" />
                <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-[6px] border-r-[6px] border-[#FFC900]" aria-hidden="true" />
                <div className="relative rounded-[44px] bg-[#0c0618] p-[9px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                  <div className="absolute left-1/2 top-[14px] z-10 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#0c0618]" />
                  <div className="flex h-[560px] flex-col overflow-hidden rounded-[36px] bg-[#efeae2]">
                    <div className="flex items-center gap-3 bg-[#160B29] px-4 pb-3 pt-9 text-white">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFC900] text-sm font-bold text-[#160B29]" aria-hidden="true">A</div>
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Adriana · Palma Amarilo</p><p className="text-[11px] text-white/70">Asesora comercial · en línea</p></div>
                      <Video className="h-[18px] w-[18px]" aria-hidden="true" /><Phone className="h-[18px] w-[18px]" aria-hidden="true" /><MoreVertical className="h-[18px] w-[18px]" aria-hidden="true" />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 bg-[#FFF6D1] px-3 py-2 text-[10px] text-[#4D4D4D]"><ShieldCheck className="h-3 w-3" /> Tus datos y esta conversación son privados</div>
                    <div ref={chatRef} className="flex-1 space-y-2 overflow-y-auto p-3.5" style={{ backgroundImage: "radial-gradient(rgba(22,11,41,.06) 1px, transparent 1px)", backgroundSize: "16px 16px" }} aria-live="polite" aria-label="Conversación de WhatsApp">
                      <p className="mx-auto mb-3 w-fit rounded-md bg-white px-2.5 py-1 text-[10px] text-[#666666] shadow-sm">HOY</p>
                      {messages.map((message) => <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}><div className={`max-w-[88%] rounded-xl px-3 py-2 text-[12px] leading-[1.55] text-[#160B29] shadow-sm ${message.isBot ? "rounded-tl-sm bg-white" : "rounded-tr-sm bg-[#FFF1B3]"}`}><div>{formatMessage(message.content)}</div><div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#747474]">{message.timestamp}{!message.isBot && <CheckCheck className="h-3 w-3 text-[#160B29]" />}</div></div></div>)}
                      {isTyping && <div className="flex justify-start"><div className="flex gap-1 rounded-xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm" aria-label="Adriana está escribiendo">{[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#747474]" style={{ animationDelay: `${dot * 0.15}s` }} />)}</div></div>}
                      {messages.length === 1 && <div className="space-y-1.5 pt-2">{starterQuestions.map((question) => <button key={question} type="button" onClick={() => void sendMessage(question)} className="block w-fit max-w-[94%] rounded-full border border-[#160B29] bg-white px-3.5 py-2 text-left text-[11px] font-semibold leading-4 text-[#160B29] transition hover:bg-[#FFC900] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC900]">{question}</button>)}</div>}
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-[#F0F0F1] px-3 py-2.5">
                      <button type="button" aria-label="Pedir brochure" onClick={() => void sendMessage("¿Me compartes el brochure de Palma?")} className="grid h-9 w-8 place-items-center text-[#4D4D4D] hover:text-[#160B29]"><FileText className="h-[18px] w-[18px]" /></button>
                      <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault() }} placeholder="Escribe un mensaje" aria-label="Escribe un mensaje" className="h-10 min-w-0 flex-1 rounded-full bg-white px-4 text-xs text-[#160B29] outline-none placeholder:text-[#747474] focus-visible:ring-2 focus-visible:ring-[#FFC900]" disabled={isTyping} />
                      <button type="submit" disabled={!inputValue.trim() || isTyping} aria-label="Enviar mensaje" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FFC900] text-[#160B29] transition hover:bg-[#ffd633] disabled:opacity-50"><Send className="h-4 w-4" /></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#4D4D4D]">Grandes desarrollos · Jardines del Río</p>
        <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Un lugar para cada etapa de tu vida</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#4D4D4D]">Tres proyectos dentro de una ciudad que mezcla vivienda, comercio, cultura y zonas verdes, a pasos del Museo de Arte Moderno, el metro y el Parque Ciudad del Río.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="flex flex-col rounded-3xl bg-[#F0F0F1] p-6">
              <div className="h-1.5 w-10 rounded-full bg-[#FFC900]" />
              <h3 className="mt-5 text-2xl font-bold">{project.name}</h3>
              <p className="mt-1 text-sm text-[#4D4D4D]">{project.note}</p>
              <dl className="mt-5 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-[#666666]">Precio</dt><dd className="font-semibold">{project.price}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[#666666]">Área</dt><dd className="font-semibold">{project.area}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[#666666]">Proyecto</dt><dd className="font-semibold">{project.detail}</dd></div>
              </dl>
              <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#160B29] px-4 py-2 text-sm font-semibold transition hover:bg-[#160B29] hover:text-white">Ver proyecto <ArrowUpRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#747474]">Precios “desde” publicados por Amarilo en noviembre de 2026. Son referenciales y pueden cambiar.</p>
      </section>

      {/* Benefits */}
      <section className="bg-[#F0F0F1]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-10">
          {[{ icon: MapPin, title: "Todo conectado", detail: "Ciudad del Río, Medellín: cultura, comercio, transporte y vida urbana a pocos pasos." }, { icon: MessageCircle, title: "A tu manera", detail: "Pregunta con tus palabras. La conversación se adapta a lo que te interesa." }, { icon: Clock, title: "Siguiente paso claro", detail: "Agenda tu visita, pide el brochure o habla con un asesor de Amarilo." }].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="rounded-3xl bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FFC900] text-[#160B29]"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#4D4D4D]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#160B29] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 text-xs sm:px-6 md:flex-row lg:px-10">
          <div className="flex items-center gap-4"><AmariloLogo light className="scale-90" /><span className="text-white/60">Jardines del Río · Medellín</span></div>
          <p className="text-center text-[11px] uppercase tracking-[0.16em] text-[#FFC900]">Co-creación · SM Digital + Leads Agency × Amarilo</p>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5"><span className="text-[#4D4D4D]">Una propuesta de</span><img src={smDigitalLogoUrl} alt="SM Digital" className="h-4 w-auto object-contain" /></div>
        </div>
      </footer>
    </main>
  )
}
