document.addEventListener('DOMContentLoaded', function () {
    // Password Toggle Functionality
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const inputs = document.querySelectorAll('.verification__input');
    if (togglePassword) {
        const eyeSlash = togglePassword.querySelector('.eye-slash');

        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon (you can add different icons for show/hide)
            this.classList.toggle('active');
            // Toggle the slash line visibility
            eyeSlash.classList.toggle('d-none');
        });
    }
    if (inputs) {
        inputs.forEach((input, index) => {
            input.addEventListener('input', function () {
                if (this.value.length === 1) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !this.value) {
                    if (index > 0) {
                        inputs[index - 1].focus();
                    }
                }
            });

            input.addEventListener('paste', function (e) {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').slice(0, inputs.length);

                [...pastedData].forEach((char, i) => {
                    if (i < inputs.length && /[0-9]/.test(char)) {
                        inputs[i].value = char;
                        if (i < inputs.length - 1) {
                            inputs[i + 1].focus();
                        }
                    }
                });
            });
        });
    }
    // Handle submenu toggles
    const navHeaders = document.querySelectorAll('.sidebar__nav-header');

    navHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const navItem = this.closest('.sidebar__nav-item');
            const arrow = this.querySelector('.sidebar__nav-arrow');

            // Toggle active state
            navItem.classList.toggle('active');

            // Toggle arrow direction
            if (arrow) {
                arrow.classList.toggle('bi-chevron-down');
                arrow.classList.toggle('bi-chevron-up');
            }
        });
    });

    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });
    }
});