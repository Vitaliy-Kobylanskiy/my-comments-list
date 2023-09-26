import * as myFunctions from "./modules/functions.js";
myFunctions.isWebp();
import { sendUsers, sendPosts } from './fetch.js';
import { createPostForm } from './createPostForm.js';
import { validateForm } from './validateForm.js';
import { fetchAll } from './fetch.js';
import { container, wrapper } from './constants.js';

fetchAll()
    .then(responses => {
        const [users, posts] = responses;
        createPosts(users, posts);
    })
    .catch(error => console.log(error));

function createPosts(users, posts) {
    wrapper.classList.add('post');
    container.appendChild(wrapper);

    const slicedUsers = users.slice(0, 10);
    const slicedPosts = posts.slice(0, 10);

    slicedPosts.forEach((post, index) => {
        const user = slicedUsers[index];

        const postCard = document.createElement('div');
        postCard.classList.add('post__card');
        postCard.innerHTML = `
            <h2 class="post__title">${post.title}</h2>
            <p class="post__text">${post.body}</p>
            <p class="post__data-user">${user.name}</p>
            <p class="post__email">${user.email}</p>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Post';
        deleteButton.setAttribute('data-id', post.id);
        deleteButton.classList.add('post__deleteBtn');

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
                    slicedPosts.splice(index, 1);
                    postCard.remove();
                })
                .catch(error => {
                    console.error(error);
                });
        });

        postCard.appendChild(deleteButton);
        wrapper.appendChild(postCard);
    });
}



