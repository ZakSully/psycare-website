document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('staffingQuestionnaire');
    const steps = form.querySelectorAll('.form-step');
    const providerSteps = form.querySelector('.provider-steps');
    const roleButtons = form.querySelectorAll('.role-btn');
    const prevBtn = form.querySelector('.btn-prev');
    const nextBtn = form.querySelector('.btn-next');
    const stepIndicator = form.querySelector('.step-indicator');
    let currentStep = 1;

    // Role selection
    roleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent form submission
            const role = this.dataset.role;
            
            // Remove selection from all buttons
            roleButtons.forEach(b => b.classList.remove('selected'));
            
            // Add selection to clicked button
            this.classList.add('selected');

            if (role === 'provider') {
                // Show provider questionnaire
                providerSteps.style.display = 'block';
                currentStep = 2;
                updateView();
            }
            // If professional, the button's onclick will redirect
        });
    });

    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep > 1) {
            currentStep--;
            updateView();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            if (currentStep < 5) {
                currentStep++;
                updateView();
            }
        }
    });

    function updateView() {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        const currentStepEl = form.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }

        // Update buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === 5 ? 'Schedule Call' : 'Next';
        
        // Update step indicator
        const currentStepSpan = stepIndicator.querySelector('.current-step');
        if (currentStepSpan) {
            currentStepSpan.textContent = currentStep;
        }

        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateCurrentStep() {
        const currentStepEl = form.querySelector(`[data-step="${currentStep}"]`);
        if (!currentStepEl) return true;

        let isValid = true;

        // Step 1: Validate role selection
        if (currentStep === 1) {
            const selectedRole = form.querySelector('.role-btn.selected');
            if (!selectedRole) {
                isValid = false;
                // Show error indication
                roleButtons.forEach(btn => btn.classList.add('error'));
            }
            return isValid;
        }

        // Validate required fields
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
                // Remove error class when user starts typing
                field.addEventListener('input', () => field.classList.remove('error'));
            } else {
                field.classList.remove('error');
            }
        });

        // Step 2: Validate checkbox selection
        if (currentStep === 2) {
            const checkboxes = currentStepEl.querySelectorAll('input[type="checkbox"]');
            const checked = Array.from(checkboxes).some(cb => cb.checked);
            if (!checked) {
                isValid = false;
                currentStepEl.querySelector('.checkbox-group').classList.add('error');
            }
        }

        return isValid;
    }

    // Initialize
    updateView();
}); 