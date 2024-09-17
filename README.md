## Chatter

__[chatter.hanifahmadov.site](https://chatter.hanifahmadov.site/welcome)__



A real-time chat application inspired by a social app. This project focuses on delivering a text messaging between users. It serves as a platform for learning and showcasing skills in full-stack development, real-time communication, and responsive design.

### Tech Stack:

+ __Frontend__ - deployed on an __AWS__ EC2 Linux instance.
    
    + __React__ - UI library for building user interfaces
    + __Tailwind CSS__ - CSS-in-JS for styling components
    + __Recoil__ - State management library
    + __React Router__ - Routing library for navigation
    + __WebSockets (Socket.IO)__ - Real-time communication (client)

+ __Backend__ - deployed on a __Digital Ocean__ CentOS instance.

    + __Node.js__ - JavaScript runtime
    + __Express__ - Framework for routing and middleware
    + __MongoDB__ - NoSQL database for storing user and message data
    + __Mongoose__ - MongoDB object modeling tool (schemas)
    + __Socket.IO__ - enables real-time, bidirectional communication between clients and server

### Features:

The projects offers:
- [x] User authentication (Sign Up, Sign In, Sign Out)
- [x] Real-time messaging with instant updates
- [x] User status indicators (online/offline)
- [ ] Message timestamps and read receipts
- [x] Responsive design for mobile and desktop
- [ ] Profile customization (avatar upload, status message)

### Backend Server Deployment

Backend server is hosted on a CentOS virtual machine (droplet) on the DigitalOcean platform. The server runs locally on the machine (localhost) and isn't directly accessible from the internet. To handle all client requests, i use __nginx__ as a reverse proxy.

+ __nginx:__ 

    + __Handles Incoming Traffic:__ Listens for all web requests coming from the internet.
    + __Forwards Requests:__ It redirects these incoming requests to our backend server running on `localhost`.
    + __Enhances Security:__ Adds a layer of security to our endpoint routes. `localhost` packages are secured by SELinux, making them only accessible by __nginx.__


### API Endpoints

__`baseurl`__ `=` `chatterapi.hanifahmadov.site`

__Authentication:__


+ POST 