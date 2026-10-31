// Ícones SVG em formato de string para renderização dinâmica
const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  box: '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.8M16 3.2a4 4 0 0 1 0 7.6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  arrow: '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M12 3v12m0 0 5-5m-5 5-5-5"/><path d="M5 21h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

// Configurações de navegação
const adminNav = [
  ["Visão geral", "grid"],
  ["Itens necessários", "heart"],
  ["Agendamentos", "calendar"],
  ["Estoque", "box"],
  ["Movimentações", "clock"],
  ["Relatórios", "chart"],
];

const donorNav = [
  ["Necessidades", "heart"],
  ["Agendar entrega", "calendar"],
  ["Minhas contribuições", "box"],
];

// Dados simulados transformados em variáveis globais para permitir interação e atualização
let stock = [
  { id: 1, item: "Arroz tipo 1", category: "Alimentos", qty: 142, status: "Estável", tone: "green" },
  { id: 2, item: "Leite integral", category: "Alimentos", qty: 28, status: "Baixo", tone: "orange" },
  { id: 3, item: "Fralda infantil M", category: "Higiene", qty: 16, status: "Crítico", tone: "red" },
  { id: 4, item: "Óleo de cozinha", category: "Alimentos", qty: 64, status: "Estável", tone: "green" },
];

let appointmentsData = [
  { id: 1, name: "Rafael Santos", time: "09:00", items: "Arroz, feijão e óleo • 6 itens", received: false, color: "blue" },
  { id: 2, name: "Carla Mendes", time: "10:30", items: "Produtos de higiene • 12 itens", received: false, color: "orange" },
  { id: 3, name: "João Lima", time: "13:00", items: "Roupas infantis • 2 volumes", received: false, color: "green" },
  { id: 4, name: "Amanda Brito", time: "14:30", items: "Alimentos não perecíveis • 8 itens", received: false, color: "purple" },
];

// Estado unificado da aplicação
const state = {
  authenticated: false,
  role: "doador", // 'admin' ou 'doador'
  page: "Necessidades",
  mobile: false, // Controle de responsividade do menu
  notificationOpen: false,
  unread: [0, 1],
  dismissed: [],
  showPassword: false,
  notice: "",
  slot: "10:30",
};

// Componentes da Interface
function logo() {
  return `<div class="logo"><div class="logo-mark">${icon("heart", 21)}</div><div><b>Elo Solidário</b><span>Central de Doações</span></div></div>`;
}

function login() {
  const admin = state.role === "admin";
  return `
    <div class="login-page login-${state.role}">
      <section class="login-brand">
        ${logo()}
        <div class="brand-message">
          <span class="brand-symbol">${icon(admin ? "chart" : "heart", 32)}</span>
          <p>${admin ? "GESTÃO QUE TRANSFORMA" : "SOLIDARIEDADE QUE APROXIMA"}</p>
          <h1>${admin ? "Organize recursos. Multiplique impactos." : "Toda doação pode transformar uma história."}</h1>
          <span>${admin ? "Uma visão clara para cuidar das doações, do estoque e de cada atendimento." : "Consulte necessidades e agende sua entrega de forma simples e segura."}</span>
        </div>
        <small>© 2026 Elo Solidário</small>
      </section>
      <main class="login-main">
        <div class="login-box">
          <div class="login-heading"><h2>Bem-vindo de volta</h2><p>Escolha como deseja acessar a plataforma.</p></div>
          <div class="role-selector">
            <button class="${!admin ? "selected" : ""}" data-role="doador"><span>${icon("heart")}</span><span><b>Sou doador</b><small>Doações e agendamentos</small></span></button>
            <button class="${admin ? "selected" : ""}" data-role="admin"><span>${icon("grid")}</span><span><b>Sou administrador</b><small>Gestão da instituição</small></span></button>
          </div>
          <div class="login-context">${icon(admin ? "settings" : "heart", 17)}<span>Acessando como <b>${admin ? "administrador" : "doador"}</b></span></div>
          <form id="login-form">
            <label for="email">E-mail</label>
            <div class="input-field">${icon("users", 18)}<input id="email" required type="email" placeholder="${admin ? "nome@instituicao.org" : "seuemail@exemplo.com"}" /></div>
            <div class="password-label"><label for="password">Senha</label><button type="button" data-action="forgot">Esqueci minha senha</button></div>
            <div class="input-field">${icon("settings", 18)}<input id="password" required type="${state.showPassword ? "text" : "password"}" placeholder="Digite sua senha" /><button type="button" data-action="password">${state.showPassword ? "Ocultar" : "Mostrar"}</button></div>
            <label class="remember"><input type="checkbox" /> Manter-me conectado</label>
            ${state.notice ? `<p class="auth-notice">${state.notice}</p>` : ""}
            <button class="login-submit" type="submit">Entrar como ${admin ? "administrador" : "doador"} ${icon("arrow", 17)}</button>
          </form>
          <div class="divider"><span>ou continue com</span></div>
          <div class="social-login"><button data-action="social"><b>G</b> Google</button><button data-action="social"><b>m</b> Microsoft</button></div>
          <p class="signup">${admin ? 'Acesso restrito à equipe. <button data-action="access">Solicitar acesso</button>' : 'Ainda não tem uma conta? <button data-action="signup">Cadastre-se gratuitamente</button>'}</p>
          <p class="security-note">Ambiente seguro. Dados tratados conforme a LGPD.</p>
        </div>
      </main>
    </div>`;
}

