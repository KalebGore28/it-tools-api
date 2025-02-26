export const indexHtml = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>IT-Tools API</title>
		<style>
			body {
				font-family: sans-serif;
				margin: 2rem;
				background: #f9f9f9;
				color: #333;
			}
			.container {
				background: #fff;
				padding: 2rem;
				border-radius: 5px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			}
			h1 {
				color: #333;
			}
			a {
				color: #0066cc;
				text-decoration: none;
			}
			a:hover {
				text-decoration: underline;
			}
			/* Dark mode styles */
			@media (prefers-color-scheme: dark) {
				body {
					background: rgb(18, 23, 39);
					color: #ddd;
				}
				.container {
					background: rgb(28, 33, 55);
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
				}
				h1 {
					color: #fff;
				}
				a {
					color: #88c0d0;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>Welcome to IT-Tools API!</h1>
			<p>Powered by Elysia. Check out the documentation at <a href="/docs">/docs</a>.</p>
		</div>
	</body>
	</html>`;

export const notFoundHtml = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>404 - Page Not Found</title>
		<style>
			body {
				font-family: sans-serif;
				margin: 2rem;
				background: #f9f9f9;
				color: #333;
				text-align: center;
			}
			.container {
				background: #fff;
				padding: 2rem;
				border-radius: 5px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				display: inline-block;
				margin-top: 10vh;
			}
			h1 {
				color: #d9534f;
				font-size: 2rem;
			}
			p {
				margin: 1rem 0;
			}
			a {
				color: #0066cc;
				text-decoration: none;
				font-weight: bold;
			}
			a:hover {
				text-decoration: underline;
			}
			/* Dark mode styles */
			@media (prefers-color-scheme: dark) {
				body {
					background: rgb(18, 23, 39);
					color: #ddd;
				}
				.container {
					background: rgb(28, 33, 55);
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
				}
				h1 {
					color: #ff6b6b;
				}
				a {
					color: #88c0d0;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>404 - Page Not Found</h1>
			<p>Oops! The page you're looking for doesn't exist.</p>
			<p><a href="/">Return to Home</a></p>
		</div>
	</body>
	</html>`;

export const serverErrorHtml = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>500 - Server Error</title>
		<style>
			body {
				font-family: sans-serif;
				margin: 2rem;
				background: #f9f9f9;
				color: #333;
				text-align: center;
			}
			.container {
				background: #fff;
				padding: 2rem;
				border-radius: 5px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				display: inline-block;
				margin-top: 10vh;
			}
			h1 {
				color: #d9534f;
				font-size: 2rem;
			}
			p {
				margin: 1rem 0;
			}
			a {
				color: #0066cc;
				text-decoration: none;
				font-weight: bold;
			}
			a:hover {
				text-decoration: underline;
			}
			/* Dark Mode Styles */
			@media (prefers-color-scheme: dark) {
					body {
					background: rgb(18, 23, 39);
					color: #ddd;
				}
				.container {
					background: rgb(28, 33, 55);
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
				}
				h1 {
					color: #ff6b6b;
				}
				a {
					color: #88c0d0;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>500 - Internal Server Error</h1>
			<p>Something went wrong on our end. Please try again later.</p>
			<p><a href="/">Go to Home</a></p>
		</div>
	</body>
	</html>`;