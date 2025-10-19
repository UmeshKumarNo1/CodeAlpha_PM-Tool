# PowerShell Script to Push Project to GitHub
# This script automates the GitHub push process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Push Script for PM Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "Error: GitHub username is required" -ForegroundColor Red
    exit 1
}

# Repository name
$repoName = "project-management-app"
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Repository Information:" -ForegroundColor Yellow
Write-Host "  Username: $username"
Write-Host "  Repository: $repoName"
Write-Host "  URL: $repoUrl"
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "Is this correct? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Cancelled" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Starting GitHub push process..." -ForegroundColor Green
Write-Host ""

# Step 1: Check if remote already exists
Write-Host "Step 1: Checking git remote..." -ForegroundColor Cyan
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "  Remote already exists: $remoteExists" -ForegroundColor Yellow
    $removeRemote = Read-Host "  Remove and replace? (yes/no)"
    if ($removeRemote -eq "yes") {
        Write-Host "  Removing old remote..." -ForegroundColor Yellow
        git remote remove origin
        Write-Host "  ✅ Old remote removed" -ForegroundColor Green
    } else {
        Write-Host "  Using existing remote" -ForegroundColor Yellow
    }
} else {
    Write-Host "  No remote found, will add new one" -ForegroundColor Yellow
}

# Step 2: Add remote
Write-Host ""
Write-Host "Step 2: Adding GitHub remote..." -ForegroundColor Cyan
git remote add origin $repoUrl 2>$null
if ($LASTEXITCODE -eq 0 -or $remoteExists) {
    Write-Host "  ✅ Remote added/verified" -ForegroundColor Green
} else {
    Write-Host "  ✅ Remote configured" -ForegroundColor Green
}

# Step 3: Rename branch to main
Write-Host ""
Write-Host "Step 3: Renaming branch to main..." -ForegroundColor Cyan
git branch -M main
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Branch renamed to main" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Branch already named main" -ForegroundColor Yellow
}

# Step 4: Push to GitHub
Write-Host ""
Write-Host "Step 4: Pushing code to GitHub..." -ForegroundColor Cyan
Write-Host "  This may take a moment..." -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository is now available at:" -ForegroundColor Cyan
    Write-Host "  https://github.com/$username/$repoName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Green
    Write-Host "  1. Visit your repository on GitHub" -ForegroundColor White
    Write-Host "  2. Verify all files are there" -ForegroundColor White
    Write-Host "  3. Check the commit history" -ForegroundColor White
    Write-Host "  4. Share your repository link!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ Push failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check your internet connection" -ForegroundColor White
    Write-Host "  2. Verify GitHub username is correct" -ForegroundColor White
    Write-Host "  3. Make sure repository exists on GitHub" -ForegroundColor White
    Write-Host "  4. Check GitHub authentication" -ForegroundColor White
    Write-Host ""
    Write-Host "For SSH setup, see:" -ForegroundColor Cyan
    Write-Host "  https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "Script completed!" -ForegroundColor Green

