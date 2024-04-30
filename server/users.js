const users = [];

const addUser = ({name, room, id}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existing = users.find((user) => {user.room === room && user.name === name})
    if(existing) return {error : 'User already exist'}
    const user = {name, room, id};
    users.push(user);

    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index != -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
    users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom };