# Running the Mercur Application

## Prerequisites

Before running the Mercur application, ensure you have the following installed:

1. **Node.js v20 or higher**
2. **PostgreSQL** (version 12 or higher recommended)
3. **Redis**
4. **Yarn** (package manager)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install dependencies using yarn
yarn install
```

### 2. Environment Configuration

Create a `.env` file in the `apps/backend` directory based on the `.env.template`:

```bash
# Copy the template to .env
cp apps/backend/.env.template apps/backend/.env
```

Edit the `.env` file with your configuration:

```env
# Database configuration
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database_name]

# Redis configuration
REDIS_URL=redis://localhost:6379

# CORS configuration
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
VENDOR_CORS=http://localhost:5173

# Authentication
JWT_SECRET=your_jwt_secret_key
COOKIE_SECRET=your_cookie_secret_key

# Stripe configuration (if using)
STRIPE_SECRET_API_KEY=sk_test_...
STRIPE_CONNECTED_ACCOUNTS_WEBHOOK_SECRET=your_webhook_secret

# Email configuration
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev

# Algolia configuration (if using)
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_API_KEY=your_algolia_api_key

# TalkJS configuration (if using)
VITE_TALK_JS_APP_ID=your_talkjs_app_id
VITE_TALK_JS_SECRET_API_KEY=your_talkjs_secret_key
```

### 3. Database Setup

Start your PostgreSQL database and Redis server:

```bash
# Start PostgreSQL (varies by OS)
# On macOS with Homebrew:
brew services start postgresql

# Start Redis (varies by OS)
# On macOS with Homebrew:
brew services start redis
```

Create the database and run migrations:

```bash
# Navigate to backend directory
cd apps/backend

# Create database
yarn medusa db:create

# Run migrations
yarn medusa db:migrate

# Seed initial data (optional)
yarn seed
```

### 4. Create Admin User

```bash
# Create an admin user
npx medusa user --email admin@example.com --password your_password
```

### 5. Build the Application

```bash
# Build the entire application
yarn build
```

### 6. Run the Application

```bash
# Run in development mode
yarn dev

# Or run the backend specifically
cd apps/backend
yarn dev
```

## Development Scripts

The application provides several development scripts in the root `package.json`:

```bash
# Run the entire application in development mode
yarn dev

# Build all packages
yarn build

# Format code
yarn format

# Lint code
yarn lint

# Generate OpenAPI specification
yarn generate:oas
```

## Running Specific Parts

### Backend Only

```bash
cd apps/backend
yarn dev
```

### Admin Dashboard

The admin dashboard is part of the backend and will be served at `http://localhost:9000` by default.

## Default Ports

- **Backend API**: 9000
- **Storefront**: 3000 (if running the storefront)
- **Vendor Panel**: 5173 (if running the vendor panel)

## Troubleshooting

### Common Issues

1. **Database Connection Errors**: Ensure PostgreSQL is running and the DATABASE_URL in your .env is correct.

2. **Redis Connection Errors**: Ensure Redis is running and the REDIS_URL in your .env is correct.

3. **Migration Errors**: If you encounter migration errors, try running:
   ```bash
   yarn medusa db:migrate:down
   yarn medusa db:migrate
   ```

4. **Port Conflicts**: If the default ports are in use, you can change them in the configuration.

### Resetting the Database

If you need to reset your database:

```bash
# Drop the database
yarn medusa db:drop

# Create the database again
yarn medusa db:create

# Run migrations
yarn medusa db:migrate

# Seed initial data (optional)
yarn seed
```

## Testing

Run tests with:

```bash
# Run all tests
yarn test

# Run specific test types
yarn test:unit
yarn test:integration