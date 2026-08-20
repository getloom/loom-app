<script lang="ts">
	import { Button, TextField } from 'svelte-ux';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	const handleInput = (e: any, field: 'username' | 'password') => {		
		const target = e.detail;
		if (field === 'username') {
			username = target.value;
		} else if (field === 'password') {
			password = target.value;
		}
	};

	const handleSubmit = async () => {				
		// Basic validation
		if (!username.trim() || !password) {
			error = 'Please fill in all fields';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/accounts/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password
				})
			});

			const result = await response.json();

			if (response.ok) {
				// Redirect to home or dashboard on successful login
				goto('/');
			} else {
				error = result.error || 'Login failed';
			}
		} catch (err) {
			error = 'Network error. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<div class="max-w-md mx-auto p-6">
	<h1 class="text-2xl font-bold mb-6">Sign In</h1>

	{#if error}
		<div class="mb-4 p-3 bg-red-100 text-red-700 rounded">
			{error}
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<TextField
				label="Username"
				value={username}
				on:change={(e) => handleInput(e, 'username')}				
				type="text"
				required
			/>
		</div>

		<div class="mb-6">
			<TextField
				label="Password"
				value={password}
				on:change={(e) => handleInput(e, 'password')}				
				type="password"
				required
			/>
		</div>

		<Button type="submit" disabled={loading}>
			{loading ? 'Signing In...' : 'Sign In'}
		</Button>

		<Button on:click={() => goto("/signup")}>
			{loading ? 'Creating Account...' : 'Sign Up'}
		</Button>

		<Button on:click={() => goto('/auth/keycloak/login')}>Sign in with Keycloak</Button>
	</form>
</div>