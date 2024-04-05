## Car Doctor Website - Server Side 

This repository hosts the server-side code for the Car Doctor website, providing APIs to manage services and bookings.

### Technologies Used:

- **Node.js**
- **Express.js**
- **MongoDB**

### Backend API Deployment:
- Vercel:

### API Endpoints:

#### Services

- **GET /services**
  - Retrieves all available services.
  
- **GET /services/:id**
  - Retrieves details of a specific service by ID.

#### Bookings

- **GET /bookings**
  - Retrieves all bookings.
  - Optional Query Parameters:
    - `email`: Filter bookings by user email.

- **POST /bookings**
  - Creates a new booking.
  - Request Body:
    ```json
    {
      "userId": "string",
      "serviceId": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "bookingDate": "string",
      "status": "string"
    }
    ```

- **PATCH /bookings/:id**
  - Updates the status of a specific booking by ID.
  - Request Body:
    ```json
    {
      "status": "string"
    }
    ```

- **DELETE /bookings/:id**
  - Deletes a specific booking by ID.

### Getting Started:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example` and configure MongoDB URI.

4. Run the server:
   ```bash
   npm start
   ```

### Database Schema:

#### Collections:

- **services**
  - Schema:
    ```json
    {
      "title": "string",
      "description": "string",
      "price": "number",
      "img": "string"
    }
    ```

- **bookings**
  - Schema:
    ```json
    {
      "userId": "string",
      "serviceId": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "bookingDate": "string",
      "status": "string"
    }
    ```

### Key Features:

1. **Responsive Service Viewing**:
   - Users can view services on laptops, tablets, and mobile devices with a responsive design.

2. **Service Booking**:
   - Users can book services by clicking the "Book" button.

3. **User Information Submission**:
   - Users fill out necessary information when booking a service.

4. **View Booked Services**:
   - Users can view all their booked services.

5. **Manage Bookings**:
   - Users can delete or confirm their booked services.

6. **Private Route for Bookings**:
   - Access to "My Bookings" is restricted to logged-in users (private route).

7. **User Authentication**:
   - Users are required to register or log in to access the website and its features.

8. **MongoDB Data Storage**:
   - All data (services, bookings) is stored in a MongoDB database.

9. **CRUD Operations**:
   - Users can perform CRUD operations (Create, Read, Update, Delete) on services and bookings.

10. **Query Parameter Support**:
    - Users can retrieve specific data based on query parameters (e.g., filtering bookings by email).

This server provides the backend support required for the Car Doctor website, enabling users to book services and manage their bookings efficiently.

### 🚀 About Me
Hi, I am Nadim Mahmud Nion. I have recently concluded my graduation from the department of Computer Science and Engineering (CSE) at the Daffodil International University (DIU). I have been learning MERN Stack Web Development since 2022. I am expertise in the following skills:

* React 

* Express.js 

* Node.js 

* MongoDB

* Vite

* React Router

* Firebase

* Vercel

* JavaScript

* Advanced JavaScript

* Daisy UI 

* Bootstrap

* Tailwind

* HTML5

* CSS3

* Media Query

I have built multiple projects using these skills. You are invited to my GitHub profile to know about my projects and don't forget to give a star to my projects.

