
# FileEmbed - Share Files with Discord Embeds

A simple file sharing app that generates links which create embeds when shared on Discord.

## Features

- Drag and drop file uploads
- In-memory file storage (for demonstration purposes)
- URL generation for sharing
- File viewing interface
- Discord-friendly OpenGraph metadata for embeds
- Responsive design
- Custom author name and icon for Discord embeds

## Running Locally

```sh
# Clone the repository
git clone https://github.com/yourusername/file-embed.git
cd file-embed

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment to GitHub Pages

### Automated Deployment (Recommended)

1. Create a GitHub repository for this project if you haven't already
2. Push your code to the repository
3. In your repository settings, navigate to Pages
4. Under "Build and deployment":
   - Source: GitHub Actions
   - Choose the "Static HTML" workflow template
   - Commit the workflow file to your repository

GitHub Actions will build and deploy your site automatically.

### Manual Deployment

1. Update the `base` in vite.config.ts to match your repository name: `base: '/your-repo-name/'`
2. Build your project:
   ```sh
   npm run build
   ```
3. Deploy the `dist` directory to GitHub Pages:
   ```sh
   npx gh-pages -d dist
   ```

### Troubleshooting

If you encounter a white screen when deploying to GitHub Pages:

1. Ensure the `base` path in vite.config.ts is set correctly
2. Check that the app is using HashRouter (as implemented in App.tsx)
3. Verify all assets use relative paths
4. Check the browser console for any errors
5. Ensure the build process completed successfully

## Important Notes

- This demo uses in-memory storage, which means:
  - Files are not persisted between browser sessions
  - Files are stored in the browser memory, limiting the size and number of files
  - Not suitable for production use as-is

- For a production version, you should:
  - Use a proper backend service for file storage (AWS S3, Firebase, etc.)
  - Implement authentication
  - Add file size limits and security checks

## License

MIT
