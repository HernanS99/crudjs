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

function saveUser (){
    const unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;
       
        addUser(unick,uage,umail);
        impUser();

        


}

function addUser(unick,uage,umail)
{
    const User = {
        nick : unick,
        age : uage,
        mail : umail
    };
    let list = getUserList();
    let resul = list.filter(function(list){
        return list.nick === unick
    })
    console.log(resul)
    if(resul.length>0)
    {
        notifacion = document.querySelector('#notificionn div');
        notifacion.innerHTML = 'NotificationJS.warning("ingrese nick no existente", persistent);';
    } else{
        listUsers.push(User);
        localStoragelistusers(listUsers);
    }

    
   
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

function localStoragelistusers(ulist)
{
    localStorage.setItem('locallistusers', JSON.stringify(ulist));
}

function impUser(){
    let list = getUserList(),
    tbody = document.querySelector('#usersTable tbody');

        tbody.innerHTML = '';

    for (let i=0; i < list.length;i++){
        let row = tbody.insertRow(i);
        let nickCell = row.insertCell(0);
        let ageCell = row.insertCell(1);
        let mailCell = row.insertCell(2);
        nickCell.innerHTML = list[i].nick;
        ageCell.innerHTML = list[i].age;
        mailCell.innerHTML = list[i].mail;
        tbody.appendChild(row);
    }

}


