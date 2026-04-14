/* =================================================
   VS TEAM — Landing Page
   JavaScript vanilla (sem frameworks)
   ================================================= */

/* ---------- ADMIN DATA ----------
   Prioridade: 1) window.VSTEAM_DATA (arquivo site-data.js publicado)
               2) localStorage (rascunho/publicação local)
------------------------------------- */
const VSTEAM_STORAGE_KEY = 'vsteam_site_data';
function loadAdminData() {
  if (typeof window !== 'undefined' && window.VSTEAM_DATA) return window.VSTEAM_DATA;
  try { return JSON.parse(localStorage.getItem(VSTEAM_STORAGE_KEY)); } catch { return null; }
}
const ADMIN_DATA = loadAdminData();

function applyAdminLogo() {
  if (!ADMIN_DATA || !ADMIN_DATA.logo) return;
  document.querySelectorAll('.logo__img').forEach(img => { img.src = ADMIN_DATA.logo; });
}

function applyAdminHero() {
  if (!ADMIN_DATA || !ADMIN_DATA.hero) return;
  const media = document.querySelector('.hero__media');
  if (!media) return;
  const video = media.querySelector('.hero__video');
  if (video) video.remove();
  const existing = media.querySelector('.hero__admin-media');
  if (existing) existing.remove();
  let el;
  if (ADMIN_DATA.heroType === 'video') {
    el = document.createElement('video');
    el.src = ADMIN_DATA.hero;
    el.autoplay = true; el.muted = true; el.loop = true; el.playsInline = true;
    el.className = 'hero__video hero__admin-media';
  } else {
    el = document.createElement('img');
    el.src = ADMIN_DATA.hero;
    el.alt = '';
    el.className = 'hero__admin-media';
    el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
  }
  media.insertBefore(el, media.firstChild);
}

/* ---------- CONFIG ---------- */
// [PLACEHOLDER: substituir pelo número real no formato internacional sem "+", ex: 5511999999999]
const WHATSAPP_NUMBER = '5500000000000';

// Mensagens pré-preenchidas por contexto
const WHATSAPP_MESSAGES = {
  'geral':          'Olá! Vim pelo site da VS TEAM e gostaria de tirar uma dúvida.',
  'duvidas-planos': 'Olá! Tenho dúvidas sobre os planos da VS TEAM antes de contratar.',
  'aluno':          'Olá! Já sou aluno da VS TEAM e preciso de ajuda.',
  'suporte':        'Olá! Preciso de suporte técnico com o app/acesso da VS TEAM.',
  'assinatura':     'Olá! Tenho interesse na Assinatura Mensal da VS TEAM. Poderia me ajudar?',
  '1-protocolo':    'Olá! Tenho interesse no plano de 1 protocolo da VS TEAM. Poderia me ajudar?',
  '2-protocolos':   'Olá! Tenho interesse no plano de 2 protocolos da VS TEAM. Poderia me ajudar?',
  '3-protocolos':   'Olá! Tenho interesse no plano de 3 protocolos da VS TEAM. Poderia me ajudar?',
  '6-protocolos':   'Olá! Tenho interesse no plano de 6 protocolos da VS TEAM. Poderia me ajudar?',
  '12-protocolos':  'Olá! Tenho interesse no plano de 12 protocolos da VS TEAM. Poderia me ajudar?'
};

