document.addEventListener("DOMContentLoaded", function () {
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("content").style.display = "block";
            }, 1500);

            const bookingCheckForm = document.getElementById("bookingCheckForm");
            const emailInput = document.getElementById("email");
            const bookingsList = document.getElementById("bookingsList");

            // Retrieve the logged-in user's email from localStorage
            const loggedInEmail = localStorage.getItem("userEmail");
            console.log("Email from localStorage:", localStorage.getItem("userEmail"));
            
            // If user is already logged in, populate the email field
            if (loggedInEmail) {
                emailInput.value = loggedInEmail;
            }
            
            bookingCheckForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const enteredEmail = emailInput.value.trim();
                console.log("Entered Email:", enteredEmail);
                console.log("Logged In Email:", loggedInEmail);
                if (!enteredEmail) {
                    alert("Please enter your email.");
                    return;
                }

                // Check if entered email matches logged-in email
                if (!loggedInEmail || enteredEmail !== loggedInEmail) {
                    alert("Error: The entered email does not match your login email!");
                    return;
                }

                fetch(`http://localhost:8081/api/bookings?email=${enteredEmail}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                   .then(data => {
                        bookingsList.innerHTML = "";

                        if (data.length === 0) {
                            const row = document.createElement("tr");
                            row.innerHTML = `<td colspan="5" class="no-bookings">No bookings found</td>`;
                            bookingsList.appendChild(row);
                            return;
                        }

                        data.forEach(booking => {
                            const row = document.createElement("tr");
                            
                            // Format booking time for better readability
                            const bookingTime = booking.booking_time ? new Date(booking.booking_time).toLocaleString() : "N/A";
                            
                            row.innerHTML = `
                                <td>${booking.id}</td>
                                <td>${booking.slot_time || "N/A"}</td>
                                <td>${bookingTime}</td>
                                <td>Confirmed</td>
                                <td>
                                    <button class="action-btn cancel-btn" data-booking-id="${booking.id}">
                                        <i class="fas fa-times"></i> Cancel
                                    </button>
                                </td>
                            `;

                            bookingsList.appendChild(row);
                        });

                        document.querySelectorAll(".cancel-btn").forEach(button => {
                            button.addEventListener("click", function () {
                                const bookingId = this.getAttribute("data-booking-id");
                                cancelBooking(bookingId, this);
                            });
                        });
                    })
                    .catch(error => {
                        console.error("Error fetching bookings:", error);
                        bookingsList.innerHTML = `<tr><td colspan="5" class="no-bookings">Error loading bookings. Please try again.</td></tr>`;
                    });
            });

            function cancelBooking(bookingId, button) {
                const confirmCancel = confirm("Are you sure you want to cancel this booking?");
                if (!confirmCancel) return;

                button.disabled = true;
                button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Cancelling...`;

                fetch(`http://localhost:8081/api/bookings/${bookingId}`, { method: "DELETE" })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const row = button.closest("tr");
                            row.classList.add("fade-out");
                            setTimeout(() => {
                                row.remove();
                                showNotification("Booking canceled successfully", "success");
                            }, 300);
                        } else {
                            button.disabled = false;
                            button.innerHTML = `<i class="fas fa-times"></i> Cancel`;
                            showNotification("Failed to cancel booking: " + data.message, "error");
                        }
                    })
                    .catch(error => {
                        console.error("Error canceling booking:", error);
                        button.disabled = false;
                        button.innerHTML = `<i class="fas fa-times"></i> Cancel`;
                        showNotification("Error canceling booking. Try again later.", "error");
                    });
            }

            function showNotification(message, type) {
                const notification = document.createElement("div");
                notification.className = `notification ${type}`;
                notification.textContent = message;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add("show");
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove("show");
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 3000);
            }
});