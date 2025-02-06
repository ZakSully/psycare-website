class e{setupForm(){this.form.addEventListener("submit",this.handleSubmit.bind(this)),this.setupValidation()}setupValidation(){this.form.querySelectorAll("input, textarea").forEach(e=>{e.addEventListener("blur",()=>this.validateField(e)),e.addEventListener("input",()=>this.clearFieldError(e))})}validateField(e){return(this.clearFieldError(e),e.required&&!e.value.trim())?(this.showFieldError(e,"This field is required"),!1):"email"===e.type&&e.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value)?(this.showFieldError(e,"Please enter a valid email address"),!1):"tel"!==e.type||!e.value||!!/^\+?[\d\s-()]{10,}$/.test(e.value)||(this.showFieldError(e,"Please enter a valid phone number"),!1)}showFieldError(e,t){e.classList.add("error");let r=document.createElement("div");r.className="error-message",r.textContent=t,e.parentNode.appendChild(r)}clearFieldError(e){e.classList.remove("error");let t=e.parentNode.querySelector(".error-message");t&&t.remove()}validateForm(){let e=this.form.querySelectorAll("input, textarea"),t=!0;return e.forEach(e=>{this.validateField(e)||(t=!1)}),t}showFormMessage(e,t){let r=document.createElement("div");r.className=`alert alert-${e}`,r.textContent=t;let s=this.form.querySelector(".alert");s&&s.remove(),this.form.insertBefore(r,this.form.firstChild),"success"===e&&setTimeout(()=>{r.remove(),this.form.reset()},5e3)}setLoading(e){if(e){this.submitButton.disabled=!0;let e=document.createElement("span");e.className="spinner",this.submitButton.prepend(e),this.submitButton.dataset.originalText=this.submitButton.textContent,this.submitButton.textContent="Sending..."}else{this.submitButton.disabled=!1;let e=this.submitButton.querySelector(".spinner");e&&e.remove(),this.submitButton.dataset.originalText&&(this.submitButton.textContent=this.submitButton.dataset.originalText)}}async getReCaptchaToken(){try{return await grecaptcha.execute(window.recaptchaSiteKey,{action:"submit"})}catch(e){return console.error("reCAPTCHA error:",e),null}}async handleSubmit(e){if(e.preventDefault(),this.validateForm()){this.setLoading(!0);try{let e=new FormData(this.form),t=await this.getReCaptchaToken();if(!t)throw Error("Failed to get reCAPTCHA token");let r=await fetch("http://localhost:3000/api/submit-form",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:e.get("email"),formType:this.formType,recaptchaToken:t})});if(!r.ok){let e=await r.json();throw Error(e.message||"Failed to send message")}await r.json(),this.showFormMessage("success","Thank you! Your message has been sent successfully."),this.form.reset()}catch(e){console.error("Form submission error:",e),this.showFormMessage("error",e.message||"An error occurred. Please try again later.")}finally{this.setLoading(!1)}}}constructor(e){this.form=e,this.submitButton=this.form.querySelector('button[type="submit"]'),this.formType=this.form.dataset.formType,this.setupForm()}}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("form[data-form-type]").forEach(t=>new e(t))});
//# sourceMappingURL=contact.a73d810f.js.map
