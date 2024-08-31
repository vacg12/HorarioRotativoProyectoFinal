const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
  if (isError) {
    div.innerHTML =`
   <div class="max-w-7xl mx-auto px-4 flex justify-end">
        <p class="text-white bg-red-500 p-4 w-auto rounded-lg font-bold">${message}</p>
   </div>
  `
  } else {
    div.innerHTML =`
   <div class="max-w-7xl mx-auto px-4 flex justify-end">
        <p class="text-white bg-green-500 p-4 w-auto rounded-lg font-bold">${message}</p>
   </div>
  `
  }
};