// Form handling utilities
const API_URL = '/api/email-handler.php';

class FormHandler {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.formType = this.form.dataset.formType;
        this.setupForm();
    }

    setupForm() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupValidation();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        this.clearFieldError(field);

        if (field.required && !field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^\+?[\d\s-()]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFormMessage(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;

        const existingAlert = this.form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        this.form.insertBefore(alertDiv, this.form.firstChild);

        if (type === 'success') {
            setTimeout(() => {
                alertDiv.remove();
                this.form.reset();
            }, 5000);
        }
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.submitButton.disabled = true;
            const spinner = document.createElement('span');
            spinner.className = 'spinner';
            this.submitButton.prepend(spinner);
            this.submitButton.dataset.originalText = this.submitButton.textContent;
            this.submitButton.textContent = 'Sending...';
        } else {
            this.submitButton.disabled = false;
            const spinner = this.submitButton.querySelector('.spinner');
            if (spinner) {
                spinner.remove();
            }
            if (this.submitButton.dataset.originalText) {
                this.submitButton.textContent = this.submitButton.dataset.originalText;
            }
        }
    }

    async getReCaptchaToken() {
        try {
            return await grecaptcha.execute(window.recaptchaSiteKey, { action: 'submit' });
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            return null;
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.setLoading(true);

        try {
            const formData = new FormData(this.form);
            const recaptchaToken = await this.getReCaptchaToken();

            if (!recaptchaToken) {
                throw new Error('Failed to get reCAPTCHA token');
            }

            const response = await fetch('http://localhost:3000/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    formType: this.formType,
                    recaptchaToken: recaptchaToken
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to send message');
            }

            const data = await response.json();
            this.showFormMessage('success', 'Thank you! Your message has been sent successfully.');
            this.form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('error', error.message || 'An error occurred. Please try again later.');
        } finally {
            this.setLoading(false);
        }
    }
}

// Initialize all forms on the page
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-form-type]');
    forms.forEach(form => new FormHandler(form));
}); 