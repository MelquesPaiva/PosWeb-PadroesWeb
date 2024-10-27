export default function loginUser(email, password) {
    const userList = getUserListFromLocalStorage()
    return userList.find((user) => user.email === email && user.password === password)
}

function getUserListFromLocalStorage() {
    const userListData = localStorage.getItem('userList')
    const userList = JSON.parse(userListData)

    return userList
}
