
# FileEmbed - Share Files with Discord Embeds

A simple file sharing app that generates links which create embeds when shared on Discord.

## Features

- Drag and drop file uploads
- In-memory file storage (for demonstration purposes)
- URL generation for sharing
- File viewing interface
- Discord-friendly OpenGraph metadata for embeds
- Responsive design

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

## Deployment

This application can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Deploying to GitHub Pages

1. Create a GitHub repository for this project
2. Push your code to the repository
3. In your repository settings, go to the "Pages" section
4. Choose the branch you want to deploy (usually `main`)
5. Set the folder to `/` or `/dist` (if you build before deployment)
6. Click "Save"

### Deploying to Netlify or Vercel

Both Netlify and Vercel offer simple deployment from GitHub repositories:

1. Connect your GitHub account
2. Select the repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

## Important Notes

- This demo uses in-memory storage, which means:
  - Files are not persisted between server restarts
  - Files are stored in the browser memory, limiting the size and number of files
  - Not suitable for production use as-is

- For a production version, you should:
  - Use a proper backend service for file storage (AWS S3, Firebase, etc.)
  - Implement authentication
  - Add file size limits and security checks

## License

MIT