/* ---------- DADOS DOS SERVIÇOS ---------- */
const services = [
  {
    id: '1-protocolo',
    name: '1 Protocolo',
    protocols: 1,
    priceOld: 399.00,
    priceNew: 299.25,
    discount: '25%',
    duration: 'Validade: 30 a 60 dias',
    badge: null,
    description: 'Ideal para quem quer experimentar a metodologia VS TEAM. Inclui um protocolo personalizado completo, acesso ao aplicativo e suporte via WhatsApp durante toda a vigência.',
    benefits: [
      'Anamnese completa com nosso time',
      '1 protocolo de treino personalizado',
      'Acesso ao app por toda duração do plano',
      'Suporte via WhatsApp em horário comercial',
      'Vídeos de execução dos exercícios',
      'Ajustes pontuais durante o protocolo'
    ],
    faqs: [
      { q: 'Posso renovar ao final?', a: 'Sim! Ao final do protocolo você pode contratar um novo pacote com preço promocional para alunos.' },
      { q: 'Em quanto tempo recebo o treino?', a: 'Até 5 dias úteis após o pagamento e preenchimento da anamnese.' }
    ]
  },
  {
    id: '2-protocolos',
    name: '2 Protocolos',
    protocols: 2,
    priceOld: 800.00,
    priceNew: 528.00,
    discount: '34%',
    duration: 'Validade: 60 a 120 dias',
    badge: null,
    description: 'Dois protocolos completos para manter a evolução contínua. Cada protocolo é revisado com base nos resultados do anterior, garantindo progressão estruturada.',
    benefits: [
      'Anamnese inicial + revisões',
      '2 protocolos personalizados sequenciais',
      'Acesso completo ao aplicativo',
      'Suporte via WhatsApp',
      'Ajuste de carga e progressão',
      'Relatório de evolução entre protocolos'
    ],
    faqs: [
      { q: 'Qual a diferença entre os 2 protocolos?', a: 'O segundo é montado com base no seu retorno, progressão e resultados do primeiro.' },
      { q: 'Posso trocar o foco entre os protocolos?', a: 'Sim! É comum alternar entre fases (hipertrofia, força, condicionamento, etc.).' }
    ]
  },
  {
    id: '3-protocolos',
    name: '3 Protocolos',
    protocols: 3,
    priceOld: 1200.00,
    priceNew: 780.00,
    discount: '35%',
    duration: 'Validade: 90 a 180 dias',
    badge: 'Mais Popular',
    popular: true,
    description: 'Nosso plano mais procurado. Três protocolos sequenciais com progressão planejada para quem quer resultados consistentes em um ciclo completo de treino.',
    benefits: [
      'Anamnese + 2 revisões estruturadas',
      '3 protocolos personalizados',
      'Acesso total ao app',
      'Suporte prioritário via WhatsApp',
      'Progressão periodizada',
      'Relatórios de evolução entre fases',
      'Biblioteca exclusiva de vídeos'
    ],
    faqs: [
      { q: 'Por que é o mais popular?', a: 'Porque 3 protocolos representam o ciclo ideal para aparecerem resultados visíveis e consistentes.' },
      { q: 'Posso pausar entre protocolos?', a: 'Sim, respeitando a validade total do pacote.' }
    ]
  },
  {
    id: '6-protocolos',
    name: '6 Protocolos',
    protocols: 6,
    priceOld: 2400.00,
    priceNew: 1560.00,
    discount: '35%',
    duration: 'Validade: 180 a 360 dias',
    badge: null,
    description: 'Acompanhamento semestral com 6 protocolos ajustados ao longo da sua jornada. Ideal para quem busca constância e evolução de médio prazo.',
    benefits: [
      'Anamnese completa + 5 revisões',
      '6 protocolos personalizados',
      'Periodização avançada',
      'Suporte prioritário no WhatsApp',
      'Ajustes de rotina e equipamentos',
      'Relatórios de evolução detalhados',
      'Biblioteca exclusiva'
    ],
    faqs: [
      { q: 'Posso trocar o objetivo no meio?', a: 'Sim, seu objetivo pode ser revisado a cada novo protocolo.' },
      { q: 'E se eu parar de treinar por um período?', a: 'A validade absorve pausas curtas. Para longas, conversamos para ajustar.' }
    ]
  },
  {
    id: '12-protocolos',
    name: '12 Protocolos',
    protocols: 12,
    priceOld: 3600.00,
    priceNew: 2160.00,
    discount: '40%',
    duration: 'Validade: 360 a 720 dias',
    badge: 'Melhor Valor',
    popular: false,
    description: 'O acompanhamento mais completo. 12 protocolos ao longo de até 2 anos, com plano de evolução a longo prazo e total suporte da equipe VS TEAM.',
    benefits: [
      'Anamnese + revisões trimestrais',
      '12 protocolos personalizados',
      'Plano anual de periodização',
      'Suporte VIP via WhatsApp',
      'Relatórios trimestrais',
      'Vídeos exclusivos premium',
      'Bônus: Plano de desacelerar/manutenção'
    ],
    faqs: [
      { q: 'É possível renovar depois de 12?', a: 'Sim! Alunos fiéis possuem condições especiais de renovação.' },
      { q: 'Posso congelar o plano?', a: 'Sim, em situações específicas como lesão ou viagens longas.' }
    ]
  }
];

