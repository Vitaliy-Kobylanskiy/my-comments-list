import { createPostForm } from './createPostForm.js';
import { renderPost } from './renderPost.js';
import {
    createForm, titleInput, bodyInput, dataInput,
    emailInput, addPostBtn, wrapper
} from './constants.js';

function validateEmail(emailVal) {
    let symbols = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return symbols.test(String(emailVal).toLowerCase());
}

export function validateForm() {
    addPostBtn.addEventListener('click', e => {
        e.preventDefault();

        let titleVal = titleInput.value;
        let bodyVal = bodyInput.value;
        let dataVal = dataInput.value;
        let emailVal = emailInput.value;
        const inputs = document.querySelectorAll('input');


        inputs.forEach(input => {
            const inputWrapper = input.parentNode;
            const message = inputWrapper.querySelector('.message');

            if (input.value === '') {
                input.style.border = '2px solid red';
                if (!message) {
                    const message = document.createElement('div');
                    message.classList.add('message');
                    message.textContent = 'Please fill in all fields correctly';
                    message.style.fontSize = '23px';
                    message.style.color = 'red';
                    inputWrapper.appendChild(message);
                }
            } else {
                input.style.border = '2px solid #ccc';
                if (message) {
                    inputWrapper.removeChild(message);
                }
            }
        });

        let emptyImputs = Array.from(inputs).filter(input => input.value === '');

        if (emptyImputs.length !== 0) {
            return false;
        }

        const emailWrapper = emailInput.parentNode;
        const emailMessage = emailWrapper.querySelector('.message');

        if (!validateEmail(emailVal)) {
            emailInput.style.border = '2px solid red';
            if (!emailMessage) {
                const message = document.createElement('div');
                message.classList.add('message');
                message.textContent = 'Please enter a valid email address';
                message.style.fontSize = '23px';
                message.style.color = 'red';
                emailWrapper.appendChild(message);
            }
            return false;
        } else {
            emailInput.style.border = '1px solid #ccc';
            if (emailMessage) {
                emailWrapper.removeChild(emailMessage);
            }
        }

        renderPost({
            title: titleVal,
            body: bodyVal,
            data: dataVal,
            email: emailVal,
            userId: 1
        });
        return true;
    });
}

validateForm();

