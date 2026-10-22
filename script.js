// IMPORTANT: Replace this with your actual WhatsApp number.
    // Country code + mobile number, digits only.
    // Example: 919876543210 for an Indian number.
    const COMPANY_WHATSAPP = "919043213201";

    // Set the minimum date to today.
    const dateInput = document.getElementById("visitDate");
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localToday;

    document.getElementById("siteVisitForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        if (!this.reportValidity()) return;

        if (!/^[1-9]\d{7,14}$/.test(COMPANY_WHATSAPP)) {
          alert("Please add your correct WhatsApp number in the JavaScript.");
          return;
        }

        const data = new FormData(this);

        const customerName = data.get("name").trim();
        const customerPhone = data.get("phone").trim();
        const visitDate = data.get("visitDate");

        if (visitDate < localToday) {
          alert("Please select today or a future date.");
          return;
        }

        const details = [
          "NEW CLIENT SITE VISIT ENQUIRY",
          "------------------------------",
          "Company: Aditi Housing",
          "",
          "Customer Name: " + customerName,
          "Customer Phone: +91 " + customerPhone,
          "Customer Email: " + (data.get("email") || "Not provided"),
          "",
          "Project: " + data.get("project"),
          "Property Type: " + data.get("property"),
          "Budget: " + (data.get("budget") || "Not specified"),
          "Purpose: " + (data.get("purpose") || "Not specified"),
          "",
          "Visit Date: " + visitDate,
          "Preferred Time: " + data.get("visitTime"),
          "Preferred Location: " + (data.get("location") || "Not specified"),
          "",
          "Additional Requirements: " +
            (data.get("message").trim() || "None"),
          "",
          "Please contact the customer to confirm the site visit."
        ];

        const whatsappMessage = details.join("\n");
        const whatsappURL =
          "https://wa.me/" + COMPANY_WHATSAPP +
          "?text=" + encodeURIComponent(whatsappMessage);

        // Opens WhatsApp with the completed message.
        window.open(whatsappURL, "_blank", "noopener,noreferrer");
      });