function notifications() {
  const items = state.role === "admin"
    ? [
        { title: "Entrega aguardando confirmação", text: "Rafael Santos chegou para o horário das 09:00.", time: "Agora", icon: "calendar", page: "Agendamentos" },
        { title: "Estoque em nível crítico", text: "Fralda infantil M possui apenas 16 unidades.", time: "Há 18 min", icon: "box", page: "Estoque" },
        { title: "Nova necessidade publicada", text: "O item Leite integral já está visível aos doadores.", time: "Ontem", icon: "heart", page: "Itens necessários" },
      ]
    : [
        { title: "Agendamento confirmado", text: "Sua entrega está marcada para 28 de agosto, às 10:30.", time: "Agora", icon: "calendar", page: "Minhas contribuições" },
        { title: "Nova necessidade urgente", text: "A instituição precisa de fraldas infantis tamanho M.", time: "Há 1 h", icon: "heart", page: "Necessidades" },
        { title: "Obrigado pela sua doação", text: "Sua última entrega de 8 itens foi recebida com sucesso.", time: "12 jul", icon: "box", page: "Minhas contribuições" },
      ];
  
  const visible = items
    .map((item, index) => ({ ...item, index }))
    .filter((item) => !state.dismissed.includes(item.index));
    
  return `
    <div class="notification-wrap">
      <button class="icon-btn ${state.notificationOpen ? "active" : ""}" data-action="notifications" aria-label="Notificações">
        ${icon("bell", 19)}${state.unread.length ? "<i></i>" : ""}
      </button>
      ${state.notificationOpen ? `
        <div class="notification-panel">
          <div class="notification-head">
            <div><h3>Notificações</h3><span>${visible.length ? `${visible.length} novas` : "Tudo em dia"}</span></div>
            ${visible.length ? '<button data-action="read-all">Marcar todas como lidas</button>' : ""}
          </div>
          <div class="notification-list">
            ${visible.map((item) => `
              <button class="notification-item ${state.unread.includes(item.index) ? "unread" : ""}" data-notification="${item.index}" data-page="${item.page}">
                <span class="notification-icon">${icon(item.icon, 18)}</span>
                <span class="notification-copy"><b>${item.title}</b><span>${item.text}</span><small>${item.time}</small></span>
                ${state.unread.includes(item.index) ? "<em></em>" : ""}
              </button>`).join("")}
            ${visible.length ? "" : `<div class="notification-empty"><span>${icon("bell", 22)}</span><b>Nenhuma nova notificação</b><p>Você está em dia com todas as atividades.</p></div>`}
          </div>
          <button class="notification-footer" data-action="all-activities">Ver todas as atividades ${icon("arrow", 15)}</button>
        </div>` : ""}
    </div>`;
}