/* ---------- DEPOIMENTOS ---------- */
const testimonials = [
  { name: 'Ricardo Almeida', loc: 'São Paulo - SP', stars: 5, text: 'Comecei com 3 protocolos e não parei mais. Em 6 meses perdi 12kg e ganhei massa muscular de verdade. Suporte excelente no WhatsApp.' },
  { name: 'Juliana Martins', loc: 'Rio de Janeiro - RJ', stars: 5, text: 'O atendimento personalizado faz toda a diferença. Me sinto acompanhada de verdade, mesmo sendo online. Recomendo muito!' },
  { name: 'Pedro Henrique', loc: 'Belo Horizonte - MG', stars: 5, text: 'Treino em casa e a VS TEAM montou um protocolo perfeito com os equipamentos que eu tinha. Resultados impressionantes!' },
  { name: 'Camila Ribeiro', loc: 'Curitiba - PR', stars: 5, text: 'A assinatura mensal me manteve constante. Hoje não consigo mais treinar sozinha sem o direcionamento deles.' },
  { name: 'Marcos Silva', loc: 'Porto Alegre - RS', stars: 5, text: 'Já treino há anos, mas estagnei. Com a VS TEAM voltei a progredir. A periodização deles é outro nível.' },
  { name: 'Fernanda Costa', loc: 'Salvador - BA', stars: 5, text: 'Profissionais atentos, app intuitivo e resultados visíveis já no primeiro protocolo. Vale cada centavo!' }
];

/* ---------- REVIEWS GOOGLE (por card) ---------- */
const googleReviews = [
  { name: 'Ana Paula S.', stars: 5, date: 'há 2 semanas', text: 'Atendimento impecável e treinos que fazem diferença. Recomendo muito!' },
  { name: 'Lucas M.', stars: 5, date: 'há 1 mês', text: 'Superou minhas expectativas. O app é ótimo e o suporte é rápido.' },
  { name: 'Beatriz O.', stars: 5, date: 'há 3 semanas', text: 'Treino adaptado, resultados reais. Melhor investimento que fiz em mim.' }
];

/* ---------- TRANSFORMAÇÕES ---------- */
const transformations = [
  { name: '[PLACEHOLDER: Nome Aluno 1]', age: 28, time: '6 meses de acompanhamento' },
  { name: '[PLACEHOLDER: Nome Aluno 2]', age: 35, time: '4 meses de acompanhamento' },
  { name: '[PLACEHOLDER: Nome Aluno 3]', age: 42, time: '8 meses de acompanhamento' },
  { name: '[PLACEHOLDER: Nome Aluno 4]', age: 24, time: '3 meses de acompanhamento' },
  { name: '[PLACEHOLDER: Nome Aluno 5]', age: 31, time: '12 meses de acompanhamento' },
  { name: '[PLACEHOLDER: Nome Aluno 6]', age: 27, time: '5 meses de acompanhamento' }
];

/* ============================================
   UTILITÁRIOS
   ============================================ */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const formatBRL = n => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function openWhatsApp(context) {
  const msg = WHATSAPP_MESSAGES[context] || WHATSAPP_MESSAGES['geral'];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
}

function handlePurchase(planId) {
  // [PLACEHOLDER: integrar com gateway de pagamento / checkout]
  // Exemplo: window.location.href = `https://checkout.exemplo.com/${planId}`;
  alert(`Redirecionando para o checkout do plano: ${planId}\n\n[PLACEHOLDER: substituir por redirecionamento real para gateway de pagamento]`);
}

// Expor no window para onclicks inline
window.scrollToSection = scrollToSection;
window.openWhatsApp = openWhatsApp;
window.handlePurchase = handlePurchase;

/* ============================================
   RENDER: SERVICES
   ============================================ */
