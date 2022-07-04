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


document.querySelector('#btnEnviar').addEventListener('click', saveUser)

function saveUser (){
    let Unick = document.querySelector('#nick').value,
         Uage = document.querySelector('#age').value,
        Umail = document.querySelector('#mail').value;
       
        addUser(Unick,Uage,Umail);
        impUser();
}

function addUser(unick,uage,umail)
{
    let User = {
        nick : unick,
        age : uage,
        mail : umail
    };
    console.log(User);
    listUsers.push(User);
}

function getUserList() {
    return listUsers;
}


function impUser(){
    let list = getUserList(),
    tbody = document.querySelector('#usersTable tbody');

        tbody.innerHTML = '';

    for (let i=0; i < list.length;i++)
    {
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


