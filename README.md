```markdown
# Blog Website

## on delete and update not working proper

## Overview
This is a Laravel-based blog website that provides authentication, blog management, and real-time notifications. It enables users to register, create and manage blog posts, and receive instant updates through notifications.

## Features
1. **Authentication**
   - User registration and login

2. **Blog Management**
   - Create, update, and delete blog posts
   
3. **Real-Time Notifications**
   - WebSocket-based real-time updates on create 
   - User-specific notifications dashboard

## Installation

### Prerequisites
- PHP >= 8.0
- Composer
- Laravel 9+
- MySQL or PostgreSQL Database
- Node.js and npm (for frontend assets and WebSocket support)

### Setup Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/blog-website.git
   cd blog-website
   ```
2. Install dependencies:
   ```sh
   composer install
   npm install && npm run dev
   ```
3. Set up the environment:
   ```sh
   cp .env.example .env
   php artisan key:generate
   ```
4. Configure database in `.env` file and run migrations:
   ```sh
   php artisan migrate --seed
   ```
5. Start the development server:
   ```sh
   php artisan serve
   ```

## Usage
- Register and log in to access the blog dashboard.
- Create, edit, and manage blog posts.
- Receive real-time notifications for interactions on posts.

## Technologies Used
- Laravel (Backend Framework)
- MySQL/PostgreSQL (Database)
- Laravel Echo & Pusher (Real-time Notifications)
- Bootstrap/Tailwind CSS (Frontend Styling)

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out to [your email or GitHub profile].
```

