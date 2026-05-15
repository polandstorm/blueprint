import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  DollarSign,
  Heart,
  Megaphone,
  Smile,
  TrendingUp,
  Cog,
  MapPin,
  Calendar,
  Wallet,
  Quote,
} from "lucide-react";
import heroImage from "@/assets/hero-bp.jpg";

export const Route = createFileRoute("/")({
  component: BeePrimeLanding,
});

/* ---------- Bee logo ---------- */
function BeeLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`bp-bee inline-flex ${className}`} aria-hidden>
      <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
        <ellipse cx="16" cy="18" rx="9" ry="7" fill="oklch(0.68 0.13 55)" />
        <rect x="9" y="13" width="14" height="2.2" fill="#161616" />
        <rect x="9" y="17" width="14" height="2.2" fill="#161616" />
        <rect x="9" y="21" width="14" height="2.2" fill="#161616" />
        <ellipse cx="11" cy="11" rx="5" ry="3" fill="#fff" opacity="0.85" />
        <ellipse cx="21" cy="11" rx="5" ry="3" fill="#fff" opacity="0.85" />
        <circle cx="13" cy="16" r="1.4" fill="#161616" />
      </svg>
    </span>
  );
}

/* ---------- Reveal-on-scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".bp-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2 text-foreground">
          <BeeLogo />
          <span className="text-[17px] font-bold tracking-tight">
            Bee Prime <span className="text-primary">Gestão</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 text-[14px] text-muted-foreground md:flex">
          <li><a href="#metodo" className="hover:text-foreground transition">Método</a></li>
          <li><a href="#jornada" className="hover:text-foreground transition">Jornada</a></li>
          <li><a href="#resultados" className="hover:text-foreground transition">Resultados</a></li>
          <li><a href="#oferta" className="hover:text-foreground transition">Oferta</a></li>
          <li><a href="#faq" className="hover:text-foreground transition">FAQ</a></li>
        </ul>
        <a
          href="#oferta"
          className="bp-pulse inline-flex items-center gap-2 rounded-[50px] bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition"
        >
          Garantir Minha Vaga <ArrowRight size={16} />
        </a>
      </nav>
    </header>
  );
}

/* ---------- Stat ---------- */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-sm border border-border bg-card/40 px-5 py-4 backdrop-blur">
      <div className="text-[26px] font-extrabold leading-none text-primary">{value}</div>
      <div className="mt-2 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ---------- Pillar ---------- */
