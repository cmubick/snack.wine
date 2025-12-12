# Snack Wine - Coming Soon Landing Page

A modern React landing page for Snack Wine with automatic deployment to AWS S3 via GitHub Actions.

## Features

- ⚡ Built with Vite + React + TypeScript
- 🎨 Beautiful gradient design with animations
- 📱 Fully responsive mobile design
- 🚀 One-click deployment to S3 on every push to main
- ⚙️ CloudFront invalidation support for cached content

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview the production build:
```bash
npm run preview
```

## Deployment to AWS S3

### AWS Setup

1. **Create an S3 bucket** for hosting:
   - Enable static website hosting
   - Set index document to `index.html`
   - Set error document to `index.html` (for SPA routing)

2. **Create IAM User** for GitHub Actions:
   - Create a new IAM user (e.g., `github-deployer`)
   - Attach policy with S3 permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::YOUR_BUCKET_NAME",
           "arn:aws:s3:::YOUR_BUCKET_NAME/*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation"
         ],
         "Resource": "*"
       }
     ]
   }
   ```
   - Generate Access Key ID and Secret Access Key

3. **(Optional) Create CloudFront Distribution**:
   - Set origin to your S3 bucket
   - Cache behavior to redirect HTTP to HTTPS
   - Note the distribution ID

### GitHub Setup

1. Add secrets to your GitHub repository:
   - `AWS_S3_BUCKET`: Your S3 bucket name
   - `AWS_ACCESS_KEY_ID`: IAM user access key
   - `AWS_SECRET_ACCESS_KEY`: IAM user secret key
   - `CLOUDFRONT_DISTRIBUTION_ID`: (Optional) CloudFront distribution ID for cache invalidation

2. The workflow will automatically run on every push to `main` and deploy your site

### Deployment Process

Every push to the `main` branch will:
1. Install dependencies
2. Build the React app
3. Sync built files to S3 (deleting old files)
4. Invalidate CloudFront cache (if configured)

## Environment Variables

- `AWS_S3_BUCKET`: S3 bucket name for deployment
- `CLOUDFRONT_DISTRIBUTION_ID`: (Optional) CloudFront distribution ID for cache invalidation

## Project Structure

```
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Main component
│   ├── App.css            # Styles
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── .github/workflows/
    └── deploy.yml         # GitHub Actions workflow
```

## Customization

Edit `src/App.tsx` and `src/App.css` to customize the landing page content and styling.
