#This is a clear guide on the Blog Platform API

Features
User authentication (register, login)
CRUD operations for blog posts
Blog post search and filtering
Blog View Count
Comment system

Installation

Clone the repository
git clone https://github.com/Suchak123/Blog-Platform_API
cd Blog-Platform_API

Install dependencies
npm install

Create a .env file in the root directory and add environment variables similar to .env.example file

Start the development server
npm run dev


Authentication
This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
Authorization: Bearer <your_jwt_token>

Register User
POST /api/v1/user/register
{
    
    "username": "test102",
    "email": "test102@test.com",
    "password": "#Password123"
}

Response
{
    "statusCode": 201,
    "message": "User created",
    "data": {
        "user": {
            "_id": "688f2d1caedb00163c7827ae",
            "username": "test102",
            "email": "test102@test.com",
            "createdAt": "2025-08-03T09:34:20.914Z",
            "updatedAt": "2025-08-03T09:34:20.914Z",
            "__v": 0
        }
    },
    "success": true
}

Login User
POST /api/v1/user/login
{
    
    "email": "test102@test.com",
    "password": "#Password123"
}
Response
{
    "statusCode": 200,
    "message": "Login Successful",
    "data": {
        "user": {
            "_id": "688f2d1caedb00163c7827ae",
            "username": "test102",
            "email": "test102@test.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODhmMmQxY2FlZGIwMDE2M2M3ODI3YWUiLCJpYXQiOjE3NTQyMTM3NDMsImV4cCI6MTc1NjgwNTc0M30.yf9ScxgHNjXJa2FHEhwpeTGczELTXpHhSMnftYUB9TQ"
    },
    "success": true
}

Get Logged In User
GET /api/v1/user/get-user
Given Authorization Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODhmMmQxY2FlZGIwMDE2M2M3ODI3YWUiLCJpYXQiOjE3NTQyMTM4NDAsImV4cCI6MTc1NjgwNTg0MH0.asQ4hPQDZ0DwJqdeD3ocNie3_5irR98FqQbdCgojci0
{
    "statusCode": 200,
    "message": "Logged in User Detail",
    "data": {
        "user": {
            "id": "688f2d1caedb00163c7827ae"
        }
    },
    "success": true
}

Create Blog Post
POST /api/v1/blog/create-blog
{
  "title": "My First Blog Post",
  "description": "This is the content of my first blog post...",
  "tags": ["technology", "nodejs", "mongodb"]
  
}
Response
{
    "statusCode": 201,
    "message": "Blog created successfully",
    "data": {
        "blog": {
            "_id": "688f2eaeaedb00163c7827b3",
            "title": "My First Blog Post",
            "description": "This is the content of my first blog post...",
            "author": {
                "_id": "688f2d1caedb00163c7827ae",
                "username": "test102",
                "email": "test102@test.com"
            },
            "tags": [
                "technology",
                "nodejs",
                "mongodb"
            ],
            "viewCount": 0,
            "comments": [],
            "createdAt": "2025-08-03T09:41:02.256Z",
            "updatedAt": "2025-08-03T09:41:02.257Z",
            "__v": 0
        }
    },
    "success": true
}

Get All Blogs
GET /api/v1/blog/
{
    "blogs": [
        {
            "_id": "688f2eaeaedb00163c7827b3",
            "title": "My First Blog Post",
            "description": "This is the content of my first blog post...",
            "author": {
                "_id": "688f2d1caedb00163c7827ae",
                "username": "test102",
                "email": "test102@test.com"
            },
            "tags": [
                "technology",
                "nodejs",
                "mongodb"
            ],
            "viewCount": 0,
            "comments": [],
            "createdAt": "2025-08-03T09:41:02.256Z",
            "updatedAt": "2025-08-03T09:41:02.257Z"
        },
        {
            "_id": "688f22b88f660795c1090813",
            "title": "A test blog final version 2",
            "description": "This is test description for test blog",
            "author": {
                "_id": "688e4124e7e856190dad203e",
                "username": "test101",
                "email": "testuser101@gmail.com"
            },
            "tags": [
                "test",
                "blog"
            ],
            "viewCount": 2,
            "comments": [
                {
                    "author": "commentor 1",
                    "content": "I like it more than the stars.",
                    "_id": "688f28556e0240b972d698a5",
                    "createdAt": "2025-08-03T09:13:57.244Z"
                },
                {
                    "author": "commentor 2",
                    "content": "I like it more than the moon.",
                    "_id": "688f28c22cf8e67248ffbf18",
                    "createdAt": "2025-08-03T09:15:46.039Z"
                }
            ],
            "createdAt": "2025-08-03T08:50:00.239Z",
            "updatedAt": "2025-08-03T09:15:46.043Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalBlogs": 2,
        "hasNext": false,
        "hasPrev": false
    }
}
Update Blog
PUT /api/v1/blog/edit-blog
{
  "title": "My Blog Post Updated",
  "description": "This is the content of my first blog post...",
  "tags": ["technology", "nodejs", "mongodb"]
  
}
Response
{
    "message": "Blog updated successfully",
    "blog": {
        "_id": "688f2eaeaedb00163c7827b3",
        "title": "My Blog Post Updated",
        "description": "This is the content of my first blog post...",
        "author": {
            "_id": "688f2d1caedb00163c7827ae",
            "username": "test102",
            "email": "test102@test.com"
        },
        "tags": [
            "technology",
            "nodejs",
            "mongodb"
        ],
        "viewCount": 0,
        "comments": [],
        "createdAt": "2025-08-03T09:41:02.256Z",
        "updatedAt": "2025-08-03T09:55:23.141Z",
        "__v": 0
    }
}

Get Blog
GET /api/v1/blog/:id
Response:
{
    "_id": "688f2eaeaedb00163c7827b3",
    "title": "My Blog Post Updated",
    "description": "This is the content of my first blog post...",
    "author": {
        "_id": "688f2d1caedb00163c7827ae",
        "username": "test102",
        "email": "test102@test.com"
    },
    "tags": [
        "technology",
        "nodejs",
        "mongodb"
    ],
    "viewCount": 1,
    "comments": [],
    "createdAt": "2025-08-03T09:41:02.256Z",
    "updatedAt": "2025-08-03T09:58:56.160Z"
}

Add Comment
POST /api/v1/blog/:id/comments
{
  "author": "Commentator 1",
  "content": "This is the comment of the blog post..."
  
}
Response
{
    "message": "Comment added successfully",
    "comment": {
        "author": "Commentator 1",
        "content": "This is the comment of the blog post...",
        "_id": "688f348faedb00163c7827c8",
        "createdAt": "2025-08-03T10:06:07.056Z"
    }
}

Get Comments
GET /api/v1/blog/:id/comments
Response
{
    "blogs": [
        {
            "_id": "688f2eaeaedb00163c7827b3",
            "title": "My Blog Post Updated",
            "description": "This is the content of my first blog post...",
            "author": {
                "_id": "688f2d1caedb00163c7827ae",
                "username": "test102",
                "email": "test102@test.com"
            },
            "tags": [
                "technology",
                "nodejs",
                "mongodb"
            ],
            "viewCount": 1,
            "comments": [],
            "createdAt": "2025-08-03T09:41:02.256Z",
            "updatedAt": "2025-08-03T09:58:56.160Z"
        },
        {
            "_id": "688f22b88f660795c1090813",
            "title": "A test blog final version 2",
            "description": "This is test description for test blog",
            "author": {
                "_id": "688e4124e7e856190dad203e",
                "username": "test101",
                "email": "testuser101@gmail.com"
            },
            "tags": [
                "test",
                "blog"
            ],
            "viewCount": 2,
            "comments": [
                {
                    "author": "commentor 1",
                    "content": "I like it more than the stars.",
                    "_id": "688f28556e0240b972d698a5",
                    "createdAt": "2025-08-03T09:13:57.244Z"
                },
                {
                    "author": "commentor 2",
                    "content": "I like it more than the moon.",
                    "_id": "688f28c22cf8e67248ffbf18",
                    "createdAt": "2025-08-03T09:15:46.039Z"
                }
            ],
            "createdAt": "2025-08-03T08:50:00.239Z",
            "updatedAt": "2025-08-03T09:15:46.043Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalBlogs": 2,
        "hasNext": false,
        "hasPrev": false
    }
}




