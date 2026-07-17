# SocialApp 

A Facebook-inspired social media platform built with React — signup, login, create posts (public/private/draft), like, comment, and manage your profile, all powered entirely by `localStorage`.

##  Live Demo



##  Screenshots

> Add 4 screenshots here after running the app: Feed page, Create Post, Profile page, Dashboard.

### Feed Page

<img width="1542" height="1616" alt="social-app-warda-rehman vercel app_" src="https://github.com/user-attachments/assets/01af3b8b-c43b-4fad-9fb6-3dbc1df7676e" />

### Create Post

<img width="1542" height="1308" alt="social-app-warda-rehman vercel app_dashboard_create post" src="https://github.com/user-attachments/assets/90d4363b-f30d-4f13-ae23-b57c5d3c8560" />

### Profile Page

<img width="1542" height="2416" alt="social-app-warda-rehman vercel app_profile_usr_1784248206678_0cszz9" src="https://github.com/user-attachments/assets/7db8343a-d821-449c-a3cb-d749e699b960" />

### Dashboard

<img width="1542" height="1176" alt="social-app-warda-rehman vercel app_dashboard_posts (1)" src="https://github.com/user-attachments/assets/6fb394cc-b836-447e-b24a-645686175cf1" />


##  Tech Stack

- **React (Vite)** — frontend framework and build tool
- **React Router v6** — multi-page navigation, dynamic routes, protected routes
- **Tailwind CSS** — all styling, responsive design, dark mode
- **React Hook Form** — login, signup, create/edit post, and profile settings forms
- **Context API** — global auth state (`AuthContext`)
- **localStorage** — all data persistence (users, posts, comments, likes)
- **clsx** — conditional className handling for component variants
- **React.lazy + Suspense** — code-splitting, each page loads on demand

##  Features

- Signup with validation (name, email, strong password, confirm password) and login with session persistence on refresh
- Public feed of all published posts, with guest users redirected to login when trying to like/comment
- Create posts with image upload + live preview, save as draft or publish, public/private visibility
- Full post management dashboard: edit, delete (custom confirmation modal), toggle public/private, publish drafts
- Post detail page with like/unlike and a full comment thread (add + delete your own comments)
- Public profile pages with cover image, avatar, bio, location, and that user's public posts
- Profile settings — update name, bio (150 char limit with live counter), location, and avatar, reflected instantly across the app
- Protected dashboard routes — redirect to `/login` if not authenticated
- **Bonus:** live search on the feed, dark mode toggle, character counter on post description, image preview before upload, delete-your-own-comment with inline "Are you sure?" confirmation

##  How to Run Locally

```bash
git clone https://github.com/<wardarehman2002>/social-app-<warda-rehman>.git
cd social-app-<warda-rehman>
npm install
npm run dev
```

App opens at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

##  Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── post/
│   │   ├── PostCard.jsx
│   │   ├── PostForm.jsx
│   │   ├── PostActions.jsx
│   │   └── CommentSection.jsx
│   ├── profile/
│   │   └── ProfileHeader.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Modal.jsx
│   │   ├── Avatar.jsx
│   │   └── Badge.jsx
│   └── RequireAuth.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── usePosts.js
│   └── useAuth.js
├── pages/
│   ├── FeedPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── PostDetailPage.jsx
│   ├── ProfilePage.jsx
│   ├── NotFoundPage.jsx
│   └── dashboard/
│       ├── DashboardLayout.jsx
│       ├── PostsDashboard.jsx
│       ├── CreatePost.jsx
│       ├── EditPost.jsx
│       └── ProfileSettings.jsx
├── utils/
│   ├── storage.js
│   └── helpers.js
├── App.jsx
└── main.jsx
```

##  LocalStorage Data Structure

**`users`**
```json
{
  "id": "usr_1703001234_abc",
  "name": "Asad Khan",
  "email": "asad@test.com",
  "password": "Password123",
  "bio": "React developer from Lahore",
  "location": "Lahore, Pakistan",
  "avatar": "data:image/jpeg;base64,...",
  "coverImage": null,
  "joinedAt": "2025-01-15T10:00:00Z"
}
```

**`posts`**
```json
{
  "id": "post_1703001234_xyz",
  "authorId": "usr_1703001234_abc",
  "description": "Hello everyone! This is my first post.",
  "image": "data:image/jpeg;base64,...",
  "isPublic": true,
  "isDraft": false,
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

**`comments`**
```json
{
  "id": "cmt_1703001234",
  "postId": "post_1703001234_xyz",
  "authorId": "usr_1703001234_abc",
  "text": "Great post!",
  "createdAt": "2025-01-15T10:05:00Z"
}
```

**`likes`**
```json
{
  "id": "like_1703001234",
  "postId": "post_1703001234_xyz",
  "userId": "usr_1703001234_abc",
  "createdAt": "2025-01-15T10:03:00Z"
}
```

##  What I Learned

Building SocialApp taught me how to design a real data model from scratch and keep it consistent across many components without a backend. I got much more comfortable with the Context API for sharing auth state globally instead of prop drilling, and with writing custom hooks (`useAuth`, `usePosts`, `useLocalStorage`) to keep components clean and logic reusable. Working with React Hook Form across four different forms (login, signup, create post, profile settings) helped me understand validation patterns like `watch()` for confirm-password matching and live character counters. I also learned how protected routes work in React Router v6 using a wrapper component, and how `React.lazy` + `Suspense` splits the app into per-page chunks. Handling images was a good exercise in `FileReader`/base64 since there's no backend to upload files to. Overall this project made me think much more carefully about data flow and state ownership in a mid-sized React app.

##  Known Limitations

- All data is stored in the browser's `localStorage`, so it does not sync across devices and is wiped if the browser storage is cleared.
- Passwords are stored in plain text in `localStorage` — with a real backend this would use hashed passwords and secure sessions/JWT instead.
- No real image hosting — images are stored as base64 strings, which is fine for a demo but would bloat storage at scale.
- No pagination — the feed loads all public posts at once; a real backend would paginate or infinite-scroll.
- With a real backend (Node/Express + MongoDB, matching the MERN stack), this app would add: multi-device sync, secure auth with hashed passwords and JWT/sessions, image uploads to cloud storage (e.g. Cloudinary/S3), real-time notifications, and pagination/infinite scroll for the feed.
