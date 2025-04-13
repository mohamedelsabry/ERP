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
    const body = document.querySelector('body');

    function toggleClassOnResize() {

        if (window.innerWidth <= 992) {
            body.classList.add('collapsed');
            sidebar.classList.add('collapsed');
        } else {
            body.classList.remove('collapsed');
            sidebar.classList.remove('collapsed');
        }
    }

    // Run on load
    toggleClassOnResize();

    // Run on window resize
    window.addEventListener('resize', toggleClassOnResize);
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });
    }

    document.getElementById('toggleSidebar').addEventListener('click', function () {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (sidebar.style.width === 'var(--sidebar-collapsed-width)' || sidebar.classList.contains('collapsed')) { // Sidebar is collapsed
            sidebar.style.width = 'var(--sidebar-width)';
            // mainContent.style.opacity = '0';
            body.classList.remove('collapsed');
            sidebar.classList.remove('collapsed');

            mainContent.style.marginRight = 'var(--sidebar-width)';
            document.querySelectorAll('.menu-text').forEach(el => el.style.display = 'flex');
            document.querySelector('.sidebar__logo').style.display = 'block'; //logo
            document.querySelector('.sidebar__icon').style.display = 'none'; //logo icon
        } else {
            sidebar.style.width = 'var(--sidebar-collapsed-width)';
            mainContent.style.marginRight = 'var(--sidebar-collapsed-width)';
            // mainContent.style.opacity = '1';
            sidebar.classList.add('collapsed');
            body.classList.add('collapsed');

            document.querySelectorAll('.menu-text').forEach(el => el.style.display = 'none');
            document.querySelector('.sidebar__logo').style.display = 'none';
            document.querySelector('.sidebar__icon').style.display = 'block';
        }
    });


    document.querySelectorAll('.nav-item.dropdown li').forEach(item => {
        item.addEventListener('click', () => {
            if (sidebar.classList.contains('sidebar') && sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
            }
        });
    });
    const cameraInput = document.getElementById('cameraInput');
    const previewImage = document.getElementById('previewImage');
    // const cameraContainer = document.getElementById('cameraContainer');
    if (cameraInput) {
        cameraInput.addEventListener('change', function () {
            const file = cameraInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

    }

    // Select all dropdown menus
    const dropdownMenus = document.querySelectorAll('.input-group .dropdown-menu');

    dropdownMenus.forEach((menu) => {
        menu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const selectedCode = event.target.textContent.trim();
                const button = menu.previousElementSibling; // Find the related button
                button.textContent = selectedCode;
            }
        });
    });
    const fileInput = document.getElementById("fileInput");
    const filePreview = document.querySelector(".file-upload__preview");
    const uploadBox = document.querySelector(".file-upload");

    // Handle file input change
    fileInput.addEventListener("change", handleFiles);

    // Drag and drop functionality
    uploadBox.addEventListener("dragover", (event) => {
        event.preventDefault();
        uploadBox.classList.add("dragging");
    });

    uploadBox.addEventListener("dragleave", () => {
        uploadBox.classList.remove("dragging");
    });

    uploadBox.addEventListener("drop", (event) => {
        event.preventDefault();
        uploadBox.classList.remove("dragging");
        const files = event.dataTransfer.files;
        handleFiles({
            target: {
                files
            }
        });
    });

    function handleFiles(event) {
        const files = event.target.files;
        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    filePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please upload an image file.");
            }
        });
    }
    const closeButtons = document.querySelectorAll(".permission-list__close");

    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const item = this.parentElement;
            item.remove();
        });
    });

});

function downloadFile(url) {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split('/').pop(); // Extracts file name from the URL
    link.click();
    console.log(url);
}

function previewFile(url) {
    window.open(url, "_blank");
    console.log(url);
}

// Check localStorage for grayscale state
if (localStorage.getItem('grayscale') === 'enabled') {
    $('html').addClass('grayscale');
}
/* --- Font sizing Function --- */
const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 22;

// Function to modify font size and store in localStorage
function modifyFontSize(MyElement, flag) {
    var HtmlElement = $(MyElement);
    var currentFontSize = parseInt(HtmlElement.css('font-size')) || DEFAULT_FONT_SIZE;

    if (flag == 'increase' && currentFontSize < MAX_FONT_SIZE) {
        currentFontSize += 1;
    } else if (flag == 'decrease' && currentFontSize > MIN_FONT_SIZE) {
        currentFontSize -= 1;
    } else if (flag == 'reset') {
        currentFontSize = DEFAULT_FONT_SIZE;
    }

    HtmlElement.css('font-size', currentFontSize + 'px');
    localStorage.setItem('fontSize', currentFontSize); // Save to localStorage
}

// Retrieve and apply stored font size on page load
let storedFontSize = localStorage.getItem('fontSize');
if (storedFontSize) {
    $('html').css('font-size', storedFontSize + 'px');
}

// Event listeners
$('.increase-font').click(function (e) {
    e.preventDefault();
    modifyFontSize('html', 'increase');
});

$('.decrease-font').click(function (e) {
    e.preventDefault();
    modifyFontSize('html', 'decrease');
});
console.log("sabryyyyyyyyyyyyyyyyyyyy");
$('.reset-font').click(function (e) {
    e.preventDefault();
    modifyFontSize('html', 'reset');
});

// Toggle grayscale mode
$('.toggle-grayscale').on('click', function () {
    $('html').toggleClass('grayscale');

    // Save state in localStorage
    if ($('html').hasClass('grayscale')) {
        localStorage.setItem('grayscale', 'enabled');
    } else {
        localStorage.removeItem('grayscale');
    }
});