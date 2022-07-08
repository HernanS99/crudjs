/* class Usuario {
    constructor (name,age,mail){
        this.name = name;
        this.age = age;
        this.mail = mail;
    }
    get parameters () {
        return `${this.name} ${this.age} ${this.mail}`;
    }
    set parameters (parameters){
        for (let parameter in parameters)
        {
            this[parameter] = parameters[parameter]
        }
    }
    
    
}

let formulario = document.getElementsByName('formulario')[0];
let elementos = formulario.elements;
let boton = document.getElementById('btnEnviar');
let id = 0;
function adduser(){
    id = id++;
    Usuario.parameters = {
        name : document.getElementById('name').value,
        age : document.getElementById('age').value,
        mail : document.getElementById('mail').value
    }
    localStorage.setItem(`${id}`,JSON.stringify(Usuario.parameters));
}
function printUser(){
    console.log(Usuario.parameter);
}
formulario.addEventListener("submit",adduser);


let usuario1 = JSON.parse(localStorage.getItem("asd"));
console.log(usuario1) */


let listUsers = [];
impUser();

document.querySelector('#btnEnviar').addEventListener('click', saveUser)


let bottondelete = Array.from(document.getElementsByClassName('buttonDelete'));
/* console.log(bottondeletes) */
bottondelete.forEach(element => {
    /* console.log(element); */
    element.addEventListener('click', (event) => deleteUser(event.target.id))
});

let bottonEdit = Array.from(document.getElementsByClassName('buttonEdit'));
/* console.log(bottondeletes) */
bottonEdit.forEach(element => {
    /* console.log(element); */
    element.addEventListener('click', (event) => editUser(event.target.id))
});

let bottonSaveEdit = Array.from(document.getElementsByClassName('btnEditar'));
/* console.log(bottondeletes) */
bottonSaveEdit.forEach(element => {
    /* console.log(element); */
    element.addEventListener('click', (event) => saveEditUser(event.target.id))
});






function saveUser() {
    const unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;
        let list = getUserList();
        let resul = list.filter(function (list) {
            return list.nick === unick
        })
    
        if (resul.length > 0) {
    
        } else {
            addUser(unick, uage, umail);
            impUser();
        }
    
}

/* function saveEditUser(unick) {
  
    let list = getUserList();
    let resul = list.forEach(element => element.nick === unick,
        console.log(resul)
        )
    

       
    
} */

function addUser(unick, uage, umail) {
    const User = {
        nick: unick,
        age: uage,
        mail: umail
    };
    listUsers.push(User);
    localStoragelistusers(listUsers);

}

function getUserList() {
    let storedList = localStorage.getItem('locallistusers')
    /* if(storedList == null){
        listUsers = [];
    }else{
        listUsers = JSON.parse(storedList);  
    } */

    listUsers = storedList == null ? [] : JSON.parse(storedList);
    /* listUsers = storedList == null && [] */


    return listUsers;
}

function localStoragelistusers(ulist) {
    localStorage.setItem('locallistusers', JSON.stringify(ulist));
}

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
        inputEditSelect.className = "buttonEdit";
        inputEditSelect.id = list[i].nick;
        inputEditSelect.value = "editar";
        /* inputEditSelect.value = list[i].nick; */
        selectEditCell.appendChild(inputEditSelect);

        let inputDeleteSelect = document.createElement('input')
        inputDeleteSelect.type = "button";
        inputDeleteSelect.className = "buttonDelete";
        inputDeleteSelect.id = list[i].nick;
        inputDeleteSelect.value = "eliminar";
        /* inputDeleteSelect.value = list[i].nick; */
        selectDeleteCell.appendChild(inputDeleteSelect);


        tbody.appendChild(row);
    }
    let bottondeletes = Array.from(document.getElementsByClassName('buttonDelete'));
    /* console.log(bottondeletes) */
    bottondeletes.forEach(element => {
        /* console.log(element); */
        element.addEventListener('click', (event) => deleteUser(event.target.id))
    });

}



function deleteUser(unick) {
    let list = getUserList();
    let resul = list.filter(element => element.nick !== unick)
    console.log(resul)
    localStoragelistusers(resul);
    impUser();
}




function editUser(unick) {
    let list = getUserList();
    let resul = list.filter(element => element.nick === unick)
    console.log(resul[0].nick)
   

    inputName = document.getElementById("nick");
    inputAge = document.getElementById("age");
    inputMail = document.getElementById("mail");
    buttonEnviar = document.getElementById("btnEnviar");
    inputName.value = `${resul[0].nick}`;
    inputAge.value = `${resul[0].age}`;
    inputMail.value = `${resul[0].mail}`;
    buttonEnviar.value = "Confirmar"
    buttonEnviar.id="btnEditar"
}