function renderServices() {
  const grid = $('#servicesGrid');
  if (!grid) return;

  grid.innerHTML = services.map(s => `
    <article class="service-card ${s.popular ? 'is-popular' : ''}" data-service-id="${s.id}">
      ${s.badge ? `<div class="service-card__badge-top">${s.badge}</div>` : ''}

      <div class="service-card__cover" aria-hidden="true">
        <div class="service-card__protocol-count">
          ${s.protocols}
          <small>${s.protocols === 1 ? 'PROTOCOLO' : 'PROTOCOLOS'}</small>
        </div>
      </div>

      <div class="service-card__body">
        <h3 class="service-card__name">${s.name}</h3>
        <p class="service-card__duration">${s.duration}</p>

        <div class="service-card__pricing">
          <span class="service-card__price-old">R$ ${formatBRL(s.priceOld)}</span>
          <span class="service-card__price-new"><span class="currency">R$</span>${formatBRL(s.priceNew)}</span>
        </div>
        <span class="service-card__discount">Economize ${s.discount}</span>

        <button class="service-card__toggle" aria-expanded="false" aria-controls="details-${s.id}" data-toggle="${s.id}">
          <span class="toggle-text">Ver Detalhes</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <div class="service-card__details" id="details-${s.id}">
        <div class="service-card__details-inner">

          <!-- Descrição -->
          <div class="details-block">
            <h4>Sobre esse plano</h4>
            <p>${s.description}</p>
          </div>

          <!-- Galeria antes/depois -->
          <div class="details-block">
            <h4>Transformações</h4>
            <div class="beforeafter-carousel">
              ${Array.from({ length: 5 }, (_, i) => `
                <div class="ba-slide" role="img" aria-label="Transformação ${i + 1}">
                  [PLACEHOLDER: Imagem ${i + 1}]
                </div>`).join('')}
            </div>
          </div>

          <!-- Reviews Google -->
          <div class="details-block">
            <h4>Avaliações Google ★ 4.9</h4>
            <div class="reviews-grid">
              ${googleReviews.map(r => `
                <div class="review-card">
                  <div class="review-card__head">
                    <div class="review-card__avatar">${r.name[0]}</div>
                    <div>
                      <div class="review-card__name">${r.name}</div>
                      <div class="review-card__date">${r.date}</div>
                    </div>
                  </div>
                  <div class="review-card__stars" aria-label="${r.stars} estrelas">${'★'.repeat(r.stars)}</div>
                  <p class="review-card__text">${r.text}</p>
                </div>`).join('')}
            </div>
          </div>

          <!-- Benefícios -->
          <div class="details-block">
            <h4>O que está incluso</h4>
            <ul class="benefits-list">
              ${s.benefits.map(b => `<li><span class="check">✓</span> ${b}</li>`).join('')}
            </ul>
          </div>

          <!-- FAQ específico -->
          <div class="details-block">
            <h4>Perguntas frequentes</h4>
            <div class="card-faq">
              ${s.faqs.map(f => `
                <details>
                  <summary>${f.q}</summary>
                  <p>${f.a}</p>
                </details>`).join('')}
            </div>
          </div>

          <!-- CTAs -->
          <div class="service-card__ctas">
            <button class="btn btn--primary btn--large btn--full" onclick="handlePurchase('${s.id}')">
              QUERO ESSE PLANO
            </button>
            <button class="btn btn--whatsapp btn--full" onclick="openWhatsApp('${s.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.8.8 2.5.9 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.8 1.5 5.4L2 22l4.7-1.5c1.6.9 3.4 1.4 5.3 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
              Tem dúvida? Fale conosco
            </button>
          </div>

        </div>
      </div>
    </article>
  `).join('');

  // Bind toggles
  $$('.service-card__toggle').forEach(btn => {
    btn.addEventListener('click', () => toggleServiceCard(btn.dataset.toggle));
  });
}

