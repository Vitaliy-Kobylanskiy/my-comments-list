import { wrapper } from './constants.js';

export function renderPost(json) {
    const postCard = document.createElement('div');
    postCard.classList.add('post__card');
    postCard.innerHTML = `
        <h2 class="post__title">${json.title}</h2>
        <p class="post__text">${json.body}</p>
        <p class="post__data-user">${json.data}</p>
        <p class="post__email">${json.email}</p>
    `;
    wrapper.insertBefore(postCard, wrapper.firstChild);


    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Post';
    deleteButton.setAttribute('data-id', json.id);

    deleteButton.addEventListener('click', () => {
        const postId = deleteButton.getAttribute('data-id');

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка удаления поста');
                }
                return response.json();
            })
            .then(data => {
                postCard.remove();
            })
            .catch(error => {
                console.error(error);
            });
    });

    postCard.appendChild(deleteButton);
}