function Pillar({
  icon: Icon,
  num,
  title,
  desc,
}: {
  icon: typeof Users;
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <article className="bp-reveal group relative overflow-hidden rounded-sm border border-border bg-card p-6 transition hover:border-primary/60">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          Pilar {num}
        </span>
        <Icon size={20} className="text-primary" />
      </div>
      <h3 className="mt-4 text-[20px] font-bold leading-tight">{title}</h3>
      <p className="mt-2 text-[14px] text-muted-foreground">{desc}</p>
      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}

/* ---------- FAQ item ---------- */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span>{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-primary transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-[14px] text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function BeePrimeLanding() {
  useReveal();

  const pillars = [
    { icon: Heart, n: "01", t: "Cultura Organizacional", d: "Os valores que dão identidade ao seu negócio e segurança ao time." },
    { icon: Wallet, n: "02", t: "Organização Financeira", d: "Caixa previsível, margens saudáveis e clareza nos números." },
    { icon: Users, n: "03", t: "Liderança e Pessoas", d: "Time engajado e líderes que destravam decisões sem você." },
    { icon: Megaphone, n: "04", t: "Marketing Estratégico", d: "Atração consistente, posicionamento e demanda qualificada." },
    { icon: Smile, n: "05", t: "Experiência do Paciente", d: "Jornada que encanta, retém e gera indicações espontâneas." },
    { icon: TrendingUp, n: "06", t: "Inteligência Comercial", d: "Funil de conversão, ticket médio e LTV sob controle." },
    { icon: Cog, n: "07", t: "Automação e Processos", d: "SOPs, ferramentas e rotinas que rodam sem o dono." },
  ];

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO */}
      <section className="bp-honeycomb relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Image slot */}
          <div className="bp-reveal mb-10 overflow-hidden rounded-sm border border-border">
            <img
              src={heroImage}
              alt="Médico empresário no comando da clínica"
              width={1280}
              height={1280}
              className="h-[260px] w-full object-cover md:h-[420px]"
            />
          </div>

          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-[50px] border border-primary/40 bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                <BeeLogo /> Consultoria Híbrida BP
              </span>
              <h1 className="mt-5 text-[34px] font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                Pare de ter uma agenda cheia
                <br />
                e comece a ter um{" "}
                <span className="text-primary">negócio lucrativo</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] text-muted-foreground md:text-[17px]">
                Método Colmeia® — o sistema de 7 pilares que tira o médico da
                cadeira de operador e o coloca na cadeira de CEO. 12 meses de
                acompanhamento híbrido para construir uma clínica que roda
                sem você.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#oferta"
                  className="inline-flex items-center gap-2 rounded-[50px] bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground hover:brightness-110 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Garantir minha vaga <ArrowRight size={18} />
                </a>
                <a
                  href="#metodo"
                  className="inline-flex items-center gap-2 rounded-[50px] border border-border bg-transparent px-6 py-3.5 text-[15px] font-semibold text-foreground hover:bg-muted transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Conhecer o Método
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:col-span-4 sm:grid-cols-3 md:grid-cols-1">
              <Stat value="R$100M+" label="Geridos por clientes BP" />
              <Stat value="8 estados + PY" label="Abrangência territorial" />
              <Stat value="12 meses" label="Acompanhamento contínuo" />
            </div>
          </div>
        </div>
      </section>

      {/* PAIN & COMPARE */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              01 — Diagnóstico
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              Você tem um negócio — ou uma clínica que é refém de você 24h por dia?
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bp-reveal rounded-sm border border-border bg-muted p-7">
              <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                A — O dono centralizador
              </span>
              <ul className="mt-5 space-y-3 text-[15px] text-muted-foreground">
                {[
                  "Refém da equipe e da agenda",
                  "Trabalha o dobro pelo mesmo resultado",
                  "Sem tempo para família ou estratégia",
                  "Caixa imprevisível, decisões no susto",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-muted-foreground/60" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bp-reveal rounded-sm border border-primary/50 bg-primary/5 p-7">
              <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-primary">
                B — O empresário da saúde
              </span>
              <ul className="mt-5 space-y-3 text-[15px] text-foreground">
                {[
                  "Processos que rodam sem o dono",
                  "Equipe autônoma e responsável",
                  "Tempo livre para liderar e viver",
                  "Caixa previsível e crescimento sustentável",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="bp-reveal mt-10 max-w-3xl text-[16px] text-muted-foreground">
            <span className="text-foreground font-semibold">A ponte entre A e B:</span>{" "}
            a Consultoria BP, validada na operação real — não em teoria.
          </p>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="bp-honeycomb border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              02 — Credibilidade
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              Não é teoria. <span className="text-primary">São casos reais.</span>
            </h2>
            <p className="mt-5 text-[16px] text-muted-foreground">
              O Método Colmeia® nasceu dentro da Clínica Rodrigo Campanholo
              Odontológica — operação que fatura mais de <strong className="text-foreground">R$500 mil/mês</strong>.
              Cada pilar foi testado no campo de batalha antes de virar
              processo replicável.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { v: "+R$500k", l: "Faturamento mensal da clínica-laboratório" },
              { v: "R$100M+", l: "Geridos pelos clientes da BP" },
              { v: "8 + PY", l: "Estados com clientes ativos" },
              { v: "12 meses", l: "Acompanhamento híbrido contínuo" },
            ].map((s) => (
              <div key={s.l} className="bp-reveal">
                <Stat value={s.v} label={s.l} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="metodo" className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              03 — Mecanismo único
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              Os 7 Pilares do <span className="text-primary">Método Colmeia®</span>
            </h2>
            <p className="mt-5 text-[16px] text-muted-foreground">
              Cada pilar é um sistema. Juntos, formam a colmeia que sustenta uma clínica lucrativa, escalável e independente do fundador.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Pillar key={p.n} icon={p.icon} num={p.n} title={p.t} desc={p.d} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="jornada" className="border-t border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              04 — Mapa de execução
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              A jornada de <span className="text-primary">12 meses</span>, em 4 passos.
            </h2>
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { i: Calendar, n: "01", t: "Duração", d: "12 meses de acompanhamento contínuo, sem atalhos." },
              { i: TrendingUp, n: "02", t: "Diagnóstico", d: "Raio-X completo da clínica: gente, processo, número, mercado." },
              { i: Cog, n: "03", t: "Plano de Ação", d: "Estratégia construída sobre os 7 pilares — priorização e cronograma." },
              { i: MapPin, n: "04", t: "Acompanhamento", d: "Híbrido: online ilimitado + 1 encontro presencial mensal." },
            ].map((s) => (
              <li key={s.n} className="bp-reveal rounded-sm border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    Passo {s.n}
                  </span>
                  <s.i size={18} className="text-primary" />
                </div>
                <h3 className="mt-4 text-[18px] font-bold">{s.t}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ROLES */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              05 — Regras do jogo
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              Cada um no seu papel. <span className="text-primary">Sem confusão.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { t: "A Colmeia", s: "A clínica", d: "O ativo que precisa funcionar como sistema, não como talento individual." },
              { t: "A Abelha Rainha", s: "Médico/Dono", d: "O executor e líder. Quem decide, prioriza e dá o ritmo." },
              { t: "As Abelhas Guias", s: "Bee Prime", d: "O mapa, a estratégia e a régua. Quem mostra o caminho." },
            ].map((r) => (
              <div key={r.t} className="bp-reveal rounded-sm border border-border bg-card p-7">
                <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-primary">
                  {r.s}
                </span>
                <h3 className="mt-3 text-[22px] font-bold">{r.t}</h3>
                <p className="mt-3 text-[14px] text-muted-foreground">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="resultados" className="bp-honeycomb border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              06 — Prova social
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              Resultados que falam <span className="text-primary">por si.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                n: "Dr. Luciano Muziol",
                f: "De R$ 30k → R$ 400k/mês",
                d: "Reestruturação financeira, comercial e de processos. Saída da operação em 8 meses.",
              },
              {
                n: "Clínica Juliano Bernardi",
                f: "Escala sustentável → R$ 700k/mês",
                d: "Liderança fortalecida, marketing estratégico e cultura replicável entre unidades.",
              },
            ].map((c) => (
              <article key={c.n} className="bp-reveal rounded-sm border border-border bg-card p-7">
                <Quote size={28} className="text-primary" />
                <p className="mt-4 text-[20px] font-bold leading-snug">{c.f}</p>
                <p className="mt-3 text-[14px] text-muted-foreground">{c.d}</p>
                <div className="mt-6 border-t border-border pt-4 text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
                  {c.n}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MINDSET */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal max-w-3xl">
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
              07 — Para quem é
            </span>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[44px]">
              Esta consultoria <span className="text-primary">não é para todos.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bp-reveal rounded-sm border border-border bg-muted p-7">
              <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Não é para você se…
              </span>
              <ul className="mt-5 space-y-3 text-[15px] text-muted-foreground">
                {[
                  "Pensa como funcionário, não como dono.",
                  "Terceiriza a culpa pelos resultados.",
                  "Quer fórmula mágica sem execução.",
                  "Não está disposto a se incomodar para crescer.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-muted-foreground/60" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bp-reveal rounded-sm border border-primary/50 bg-primary/5 p-7">
              <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-primary">
                É para você se…
              </span>
              <ul className="mt-5 space-y-3 text-[15px] text-foreground">
                {[
                  "Pensa e age como sócio do próprio negócio.",
                  "Assume o protagonismo das decisões.",
                  "Executa rápido — não procrastina.",
                  "Quer construir uma empresa, não um emprego de luxo.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="oferta" className="border-t border-border bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="bp-reveal grid gap-10 rounded-sm border border-primary/40 bg-card p-7 md:grid-cols-2 md:p-12">
            <div>
              <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
                08 — A oferta
              </span>
              <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[40px]">
                Consultoria Empresarial BP — <span className="text-primary">12 meses.</span>
              </h2>
              <ul className="mt-7 space-y-3 text-[15px] text-foreground">
                {[
                  "Diagnóstico completo da clínica",
                  "Plano de ação personalizado",
                  "Reuniões online ilimitadas",
                  "1 visita presencial por mês",
                  "Acesso integral aos 7 pilares do Método Colmeia®",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-sm border border-border bg-background p-7">
              <div>
                <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  Investimento total
                </div>
                <div className="mt-2 text-[44px] font-extrabold leading-none text-foreground">
                  R$ 96.000
                </div>
                <div className="mt-3 text-[15px] text-muted-foreground">
                  Entrada + 11x de <strong className="text-foreground">R$ 8.000</strong>
                </div>
                <ul className="mt-6 space-y-2 text-[13px] text-muted-foreground">
                  <li className="flex gap-2"><DollarSign size={14} className="mt-1 text-primary" /> Pagamento via boleto bancário.</li>
                  <li className="flex gap-2"><MapPin size={14} className="mt-1 text-primary" /> Despesas dos encontros presenciais não inclusas.</li>
                </ul>
              </div>

              <a
                href="https://bpgestao.com.br/"
                className="bp-pulse mt-8 inline-flex items-center justify-center gap-2 rounded-[50px] bg-primary px-6 py-4 text-[16px] font-bold text-primary-foreground hover:brightness-110 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Garantir minha vaga <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">
            09 — Quebra de objeções
          </span>
          <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[40px]">
            Perguntas que você está fazendo <span className="text-primary">agora.</span>
          </h2>
          <div className="mt-10">
            {[
              { q: "Funciona para qualquer especialidade médica?", a: "Sim. O Método Colmeia® é estrutural — gestão, time, finanças e processos não dependem da especialidade. Já aplicamos em odontologia, dermatologia, ortopedia, estética avançada e mais." },
              { q: "Minha clínica é pequena, faz sentido?", a: "Faz. Quanto antes você estruturar gestão profissional, menor o custo de escalar depois. Atendemos desde clínicas com 3 colaboradores até operações multiunidade." },
              { q: "Quanto tempo por semana eu preciso dedicar?", a: "Em média 3 a 5 horas semanais nos primeiros meses para diagnóstico e implantação. Depois, o tempo cai à medida que os processos rodam sozinhos." },
              { q: "Em quanto tempo vejo resultado?", a: "Os primeiros ganhos de organização aparecem em 30–60 dias. Resultados financeiros consistentes a partir do 4º mês, escalando até o 12º." },
              { q: "Como funciona o modelo híbrido?", a: "Você tem reuniões online ilimitadas com seu consultor + 1 visita presencial por mês na sua clínica para imersão e ajuste fino." },
            ].map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bp-honeycomb border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <BeeLogo className="mx-auto" />
          <h2 className="bp-reveal mt-6 text-[32px] font-extrabold leading-[1.05] md:text-[56px]">
            Continue no seu emprego de luxo.
            <br />
            Ou <span className="text-primary">construa uma empresa.</span>
          </h2>
          <p className="bp-reveal mt-6 text-[16px] text-muted-foreground md:text-[17px]">
            A escolha é sua. A vaga, não. Trabalhamos com turmas reduzidas para garantir profundidade na execução.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#oferta"
              className="bp-pulse inline-flex items-center gap-2 rounded-[50px] bg-primary px-7 py-4 text-[16px] font-bold text-primary-foreground hover:brightness-110 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Garantir minha vaga <ArrowRight size={18} />
            </a>
            <a
              href="#metodo"
              className="inline-flex items-center gap-2 rounded-[50px] border border-border px-7 py-4 text-[16px] font-semibold text-foreground hover:bg-muted transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Rever o Método
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
          <a href="#top" className="flex items-center gap-2">
            <BeeLogo />
            <span className="text-[15px] font-bold">
              Bee Prime <span className="text-primary">Gestão</span>
            </span>
          </a>
          <ul className="flex flex-wrap items-center gap-6 text-[13px] text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-foreground transition">Privacidade</a></li>
            <li><a href="#" className="hover:text-foreground transition">Contato</a></li>
          </ul>
          <p className="text-[12px] text-muted-foreground">
            © 2025 Bee Prime Gestão. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
