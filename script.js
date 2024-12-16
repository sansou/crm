const project = {
  id: '',
};

// Função para enviar os dados capturados para a API
function sendDataToAPI(data) {
  fetch('http://localhost:4000/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Dados enviados com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao enviar o lead:', error);
    });
}

// Adicionar um listener de evento para capturar o lead quando o formulário for enviado
function captureLead() {
  const script = document.currentScript;
  const form = script.closest('form'); // Pega a tag form que seja pai do script
  if (form) {
    form.addEventListener('submit', (event) => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      sendDataToAPI(data);
    });
  }
}

function getProjectId() {
  const id = document.currentScript?.getAttribute("data-project-id");
  if (id) project.id = id
  if (!project.id) throw new Error('Script missing ID parameter.')
  // if (!project.id.match(/[0-9a-f]{24}/g)) throw new Error('Script with abnormal ID parameter.')
}

async function main() {
  getProjectId();
  captureLead();
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.log("Erro", error);
  }
})()