const erro = document.getElementById('erro');
const calendarGrid = document.getElementById('calendarGrid');
const agendamentos = JSON.parse(localStorage.getItem('agendamentos_julio')) || [];

function gerarCalendario() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaSemanaInicio = primeiroDia.getDay();
  calendarGrid.innerHTML = "";

  const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  nomesDias.forEach(dia => {
    const label = document.createElement('div');
    label.textContent = dia;
    label.style.fontWeight = 'bold';
    calendarGrid.appendChild(label);
  });

  for (let i = 0; i < diaSemanaInicio; i++) {
    const vazio = document.createElement('div');
    calendarGrid.appendChild(vazio);
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataAtual = new Date(ano, mes, dia).toISOString().split('T')[0];
    const ocupado = agendamentos.some(item => item.data === dataAtual);
    const hojeData = new Date().toISOString().split('T')[0];

    const cell = document.createElement('div');
    cell.className = 'day';
    if (ocupado) cell.classList.add('occupied');
    if (dataAtual === hojeData) cell.classList.add('today');
    cell.textContent = dia;
    cell.onclick = () => document.getElementById('data').value = dataAtual;
    calendarGrid.appendChild(cell);
  }
}

function enviarWhatsapp() {
  const nome = document.querySelector('[name="nome"]').value.trim();
  const data = document.getElementById('data').value;
  const hora = document.querySelector('[name="hora"]').value;
  const servico = document.querySelector('[name="servico"]').value.trim();
  const telefone = document.getElementById('whatsapp').value.replace(/\D/g, '');

  const msg = `Olá ${nome}, seu agendamento foi confirmado na Oficina JM (Julio) para o dia ${data} às ${hora}, serviço: ${servico}.`;
  const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

gerarCalendario();
