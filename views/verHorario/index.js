const turnitosDiv = document.getElementById('turnitos');
const lista = document.getElementById('lista');
const datePicker = document.getElementById('datepicker');

let grupos = []; // Almacena los grupos obtenidos del servidor
let turnoActualIndex = 0; // Índice del turno actual en la lista de turnos

let turnos = [];

// llamo a los grupos para obtener los datos de grupos, con peticion de la api
(async () => {    
  const { data } = await axios.get('/api/crearGrupo', {
      withCredentials: true
  }); 

  // llamo a los turnos para obtener los datos de turnos
  const { data: dataTurnos } = await axios.get('/api/crearTurno', {
    withCredentials: true
}); 

  //guardo grupos y turnos
  turnos = dataTurnos 
  grupos = data;

  mostrarGrupoActual(); 
  // Mostrar el primer grupo al cargar la página

  const fechaHoy = new Date()
  const fechaHoySeparada = fechaHoy.toISOString().split('T')[0].split('-');
  
  datePicker.value = `${fechaHoySeparada[0]}-${fechaHoySeparada[1]}`;

  grupos = grupos.map(grupo => {
    const fechasSeparadas = grupo.fechaInicial.split('/');
    const fechaDelGrupo = new Date();    
    fechaDelGrupo.setFullYear(Number(fechasSeparadas[2]), fechasSeparadas[1] - 1, Number(fechasSeparadas[0]));
    const fechaDelGrupoSeparada = fechaHoy.toISOString().split('T')[0].split('-');
    const fechaDelGrupoAUtilizar = `${fechaDelGrupoSeparada[0]}-${fechaDelGrupoSeparada[1]}`;
    return {...grupo, fechaInicial: fechaDelGrupoAUtilizar}
  });
  
})();

//Este código se ejecuta cada vez que el usuario cambia la fecha en el datepicker.
datePicker.addEventListener('change', () => {
  console.log(datePicker.value);
  const fechaHoy = new Date()
  console.log(grupos);
  
  grupos = grupos.map(grupo => {    

    //compara si la fecha inicial del grupo es diferente a la fecha seleccionada
    if (grupo.fechaInicial !== datePicker.value) {
      const numeroDelMesFechaDelGrupo = Number(grupo.fechaInicial.split('-')[1]); //se extrae el mes de la fecha inicial del grupo, lo convierte a un número y lo almacena en la variable 
      const numeroDelMesAComparar = Number(datePicker.value.split('-')[1]); //se extrae el mes de la fecha seleccionada, lo convierte a un número y lo almacena en la variable
      let diferenciaEntreMeses = numeroDelMesFechaDelGrupo - numeroDelMesAComparar; //se calcula la diferencia entre los meses obtenidos anteriormente.
 
      //verifica si la diferencia es negativa y en ese caso la convierte a un valor absoluto positivo.
      if (Math.sign(diferenciaEntreMeses) === -1) {
        diferenciaEntreMeses = diferenciaEntreMeses * -1;
      }

      //  busca el objeto turno cuyo nombre coincida con el nombre del turno asignado al grupo actual (grupo.turno.nombre). El resultado se almacena en la variable grupoTurno.
      const grupoTurno = turnos.find(turno => turno.nombre === grupo.turno.nombre);
      let turnoIndex = turnos.indexOf(grupoTurno);
      console.log(turnoIndex);
      
      if (turnoIndex === turnos.length - 1) {
        turnoIndex = -1
      }
      const nuevoIndex = (turnoIndex + diferenciaEntreMeses) % turnos.length; //se calcula el nuevo índice del turno. Se suma la diferencia de meses al índice actual y luego se aplica el módulo (%) por la longitud del arreglo turnos para asegurarnos de que el índice siempre esté dentro del rango válido.
      if (nuevoIndex < 0) {
        nuevoIndex = turnos.length + nuevoIndex;
      }
      console.log(nuevoIndex);
      
      const nuevoTurno = turnos[nuevoIndex];

      return {...grupo, turno: nuevoTurno, fechaInicial: datePicker.value};
    }
    
  });

  mostrarGrupoActual();
});

function mostrarGrupoActual() {
  // Limpiar el contenido anterior
  turnitosDiv.innerHTML = '';

  // Iterar sobre todos los grupos
  grupos.forEach(grupo => {
    //creo div el cual tendra a la ul y la li
    const option = document.createElement('div');
    option.id = grupo.id;
    option.classList.add()

    //creo h2 para el nombre de los turnos
    const tituloGrupo = document.createElement('h2');
    tituloGrupo.id = 'turnoH2';
    tituloGrupo.classList.add('font-bold');
    tituloGrupo.innerHTML = grupo.turno.nombre; //obtengo el nombre del turno del arreglo turnos del grupo

    //creo la ul y la li
    const listTrabajadores = document.createElement('ul');
    listTrabajadores.classList.add();
    grupo.usuarios.forEach(usuario => {
      const elementoDeLaLista = document.createElement('li');
      elementoDeLaLista.classList.add();
      elementoDeLaLista.innerHTML = usuario.name;
      listTrabajadores.append(elementoDeLaLista);
    });

    //agrego el h2 y la lista al div
    option.append(tituloGrupo);
    option.append(listTrabajadores);

    //agrego el div creado al contenedor turnitos div
    turnitosDiv.append(option);
  });
}

// Agregar event listener al datepicker
// const datepicker = document.getElementById('datepicker'); // Reemplaza 'tuDatepickerId' con el ID de tu datepicker
// datepicker.addEventListener('change', rotarTurnosMensualmente, calcularMesesTranscurridos);


// grupos.forEach(grupo => {
  //   const fechasSeparadas = grupo.fechaInicial.split('/');
  //   const fechaDelGrupo = new Date();    
  //   fechaDelGrupo.setFullYear(Number(fechasSeparadas[2]), fechasSeparadas[1] - 1, Number(fechasSeparadas[0]));
  //   const fechaDelGrupoSeparada = fechaHoy.toISOString().split('T')[0].split('-');
  //   const fechaDelGrupoAUtilizar = `${fechaDelGrupoSeparada[0]}-${fechaDelGrupoSeparada[1]}`;
    
  //   if (fechaDelGrupoAUtilizar !== datePicker.value) {
  //     console.log(1);
  //   }
    
  // });

  // // Lógica para rotar entre los turnos
  // const grupoActual = grupos[turnoActualIndex];
  // const nombreTurno = grupoActual.turno.nombre;

  // // Rotar el nombre del turno
  // document.getElementById('turnoH2').innerHTML = nombreTurno;

  // turnoActualIndex = (turnoActualIndex + 1) % grupos.length;