function toggleServiceCard(id) {
  const targetCard = document.querySelector(`.service-card[data-service-id="${id}"]`);
  if (!targetCard) return;
  const wasOpen = targetCard.classList.contains('is-open');

  // Fecha todos
  $$('.service-card').forEach(card => {
    card.classList.remove('is-open');
    const tgl = card.querySelector('.service-card__toggle');
    if (tgl) {
      tgl.setAttribute('aria-expanded', 'false');
      tgl.querySelector('.toggle-text').textContent = 'Ver Detalhes';
    }
  });

  // Abre o clicado (se já não estava aberto)
  if (!wasOpen) {
    targetCard.classList.add('is-open');
    const tgl = targetCard.querySelector('.service-card__toggle');
    tgl.setAttribute('aria-expanded', 'true');
    tgl.querySelector('.toggle-text').textContent = 'Fechar Detalhes';

    // Scroll suave para o card
    setTimeout(() => {
      const top = targetCard.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);
  }
}

/* ============================================
   RENDER: TRANSFORMAÇÕES (antes/depois slider)
   ============================================ */
function renderTransformations() {
  const grid = $('#transformationsGrid');
  if (!grid) return;

  // Se houver dados no admin, usa eles; senão usa os padrão
  const list = (ADMIN_DATA && Array.isArray(ADMIN_DATA.transformations) && ADMIN_DATA.transformations.length)
    ? ADMIN_DATA.transformations
    : transformations;

  grid.innerHTML = list.map((t, i) => {
    // Suporta imagem única (t.image) OU formato antigo (t.before/t.after)
    const combined = t.image || null;
    let beforeStyle = '', afterStyle = '';
    if (combined) {
      // Imagem única dividida ao meio: esquerda = antes, direita = depois
      const common = `background-image:url('${combined}');background-size:200% 100%;color:transparent;`;
      beforeStyle = `style="${common}background-position:left center;"`;
      afterStyle  = `style="${common}background-position:right center;"`;
    } else if (t.before || t.after) {
      if (t.before) beforeStyle = `style="background-image:url('${t.before}');background-size:cover;background-position:center;color:transparent;"`;
      if (t.after)  afterStyle  = `style="background-image:url('${t.after}');background-size:cover;background-position:center;color:transparent;"`;
    }
    const age = t.age ? `${t.age} anos · ` : '';
    return `
    <div class="transformation-item" data-reveal>
      <div class="ba-slider" data-ba-slider>
        <div class="ba-slider__img ba-slider__before" ${beforeStyle}>ANTES</div>
        <div class="ba-slider__img ba-slider__after" data-ba-after ${afterStyle}>DEPOIS</div>
        <div class="ba-slider__handle" data-ba-handle></div>
      </div>
      <div class="transformation-item__info">
        <div class="transformation-item__name">${t.name || ''}</div>
        <div class="transformation-item__meta">${age}${t.time || ''}</div>
      </div>
    </div>
  `;}).join('');

  // Ativa cada slider
  $$('[data-ba-slider]').forEach(initBASlider);
}

function initBASlider(slider) {
  const after = slider.querySelector('[data-ba-after]');
  const handle = slider.querySelector('[data-ba-handle]');
  let dragging = false;

  const update = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(rect.width, x));
    const pct = (x / rect.width) * 100;
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
  };

  const onDown = e => {
    dragging = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    update(x);
  };
  const onMove = e => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    update(x);
  };
  const onUp = () => { dragging = false; };

  slider.addEventListener('mousedown', onDown);
  slider.addEventListener('touchstart', onDown, { passive: true });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchend', onUp);
}

/* ============================================
   RENDER: DEPOIMENTOS (carrossel)
   ============================================ */
let testIndex = 0;
let testSlidesPerView = 1;

