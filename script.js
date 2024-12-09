function captureLead() {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;

  if (!name || !email || !phone) {
    console.log('Por favor, preencha todos os campos!');
    return;
  }

  const lead = {
    name: name,
    email: email,
    phone: phone,
  };

  console.log('Lead Capturado:', lead);

  sendLeadToAPI(lead);
}

// Função para enviar os dados capturados para a API
function sendLeadToAPI(lead) {
  fetch('http://localhost:3000/queue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Lead enviado com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao enviar o lead:', error);
    });
}

// Adicionar um listener de evento para capturar o lead quando o formulário for enviado
document.querySelector('#lead-form').addEventListener('submit', function (event) {
  event.preventDefault();  // Impede o envio padrão do formulário
  captureLead();
});