function appShell() {
  const admin = state.role === "admin";
  const nav = admin ? adminNav : donorNav;
  return `
    <div class="app ${state.role}-theme">
      <!-- O estado mobile controla a classe 'open' para exibir a sidebar em telas menores -->
      <aside class="sidebar ${state.mobile ? "open" : ""}">
        ${logo()}
        <nav>
          <p class="eyebrow">${admin ? "GESTÃO" : "PORTAL DO DOADOR"}</p>
          ${nav.map(([label, name]) => `<button class="nav-item ${state.page === label ? "active" : ""}" data-page="${label}">${icon(name)}<span>${label}</span></button>`).join("")}
          ${admin ? `<p class="eyebrow second">ADMINISTRAÇÃO</p><button class="nav-item">${icon("users")}<span>Equipe e acessos</span></button><button class="nav-item">${icon("settings")}<span>Configurações</span></button>` : ""}
        </nav>
        <div class="sidebar-bottom">
          <div class="impact"><span>Impacto este mês</span><b>1.284</b><small>itens recebidos</small><div><i style="width:72%"></i></div><em>72% da meta mensal</em></div>
          <button class="user" data-action="logout"><span class="avatar">${admin ? "MC" : "AS"}</span><span><b>${admin ? "Marina Costa" : "Ana Souza"}</b><small>${admin ? "Administradora" : "Doadora"} • Sair</small></span>${icon("arrow", 16)}</button>
        </div>
      </aside>
      <main>
        <header>
          <button class="menu-btn" data-action="menu">${icon("menu")}</button>
          <div class="search">${icon("search", 18)}<input placeholder="Buscar no sistema..." /><kbd>⌘ K</kbd></div>
          <div class="header-actions">
            <span class="area-badge">${admin ? "Área administrativa" : "Portal do doador"}</span>
            ${notifications()}
            <button class="profile-chip" data-action="logout"><span>${admin ? "MC" : "AS"}</span><b>${admin ? "Admin" : "Doador"}</b></button>
          </div>
        </header>
        <div class="content">${admin ? adminPage() : donorPage()}</div>
      </main>
      <!-- Overlay escuro que fecha a sidebar ao ser clicado no mobile -->
      ${state.mobile ? '<div class="scrim" data-action="menu"></div>' : ""}
    </div>`;
}

function pageTitle(title, text, action = "", eyebrow = "") {
  return `<div class="page-title"><div>${eyebrow ? `<p class="green-label">${eyebrow}</p>` : ""}<h1>${title}</h1><p>${text}</p></div>${action ? `<button class="primary">${icon("plus", 18)}${action}</button>` : ""}</div>`;
}

function metric(name, color, label, value, note) {
  return `<div class="metric card"><div class="metric-icon ${color}">${icon(name)}</div><span>${label}</span><b>${value}</b><small class="${color === "purple" ? "warning" : ""}">${note}</small></div>`;
}

function stockTable(compact = false) {
  return `<div class="table-wrap"><table><thead><tr><th>ITEM</th><th>CATEGORIA</th><th>DISPONÍVEL</th><th>STATUS</th>${compact ? "" : "<th>AÇÕES</th>"}</tr></thead><tbody>
    ${stock.slice(0, compact ? 3 : 4).map((row) => `
      <tr>
        <td><b>${row.item}</b></td>
        <td>${row.category}</td>
        <td>${row.qty} un.</td>
        <td><span class="status ${row.tone}">${row.status}</span></td>
        ${compact ? "" : `<td><button class="text-btn" data-action="movimentar" data-id="${row.id}">Movimentar</button></td>`}
      </tr>`).join("")}
  </tbody></table></div>`;
}

function adminPage() {
  if (state.page === "Visão geral") return dashboard();
  if (state.page === "Agendamentos") return appointmentsPage();
  if (state.page === "Estoque") return inventory();
  if (state.page === "Itens necessários") return needsAdmin();
  return genericAdmin();
}

