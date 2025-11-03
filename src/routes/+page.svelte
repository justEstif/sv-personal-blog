<div class="min-h-screen flex flex-col">
  <header class="navbar bg-base-100 shadow-sm container mx-auto">
    <div class="flex-1">
      <h3 class="btn btn-ghost text-xl">Blog Platform</h3>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal gap-4 px-1">
        <li><a href="/blogs">Blogs</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/auth/sign-in">Sign In</a></li>
      </ul>
    </div>
  </header>
  <main class="flex-1 hero bg-base-300">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Welcome to Our Blog Platform</h1>
        <p class="py-6">
          Discover amazing stories and insights from writers around the world.
          Read, share, and connect with a community of passionate content
          creators. Whether you're here to explore or to share your own voice,
          you're in the right place.
        </p>
        <a href="/auth/sign-up" class="btn btn-primary">Get Started</a>
      </div>
    </div>
  </main>
  <footer
    class="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-4"
  >
    <nav class="grid grid-flow-col gap-2">
      <a href="/" class="link link-hover">About us</a>
      <a href="/" class="link link-hover">Contact</a>
      <a href="/admin" class="link link-hover">Admin</a>
    </nav>
    <aside>
      <p>
        Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries
        Ltd
      </p>
    </aside>
  </footer>
</div>
