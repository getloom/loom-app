<script lang="ts">
	import { Button, TextField } from 'svelte-ux';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let confirmPassword = '';
	let error = '';
	let loading = false;

	const handleInput = (e: any, field: 'username' | 'password' | 'confirmPassword') => {
		console.log(e);
		console.log(field);
		const target = e.detail;
		if (field === 'username') {
			username = target.value;
		} else if (field === 'password') {
			password = target.value;
		} else if (field === 'confirmPassword') {
			confirmPassword = target.value;
		}
	};

	const handleSubmit = async () => {
		console.log("submitting")
		// Basic validation
		if (!username.trim() || !password || !confirmPassword) {
			error = 'Please fill in all fields';
			return;
		}

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/accounts/signup', {
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
				// Redirect to login or dashboard on success
				goto('/');
			} else {
				error = result.error || 'Signup failed';
			}
		} catch (err) {
			error = 'Network error. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<div class="max-w-md mx-auto p-6">
	<h1 class="text-2xl font-bold mb-6">Create Account</h1>

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
				debounceChange
				type="text"
				required
			/>
		</div>

		<div class="mb-4">
			<TextField
				label="Password"
				value={password}
				on:change={(e) => handleInput(e, 'password')}
				debounceChange
				type="password"
				required
			/>
		</div>

		<div class="mb-6">
			<TextField
				label="Confirm Password"
				value={confirmPassword}
				on:change={(e) => handleInput(e, 'confirmPassword')}
				debounceChange
				type="password"
				required
			/>
		</div>

		<Button type="submit" disabled={loading}>
			{loading ? 'Creating Account...' : 'Sign Up'}
		</Button>
	</form>
</div>