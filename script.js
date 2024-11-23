document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 1;

    const steps = document.querySelectorAll('.paso');
    const dots = document.querySelectorAll('.dot');

    const dotsText = document.getElementById('dotsText');
    const nextButton1 = document.getElementById('next-1');
    const nextButton2 = document.getElementById('next-2');
    const submitButton = document.getElementById('submit');

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
    });

    function updateStep(newStep) {

        if (newStep < 1 || newStep > steps.length) return;

        document.querySelector('.paso.active')?.classList.remove('active');

        steps[newStep - 1].classList.add('active');


        currentStep = newStep;

        dotsText.innerHTML = `Step ${currentStep} of ${steps.length}`;

        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'visited');

            if (index === newStep - 1) {
                dot.classList.add('active');
            } else if (index < newStep - 1) {
                dot.classList.add('visited');
            }
        });


        if (currentStep === 3) {
            document.getElementById('data-topics').innerHTML = '';
            
            const name = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const topics = document.querySelectorAll('.btn.active');

            document.getElementById('data-name').textContent = name;
            document.getElementById('data-email').textContent = email;

            topics.forEach(topic => {
                const li = document.createElement('li');
                li.textContent = topic.textContent;
                document.getElementById('data-topics').appendChild(li);
            });
        }
    }

    function validateStep1() {
        const nameValue = document.getElementById('nombre').value;
        const emailValue = document.getElementById('email').value;
        const error = document.getElementById('error-1');
        const errorMail = document.getElementById('error-email');

        error.textContent = '';
        errorMail.textContent = '';


        if (!nameValue || !emailValue) {
            error.textContent = 'Por favor, complete todos los campos.';
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            errorMail.textContent = 'Por favor, ingrese un correo electrónico válido.';
            return false
        }
        return true;
    }

    function validateStep2() {
        if (currentStep !== 2) return false;
        const error = document.getElementById('error-2');
        error.textContent = '';
        const btn1 = document.getElementById('option-1').classList.contains('active');
        const bnt2 = document.getElementById('option-2').classList.contains('active');
        const bnt3 = document.getElementById('option-3').classList.contains('active');

        if (btn1 || bnt2 || bnt3) return true;

        error.textContent = 'Por favor, seleccione alguna opcion.';

        return false;
    }

    function validateStep3() {
        return true;
    }

    nextButton1.addEventListener('click', () => {
        if (validateStep1()) updateStep(currentStep + 1);
    });

    nextButton2.addEventListener('click', () => {
        if (validateStep2()) updateStep(currentStep + 1);
    });


    submitButton.addEventListener('click', () => {
        if (validateStep3()) alert('Registro completado');
    });


    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.getAttribute('data-step'), 10);
            if (step < currentStep) {
                updateStep(step);
                return;
            }

            if (step === currentStep + 1) {
                if (currentStep === 1 && validateStep1()) {
                    updateStep(step);
                } else if (currentStep === 2 && validateStep2()) {
                    updateStep(step);
                }
            }
        });
    });

    updateStep(currentStep);

});
