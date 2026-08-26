document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#quote-form");
  const submitButton = form?.querySelector(".form-submit");
  const submitLabel = form?.querySelector("[data-submit-label]");
  const status = form?.querySelector(".form-status");
  const serviceSelect = form?.querySelector("#service");

  const serviceMap = {
    road: "Road freight",
    sea: "Sea freight",
    cargo: "Cargo shipping",
    air: "Air freight"
  };

  const requestedService = new URLSearchParams(window.location.search).get("service");
  if (requestedService && serviceMap[requestedService] && serviceSelect) {
    serviceSelect.value = serviceMap[requestedService];
  }

  const clearFieldError = (field) => {
    const wrapper = field.closest(".field");
    const error = wrapper?.querySelector(".field__error");
    wrapper?.classList.remove("is-error");
    field.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  };

  const setFieldError = (field, message) => {
    const wrapper = field.closest(".field");
    const error = wrapper?.querySelector(".field__error");
    wrapper?.classList.add("is-error");
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  };

  form?.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => clearFieldError(field));
    field.addEventListener("change", () => clearFieldError(field));
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form || !submitButton || !submitLabel || !status) return;

    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");
    const requiredFields = [name, email, message];
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      clearFieldError(field);
      const value = field.value.trim();
      if (!value) {
        setFieldError(field, field === message ? "Add a short description of the cargo and route." : "Complete this field so we can prepare the enquiry.");
        firstInvalid ||= field;
      } else if (field === email && !/^\S+@\S+\.\S+$/.test(value)) {
        setFieldError(field, "Enter a complete email address, such as name@example.com.");
        firstInvalid ||= field;
      }
    });

    if (firstInvalid) {
      status.textContent = "Check the highlighted fields, then prepare the enquiry again.";
      status.className = "form-status is-visible is-error";
      firstInvalid.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute("data-state", "loading");
    submitLabel.textContent = "Preparing email…";

    const formData = new FormData(form);
    const body = [
      `Name: ${formData.get("name")}`,
      `Company: ${formData.get("company") || "Not provided"}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      `Service: ${formData.get("service")}`,
      `Origin: ${formData.get("origin") || "Not provided"}`,
      `Destination: ${formData.get("destination") || "Not provided"}`,
      "",
      "Cargo details:",
      formData.get("message")
    ].join("\n");

    const subject = `TOJDORON freight enquiry — ${formData.get("service")}`;
    const mailto = `mailto:tojdoron1717@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      status.className = "form-status is-visible";
      status.innerHTML = `Your enquiry is ready. <a href="${mailto}">Continue in your email app</a> to send it to TOJDORON.`;
      status.focus();
      submitButton.disabled = false;
      submitButton.removeAttribute("data-state");
      submitLabel.textContent = "Prepare my enquiry";
      window.location.href = mailto;
    }, 350);
  });
});
