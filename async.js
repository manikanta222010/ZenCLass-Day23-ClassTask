document.body.innerHTML = `
<div class="user-form">
    <input type="text" placeholder="Name">
    <input type="text" placeholder="Photo URL">
    <button onClick="addUser()">ADD USER</button>
</div>
<section class="user-list"></section>
`

async function getAllUsers() {
    const data = await fetch("https://616ae6d916e7120017fa1125.mockapi.io/users",
        { method: "GET" })
    const users = await data.json()

    const userContainter = document.querySelector(".user-list")
    userContainter.innerHTML = "";

    users.forEach((user) => {
        userContainter.innerHTML += `
        <div class="user-container">
          <img class="user-avatar" src="${user.avatar}" alt=${user.name}/>
          <div>
            <p class="user-name">${user.name}</p>
            <button onClick="toogleEdit(${user.id})">EDIT</button>
            <button onClick="deleteUser(${user.id})">DELETE</button>
            
            <div class="edit-user-form edit-${user.id}">
              <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter your name">
              <input value="${user.avatar}" class="edit-${user.id}-user-avatar" placeholder="Enter URL">
              <button onClick="saveUser(${user.id})">Save</button>
            </div>
        </div>
        `
    });

    console.log(users)
}

getAllUsers()
async function deleteUser(id) {
    console.log(id)
    const data = await fetch(
        "https://616ae6d916e7120017fa1125.mockapi.io/users/" + id,
        { method: "DELETE" }
    )
    getAllUsers()
}


async function addUser() {
    let name = document.querySelector('input:nth-child(1)').value
    let avatar = document.querySelector('input:nth-child(2)').value
    console.log(name, avatar)

    // step 1. Method POST
    // step 2. Data in Body and stringfy the JSON data
    // step 3. Headers - JSON data
    const data = await fetch(
        "https://616ae6d916e7120017fa1125.mockapi.io/users/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, avatar: avatar })
        }
    )
    getAllUsers()
}


function toogleEdit(id) {
    // var name = document.querySelector(`.edit-${id}-user-name`).value
    // console.log(name)
    console.log(id)

    const editUserForm = document.querySelector(`.edit-${id}`)
    console.log(editUserForm.style.display)
    editUserForm.style.display = editUserForm.style.display === "block" ? "none" : "block"
}


async function saveUser(id) {
    //post and delete
    var name = document.querySelector(`.edit-${id}-user-name`).value
    var avatar = document.querySelector(`.edit-${id}-user-avatar`).value
    console.log(name)

    const data = await fetch(
        "https://616ae6d916e7120017fa1125.mockapi.io/users/",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, avatar: avatar })
        }
    ).then(response => response.json())
    .then(data=> console.log(data))

    getAllUsers()
}
