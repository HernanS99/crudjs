let listUsers = [];
impUser();
let editMode = false;

document.querySelector('#btnEnviar').addEventListener('click', saveUser)
document.querySelector('#btnEditar').addEventListener('click', saveEditUser)

let bottondelete = Array.from(document.getElementsByClassName('buttonDelete'));

bottondelete.forEach(element => {

    element.addEventListener('click', (event) => deleteUser(event.target.id))
});


let bottonEdit = Array.from(document.getElementsByClassName('buttonEdit'));

bottonEdit.forEach(element => {

    element.addEventListener('click', (event) => editUser(event.target.id))
});



//funcion ejecutada por el click  de btnenviar en la cual recibe los datos, hace una validacion, manda datos a la funcion adduser y
//vacia los campos
function saveUser() {
    const unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;
        unick.required = true;
    if (unick === "" || uage === "" || umail === "") {
        alert("Debe rellenar todos los campos")
    }
    else {
        let list = getUserList();
        let resul = list.filter(function (list) {
            return list.nick === unick
        })
        if (resul.length > 0) {
            alert("Nick ya ingresado")
        } else {
            addUser(unick, uage, umail);
            impUser();
            
            document.querySelector('#nick').value = "";
            document.querySelector('#age').value = "";
            document.querySelector('#mail').value = "";
           
        }
    }
}

//funcion encargada de recibir los datos del usuario, validar si los campos no estan vacios,
// guardar la edicion del usuario y vaciar los campos
function saveEditUser() {
    let unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;
    
    if(uage===""||umail==="")
    {
        alert("Debe rellenar todos los campos")
    }
    else{
        let list = getUserList();
        const index = list.findIndex(element => element.nick === unick);
        const User = {
            nick: unick,
            age: uage,
            mail: umail
        };
        console.log(index)
        list[index] = User;
        localStoragelistusers(list);
        impUser();
        inputName = document.getElementById("nick");
        document.querySelector('#nick').value = "";
        document.querySelector('#age').value = "";
        document.querySelector('#mail').value = "";
        inputName.disabled= false;
    } 
}
//funcion agregar usuario, recibe los parametros, los setea en el objeto user, inserta el usuario en el array y le da un push al localstorage
function addUser(unick, uage, umail) {
    const User = {
        nick: unick,
        age: uage,
        mail: umail
    };
    listUsers.push(User);
    localStoragelistusers(listUsers);

}
//funcion que se encarga de recibir los datos del localStorage y la vez los parsea a un array legible ya que el que recibe es un 
//[Object objectd]
function getUserList() {
    let storedList = localStorage.getItem('locallistusers')
    listUsers = storedList == null ? [] : JSON.parse(storedList);
    return listUsers;
}
//funcion que setea los datos del arraylist dentro del localstorage
function localStoragelistusers(ulist) {
    localStorage.setItem('locallistusers', JSON.stringify(ulist));
}
//funcion encargada de imprimir en pantalla los datos en el locaStorage y crear los botones respectivos
function impUser() {
    let list = getUserList(),
        tbody = document.querySelector('#usersTable tbody');

    tbody.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        let row = tbody.insertRow(i);
        let nickCell = row.insertCell(0);
        let ageCell = row.insertCell(1);
        let mailCell = row.insertCell(2);
        let selectEditCell = row.insertCell(3)
        let selectDeleteCell = row.insertCell(4)
        nickCell.innerHTML = list[i].nick;
        ageCell.innerHTML = list[i].age;
        mailCell.innerHTML = list[i].mail;

        let inputEditSelect = document.createElement('input')
        inputEditSelect.type = "button";
        inputEditSelect.className = "buttonEdit btn btn-primary";
        inputEditSelect.id = list[i].nick;
        inputEditSelect.value = "editar";
        selectEditCell.appendChild(inputEditSelect);

        let inputDeleteSelect = document.createElement('input')
        inputDeleteSelect.type = "button";
        inputDeleteSelect.className = "buttonDelete btn btn-primary";
        inputDeleteSelect.id = list[i].nick;
        inputDeleteSelect.value = "eliminar";
        selectDeleteCell.appendChild(inputDeleteSelect);


        tbody.appendChild(row);
    }
    let bottondeletes = Array.from(document.getElementsByClassName('buttonDelete'));
    /* console.log(bottondeletes) */
    bottondeletes.forEach(element => {
        /* console.log(element); */
        element.addEventListener('click', (event) => deleteUser(event.target.id))
    });
    let bottonEdit = Array.from(document.getElementsByClassName('buttonEdit'));

    bottonEdit.forEach(element => {

        element.addEventListener('click', (event) => editUser(event.target.id))
    });

}


//funcion encargada de eliminar un usuario segun el id que se le entregue
function deleteUser(unick) {
    let list = getUserList();
    let resul = list.filter(element => element.nick !== unick)
    console.log(resul)
    localStoragelistusers(resul);
    impUser();
}



//funcion encargada de imprimir en el formulario los datos del usuario a editar seleccionado
function editUser(unick) {
    let list = getUserList();
    let resul = list.filter(element => element.nick === unick)
    inputName = document.getElementById("nick");
    inputAge = document.getElementById("age");
    inputMail = document.getElementById("mail");
     buttonEnviar = document.getElementById("btnEnviar");
    inputName.value = `${resul[0].nick}`;
    inputAge.value = `${resul[0].age}`;
    inputMail.value = `${resul[0].mail}`;
    inputName.disabled = true;
    buttonEnviar.value = "Confirmar"
    buttonEnviar.className="btn btn-primary mb-4"; 
    buttonEnviar.id="btnEditar" 
}

