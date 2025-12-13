# MailChimp Integration Setup

This guide walks through setting up MailChimp with Lambda for email subscriptions.

## Step 1: Set up MailChimp

1. Create a free account at [mailchimp.com](https://mailchimp.com)
2. Create an **Audience** (list) for signups
3. Get your credentials:
   - **Audience ID**: Audience → Manage Audience → Settings → Audience ID
   - **API Key**: Account → Extras → API keys → Create Key
   - **Server Prefix**: The first part of your API key after the dash (e.g., `us1`, `us2`)
   - Example API key: `a1b2c3d4e5f6g7h8-us1` → server is `us1`

## Step 2: Create Lambda Function

1. Go to **AWS Lambda** Console
2. Click **Create function**
3. **Function name**: `snack-wine-subscribe`
4. **Runtime**: Node.js 18.x
5. Click **Create function**
6. Copy the code from `lambda/subscribe.js` into the function editor
7. Click **Deploy**

## Step 3: Add Environment Variables

In the Lambda function:
1. Go to **Configuration** → **Environment variables**
2. Add three variables:
   - `MAILCHIMP_API_KEY`: Your MailChimp API key
   - `MAILCHIMP_AUDIENCE_ID`: Your Audience ID
   - `MAILCHIMP_SERVER`: Your server prefix (e.g., `us1`)
3. Click **Save**

## Step 4: Create API Gateway

1. Go to **API Gateway** Console
2. Click **Create API** → **REST API**
3. **API name**: `snack-wine-api`
4. Click **Create API**
5. Click **Create resource**
   - **Resource name**: `subscribe`
   - Click **Create**
6. Select the `/subscribe` resource
7. Click **Create method** → **POST**
8. **Lambda Function**: Select `snack-wine-subscribe`
9. Click **Save**
10. Click **Deploy API**
    - **Stage name**: `prod`
    - Click **Deploy**
11. Copy your **Invoke URL** (e.g., `https://abcd1234.execute-api.us-east-1.amazonaws.com/prod`)

## Step 5: Update Frontend

In `src/App.tsx`, replace the API endpoint:

```typescript
const response = await fetch('https://YOUR_API_GATEWAY_URL/subscribe', {
```

Replace `YOUR_API_GATEWAY_URL` with your actual API Gateway invoke URL from Step 4.

## Step 6: Deploy

```bash
npm run build
git add .
git commit -m "Add MailChimp integration"
git push
```

The workflow will automatically deploy to S3!

## Testing

1. Go to `snack.wine`
2. Enter an email and click "Notify Me"
3. Check MailChimp audience for the new subscriber