function dashboard() {
  const bars = [42, 55, 48, 70, 64, 82, 72];
  const months = ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
  const pendingAppointments = appointmentsData.filter(a => !a.received);

  return `
    ${pageTitle("Olá, Marina!", "Aqui está o resumo da Central de Doações hoje.", "", "QUARTA-FEIRA, 28 DE AGOSTO")}
    <section class="metrics">
      ${metric("heart", "blue", "Doações no mês", "186", "+12% em relação a julho")}
      ${metric("calendar", "orange", "Agendamentos hoje", appointmentsData.length.toString(), `${pendingAppointments.length} aguardando confirmação`)}
      ${metric("box", "green", "Itens em estoque", "1.284", "38 tipos de produtos")}
      ${metric("clock", "purple", "Próximos da validade", "8", "Precisam de atenção")}
    </section>
    <section class="dashboard-grid">
      <div class="card chart-card">
        <div class="card-head"><div><h2>Doações recebidas</h2><p>Volume de itens nos últimos 7 meses</p></div><select><option>Últimos 7 meses</option></select></div>
        <div class="chart-wrap"><div class="y-axis"><span>300</span><span>200</span><span>100</span><span>0</span></div><div class="bars">${bars.map((value, index) => `<div class="bar-col"><div class="bar" style="height:${value}%"></div><span>${months[index]}</span></div>`).join("")}</div></div>
      </div>
      <div class="card agenda-card">
        <div class="card-head"><div><h2>Agenda de hoje</h2><p>Quarta-feira, 28 de agosto</p></div><button data-page="Agendamentos">Ver agenda</button></div>
        <div class="appointments">
          ${appointmentsData.map(a => `
            <div class="appointment"><b class="time">${a.time}</b><span class="avatar ${a.color}">${a.name.split(" ").map(p => p[0]).join("")}</span><span><b>${a.name}</b><small>${a.items}</small></span><span class="pill">${a.received ? "Recebido" : "Confirmado"}</span></div>
          `).join("")}
        </div>
      </div>
    </section>
    <section class="bottom-grid">
      <div class="card"><div class="card-head"><div><h2>Atenção ao estoque</h2><p>Itens com nível baixo ou validade próxima</p></div><button data-page="Estoque">Ver estoque</button></div>${stockTable(true)}</div>
      <div class="card quick"><h2>Ações rápidas</h2>
        <button data-page="Agendamentos"><span class="quick-icon blue">${icon("calendar")}</span><span><b>Confirmar recebimento</b><small>Registrar entrega agendada</small></span>${icon("arrow", 17)}</button>
        <button data-page="Estoque"><span class="quick-icon green">${icon("box")}</span><span><b>Registrar movimentação</b><small>Entrada ou saída de estoque</small></span>${icon("arrow", 17)}</button>
        <button data-page="Itens necessários"><span class="quick-icon orange">${icon("heart")}</span><span><b>Adicionar necessidade</b><small>Publicar item para doação</small></span>${icon("arrow", 17)}</button>
      </div>
    </section>`;
}

function appointmentsPage() {
  const pendingCount = appointmentsData.filter(a => !a.received).length;
  return `
    ${pageTitle("Agendamentos", "Acompanhe as entregas previstas e confirme os recebimentos.", "Novo horário")}
    <div class="date-strip card">${["27|TER", "28|QUA", "29|QUI", "30|SEX", "31|SÁB"].map((date, index) => `<button class="${index === 1 ? "selected" : ""}">${date.split("|").map((part) => `<span>${part}</span>`).join("")}</button>`).join("")}</div>
    <div class="card schedule-list">
      <div class="card-head"><div><h2>Quarta-feira, 28 de agosto</h2><p>${appointmentsData.length} agendamentos • ${pendingCount} aguardando confirmação</p></div></div>
      ${appointmentsData.map((a, index) => {
        const initials = a.name.split(" ").map((part) => part[0]).join("");
        const end = index % 2 ? "até 11:00" : `até ${Number(a.time.slice(0, 2)) + 1}:00`;
        return `
          <div class="schedule-row">
            <div class="schedule-time"><b>${a.time}</b><span>${end}</span></div>
            <span class="avatar ${a.color}">${initials}</span>
            <div class="schedule-info"><b>${a.name}</b><span>${a.items}</span></div>
            ${a.received 
              ? '<span class="status green">Recebido</span>' 
              : `<button class="outline" data-confirm="${a.id}">Confirmar recebimento</button>`}
          </div>`;
      }).join("")}
    </div>`;
}

function inventory() {
  return `${pageTitle("Controle de estoque", "Consulte saldos, validades e registre entradas ou saídas.", "Nova movimentação")}
    <div class="filters card"><div class="search">${icon("search", 18)}<input placeholder="Buscar produto..." /></div><select><option>Todas as categorias</option></select><select><option>Todos os status</option></select><button class="outline">${icon("download", 17)} Exportar</button></div>
    <div class="card"><div class="card-head padded"><div><h2>Inventário atual</h2><p>38 produtos cadastrados • atualizado há pouco</p></div></div>${stockTable()}</div>`;
}

