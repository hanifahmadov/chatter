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

-   [x] User authentication (`Sign Up`, `Sign In`, `Sign Out`)
-   [x] Real-time messaging with instant updates
-   [x] User status indicators (`online/offline`)
-   [ ] Message timestamps and read receipts
-   [x] Responsive design for mobile and desktop
-   [ ] Profile customization (`avatar upload`, `status message`)

### Backend Server Deployment

Backend server is hosted on a CentOS virtual machine (droplet) on the DigitalOcean platform. The server runs locally on the machine (localhost) and isn't directly accessible from the internet. To handle all client requests, i use **nginx** as a reverse proxy.

-   **nginx:**

    -   **Handles Incoming Traffic:** Listens for all web requests coming from the internet.
    -   **Forwards Requests:** It redirects these incoming requests to our backend server running on `localhost`.
    -   **Enhances Security:** Adds a layer of security to our endpoint routes. `localhost` packages are secured by SELinux, making them only accessible by **nginx.**

### API Endpoints

**`api`** `=` `chatterapi.hanifahmadov.site`

**Authentication:**

-   **POST** `api/signup` - Register a new user with optional avatar upload.

    - **File Upload Handling:** - use `multer` middleware (`signup_multer.single("avatar")`) to handle single file upload under the field name avatar.

        > The uploaded file is saved to a publicly accessible images folder (served via `nginx`).

    -   **Password Hashing:** - uses bcrypt to hash the password with a predefined number of salt rounds (`bcryptSaltRounds`).

-   **POST** `api/signin` - Sign in a user and performing the following steps:

    -   **Credentials verification:** - Verifies that the provided `email` exists in the database and uses `bcrypt.compare` to validate the provided password against the stored hashed password.
    -   **Token Generation:** - Generates 2 `JWT` tokens:

        `access-token` `:` containing the user's ID and email, valid for 1 day, for signed user checks

        `refresh-token` `:` alid for 1 day or 7 days based on the [ ]`remember` parameter, for secure cookies, padge reload auth.

-   **DELETE** `api/signout` - Sign out the user. This endpoint logs out the user by:

    -   **Clearing the JWT Cookie:** Removes the `jwt` cookie from the client's browser.
    -   **Invalidating the Access Token:** Sets the user's `accessToken` to `null` in the database.
    -   **Updating Last Seen:** Updates the user's `lastseen` timestamp to the current date and time.

    > endpoint expects the user's `_id` in the request body.
