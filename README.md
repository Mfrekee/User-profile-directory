# My Project with Tailwind CSS

This project demonstrates how to use Tailwind CSS in different scenarios.

## Quick Start (CDN Method)

The `index.html` file already includes Tailwind CSS via CDN. Simply open the file in your browser to see it in action.

## Alternative Setup Methods

### 1. Using Node.js and npm (Recommended for production)

If you want to set up Tailwind CSS with a build process for better performance:

1. **Initialize npm project:**
   ```bash
   npm init -y
   ```

2. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss
   ```

3. **Initialize Tailwind CSS:**
   ```bash
   npx tailwindcss init
   ```

4. **Configure your template paths** in `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./*.{html,js}"],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

5. **Create a CSS file** (`input.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **Build your CSS:**
   ```bash
   npx tailwindcss -i ./input.css -o ./output.css --watch
   ```

7. **Link the compiled CSS** in your HTML:
   ```html
   <link href="./output.css" rel="stylesheet">
   ```

### 2. Using a Framework

#### With React (Create React App):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### With Next.js:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### With Vue.js:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Tailwind CSS Features Demonstrated

- **Responsive Design**: Grid layout that adapts to different screen sizes
- **Hover Effects**: Interactive buttons and cards
- **Transitions**: Smooth color and shadow transitions
- **Typography**: Various text sizes and weights
- **Spacing**: Consistent padding and margins
- **Colors**: Tailwind's color palette
- **Shadows**: Card shadows and hover effects

## Useful Tailwind CSS Classes

### Layout
- `container` - Responsive container
- `grid` - CSS Grid layout
- `flex` - Flexbox layout
- `hidden` / `block` - Display utilities

### Spacing
- `p-{size}` - Padding
- `m-{size}` - Margin
- `px-{size}` - Horizontal padding
- `py-{size}` - Vertical padding

### Colors
- `bg-{color}-{shade}` - Background colors
- `text-{color}-{shade}` - Text colors
- `border-{color}-{shade}` - Border colors

### Typography
- `text-{size}` - Font sizes
- `font-{weight}` - Font weights
- `text-center` - Text alignment

### Responsive Design
- `md:` - Medium screens and up
- `lg:` - Large screens and up
- `xl:` - Extra large screens and up

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Components](https://tailwindui.com/)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

## Getting Started

1. Open `index.html` in your browser
2. Explore the code to see Tailwind CSS classes in action
3. Modify the classes to customize the design
4. Use the documentation to learn more utility classes 