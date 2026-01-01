const form = document.querySelector('.form-card__form');
const successMessage = document.getElementById('success-note'); // Додай цей ID в HTML для блоку з повідомленням про успіх

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо стандартну відправку форми
    
    let isValid = true;

    // 1. Перевірка текстових полів та textarea
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    inputs.forEach(input => {
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (!input.value.trim()) {
            showError(input, errorSpan);
            isValid = false;
        } else {
            hideError(input, errorSpan);
        }

        // Додаткова перевірка Email
        if (input.type === 'email' && input.value.trim()) {
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailReg.test(input.value)) {
                showError(input, errorSpan);
                isValid = false;
            }
        }
    });

    // 2. Перевірка Radio Buttons (Query Type)
    const radioGroup = form.querySelectorAll('input[name="query"]');
    const radioError = document.querySelector('.form-card__query-type').nextElementSibling;
    const isRadioChecked = Array.from(radioGroup).some(radio => radio.checked);
    
    if (!isRadioChecked) {
        radioError.classList.remove('hidden');
        isValid = false;
    } else {
        radioError.classList.add('hidden');
    }

    // 3. Перевірка Checkbox (Consent)
    const consentCheckbox = document.getElementById('contacted');
    const consentError = consentCheckbox.parentElement.nextElementSibling;
    
    if (!consentCheckbox.checked) {
        consentError.classList.remove('hidden');
        isValid = false;
    } else {
        consentError.classList.add('hidden');
    }

    // 4. Якщо все валідно — показуємо успіх
    if (isValid) {
    const toast = document.getElementById('success-toast');

    // 1. Показуємо елемент (прибираємо display: none)
    toast.classList.remove('hidden');

    // 2. Додаємо клас анімації з невеликою затримкою (щоб браузер встиг зреагувати)
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 3. Прокручуємо вгору
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 4. Очищуємо форму
    form.reset();

    // 5. Видаляємо повідомлення через 5 секунд
    setTimeout(() => {
        toast.classList.remove('show');
        
        // Повністю ховаємо після завершення анімації (через 0.5с)
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 500);
        
    }, 5000); 
}
});

// Функції-помічники
function showError(input, span) {
    span.classList.remove('hidden');
    input.style.borderColor = 'hsl(0, 66%, 54%)';
}

function hideError(input, span) {
    span.classList.add('hidden');
    input.style.borderColor = 'hsl(186, 15%, 59%)';
}