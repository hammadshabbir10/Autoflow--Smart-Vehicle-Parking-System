# Autoflow - Smart Vehicle Parking System

Autoflow is a comprehensive Vehicle Management System (VMS) designed to streamline vehicle booking, tracking, and management. It provides an efficient platform for organizations to optimize vehicle utilization, automate check-in and check-out processes, and enhance overall security through real-time status updates and monitoring.

## Features

- **Slot Booking:** Easily reserve available vehicles for specific time slots through an intuitive booking interface.
- **Real-Time Tracking:** Monitor check-ins, check-outs, and vehicle availability in real-time.
- **My Bookings Dashboard:** Allow users to view and manage all their upcoming and past bookings in one organized place.
- **User Authentication:** Secure registration, login, and password management functionality with role-based features.
- **AI Chat Assistant:** Integrated virtual assistant to help users with system navigation, booking queries, and general support.
- **Admin Analytics:** Specialized dashboard for administrators to monitor system performance, manage settings, and review feedback.

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Other Technologies:** express-session, bcrypt (implied for auth), Gemini AI API (for the chat feature)

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server

### Database Setup
1. Create a MySQL database named `SE_Project`.
2. Configure the database credentials in `Backend/db.js` to match your local setup.
3. Apply the required database schema (Users, Admins, Slots, and Bookings tables).

### Backend Configuration
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:8081`.

### Frontend Usage
1. Open the `Frontend` directory.
2. Launch `mainpage.html` in your web browser. Ensure the backend server is running for API requests to resolve successfully.

## Architecture Highlights
The project uses a clean separation of concerns, where the vanilla JavaScript frontend communicates with the Node.js backend via standard REST API endpoints. The backend maintains stateless architecture where possible, while leveraging express-session to handle secure user sessions during authentication and subsequent requests.
