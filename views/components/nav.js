const navbar = document.querySelector('#navbar');

const createNavHome = () => {
 navbar.innerHTML = `
 <div class="max-w-7xl bg-teal-500 h-16 mx-auto flex items-center px-4 justify-between">
            <!-- logo que va en la esquina -->
         
         <p class="font-bold text-xl text-white flex gap-2 justify-center"><img class="size-10 rounded-3xl" src="/imagen/cal.jpg" alt="">ScheduleFlex</p>

          <!-- version movil (tlf) -->
          <!-- en el class del svg se puso md-hidden para ocultar despues de 768px -->
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          stroke-width="1.5" stroke="currentColor" 
          class="size-11 md:hidden text-white cursor-pointer p-2 hover:bg-teal-700 rounded-lg">
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round"
             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
          </svg>
          
          <!-- version escritorio -->
           <div class="hidden md:flex flex-row gap-4">
            <a href="/login/" class=" transition ease-in-out text-white font-bold hover:bg-teal-700 py-2 px-4 rounded-lg">Login</a>
            <a href="/signup/" class="transition ease-in-out text-white font-bold bg-teal-400 hover:bg-teal-700 py-2 px-4 rounded-lg">Registro</a>
           </div>

           <!-- menu movil -->

          <div class="bg-slate-600/50 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden"> 
            <a href="/login/" class=" transition ease-in-out text-black font-bold hover:bg-teal-700 py-2 px-4 rounded-lg">Login</a>
            <a href="/signup/" class="transition ease-in-out text-black font-bold bg-teal-500 hover:bg-teal-700 py-2 px-4 rounded-lg">Registro</a> 
          </div>
        </div>
 `;
};

const createNavSignUp = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl bg-teal-500 h-16 mx-auto flex items-center px-4 justify-between">
               <!-- logo que va en la esquina -->
            
            <p class="font-bold text-xl text-white flex gap-2 justify-center"><img class="size-10 rounded-3xl" src="/imagen/cal.jpg" alt="">ScheduleFlex</p>
   
             <!-- version movil (tlf) -->
             <!-- en el class del svg se puso md-hidden para ocultar despues de 768px -->
             <svg 
             xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" 
             stroke-width="1.5" stroke="currentColor" 
             class="size-11 md:hidden text-white cursor-pointer p-2 hover:bg-teal-700 rounded-lg">
               <path 
               stroke-linecap="round" 
               stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                 />
             </svg>
             
             <!-- version escritorio -->
              <div class="hidden md:flex flex-row gap-4">
               <a href="/login/" class=" transition ease-in-out text-white font-bold hover:bg-teal-700 py-2 px-4 rounded-lg">Login</a>
              </div>
   
              <!-- menu movil -->
   
             <div class="bg-slate-600/50 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden"> 
               <a href="/login/" class=" transition ease-in-out text-black font-bold hover:bg-teal-700 py-2 px-4 rounded-lg">Login</a>
             </div>
           </div>
    `;
   };

const createNavLogin = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl bg-teal-500 h-16 mx-auto flex items-center px-4 justify-between">
               <!-- logo que va en la esquina -->
            
            <p class="font-bold text-xl text-white flex gap-2 justify-center"><img class="size-10 rounded-3xl" src="/imagen/cal.jpg" alt="">ScheduleFlex</p>
   
             <!-- version movil (tlf) -->
             <!-- en el class del svg se puso md-hidden para ocultar despues de 768px -->
             <svg 
             xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" 
             stroke-width="1.5" stroke="currentColor" 
             class="size-11 md:hidden text-white cursor-pointer p-2 hover:bg-teal-700 rounded-lg">
               <path 
               stroke-linecap="round" 
               stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                 />
             </svg>
             
             <!-- version escritorio -->
              <div class="hidden md:flex flex-row gap-4">
               <a href="/signup/" class=" transition ease-in-out text-white font-bold hover:bg-teal-700 py-2 px-4 rounded-lg">Registro</a>
              </div>
   
              <!-- menu movil -->
   
             <div class="bg-slate-600/50 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden"> 
               <a href="/signup/" class=" transition ease-in-out text-black font-bold hover:bg-teal-700 py-2 px-4 rounded-lg">Registro</a>
             </div>
           </div>
    `;
   };

if (window.location.pathname === '/') {
    // corremos la funcion
    createNavHome();
} else if (window.location.pathname === '/signup/') {
    createNavSignUp();
} else if (window.location.pathname === '/login/') {
  createNavLogin();
}

//accedemos al boton y se guarda en la variable 
const navBtn = navbar.children[0].children[1];


navBtn.addEventListener('click', e => {
    const menuMovil = navbar.children[0].children[3];
    //aqui al clickaear el btn cambia el icono a una x
    if (!navBtn.classList.contains('active')) {
        navBtn.classList.add('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menuMovil.classList.remove('hidden');
        menuMovil.classList.add('flex');
    } else {
        navBtn.classList.remove('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
        menuMovil.classList.add('hidden');
        menuMovil.classList.remove('flex');
    }
    
});



