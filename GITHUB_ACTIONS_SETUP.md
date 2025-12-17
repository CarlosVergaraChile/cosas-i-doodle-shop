# GitHub Actions Setup - Automatic Deployment to Hostinger

## Overview

This project includes a GitHub Actions workflow that automatically deploys the application to Hostinger whenever you push to the main branch.

## Prerequisites

Before setting up GitHub Actions, you need:

1. A Hostinger account with SSH access enabled
2. SSH credentials from your Hostinger control panel
3. Access to the repository settings

## Step 1: Generate/Obtain SSH Credentials from Hostinger

### For Hostinger SSH Access:

1. Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com/)
2. Navigate to **Websites** and select your domain
3. Click on **SSH/SFTP** or **Advanced** settings
4. Look for your SSH hostname, username, and port
5. You may need to generate an SSH key pair or use your existing one

### SSH Credentials You'll Need:

- **HOSTINGER_SSH_HOST**: Your SSH hostname (e.g., `ssh.hostinger.com` or `your-domain.hostinger.com`)
- **HOSTINGER_SSH_USER**: Your SSH username (typically your Hostinger username)
- **HOSTINGER_SSH_KEY**: Your private SSH key (in PEM format)

## Step 2: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add each of these:

### Secret 1: HOSTINGER_SSH_HOST

- **Name**: `HOSTINGER_SSH_HOST`
- **Value**: Your SSH hostname (e.g., `ssh.hostinger.com`)

### Secret 2: HOSTINGER_SSH_USER

- **Name**: `HOSTINGER_SSH_USER`
- **Value**: Your SSH username

### Secret 3: HOSTINGER_SSH_KEY

- **Name**: `HOSTINGER_SSH_KEY`
- **Value**: Your private SSH key

**Important**: Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.

## Step 3: Verify SSH Key Format

Your SSH key should be in PEM format. If you have an OpenSSH format key, convert it:

```bash
ssh-keygen -p -N "" -m pem -f your_key
```

## Step 4: Test the Deployment

1. Make a small change to the repository
2. Push to the `main` branch
3. Go to the **Actions** tab in your GitHub repository
4. Check the workflow run to see if deployment succeeded

## Troubleshooting

### Deployment Fails with "Process completed with exit code 1"

- Verify all three secrets are correctly set
- Make sure the SSH key has the correct permissions (600)
- Check that your Hostinger SSH credentials are correct
- Ensure SSH access is enabled on your Hostinger account

### SSH Connection Timeout

- Verify the SSH host is correct
- Check that Hostinger's firewall isn't blocking SSH connections
- Verify port (usually 22 or 2222 for Hostinger)

## Workflow Details

The workflow file (`.github/workflows/deploy-hostinger.yml`) performs the following steps:

1. Checks out the latest code
2. Sets up SSH credentials
3. Connects to your Hostinger server via SSH
4. Updates the repository on the server
5. Cleans up sensitive SSH data
6. Sends success/failure notifications

## Manual Deployment

If you need to deploy manually without waiting for an auto-push, you can:

1. Go to **Actions** tab
2. Select the "Deploy to Hostinger" workflow
3. Click **Run workflow** → **Run workflow**

## Security Notes

- SSH keys are encrypted and never displayed in logs
- Secrets are only accessible to repository collaborators
- The workflow automatically cleans up SSH keys after deployment
- Never commit SSH keys or secrets to the repository

## Questions?

For more help with Hostinger SSH setup, visit their [documentation](https://support.hostinger.com/).
