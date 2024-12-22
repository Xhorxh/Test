document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const surnameError = document.getElementById("surnameError");
    const phoneError = document.getElementById("phoneError");
    const feedbackCard = document.getElementById("feedbackCard");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect and validate form data
        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData.entries());

        // Reset errors
        surnameError.style.display = "none";
        phoneError.style.display = "none";

        // Validation
        const isValidSurname = !!dataObject.surname;
        const isValidPhone = validatePhoneNumber(dataObject.phone);

        if (!isValidSurname) surnameError.style.display = "block";
        if (!isValidPhone) phoneError.style.display = "block";

        if (!isValidSurname || !isValidPhone) return; // Stop if validation fails

        // Send data to server
        fetch('https://script.google.com/macros/s/AKfycbw0SQA104bLQFFBcUtLYDFbLP8HzKRy9ZdreCKSDqv5dllkdLx02jcH6HTp4dg8LRv9/exec', {
            method: 'POST',
            body: new URLSearchParams(dataObject),
        })
            .then(response => response.text())
            .then(() => {
                // Show feedback card
                feedbackCard.style.display = 'block';
                feedbackCard.classList.add('show');

                // Clear form fields
                form.reset();

                // Automatically hide feedback card after 3 seconds
                setTimeout(() => {
                    feedbackCard.style.display = 'none';
                    feedbackCard.classList.remove('show');
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Submission failed. Please try again.');
            });
    });

    // Validate phone number (Italian format)
    function validatePhoneNumber(phone) {
        return /^(\+39)?\d{10}$/.test(phone);
    }

    // Close feedback card immediately if clicked outside
    document.addEventListener("click", function (e) {
        if (feedbackCard.style.display === "block" && !feedbackCard.contains(e.target)) {
            feedbackCard.style.display = "none";
            feedbackCard.classList.remove("show");
        }
    });
});
function scrollToOffers() {
    const offersSection = document.getElementById("offers");
    offersSection.scrollIntoView({ behavior: "smooth" });
};