function needsAdmin() {
  const needs = [
    ["Arroz tipo 1", "Alimentos", "Alta prioridade", "180 de 250 un.", "72%", "red"],
    ["Leite integral", "Alimentos", "Alta prioridade", "42 de 150 un.", "28%", "red"],
    ["Fralda infantil M", "Higiene", "Urgente", "16 de 100 un.", "16%", "orange"],
    ["Cobertores", "Vestuário", "Prioridade média", "34 de 60 un.", "57%", "blue"],
  ];
  return `${pageTitle("Itens necessários", "Gerencie o que a instituição precisa receber da comunidade.", "Adicionar item")}<div class="needs-admin">${needs.map((item) => `<div class="card need-row"><div class="need-icon ${item[5]}">${icon("heart")}</div><div><h3>${item[0]}</h3><p>${item[1]} • ${item[2]}</p></div><div class="progress-info"><span>${item[3]}</span><div><i style="width:${item[4]}"></i></div></div><button class="outline">Editar</button></div>`).join("")}</div>`;
}

function genericAdmin() {
  return `${pageTitle(state.page, "Consulte e gerencie os registros da Central de Doações.", state.page === "Movimentações" ? "Nova movimentação" : "")}<div class="card empty-state"><div class="metric-icon blue">${icon("chart")}</div><h2>Visão consolidada</h2><p>Use os filtros para consultar informações por período, categoria e responsável.</p><button class="primary">Gerar relatório</button></div>`;
}

function donorPage() {
  if (state.page === "Agendar entrega") return donorSchedule();
  if (state.page === "Minhas contribuições") return contributions();
  
  const needs = [
    ["Arroz e feijão", "Alimentos", "Precisamos de 160 unidades", "72%", "Alta prioridade", "red"],
    ["Leite integral", "Alimentos", "Precisamos de 108 unidades", "28%", "Alta prioridade", "orange"],
    ["Fralda infantil M", "Higiene", "Precisamos de 84 pacotes", "16%", "Urgente", "red"],
    ["Cobertores", "Vestuário", "Precisamos de 26 unidades", "57%", "Prioridade média", "blue"],
  ];
  return `
    <div class="donor-hero"><div><p class="green-label">FAÇA PARTE DESSA REDE</p><h1>Sua doação transforma histórias.</h1><p>Confira o que precisamos neste momento e ajude a levar cuidado a quem mais precisa.</p><button class="primary" data-page="Agendar entrega">Agendar uma entrega ${icon("arrow", 17)}</button></div><div class="hero-heart">${icon("heart", 52)}<span>1.284<small>itens doados este mês</small></span></div></div>
    ${pageTitle("Necessidades prioritárias", "Itens que fazem mais diferença para a instituição agora.")}
    <div class="donor-needs">${needs.map((item) => `<div class="card donor-need"><div class="need-icon ${item[5]}">${icon("heart")}</div><span class="status ${item[5]}">${item[4]}</span><h3>${item[0]}</h3><p>${item[1]}</p><div class="need-progress"><span>${item[2]}</span><b>${item[3]}</b><div><i style="width:${item[3]}"></i></div></div><button class="outline" data-page="Agendar entrega">Quero doar ${icon("arrow", 16)}</button></div>`).join("")}</div>`;
}

function donorSchedule() {
  const days = Array.from({ length: 35 }, (_, index) => index < 4 ? "" : String(index - 3));
  const slots = ["09:00", "10:30", "13:00", "14:30", "16:00"];
  return `${pageTitle("Agendar entrega", "Escolha o melhor dia e horário para levar sua doação.")}
    <div class="booking-grid">
      <div class="card calendar-card"><div class="calendar-head"><button>‹</button><b>Agosto 2026</b><button>›</button></div><div class="week">${["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((day) => `<b>${day}</b>`).join("")}${days.map((day, index) => `<button class="${day === "28" ? "selected" : ""}" ${!day || [0, 6].includes(index % 7) ? "disabled" : ""}>${day}</button>`).join("")}</div></div>
      <div class="card slots"><h2>Horários disponíveis</h2><p>Quarta-feira, 28 de agosto</p>${slots.map((slot, index) => `<button ${index === 3 ? "disabled" : ""} class="${state.slot === slot ? "selected" : ""}" data-slot="${slot}">${icon("clock", 18)}<span><b>${slot}</b><small>${index === 3 ? "Capacidade esgotada" : index === 1 ? "2 vagas disponíveis" : "4 vagas disponíveis"}</small></span>${index === 3 ? "<em>Esgotado</em>" : ""}</button>`).join("")}<button class="primary confirm" data-action="book-slot">Continuar com ${state.slot}</button></div>
    </div>`;
}