function renderTestimonials() {
  const track = $('#testimonialsTrack');
  const dotsWrap = $('#testDots');
  if (!track) return;

  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-card__head">
        <div class="testimonial-card__avatar">${t.name[0]}</div>
        <div>
          <div class="testimonial-card__name">${t.name}</div>
          <div class="testimonial-card__loc">${t.loc}</div>
        </div>
      </div>
      <div class="testimonial-card__stars" aria-label="${t.stars} estrelas">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-card__text">"${t.text}"</p>
    </div>
  `).join('');

  // Calcula slides por view
  testSlidesPerView = window.innerWidth >= 1024 ? 3 : 1;
  const total = Math.max(1, testimonials.length - testSlidesPerView + 1);

  dotsWrap.innerHTML = Array.from({ length: total }, (_, i) =>
    `<button class="carousel__dot ${i === 0 ? 'is-active' : ''}" role="tab" aria-label="Ir para depoimento ${i + 1}" data-dot="${i}"></button>`
  ).join('');

  $$('#testDots .carousel__dot').forEach(d => {
    d.addEventListener('click', () => goToTest(parseInt(d.dataset.dot, 10)));
  });

  updateTestimonials();
}

function goToTest(i) {
  const total = Math.max(1, testimonials.length - testSlidesPerView + 1);
  testIndex = (i + total) % total;
  updateTestimonials();
}

function updateTestimonials() {
  const track = $('#testimonialsTrack');
  if (!track) return;
  const pct = (100 / testSlidesPerView) * testIndex;
  track.style.transform = `translateX(-${pct}%)`;
  $$('#testDots .carousel__dot').forEach((d, i) => {
    d.classList.toggle('is-active', i === testIndex);
  });
}

/* ============================================
   CONTADORES ANIMADOS
   ============================================ */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  const fmt = (v) => prefix + v.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }) + suffix;

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = fmt(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = fmt(target);
  };
  requestAnimationFrame(tick);
}

/* ============================================
   INTERSECTION OBSERVER: REVEAL + COUNTERS
   ============================================ */
function setupScrollReveal() {
  const reveals = $$('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => io.observe(el));

  // Counters
  const counters = $$('[data-count]');
  const co = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        co.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => co.observe(el));
}

/* ============================================
   HEADER SCROLL STATE + MOBILE NAV
   ============================================ */
function setupHeader() {
  const header = $('#header');
  const toggle = $('#navToggle');
  const nav = $('.nav');
  const mobileCta = $('#mobileCta');
  const hero = $('#hero');

  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // Mostra CTA mobile após passar do hero
    if (mobileCta && hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight - 100;
      if (window.scrollY > heroBottom) {
        mobileCta.classList.add('is-visible');
        mobileCta.setAttribute('aria-hidden', 'false');
      } else {
        mobileCta.classList.remove('is-visible');
        mobileCta.setAttribute('aria-hidden', 'true');
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Fechar menu ao clicar em link
  $$('.nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

/* ============================================
   WHATSAPP WIDGET FLUTUANTE
   ============================================ */
function setupWhatsApp() {
  const btn = $('#waBtn');
  const widget = $('#waWidget');
  const close = $('#waClose');
  const tooltip = $('#waTooltip');

  const toggleWidget = (force) => {
    const open = typeof force === 'boolean' ? force : !widget.classList.contains('is-open');
    widget.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) tooltip.classList.remove('is-visible');
  };

  btn.addEventListener('click', () => toggleWidget());
  close.addEventListener('click', () => toggleWidget(false));

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!$('#waFloat').contains(e.target)) toggleWidget(false);
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleWidget(false);
  });

  // Tooltip após 5 segundos
  setTimeout(() => {
    if (!widget.classList.contains('is-open')) {
      tooltip.classList.add('is-visible');
      setTimeout(() => tooltip.classList.remove('is-visible'), 5000);
    }
  }, 5000);
}

/* ============================================
   RESIZE HANDLER
   ============================================ */
function setupResize() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newSpv = window.innerWidth >= 1024 ? 3 : 1;
      if (newSpv !== testSlidesPerView) {
        renderTestimonials();
      }
    }, 200);
  });
}

/* ============================================
   CARROSSEL DEPOIMENTOS - NAV
   ============================================ */
function setupTestNav() {
  $('#testPrev')?.addEventListener('click', () => goToTest(testIndex - 1));
  $('#testNext')?.addEventListener('click', () => goToTest(testIndex + 1));

  // Auto-scroll
  setInterval(() => {
    const total = Math.max(1, testimonials.length - testSlidesPerView + 1);
    goToTest((testIndex + 1) % total);
  }, 6000);
}

/* ============================================
   FOOTER YEAR
   ============================================ */
function setYear() {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyAdminLogo();
  applyAdminHero();
  renderServices();
  renderTransformations();
  renderTestimonials();
  setupScrollReveal();
  setupHeader();
  setupWhatsApp();
  setupResize();
  setupTestNav();
  setYear();

  // Marcar novos elementos criados via JS para reveal
  setTimeout(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$('[data-reveal]:not(.is-visible)').forEach(el => io.observe(el));
  }, 100);
});
