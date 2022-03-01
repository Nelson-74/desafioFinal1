class datosFormulario {
    constructor(datos_formulario) {
     this.nombre = datos_formulario[0]
     this.mail = datos_formulario[1]
    }
}

function cargarDatos() {
    var datos = JSON.parse(localStorage.getItem("datos_formulario"));
    var datos_formulario = new datosFormulario(datos);
    document.getElementById("nombre_usuario").value = datos_formulario.nombre;
    document.getElementById("mail_usuario").value = datos_formulario.mail;
    document.getElementById("resultado").innerHTML = "<p class='text-white bg-black p-3'>Los datos se cargaron correctamente!</p>";
} 
function borrarDatos(){
    document.getElementById('nombre_usuario').value="";
    document.getElementById('mail_usuario').value="";
    localStorage.clear();
    document.getElementById('resultado').innerHTML = "<p class= 'text-red bg-white p-3'>¡ Los datos fueron eliminados !</p>";
} 

// Se envian datos del formulario y se guarda en localStorage
function enviarDatos(){
    var nombre = document.getElementById('nombre_usuario').value;
    var mail= document.getElementById('mail_usuario').value;

    if ((nombre == "") || (nombre.length < 3)){
        document.getElementById('resultado').innerHTML = "<p class= 'text-black bg-white p-3'>¡ Error este campo  Nombre está vacio!</p>";
        return false;
    }
    if ((mail == "") || (!mail.includes('@'))){
        document.getElementById('resultado').innerHTML = "<p class= 'text-black bg-white p-3'>¡ Error este campo  Mail está vacio!</p>";
        return false;
    }

    localStorage.setItem('datos_formulario',JSON.stringify([nombre,mail]));
    document.getElementById('resultado').innerHTML = "<p class= 'text-green bg-white p-3'>¡ Los datos fueron enviados correctamente!</p>";
}

document.getElementById('enviar-datos').addEventListener('click', enviarDatos);
document.getElementById('cargar-datos').addEventListener('click', cargarDatos );
document.getElementById('borrar-datos').addEventListener('click', borrarDatos)