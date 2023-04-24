const requestUsers = 'https://jsonplaceholder.typicode.com/users';
const requestPosts = 'https://jsonplaceholder.typicode.com/posts';


export async function sendUsers() {
    const responseUsers = await fetch(requestUsers);
    try {
        if (responseUsers.ok) {
            const dataUsers = await responseUsers.json();
            return dataUsers;
        } else {
            console.log('Ошибка HTTP ' + responseUsers.status);
        }
    } catch (error) {
        console.log('Ошибка при выполнении запроса ' + error.message);
    }
}
sendUsers();

export async function sendPosts() {
    const responsePosts = await fetch(requestPosts);
    try {
        if (responsePosts.ok) {
            const dataPosts = await responsePosts.json();
            return dataPosts;
        } else {
            console.log('Ошибка HTTP ' + responsePosts.status);
        }
    } catch (error) {
        console.log('Ошибка при выполнении запроса ' + error.message);
    }
}
sendPosts();

export const fetchAll = () => Promise.all([sendUsers(), sendPosts()]);
