let listUsers = [];
impUser();

document.querySelector('#btnSend').addEventListener('click', saveUser);
document.querySelector('#btnEdit').addEventListener('click', saveEditUser);
/* document.querySelector('#btnLlenar').addEventListener('click', fillTable);
document.querySelector('#btnVaciar').addEventListener('click', clearTable);
 */
botonAddLi();

document.getElementById("btnEdit").style.display = "none";
document.querySelector(".nicks").textContent = "Nick"

//funcion ejecutada por el click  de btnSend en la cual recibe los datos, hace una validacion, manda datos a la funcion adduser y
//vacia los campos
function saveUser() {
    const unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;
    unick.required = true;
    if (unick === "" || uage === "" || umail === "") {
        alertx("No olvides rellenar todos los campos");
    }
    else {
        let agee = parseInt(document.querySelector('#age').value);
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (agee >= 18 && agee <= 100) {
            if (emailRegex.test(umail)) {

                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Usuario ingresado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                let list = getUserList();
                let resul = list.filter(function (list) {
                    return list.nick === unick
                })
                if (resul.length) {
                    alertx("Usuario ya ingresado");
                } else {
                    addUser(unick, uage, umail);
                    impUser();
                    document.querySelector('#nick').value = "";
                    document.querySelector('#age').value = "";
                    document.querySelector('#mail').value = "";
                }
            }else{
                alertx("Debe ingresar un correo valido");
            }
        }else{
            alertx("Debe ingresar una edad valida");
        }
    }
}

//funcion encargada de recibir los datos del usuario, validar si los campos no estan vacios,
// guardar la edicion del usuario y vaciar los campos
function saveEditUser() {
    let unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;

    if (uage === "" || umail === "") {
        alertx("Debe rellenar todos los campos");
    }else{
        let agee = parseInt(document.querySelector('#age').value);
        if (agee >= 18 && agee <= 100) {
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.test(umail)) {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Usuario editado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                let list = getUserList();
                const index = list.findIndex(element => element.nick === unick);
                const User = {
                    nick: unick,
                    age: uage,
                    mail: umail
                };
                list[index] = User;
                localStoragelistusers(list);
                impUser();
                inputName = document.getElementById("nick");
                document.querySelector('#nick').value = "";
                document.querySelector('#age').value = "";
                document.querySelector('#mail').value = "";
                inputName.disabled = false;
                document.getElementById("btnEdit").style.display = "none";
                document.querySelector(".nicks").textContent = "Nick";
                document.getElementById("btnSend").style.display = "";
            }else{
                alertx("Debe ingresar un correo valido");
            }
        }else{
            alertx("Debe ingresar una edad valida");
        }
    }
}
    //funcion agregar usuario, recibe los parametros, los setea en el objeto user, inserta el usuario en el array y le da un push al localstorage
function addUser(nick, age, mail) {
    const User = {
        nick,
        age,
        mail
    };
    listUsers.push(User);
    localStoragelistusers(listUsers);

}
//funcion que se encarga de recibir los datos del localStorage y la vez los parsea a un array legible ya que el que recibe es un 
//[Object objectd]
function getUserList() {
    let storedList = localStorage.getItem('locallistusers')
    listUsers = !storedList ? [] : JSON.parse(storedList);
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
    list.forEach((element,i) => {
        let row = tbody.insertRow(i);
        let nickCell = row.insertCell(0);
        let ageCell = row.insertCell(1);
        let mailCell = row.insertCell(2);
        let selectEditCell = row.insertCell(3)
        let selectDeleteCell = row.insertCell(4)
        let bool = list[i].nick.length>10 ? "...": "";
        nickCell.innerHTML = list[i].nick.slice(0,15)+bool;
        ageCell.innerHTML = list[i].age;
        mailCell.innerHTML = list[i].mail;
        createButton("buttonEdit","editar",list[i].nick,selectEditCell)
        createButton("buttonDelete","eliminar",list[i].nick,selectDeleteCell)
        tbody.appendChild(row);
    })
    botonAddLi();
}

function createButton (button,value,id,selec) {
    let inputSelect = document.createElement('input')
    inputSelect.type = "button";
    inputSelect.className = `${button} btn btn-primary`;
    inputSelect.id = id;
    inputSelect.value = value;
    selec.appendChild(inputSelect);
}

//funcion encargada de eliminar un usuario segun el id que se le entregue
function deleteUser(unick) {
    Swal.fire({
        title: 'Desea eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then((result) => {
        if (result.isConfirmed) {
            let list = getUserList();
            let resul = list.filter(element => element.nick !== unick)
            localStoragelistusers(resul);
            impUser();
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Usuario eliminado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        }
        })
}

//funcion encargada de imprimir en el formulario los datos del usuario a editar seleccionado
function editUser(unick) {
    let list = getUserList();
    let resul = list.filter(element => element.nick === unick)
    let inputName = document.getElementById("nick");
    let inputAge = document.getElementById("age");
    let inputMail = document.getElementById("mail");
    inputName.value = resul[0].nick;
    inputAge.value = resul[0].age;
    inputMail.value = resul[0].mail;
    inputName.disabled = true;
    document.getElementById("btnSend").style.display = "none";
    document.getElementById("btnEdit").style.display = "";
    document.querySelector(".nicks").textContent = ""
}


function alertx(text) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text
    })
}

function botonAddLi(){
    let bottondeletes = Array.from(document.getElementsByClassName('buttonDelete'));
    bottondeletes.forEach(element => {
        element.addEventListener('click', (event) => deleteUser(event.target.id))
    });
    let bottonEdit = Array.from(document.getElementsByClassName('buttonEdit'));
    bottonEdit.forEach(element => {
        element.addEventListener('click', (event) => editUser(event.target.id))
    });
}


//Funcion de llenado y vaciado de tablas
/* function fillTable() {
    let list = getUserList();
    if (!list.length) {
        addUser("Manolo", "22", "manolo@gmail.cl")
        addUser("Mauricio", "27", "devMau@hotmail.cl")
        addUser("Daniel", "25", "MERNDaniel@google.cl")
        addUser("Hernán", "22", "hernan@666.cl")
        addUser("Maria", "28", "Marihuana@weed.cl")
        impUser();
    }
}


function clearTable() {
    listUsers = [];
    localStoragelistusers(listUsers);
    impUser();
} */
