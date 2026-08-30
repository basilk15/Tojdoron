document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#quote-form");
  const submitButton = form?.querySelector(".form-submit");
  const submitLabel = form?.querySelector("[data-submit-label]");
  const status = form?.querySelector(".form-status");
  const serviceSelect = form?.querySelector("#service");
  const translate = (source) => window.TOJDORON_I18N?.t(source) || source;

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
    if (error) {
      delete error.dataset.translationKey;
      error.textContent = "";
    }
  };

  const setFieldError = (field, message) => {
    const wrapper = field.closest(".field");
    const error = wrapper?.querySelector(".field__error");
    wrapper?.classList.add("is-error");
    field.setAttribute("aria-invalid", "true");
    if (error) {
      error.dataset.translationKey = message;
      error.textContent = translate(message);
    }
  };

  const setStatus = (message, isError = false) => {
    if (!status) return;
    status.dataset.translationKey = message;
    status.textContent = translate(message);
    status.className = `form-status is-visible${isError ? " is-error" : ""}`;
  };

  form?.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => clearFieldError(field));
    field.addEventListener("change", () => clearFieldError(field));
  });

  form?.addEventListener("submit", async (event) => {
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
        setFieldError(field, field === message ? "Add a short description of the cargo and route." : "Complete this field before sending the enquiry.");
        firstInvalid ||= field;
      } else if (field === email && !/^\S+@\S+\.\S+$/.test(value)) {
        setFieldError(field, "Enter a complete email address, such as name@example.com.");
        firstInvalid ||= field;
      }
    });

    if (firstInvalid) {
      setStatus("Check the highlighted fields, then send the enquiry again.", true);
      firstInvalid.focus();
      return;
    }

    const accessKey = form.elements.namedItem("access_key");
    if (!accessKey?.value || accessKey.value === "YOUR_WEB3FORMS_ACCESS_KEY") {
      setStatus("Form email is not configured yet. Add the Web3Forms access key before publishing.", true);
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute("data-state", "loading");
    submitLabel.textContent = translate("Sending enquiry…");

    try {
      const formData = new FormData(form);
      formData.set("subject", `${translate("TOJDORON freight enquiry")} — ${translate(formData.get("service") || "")}`);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.body?.message || result?.message || "Web3Forms submission failed");
      }

      form.reset();
      setStatus("Your enquiry was sent successfully. We'll be in touch soon.");
      status.focus();
    } catch (error) {
      console.error("Web3Forms submission failed:", error);
      setStatus("We couldn't send your enquiry. Please try again or email us directly.", true);
      status.focus();
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("data-state");
      submitLabel.textContent = translate("Send my enquiry");
    }
  });
});
