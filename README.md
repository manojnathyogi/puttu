# New Year Card Website 💕

A beautiful, animated New Year card website with a reveal button that shows a special letter.

## Features

- ✨ Beautiful gradient background with animations
- 💌 Click button to reveal a special letter
- 🎉 Confetti animation when letter is revealed
- 💕 Floating hearts animation
- 📱 Fully responsive design
- 🌐 Ready for GitHub Pages hosting

## How to Customize Your Letter

1. Open `index.html` in a text editor
2. Find the section with `id="letterContent"` (around line 200)
3. Replace the placeholder text with your own letter
4. Save the file

## How to Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it something like `new-year-card` or `happy-new-year-2025`
5. Make it **Public** (required for free GitHub Pages)
6. Click "Create repository"

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop the `index.html` file
3. Click "Commit changes"

**Option B: Using Git Command Line**
```bash
cd new-year-card
git init
git add index.html README.md
git commit -m "Initial commit: New Year card website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Wait a few minutes for GitHub to deploy your site
8. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Customization Tips

- **Change colors**: Modify the gradient colors in the CSS (search for `#667eea` and `#764ba2`)
- **Change fonts**: Update the `font-family` in the CSS
- **Add images**: You can add images by including `<img>` tags in your letter content
- **Change animations**: Adjust animation durations and effects in the CSS `@keyframes` sections

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

This is a personal project. Feel free to use and modify as you like!

---

Made with ❤️ for someone special

