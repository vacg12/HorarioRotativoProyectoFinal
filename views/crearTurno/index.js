const formTurno = document.querySelector('#form-turnos');
const inputForm = document.querySelector('#input-form');
const listaTurno = document.querySelector('#lista-turnos');
const ul = document.querySelector('#ul-turnos');
const btnCrear = document.querySelector('#btn-crear');

(async () => {

    try {
    
        const { data } = await axios.get('/api/crearTurno', {
            withCredentials: true
        }); 

        
        //para que se muestre en el frontend la lista
        data.forEach(turno => {
            const listItem = document.createElement('li');
            listItem.id = turno.id;
            listItem.innerHTML = `
               <div class="flex flex-row gap-4">
                <p class="p-4 break-words grow">${turno.nombre}</p>
                <button class="delete-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg></button>
              </div>
            `;  

            ul.append(listItem);
        });

    } catch (error) {
        window.location.pathname = '/login'
    }
    
}) ();


formTurno.addEventListener('submit', async e => {
    e.preventDefault();
 console.log('hola');
 
    //crear lista de turnos en la base de datos 
    const { data } = await axios.post('/api/crearTurno', { nombre: inputForm.value });
    console.log(data);

    const listItem = document.createElement('li');
    listItem.id = data.id;
    listItem.innerHTML = `
       <div class="flex flex-row gap-4">
        <p class="p-4 break-words grow">${data.nombre}</p>
        <button class="delete-icon">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
         </svg>
        </button>
      </div>
    `;

    ul.append(listItem);
    
});

//boton eliminar turnos creados 
ul.addEventListener('click', async e => {
    const deleteBtn = e.target.closest('.delete-icon');
    const checkBtn = e.target.closest('.hecho');
    //Eliminar
    if (deleteBtn) {
        const li = deleteBtn.parentElement.parentElement;
      await axios.delete(`/api/crearTurno/${li.id}`);
      li.remove();
    }
  });

