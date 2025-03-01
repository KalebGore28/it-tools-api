export const indexHtml = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>IT-Tools API</title>

		<!-- Standard Favicon -->
		<link rel="icon" type="image/x-icon" href="https://it-tools-api-bucket.noesc.io/favicon.ico">
		
		<!-- PNG Favicons -->
		<link rel="icon" type="image/png" sizes="16x16" href="https://it-tools-api-bucket.noesc.io/favicon-16x16.png">
		<link rel="icon" type="image/png" sizes="32x32" href="https://it-tools-api-bucket.noesc.io/favicon-32x32.png">

		<!-- Apple Touch Icon (for iOS) -->
		<link rel="apple-touch-icon" sizes="180x180" href="https://it-tools-api-bucket.noesc.io/apple-touch-icon.png">

		<!-- Android Chrome Icons -->
		<link rel="icon" type="image/png" sizes="192x192" href="https://it-tools-api-bucket.noesc.io/android-chrome-192x192.png">
		<link rel="icon" type="image/png" sizes="512x512" href="https://it-tools-api-bucket.noesc.io/android-chrome-512x512.png">

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
			<p><a href="https://github.com/KalebGore28/it-tools-api">Check out the code on Github</a></p>
		</div>
	</body>
	</html>`;

export const notFoundHtml = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>404 - Page Not Found</title>

		<!-- Standard Favicon -->
		<link rel="icon" type="image/x-icon" href="https://it-tools-api-bucket.noesc.io/favicon.ico">
		
		<!-- PNG Favicons -->
		<link rel="icon" type="image/png" sizes="16x16" href="https://it-tools-api-bucket.noesc.io/favicon-16x16.png">
		<link rel="icon" type="image/png" sizes="32x32" href="https://it-tools-api-bucket.noesc.io/favicon-32x32.png">

		<!-- Apple Touch Icon (for iOS) -->
		<link rel="apple-touch-icon" sizes="180x180" href="https://it-tools-api-bucket.noesc.io/apple-touch-icon.png">

		<!-- Android Chrome Icons -->
		<link rel="icon" type="image/png" sizes="192x192" href="https://it-tools-api-bucket.noesc.io/android-chrome-192x192.png">
		<link rel="icon" type="image/png" sizes="512x512" href="https://it-tools-api-bucket.noesc.io/android-chrome-512x512.png">

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

		<!-- Standard Favicon -->
		<link rel="icon" type="image/x-icon" href="https://it-tools-api-bucket.noesc.io/favicon.ico">
		
		<!-- PNG Favicons -->
		<link rel="icon" type="image/png" sizes="16x16" href="https://it-tools-api-bucket.noesc.io/favicon-16x16.png">
		<link rel="icon" type="image/png" sizes="32x32" href="https://it-tools-api-bucket.noesc.io/favicon-32x32.png">

		<!-- Apple Touch Icon (for iOS) -->
		<link rel="apple-touch-icon" sizes="180x180" href="https://it-tools-api-bucket.noesc.io/apple-touch-icon.png">

		<!-- Android Chrome Icons -->
		<link rel="icon" type="image/png" sizes="192x192" href="https://it-tools-api-bucket.noesc.io/android-chrome-192x192.png">
		<link rel="icon" type="image/png" sizes="512x512" href="https://it-tools-api-bucket.noesc.io/android-chrome-512x512.png">

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