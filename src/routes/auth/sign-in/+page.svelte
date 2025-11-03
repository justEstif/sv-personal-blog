<script lang="ts">
	import { signIn } from "$lib/auth-client";
	import { goto } from "$app/navigation";

	let email = "";
	let password = "";
	let error = "";
	let loading = false;

	async function handleSignIn() {
		loading = true;
		error = "";

		try {
			const result = await signIn.email({
				email,
				password,
			});

			if (result.error) {
				error = result.error.message || "Failed to sign in";
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
			<h2 class="card-title">Sign In</h2>

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

			<div class="form-control mt-6 text-center">
				<button
					class="btn btn-primary"
					on:click={handleSignIn}
					disabled={loading}
				>
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
					{/if}
					Sign In
				</button>
			</div>

			<div class="divider">OR</div>

			<p class="text-center text-sm">
				Don't have an account?
				<a href="/auth/sign-up" class="link link-primary">Sign up</a>
			</p>
		</div>
	</div>
</div>
