<div className="text-[30px]">

## Chatter

**[chatter.hanifahmadov.site](https://chatter.hanifahmadov.site/welcome)**

A real-time chat application inspired by a social app. This project focuses on delivering a text messaging between users. It serves as a platform for learning and showcasing skills in full-stack development, real-time communication, and responsive design.

### Tech Stack:

-   **Frontend** - deployed on an **AWS** EC2 Linux instance.

    -   **React** - UI library for building user interfaces
    -   **Tailwind CSS** - CSS-in-JS for styling components
    -   **Recoil** - State management library
    -   **React Router** - Routing library for navigation
    -   **WebSockets (Socket.IO)** - Real-time communication (client)

-   **Backend** - deployed on a **Digital Ocean** CentOS instance.

    -   **Node.js** - JavaScript runtime
    -   **Express** - Framework for routing and middleware
    -   **MongoDB** - NoSQL database for storing user and message data
    -   **Mongoose** - MongoDB object modeling tool (schemas)
    -   **Socket.IO** - enables real-time, bidirectional communication between clients and server

### Features:

The projects offers:

-   [x] User authentication (Sign Up, Sign In, Sign Out)
-   [x] Real-time messaging with instant updates
-   [x] User status indicators (online/offline)
-   [ ] Message timestamps and read receipts
-   [x] Responsive design for mobile and desktop
-   [ ] Profile customization (avatar upload, status message)

### Backend Server Deployment

Backend server is hosted on a CentOS virtual machine (droplet) on the DigitalOcean platform. The server runs locally on the machine (localhost) and isn't directly accessible from the internet. To handle all client requests, i use **nginx** as a reverse proxy.

-   **nginx:**

    -   **Handles Incoming Traffic:** Listens for all web requests coming from the internet.
    -   **Forwards Requests:** It redirects these incoming requests to our backend server running on `localhost`.
    -   **Enhances Security:** Adds a layer of security to our endpoint routes. `localhost` packages are secured by SELinux, making them only accessible by **nginx.**

### API Endpoints

**`baseurl`** `=` `chatterapi.hanifahmadov.site`

**Authentication:**

-   POST
</div>
