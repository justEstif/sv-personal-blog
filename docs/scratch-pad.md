Blog Core Components:


Now to setup the database for the blog data

authors -> have blogs -> have posts

posts -> have assests like images stored on miniio
- all the text content is stored on the database
- svx

---

1. Data Structure

- Define what a "post" is: title, slug, content, date, tags/categories, author, excerpt
- Decide on format: markdown files, JSON, or database records
- For a personal blog, markdown files in version control often work great

2. Post Display Pages

- Homepage: List all posts (with pagination or infinite scroll)
- Post detail page: Individual post view with full content
- Archive/filtering: Filter by date, tags, or categories
- Search (optional but nice): Search posts by title/content

3. Essential Features

- Markdown rendering: Convert markdown to HTML (use a library like marked or mdsvex)
- Metadata parsing: Extract title, date, tags from markdown front matter
- URL slugs: Pretty URLs like /posts/my-first-post instead of IDs
- Sorting/ordering: Show newest posts first
- Reading time: Estimate how long a post takes to read

4. UI/Layout

- Post card component (title, excerpt, date, tags, read more link)
- Post layout component (header with title/date, content, sidebar for nav)
- Navigation: Home, Archive, About pages
- Responsive design: Mobile-friendly (Tailwind + DaisyUI helps here)

5. Basic SEO

- Meta tags (title, description, Open Graph)
- Proper heading hierarchy
- URL structure
