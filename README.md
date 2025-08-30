# TruckFlow - Comprehensive Trucking SaaS Platform

A modern, full-featured SaaS platform designed to streamline fleet management, financial tracking, and logistics operations for trucking companies and owner-operators.

## 🚛 Overview

TruckFlow is a comprehensive trucking management platform that combines fleet management, dispatch operations, financial tracking, document management, and AI-powered recommendations into a single, unified solution. Built with modern web technologies, it provides real-time insights and automation tools to help trucking businesses improve efficiency, reduce costs, and make data-driven decisions.

## ✨ Key Features

### 🔐 Authentication & User Management
- Role-based access control (Admin, Fleet Manager, Dispatcher, Driver)
- Secure authentication system
- User profile management
- Permission-based feature access

### 📊 Dashboard & Analytics
- Real-time business metrics and KPIs
- Interactive charts and data visualization
- Revenue, expense, and profit tracking
- Fleet performance analytics
- Custom reporting tools

### 🚚 Fleet Management
- Comprehensive truck inventory management
- Driver assignment and tracking
- Maintenance scheduling and compliance
- Vehicle status monitoring (Active, Idle, In Repair)
- Fuel efficiency tracking

### 📋 Dispatch & Load Management
- Intelligent load assignment system
- Route optimization with AI recommendations
- Real-time shipment tracking
- ELD (Electronic Logging Device) compliance
- Driver communication tools
- Load profitability analysis

### 💰 Financial Management
- Invoice generation and tracking
- Expense categorization and approval
- Tax reporting and compliance
- Profit/Loss analysis by load, truck, or driver
- Cash flow management
- Bank integration simulation

### 📄 Document Management
- Digital document storage and organization
- OCR processing for BOL and invoices
- Document approval workflows
- Searchable document library
- Automated document categorization

### 🤖 AI-Powered Recommendations
- Load optimization suggestions
- Route planning with efficiency scoring
- Driver performance analytics
- Predictive maintenance alerts
- Financial forecasting
- Fuel cost optimization

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Charts**: Recharts for data visualization
- **State Management**: React hooks and context
- **Authentication**: Custom role-based auth system
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/nrbnayon/truckflow.git
   cd truckflow
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Accounts

Use these demo accounts to explore different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@truckflow.com | admin123 |
| Fleet Manager | fleet@truckflow.com | fleet123 |
| Dispatcher | dispatch@truckflow.com | dispatch123 |
| Driver | driver@truckflow.com | driver123 |

## 👥 User Roles & Permissions

### 🔧 Admin
- **Full System Access**: Complete control over all platform features
- **User Management**: Create, edit, and manage user accounts
- **Fleet Management**: Oversee entire fleet operations
- **Financial Control**: Access all financial data and reports
- **System Settings**: Configure platform settings and integrations
- **Analytics**: View comprehensive business analytics

### 👨‍💼 Fleet Manager
- **Fleet Oversight**: Monitor truck status and maintenance
- **Driver Management**: Assign drivers and track performance
- **Maintenance**: Schedule and track vehicle maintenance
- **Analytics**: Access fleet performance reports
- **Limited Financial**: View fleet-related financial data

### 📡 Dispatcher
- **Load Management**: Create, assign, and track loads
- **Route Planning**: Optimize routes and manage schedules
- **Driver Communication**: Coordinate with drivers
- **ELD Compliance**: Monitor hours of service compliance
- **Real-time Tracking**: Track shipment status and locations

### 🚛 Driver
- **Load Information**: View assigned loads and routes
- **Document Upload**: Submit delivery receipts and BOLs
- **Route Following**: Access optimized route recommendations
- **Profile Management**: Update personal information and preferences
- **Status Updates**: Update load and delivery status

## 📱 Core Modules

### Fleet Management
- Add/edit truck information
- Driver assignment and scheduling
- Maintenance tracking and alerts
- Vehicle performance monitoring
- Fuel efficiency analysis

### Dispatch Operations
- Load creation and assignment
- Route optimization
- Real-time tracking
- ELD compliance monitoring
- Driver communication

### Financial Tracking
- Invoice management
- Expense tracking and categorization
- Tax reporting
- Profit/loss analysis
- Cash flow monitoring

### Document Management
- Document upload and storage
- OCR text extraction
- Approval workflows
- Search and filtering
- Document categorization

### AI Recommendations
- Load profitability scoring
- Route optimization suggestions
- Driver performance insights
- Predictive maintenance
- Financial forecasting

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Database Configuration (if using external DB)
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AI Services (optional)
OPENAI_API_KEY=your_openai_key

# File Storage (optional)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
\`\`\`

## 📊 Features by Role

| Feature | Admin | Fleet Manager | Dispatcher | Driver |
|---------|-------|---------------|------------|--------|
| Dashboard Overview | ✅ | ✅ | ✅ | ✅ |
| Fleet Management | ✅ | ✅ | ❌ | ❌ |
| User Management | ✅ | ❌ | ❌ | ❌ |
| Financial Tracking | ✅ | 📊 | ❌ | ❌ |
| Dispatch Management | ✅ | ❌ | ✅ | ❌ |
| Load Management | ✅ | ❌ | ✅ | 📱 |
| Document Management | ✅ | ❌ | ❌ | 📱 |
| AI Recommendations | ✅ | ✅ | ✅ | 📱 |
| Analytics & Reports | ✅ | ✅ | 📊 | ❌ |
| Settings | ✅ | ❌ | ❌ | ❌ |

**Legend**: ✅ Full Access | 📊 Limited Access | 📱 Mobile/Basic Access | ❌ No Access

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Configure Environment Variables**
   Add your environment variables in the Vercel dashboard

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Docker

1. **Build the image**
   \`\`\`bash
   docker build -t truckflow .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 truckflow
   \`\`\`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 API Documentation

### Authentication Endpoints

\`\`\`typescript
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/user
\`\`\`

### Fleet Management

\`\`\`typescript
GET    /api/fleet/trucks
POST   /api/fleet/trucks
PUT    /api/fleet/trucks/:id
DELETE /api/fleet/trucks/:id
\`\`\`

### Load Management

\`\`\`typescript
GET    /api/loads
POST   /api/loads
PUT    /api/loads/:id
DELETE /api/loads/:id
\`\`\`

## 🔒 Security Features

- Role-based access control (RBAC)
- Secure authentication system
- Data encryption in transit
- Input validation and sanitization
- CSRF protection
- Rate limiting

## 📈 Performance

- Server-side rendering with Next.js
- Optimized bundle size
- Lazy loading of components
- Image optimization
- Caching strategies

## 🐛 Troubleshooting

### Common Issues

**Login Issues**
- Verify demo account credentials
- Check browser console for errors
- Clear browser cache and cookies

**Performance Issues**
- Ensure Node.js 18+ is installed
- Check network connectivity
- Monitor browser developer tools

**Display Issues**
- Verify Tailwind CSS is loading
- Check for JavaScript errors
- Test in different browsers

## 📞 Support

For support and questions:

- 📧 Email: support@truckflow.com
- 📖 Documentation: [docs.truckflow.com](https://docs.truckflow.com)
- 🐛 Issues: [GitHub Issues](https://github.com/nrbnayon/truckflow/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

**TruckFlow** - Streamlining trucking operations with modern technology 🚛✨
