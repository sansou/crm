// Função para enviar os dados capturados para a API
function sendDataFormToAPI(formData) {
  fetch('http://localhost:3000/queue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Dados enviados com sucesso:', formData);
    })
    .catch(error => {
      console.error('Erro ao enviar o lead:', error);
    });
}

// Adicionar um listener de evento para capturar o lead quando o formulário for enviado
function captureLead() {
  document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio padrão do formulário
    const form = event.target;
    const formData = new FormData(form);
    sendDataFormToAPI(formData);
  });
}
function getProjectId() {
  document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio padrão do formulário
    const form = event.target;
    const formData = new FormData(form);
    sendDataFormToAPI(formData);
  });
}

async function main() {
  captureLead()
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.log("Erro", error);
  }
})()