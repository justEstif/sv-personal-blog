## Public-Facing Pages

| Route                                        | Page                | Purpose              | Key Features                                                                       |
| -------------------------------------------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `/`                                          | **Platform Home**   | Content discovery    | Featured/trending posts, popular categories/tags, active authors, search & filters |
| `/blogs`                                     | **Blog Directory**  | Browse all blogs     | Blog cards, filter by category, sort by newest/active/followers                    |
| `/blogs/[authorId]`                          | **Individual Blog** | Author's content hub | Post feed, blog description, author bio, subscribe button                          |
| `/blogs/[authorId]/[postId]`                 | **Blog Post**       | Read content         | Full post, author bio, related posts, threaded comments with moderation            |
| `/author/[username]`                         | **Author Profile**  | Author information   | Bio, avatar, posts, statistics, blog management links                              |
| `/search`, `/tag/[slug]`, `/category/[slug]` | **Search & Tags**   | Content filtering    | Full-text search, category browsing, tag/category pages                            |

---

## Authentication & Account

| Route                          | Page                         | Purpose                    | Key Features                                                                     |
| ------------------------------ | ---------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `/auth/sign-in`                | **Login Page**               | User authentication        | Email/password form, "Remember me" option, error handling, redirect to dashboard |
| `/auth/sign-up`                | **Sign Up Page**             | New user registration      | Email/password/username fields, role selection (reader/author), terms acceptance |
| `/auth/sign-out`               | **Logout Handler**           | End user session           | Clear session, redirect to home                                                  |
| `/auth/forgot-password`        | **Password Reset Request**   | Initiate password recovery | Email input, send reset link, confirmation message                               |
| `/auth/reset-password/[token]` | **Password Reset Form**      | Reset forgotten password   | New password form, token validation, password strength indicator                 |
| `/account`                     | **Account Settings**         | Manage user profile        | Email, password change, display name, avatar upload, account deletion            |
| `/account/security`            | **Security Settings**        | Enhanced security          | Two-factor authentication setup, active sessions, login history                  |
| `/account/notifications`       | **Notification Preferences** | Control email settings     | Email preferences for comments, followers, platform updates                      |

---

## Author Dashboard

| Route                                                | Section                   | Purpose           | Key Features                                                                                             |
| ---------------------------------------------------- | ------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `/dashboard`                                         | **Dashboard Home**        | Quick overview    | Post/view/comment stats, activity feed, quick actions                                                    |
| `/dashboard/posts`                                   | **Post Management**       | Manage all posts  | Table with status, dates, views, comments; filters, bulk actions                                         |
| `/dashboard/posts/new`, `/dashboard/posts/[id]/edit` | **Create/Edit Post**      | Write content     | Rich text editor, metadata (title, excerpt, featured image), tags, SEO options, publication status |
| `/dashboard/comments`                                | **Comments & Moderation** | Manage discussion | Pending/approved/rejected comments, approve/reject/reply/spam flags                                      |
| `/dashboard/settings`                                | **Blog Settings**         | Configure blog    | Name, description, categories, tags, visibility, comment moderation policy                               |
| `/dashboard/analytics`                               | **Analytics**             | View performance  | Post views/comments, followers, growth, popular content                                                  |

---

## Admin Dashboard

| Route               | Section                 | Purpose            | Key Features                                                                    |
| ------------------- | ----------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `/admin`            | **Admin Home**          | Platform overview  | User/blog/post stats, health indicators, moderation alerts                      |
| `/admin/users`      | **User Management**     | Control accounts   | User table (role, status, actions), edit/suspend/delete users, activity history |
| `/admin/moderation` | **Content Moderation**  | Review content     | Flag review, post approval, comment review/deletion, spam management            |
| `/admin/blogs`      | **Blog Management**     | Control blogs      | List all blogs, view stats, feature/unfeature, delete/suspend                   |
| `/admin/settings`   | **Platform Settings**   | Configure platform | Categories/tags management, branding, moderation rules, content policies        |
| `/admin/analytics`  | **Analytics Dashboard** | Platform metrics   | User growth, content trends, engagement, popular authors/posts                  |
