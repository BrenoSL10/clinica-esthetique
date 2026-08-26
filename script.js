// Coloque o número oficial com DDD, somente números. Exemplo: 5534999999999
const numeroWhatsApp = "";
const mensagem = "Olá! Gostaria de agendar uma avaliação na Esthétique.";

const linkWhatsApp = numeroWhatsApp
  ? `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`
  : `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

document.querySelectorAll(".whatsapp").forEach((botao) => {
  botao.href = linkWhatsApp;
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.mobile-nav').removeAttribute('open');
  });
});
