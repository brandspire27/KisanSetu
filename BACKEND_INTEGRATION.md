# KisanSetu Frontend - Backend Integration Setup

## Overview
Your frontend is now configured to use the new backend URL: `https://bungvus5.insforge.site`

## Configuration

### Centralized API Configuration (`src/config/api.js`)
All API calls now use a single, centralized configuration file. This makes it easy to switch backend URLs without modifying multiple files.

**Default Backend URL:** `https://bungvus5.insforge.site`

### Using Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
REACT_APP_API_URL=https://bungvus5.insforge.site
```

Then restart your React app:
```bash
npm start
```

If no environment variable is set, the app will use the default URL from the config file.

## Updated Files

The following files have been updated to use the centralized API configuration:

1. **src/config/api.js** (NEW) - Centralized API configuration
2. **src/pages/Login.js** - User authentication
3. **src/pages/Dashboard.js** - User dashboard & product management
4. **src/pages/Products.js** - Product listing & purchasing

## API Endpoints

Your frontend is connected to these backend endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `GET /products` - List all products
- `GET /products/my-products` - Get farmer's products
- `POST /products` - Add new product
- `DELETE /products/:id` - Delete product
- `POST /orders` - Create order
- `GET /orders/my-orders` - Get consumer orders
- `GET /orders/farmer-orders` - Get farmer's orders
- `PUT /orders/:id/status` - Update order status

## Next Steps

1. Restart your development server: `npm start`
2. Test login/registration functionality
3. Verify product fetching and orders
4. Check console for any API errors

## Troubleshooting

If you encounter CORS errors:
- Ensure your backend has CORS enabled for `https://bungvus5.insforge.site`
- Check browser console (F12) for detailed error messages

If API calls fail:
- Verify the backend URL is correct
- Check that the backend server is running
- Review network tab in browser developer tools
