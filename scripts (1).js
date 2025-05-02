// Admin functionality for product editing
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Admin login functionality
    if (window.location.pathname.includes('admin.html')) {
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                // Simple authentication (in real app, this would be server-side)
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('isAdmin', 'true');
                    window.location.href = 'index.html';
                } else {
                    alert('Неверное имя пользователя или пароль');
                }
            });
        }
    }

    // Add admin controls if logged in
    if (isAdmin) {
        // Add edit buttons to all product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const productId = card.id.split('-')[1];
            const editBtn = document.createElement('button');
            editBtn.className = 'btn edit-btn';
            editBtn.textContent = 'Редактировать';
            editBtn.dataset.productId = productId;

            editBtn.addEventListener('click', function() {
                showEditForm(card, productId);
            });

            card.querySelector('.product-actions').appendChild(editBtn);
        });

        // Add admin panel link to navigation
        const nav = document.querySelector('nav ul');
        if (nav) {
            const adminLi = document.createElement('li');
            const adminLink = document.createElement('a');
            adminLink.href = '#';
            adminLink.textContent = 'Выйти из админ-панели';
            adminLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isAdmin');
                window.location.reload();
            });
            adminLi.appendChild(adminLink);
            nav.appendChild(adminLi);
        }
    }

    // Function to show edit form for a product
    function showEditForm(productCard, productId) {
        // Remove any existing edit forms
        const existingForms = document.querySelectorAll('.edit-form');
        existingForms.forEach(form => form.remove());

        // Create edit form
        const editForm = document.createElement('div');
        editForm.className = 'edit-form';
        editForm.innerHTML = `
            <h4>Редактирование товара</h4>
            <div class="form-group">
                <label for="edit-name">Название</label>
                <input type="text" id="edit-name" value="${productCard.querySelector('h3').textContent}">
            </div>
            <div class="form-group">
                <label for="edit-price">Цена (руб.)</label>
                <input type="number" id="edit-price" value="${productCard.querySelector('.price').textContent.replace(' руб.', '')}">
            </div>
            <div class="form-group">
                <label for="edit-description">Описание</label>
                <textarea id="edit-description" rows="3">${productCard.querySelector('.description').textContent}</textarea>
            </div>
            <div class="form-group">
                <label for="edit-image">Изображение (URL)</label>
                <input type="text" id="edit-image" value="${productCard.querySelector('img').src.split('/').pop()}">
            </div>
            <button type="button" class="btn save-btn">Сохранить</button>
            <button type="button" class="btn cancel-btn">Отмена</button>
        `;

        // Add form after product card
        productCard.after(editForm);

        // Show form with animation
        setTimeout(() => {
            editForm.style.display = 'block';
        }, 10);

        // Add event listeners to buttons
        editForm.querySelector('.save-btn').addEventListener('click', function() {
            // Update product card with new values
            productCard.querySelector('h3').textContent = editForm.querySelector('#edit-name').value;
            productCard.querySelector('.price').textContent = editForm.querySelector('#edit-price').value + ' руб.';
            productCard.querySelector('.description').textContent = editForm.querySelector('#edit-description').value;

            // Update image if changed
            const newImage = editForm.querySelector('#edit-image').value;
            if (newImage) {
                productCard.querySelector('img').src = 'images/' + newImage;
            }

            // In a real application, you would send this data to the server
            // For this demo, we're just updating the UI

            // Remove edit form
            editForm.remove();

            // Show success message
            alert('Товар успешно обновлен!');
        });

        editForm.querySelector('.cancel-btn').addEventListener('click', function() {
            editForm.remove();
        });
    }
});
