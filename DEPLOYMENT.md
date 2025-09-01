# Deployment Guide - ShopClassy

## Netlify Deployment

### Configuration Files Created:

1. **`netlify.toml`** - Main Netlify configuration
2. **`_redirects`** - SPA routing configuration
3. **`public/_redirects`** - Copy for build output

### Build Configuration:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist/shop-classy/browser`
- **Node Version**: 18

### Key Changes Made:

1. **Angular.json**: Added `baseHref: "/"` for production builds
2. **Package.json**: Updated build script to use production configuration
3. **Netlify.toml**: Configured correct publish directory and redirects
4. **_redirects**: Added SPA fallback routing

### Deployment Steps:

1. Push changes to your repository
2. Connect repository to Netlify
3. Netlify will automatically detect the `netlify.toml` configuration
4. Build will use the correct publish directory: `dist/shop-classy/browser`

### Local Testing:

```bash
# Build the project
npm run build

# Check the output structure
ls -la dist/shop-classy/browser/

# The output should contain:
# - index.html
# - _redirects
# - CSS and JS files
# - Assets (images, etc.)
```

### Troubleshooting:

- If build fails, ensure Node.js version 18 is used
- Verify that `dist/shop-classy/browser` directory exists after build
- Check that `_redirects` file is copied to the build output
- Ensure all assets are properly referenced with relative paths

### Environment Variables (if needed):

Add these in Netlify dashboard under Site Settings > Environment Variables:
- `NODE_VERSION=18`
- Any API keys or environment-specific variables
