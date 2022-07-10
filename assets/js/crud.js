let listUsers = [];
impUser();
let editMode = false;

document.querySelector('#btnEnviar').addEventListener('click', saveUser);
document.querySelector('#btnEditar').addEventListener('click', saveEditUser);
document.querySelector('#btnLlenar').addEventListener('click', llenadoTabla);
document.querySelector('#btnVaciar').addEventListener('click', vaciarTabla);

let bottondelete = Array.from(document.getElementsByClassName('buttonDelete'));

bottondelete.forEach(element => {

    element.addEventListener('click', (event) => deleteUser(event.target.id))
});


let bottonEdit = Array.from(document.getElementsByClassName('buttonEdit'));

bottonEdit.forEach(element => {

    element.addEventListener('click', (event) => editUser(event.target.id))
});


document.getElementById("btnEditar").style.display = "none";
document.querySelector(".nicks").textContent = "Nick"
//funcion ejecutada por el click  de btnenviar en la cual recibe los datos, hace una validacion, manda datos a la funcion adduser y
//vacia los campos
function saveUser() {
    const unick = document.querySelector('#nick').value,
        uage = document.querySelector('#age').value,
        umail = document.querySelector('#mail').value;
    unick.required = true;
    if (unick === "" || uage === "" || umail === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No olvides rellenar todos los campos!',
        })
    }
    else {
        agee = parseInt(document.querySelector('#age').value);
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
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
                if (resul.length > 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Nick ya ingresado',
                    })
                } else {
                    addUser(unick, uage, umail);
                    impUser();

                    document.querySelector('#nick').value = "";
                    document.querySelector('#age').value = "";
                    document.querySelector('#mail').value = "";

                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debe ingresar un correo valido',
                })
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe ingresar una edad valida',
            })
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No olvides rellenar todos los campos!',
        })
    }
    else {
        agee = parseInt(document.querySelector('#age').value);
        if (agee >= 18 && agee <= 100) {
            emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
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
                document.getElementById("btnEditar").style.display = "none";
                document.querySelector(".nicks").textContent = "Nick";
                document.getElementById("btnEnviar").style.display = "";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debe ingresar un correo valido',
                })
            }
           

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe ingresar una edad valida',
            })
        }
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
        bottondeletes.forEach(element => {
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
        inputName.value = `${resul[0].nick}`;
        inputAge.value = `${resul[0].age}`;
        inputMail.value = `${resul[0].mail}`;
        inputName.disabled = true;
        document.getElementById("btnEnviar").style.display = "none";
        document.getElementById("btnEditar").style.display = "";
        document.querySelector(".nicks").textContent = ""


    }

    function llenadoTabla() {
        let list = getUserList();
        if (list.length > 0) {

        } else {
            addUser("Manolo", "22", "manolo@gmail.cl")
            addUser("Mauricio", "27", "devMau@hotmail.cl")
            addUser("Daniel", "25", "MERNDaniel@google.cl")
            addUser("Hernán", "22", "hernan@666.cl")
            addUser("Maria", "28", "Marihuana@weed.cl")
            impUser();
        }

    }


    function vaciarTabla() {
        listUsers = [];
        localStoragelistusers(listUsers);
        impUser();
    }