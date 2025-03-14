# FoodChain AI - MVP

## About FoodChain AI

FoodChain AI is a SaaS platform designed to help small to medium-sized food businesses standardize their operations, reduce waste, and scale efficiently. Our MVP focuses on core inventory and recipe management functionality to address the most pressing operational challenges faced by food businesses.

## Core MVP Features

### Inventory Management
- Digital inventory tracking with categories and sub-categories
- Manual inventory counting with simple data entry
- Low-stock alerts and notifications
- Basic usage tracking and consumption reporting
- Simple supplier management with contact information

### Recipe Standardization
- Digital recipe creation with ingredient lists and procedures
- Cost calculation per recipe and per serving
- Recipe scaling functionality
- Basic nutritional information calculation
- Photo attachment capability for visual reference

### Basic Dashboard
- Summary view of daily operations (inventory status, scheduled production)
- Simple financial metrics (food cost percentage, estimated profit margins)
- Staff task assignment and basic checklists
- Calendar view for planning

### User Management
- Role-based access control (Owner, Manager, Staff)
- Basic user profiles and authentication
- Simple activity logging

## Technical Implementation

### Design
- Responsive design supporting desktop (1200px+), tablet (768px-1199px), and mobile (320px-767px) 
- Consistent color palette and typography system
- Core component library with navigation, form elements, and data visualization
- WCAG 2.1 AA compliant for basic accessibility

### Frontend
- Built with React 18 and TypeScript
- Material UI with custom theming for component library
- Redux Toolkit for state management
- React Router for navigation
- Form validation with React Hook Form
- Basic error handling and loading states

### Backend
- Node.js and Express.js RESTful API
- TypeScript for type safety
- PostgreSQL database with Prisma ORM
- JWT authentication with refresh tokens
- Basic API documentation with Swagger/OpenAPI
- Docker setup for development and deployment

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-org/foodchain-ai.git
   cd foodchain-ai
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Setup environment variables
   ```
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations
   ```
   npx prisma migrate dev
   ```

5. Start the development server
   ```
   npm run dev
   ```

### Running with Docker
```
docker-compose up -d
```

## Roadmap

Our MVP is just the beginning. We're actively working on enhancements including:

- AI-powered demand forecasting
- Automated supplier ordering
- Integration with POS systems
- Mobile app for inventory scanning
- Advanced analytics and business intelligence

## Feedback

As we're in the MVP stage, your feedback is invaluable. Please send issues, suggestions, and feature requests to feedback@foodchain.ai or submit them through the in-app feedback form.

## License

[MIT License](LICENSE)
