# Development Guide

## Project Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── events/          # Event management components
│   ├── venues/          # Venue-related components
│   ├── vendors/         # Vendor components
│   └── *.tsx           # Landing page components
├── pages/              # Route components
└── hooks/              # Custom React hooks
```

## Testing Changes
1. **Always verify correct directory**: Check you're in `partyoria_landingpage/partyoria-landing-page/partyoria-event-hub-main/`
2. **Test immediately**: After each change, refresh browser to verify
3. **Use obvious markers**: Add temporary visual changes like emojis to test
4. **Clear cache**: Use Ctrl+Shift+R or incognito mode if changes don't appear

## Development Workflow
1. Make changes in correct directory
2. Save files
3. Refresh browser immediately
4. Verify changes are visible
5. Continue with next change

## Common Issues
- **Changes not visible**: Check if working in correct project folder
- **Cache issues**: Hard refresh or use incognito mode
- **Multiple projects**: Ensure dev server is running from correct directory