function contributions() {
  const history = [
    ["28 ago 2026", "Agendado", "Arroz, feijão e leite • 12 itens"],
    ["12 jul 2026", "Recebido", "Produtos de higiene • 8 itens"],
    ["03 jun 2026", "Recebido", "Roupas infantis • 2 volumes"],
  ];
  return `${pageTitle("Minhas contribuições", "Acompanhe seus agendamentos e o impacto das suas doações.")}
    <div class="metrics donor-metrics">${metric("heart", "blue", "Doações realizadas", "7", "Obrigado por fazer a diferença")}${metric("box", "green", "Itens doados", "46", "Em 4 categorias")}${metric("calendar", "orange", "Próxima entrega", "28 ago", "às 10:30")}</div>
    <div class="card contributions"><div class="card-head"><div><h2>Histórico</h2><p>Seus agendamentos e entregas recentes</p></div></div>${history.map((item, index) => `<div class="contribution"><div class="date-box"><b>${item[0].split(" ")[0]}</b><span>${item[0].split(" ")[1]}</span></div><div><b>${item[2]}</b><span>Central Elo Solidário • ${item[0]}</span></div><span class="status ${index ? "green" : "blue"}">${item[1]}</span>${icon("arrow", 17)}</div>`).join("")}</div>`;
}

// Renderização Principal
function render() {
  document.getElementById("app").innerHTML = state.authenticated ? appShell() : login();
}

// Delegação de Eventos (Event Listeners)
document.addEventListener("submit", (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();
    state.authenticated = true;
    state.page = state.role === "admin" ? "Visão geral" : "Necessidades";
    state.notice = "";
    render();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-action]");
  if (!target) return;

  // Lógica de alteração de papel na tela de login
  if (target.dataset.role) {
    state.role = target.dataset.role;
    state.notice = "";
  } 
  // Lógica de descarte de notificações
  else if (target.dataset.notification !== undefined) {
    const index = Number(target.dataset.notification);
    state.unread = state.unread.filter((item) => item !== index);
    state.dismissed.push(index);
    state.page = target.dataset.page;
    state.notificationOpen = false;
    state.mobile = false; // Fecha menu mobile ao clicar
  } 
  // Roteamento interno (troca de página)
  else if (target.dataset.page) {
    state.page = target.dataset.page;
    state.mobile = false; // Fecha a sidebar no mobile ao navegar
    state.notificationOpen = false;
  } 
  // Confirmação de recebimento no painel do admin
  else if (target.dataset.confirm) {
    const appointmentId = Number(target.dataset.confirm);
    const appt = appointmentsData.find(a => a.id === appointmentId);
    if (appt) appt.received = true;
  } 
  // Seleção de slot de horário no painel do doador
  else if (target.dataset.slot && !target.disabled) {
    state.slot = target.dataset.slot;
  } 
  // Demais ações da interface
  else {
    switch (target.dataset.action) {
      case "password":
        state.showPassword = !state.showPassword;
        break;
      case "forgot":
        state.notice = "Enviamos as instruções de recuperação para o seu e-mail.";
        break;
      case "signup":
        state.notice = "Cadastro iniciado. Enviaremos a confirmação por e-mail.";
        break;
      case "access":
        state.notice = "Solicitação enviada ao responsável.";
        break;
      case "social":
        state.authenticated = true;
        state.page = state.role === "admin" ? "Visão geral" : "Necessidades";
        break;
      case "logout":
        state.authenticated = false;
        state.mobile = false;
        state.notice = "";
        break;
      case "menu":
        state.mobile = !state.mobile; // Toggle da sidebar responsiva
        break;
      case "notifications":
        state.notificationOpen = !state.notificationOpen;
        break;
      case "read-all":
        state.unread = [];
        state.dismissed = [0, 1, 2];
        break;
      case "all-activities":
        state.notificationOpen = false;
        state.page = state.role === "admin" ? "Agendamentos" : "Minhas contribuições";
        break;
      case "book-slot":
        state.page = "Minhas contribuições"; // Navega e simula agendamento
        break;
      default:
        return;
    }
  }
  // Sempre reconstruir a interface para refletir o novo estado
  render();
});

// Primeira renderização
render();