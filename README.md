# Virtual Event Management System

A comprehensive backend API for managing virtual events, built with Node.js and Express. This system allows organizers to create and manage events while enabling attendees to register and participate in events.

## 🚀 Features

### User Management
- **User Registration**: Register users with different roles (organiser/attendee)
- **User Authentication**: JWT-based login system with secure token management
- **Password Security**: Password hashing using bcrypt
- **Email Validation**: Comprehensive email format validation

### Event Management
- **Create Events**: Organizers can create new events with title, description, date, and time
- **View Events**: Fetch all available events
- **Update Events**: Modify existing events (organizers only)
- **Delete Events**: Remove events from the system (organizers only)

### Participant Management
- **Event Registration**: Users can register for events
- **Email Notifications**: Automatic email confirmations upon successful registration
- **Participant Tracking**: Track registered participants for each event

### Security Features
- **JWT Authentication**: Secure API access with JSON Web Tokens
- **Role-Based Access Control**: Different permissions for organizers and attendees
- **Input Validation**: Comprehensive validation for all user inputs
- **Authorization Middleware**: Protect routes based on user roles

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **Development**: Nodemon for auto-restart

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Gmail account (for email notifications)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/koutilyanamdeo/virtual-event-management.git
   cd virtual-event-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   SALT_ROUNDS=10
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /api/v1/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "organiser" // or "attendee"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/v1/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

### Event Management Endpoints

#### Create Event
```http
POST /api/v1/event
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "organiser": "John Doe",
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-25",
  "time": "10:00 AM"
}
```

**Response:**
```json
{
  "message": "Event created successfully",
  "event": {
    "id": 1,
    "organiser": "John Doe",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-12-25",
    "time": "10:00 AM",
    "participants": [],
    "createdBy": 1
  }
}
```

#### Get All Events
```http
GET /api/v1/event
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "organiser": "John Doe",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-12-25",
    "time": "10:00 AM",
    "participants": [],
    "createdBy": 1
  }
]
```

#### Update Event
```http
PUT /api/v1/event/:id
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Updated Event Title",
  "description": "Updated description"
}
```

#### Delete Event
```http
DELETE /api/v1/event/:id
Authorization: Bearer <jwt_token>
```

### Participant Management Endpoints

#### Register for Event
```http
POST /api/v1/event/:id/register
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "User registered for the event successfully"
}
```

## 🔐 Authentication

All event management endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **Organiser**: Can create, update, delete events, and view all events
- **Attendee**: Can view events and register for events

## 📧 Email Configuration

The system sends email notifications when users register for events. Configure your Gmail credentials in the `.env` file:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

**Note**: For Gmail, you may need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password instead of your regular password

## 🏗 Project Structure

```
virtual-event-management/
├── controllers/          # Route handlers
│   ├── createEvent.js   # Event creation logic
│   ├── deleteEvent.js   # Event deletion logic
│   ├── fetchEvent.js    # Event retrieval logic
│   ├── login.js         # User login logic
│   ├── register.js      # User registration logic
│   ├── updateEvent.js   # Event update logic
│   └── participantManagement.js # Participant registration logic
├── middleware/          # Custom middleware
│   └── JWTAuthorisation.js # JWT authentication middleware
├── models/              # Data models
│   ├── eventsModel.js   # Events data structure
│   └── registrationModel.js # Users data structure
├── routes/              # API routes
│   └── allApiRoutes.js  # All route definitions
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🧪 Testing

Run the application in development mode:
```bash
npm start
```

The server will start with auto-restart enabled via nodemon.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

If you encounter any issues or have suggestions, please [create an issue](https://github.com/koutilyanamdeo/virtual-event-management/issues) on GitHub.

## 📞 Support

For support, email koutilya.namdeo888@gmail.com or create an issue in the repository.

---

**Note**: This is a demonstration project using in-memory storage. In a production environment, consider implementing a proper database solution and additional security measures.


