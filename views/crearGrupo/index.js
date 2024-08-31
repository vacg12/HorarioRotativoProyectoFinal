const selectTurnos = document.querySelector('#select-turno');
const selectTrabajador = document.querySelector('#select-trabajador');
const selectDias = document.querySelector('#select-dias');
const divSelects = document.querySelector('#forms-select');
const btnCrear = document.querySelector('#btn-crear');
const lista = document.querySelector('#lista-grupos');
console.log(btnCrear, 'click');

//Hacer que aparezca los turnos en el select (las opciones)
(async () => {    
        const { data } = await axios.get('/api/crearTurno', {
            withCredentials: true
        }); 
        //Para agg los turnos creados en el select 
        data.forEach(turno => {
            const option  = document.createElement('option');
            option.value = turno.id;
            option.innerHTML = turno.nombre;
            
            selectTurnos.append(option);
        });   
}) ();

//Hacer que aparezca los usuarios en el select (las opciones)
(async () => {    
    const { data } = await axios.get('/api/scheduleflex', {
        withCredentials: true
    }); 
    //Para agg los usuarios creados en el select 
    data.forEach(usuario => {
        const option  = document.createElement('option');
        option.value = usuario.id;
        option.innerHTML = usuario.name;
        
        selectTrabajador.append(option);
    });   
}) ();

//mostrar en frontend la lista de grupos creados.
(async () => {

  try {
  
      const { data } = await axios.get('/api/crearGrupo', {
          withCredentials: true,
      }); 
      console.log(data, 'ooo');
      // para que se muestre en el frontend la lista
      data.forEach(grupos => {
          const listItem = document.createElement('li');
          listItem.id = grupos.id;
          listItem.innerHTML = `
       <div class="flex flex-row gap-4">
        <p class="p-4 break-words grow">${grupos.turno.nombre}</p>
        <p class="p-4 break-words grow">${grupos.dias}</p>
        <p class="p-4 break-words grow">${grupos.usuarios.map(user => user.name).join(', ')}</p>
        <button class="delete-icon">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
         </svg>
        </button>
      </div>
    `;
    lista.append(listItem);
    
  });

  } catch (error) {
      console.log(error);
      
  }
  
}) ();

//crear grupos
btnCrear.addEventListener('click', async e => {
    e.preventDefault();

  const turnoSeleccionado = Array.from(selectTurnos.selectedOptions).map(option => option.value);
  const trabajadoresSeleccionados = Array.from(selectTrabajador.selectedOptions).map(option => option.value);
  const diasSeleccionados = Array.from(selectDias.selectedOptions).map(option => option.value);

  try {
    const { data } = await axios.post('/api/crearGrupo', {
      dias: diasSeleccionados,
      turno: turnoSeleccionado,
      usuarios: trabajadoresSeleccionados
    });
    console.log('Grupo creado:', data);


    const listItem = document.createElement('li');
    listItem.id = data.id;
    listItem.innerHTML = `
       <div class="flex flex-row gap-4">
        <p class="p-4 break-words grow">${data.turno.nombre}</p>
        <p class="p-4 break-words grow">${data.dias}</p>
        <p class="p-4 break-words grow">${data.usuarios.map(user => user.name).join(', ')}</p>
        <button class="delete-icon">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
         </svg>
        </button>
      </div>
    `;

    lista.append(listItem);


    // Accede a los datos del grupo poblado
  } catch (error) {
    console.error('Error al crear el grupo:', error);
  }
});

//boton de eliminar grupos
lista.addEventListener('click', async e => {
  const deleteBtn = e.target.closest('.delete-icon');
  //Eliminar
  if (deleteBtn) {
      const li = deleteBtn.parentElement.parentElement;
    await axios.delete(`/api/crearGrupo/${li.id}`);
    li.remove();
  }
});




