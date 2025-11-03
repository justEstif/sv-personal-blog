<script lang="ts">
  import { signUp } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  let name = "";
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";
  let loading = false;

  async function handleSignUp() {
    loading = true;
    error = "";

    if (password !== confirmPassword) {
      error = "Passwords do not match";
      loading = false;
      return;
    }

    if (password.length < 8) {
      error = "Password must be at least 8 characters";
      loading = false;
      return;
    }

    try {
      const result = await signUp.email({
        email,
        password,
        name,
        // TODO: add username here
      });

      if (result.error) {
        error = result.error.message || "Failed to sign up";
      } else {
        goto("/");
      }
    } catch (err) {
      error = "An unexpected error occurred";
      console.error(err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Create Account</h2>

      {#if error}
        <div class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"
            />
          </svg>
          <span>{error}</span>
        </div>
      {/if}

      <div class="form-control">
        <label class="label" for="name">
          <span class="label-text">Full Name</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          class="input input-bordered"
          bind:value={name}
          disabled={loading}
        />
      </div>

      <div class="form-control">
        <label class="label" for="username">
          <span class="label-text">User Name</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your Username name"
          class="input input-bordered"
          bind:value={username}
          disabled={loading}
        />
      </div>

      <div class="form-control">
        <label class="label" for="email">
          <span class="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          class="input input-bordered"
          bind:value={email}
          disabled={loading}
        />
      </div>

      <div class="form-control">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          class="input input-bordered"
          bind:value={password}
          disabled={loading}
        />
      </div>

      <div class="form-control">
        <label class="label" for="confirmPassword">
          <span class="label-text">Confirm Password</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          class="input input-bordered"
          bind:value={confirmPassword}
          disabled={loading}
        />
      </div>

      <div class="form-control text-center mt-6">
        <button
          class="btn btn-primary"
          on:click={handleSignUp}
          disabled={loading}
        >
          {#if loading}
            <span class="loading loading-spinner loading-sm"></span>
          {/if}
          Sign Up
        </button>
      </div>

      <div class="divider">OR</div>

      <p class="text-center text-sm">
        Already have an account?
        <a href="/auth/sign-in" class="link link-primary">Sign in</a>
      </p>
    </div>
  </div>
</div>
