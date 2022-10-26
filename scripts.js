const apiUrl = 'https://jsonplaceholder.typicode.com/'
const usersDiv = document.getElementById('users')
const postsDiv = document.getElementById('posts')
const postsWrapperDiv = document.getElementById('posts-wrapper')

function fetchAndDisplayUsers() {
    fetch(`${apiUrl}users`)
        .then(response => {
            if (response.ok) return response.json()
            else throw new Error("Could not retrieve users")
        })
        .then(users => displayUsers(users))
        .catch(err => handleFetchError(err.message))
}
function displayUsers(users) {
    const tableHeader = `
    <table cellspacing=0>
    <thead>
        <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Company</th>
            <th>Address</th>
        </tr>
    </thead>
    `
    const usersHtml = users.map(user => `
    <tr onClick=showUserPosts("${user.username}",${user.id})>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.company.name}</td>
        <td>${user.address.city}, ${user.address.street}</td>
    </tr>
    `).join('')
    const tableFooter = '</table>'
    usersDiv.innerHTML = tableHeader + usersHtml + tableFooter
}
function handleFetchError(errorMessage) {
    usersDiv.innerHTML = errorMessage
}


function showUserPosts(username, userId) {
    fetch(`${apiUrl}users/${userId}/posts`)
        .then(response => {
            if (response.ok) return response.json()
            else throw new Error("Could not retrieve user's posts")
        }).then(posts => displayPosts(username, posts))
}
function displayPosts(username, posts) {
    const postsHtml = posts.map(post => `
    <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    </div>`).join('')
    postsDiv.innerHTML = `
    <button class="close-modal" onclick="hidePosts()" id="close-modal">X</button>
        <h2>${username}'s Posts</h2>
        ${postsHtml}`

    postsWrapperDiv.classList.add('show')
}
fetchAndDisplayUsers()
postsDiv.addEventListener('click', e => e.stopPropagation())
postsWrapperDiv.addEventListener('click', e => hidePosts())
function hidePosts(){
    postsWrapperDiv.classList.remove('show')
}
document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
        postsWrapperDiv.classList.remove('show')
    }
});