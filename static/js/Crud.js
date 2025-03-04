const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */


async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}


/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveUser(){
  const idRecetas = document.querySelector('#id-receta').value; 
  const idDNI = document.querySelector('#id-dni').value;
  const email = document.querySelector('#id-correo').value;
  const password = document.querySelector('#password').value;
  const name = document.querySelector('#Name').value;
  const surname = document.querySelector('#Surname').value;
  const fecha = document.querySelector('#Fecha_nac').value;
  const pais = document.querySelector('#Country').value;
  const nacionality = document.querySelector('#Nacionality').value;
  const telefono = document.querySelector('#Phone').value;




  //VALIDACION DE FORMULARIO
  if (!email || !password ) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la película
  const userData = {
      id_user: idDNI,
      email: email,
      password: password,
      nombre: name,
      apellido: surname,
      pais: pais,
      nacional: nacionality,
      phone: telefono,
      fechaN: fecha,
      
  };

    
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(idDNI!==""){
    result = await fetchData(`${BASEURL}/api/user/`, 'POST', userData);
  
      window.location.href = '/Inicio.html';
    
  }
//   else{
   
//     result = await fetchData(`${BASEURL}/api/user/`, 'POST', userData);
//   }
  

}


  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveMovie = document.querySelector('#btn-add');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveMovie.addEventListener('click',saveUser);
 
});