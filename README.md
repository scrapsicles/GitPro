# GitHub Career Roadmap Generator

A comprehensive Next.js SaaS platform that generates personalized career roadmaps for CS students based on their GitHub profiles and target job descriptions, powered by AI analysis.

## Features

- 🔐 **GitHub OAuth Integration** - Secure login with private repository access
- 📊 **GitHub Profile Analysis** - Comprehensive analysis of repositories, languages, and activity
- 🎯 **Job Description Matching** - Compare current skills with job requirements
- 🤖 **AI-Powered Roadmaps** - Generate personalized learning paths using Gemini API
- 📈 **Visual Analytics** - Interactive charts showing skill distributions and progress
- 🚀 **Project Recommendations** - Custom project ideas with difficulty levels
- 📚 **Resource Curation** - Free and paid learning resources tailored to goals
- 🏆 **Certification Guidance** - Relevant certification recommendations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API routes
- **Styling**: Tailwind CSS, Framer Motion, Modern UI, UI Aceternity
- **Authentication**: NextAuth.js with GitHub OAuth
- **State Management**: React Context API
- **GitHub APIs**: Simple GitHub API wrapper for data fetching like GraphQL, RESTAPIs
- **Charts**: Recharts
- **Icons**: Lucide React
- **API Integration**: Gemini-2.0-flash API for AI-powered analysis

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/vastavikadi/GitPro
cd gitpro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_API_KEY=your-google-api-key
```

### 4. GitHub OAuth Setup
1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create a new OAuth App with:
   - Application name: GitPro
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
3. Copy the Client ID and Client Secret to your `.env.local`

### 5. AI API Setup
1. Get your API key and add it to `.env.local`

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Sign In**: Click "Connect with GitHub" to authenticate
2. **Profile Analysis**: Your GitHub profile and repositories are automatically analyzed
3. **Job Input**: Paste a job description you're interested in
4. **Generate Roadmap**: Click "Generate Roadmap" to get AI-powered recommendations

## API Endpoints

- `GET /api/auth/[...nextauth]` - NextAuth.js authentication
- `GET /api/github/profile` - Fetch GitHub user profile
- `GET /api/github/repositories` - Fetch user repositories
- `POST /api/generate-roadmap` - Generate AI-powered career roadmap
## and many more

## Key Components

- **Dashboard**: Main interface showing profile stats and roadmap
- **Profile Analysis**: Visual representation of current skills
- **Roadmap Display**: Organized sections for skills, projects, and resources
- **Skill Badges**: Color-coded skill indicators
- **Project Cards**: Detailed project recommendations

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production domain

## Future Enhancements

- 📱 Mobile app version
- 🔗 LinkedIn integration
- 📊 Progress tracking
- 👥 Community features
- 🎓 Course integration
- 📝 Resume optimization
- 🤝 Mentorship matching

## Contributing

1. Star and Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License

## BUY ME A COFFEE
If you appreciate my work and want to support me, feel free to buy me a coffee!

[Buy Me a Coffee](https://coff.ee/vastavikadi)