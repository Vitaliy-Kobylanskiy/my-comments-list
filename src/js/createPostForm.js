import {
    container, createForm, titleForm, titleInput, bodyInput,
    dataInput, emailInput, addPostBtn
} from './constants.js';
import { renderPost } from './renderPost.js';



export function createPostForm() {
    createForm.classList.add('post__create-form');
    container.appendChild(createForm);

    titleForm.classList.add('post__titleForm');
    titleForm.textContent = 'Add your post';
    createForm.appendChild(titleForm);

    titleInput.classList.add('post__input-title');
    createForm.appendChild(titleInput);
    titleInput.placeholder = 'Enter post title';
    titleInput.type = 'text';

    bodyInput.classList.add('post__input-body');
    createForm.appendChild(bodyInput);
    bodyInput.placeholder = 'Enter post';
    bodyInput.type = 'text';

    dataInput.classList.add('post__input-data');
    createForm.appendChild(dataInput);
    dataInput.placeholder = 'Enter your full name';
    dataInput.type = 'text';

    emailInput.classList.add('post__input-email');
    createForm.appendChild(emailInput);
    emailInput.placeholder = 'Enter your email';
    emailInput.type = 'text';

    addPostBtn.textContent = 'Add new post';
    addPostBtn.classList.add('post__submit');
    addPostBtn.type = 'submit';
    createForm.appendChild(addPostBtn);

    let allPosts = [];

    addPostBtn.addEventListener('submit', e => {
        e.preventDefault();

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: titleInput.value,
                body: bodyInput.value,
                data: dataInput.value,
                email: emailInput.value,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                allPosts.push(json);
                renderPost(json);
            });
    });
}
createPostForm();


