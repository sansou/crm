const project = {
  id: '',
};

// Função para enviar os dados capturados para a API
function sendDataToAPI(data) {
  const body = JSON.stringify({...data, projectId: project.id})
   
  fetch('http://localhost:4000/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
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
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      sendDataToAPI(data);
      event.target.submit();
    });
  }
}

function getProjectId() {
  const id = document.currentScript?.getAttribute("data-project-id");    
  if (id) project.id = id
  if (!project.id) console.log('Script missing ID parameter.');
}

async function main() {
  await getProjectId();
  await captureLead();
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.log("Erro", error);
  }
})()