# GitPro: Personalized Career Roadmaps for CS Students 🚀

![GitPro](https://img.shields.io/badge/GitPro-v1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Issues](https://img.shields.io/github/issues/scrapsicles/GitPro.svg)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Overview

GitPro is a comprehensive Next.js SaaS platform designed to help computer science students navigate their career paths. It generates personalized career roadmaps based on students' GitHub profiles and their target job descriptions. Powered by AI analysis, GitPro provides tailored recommendations that help students focus on the skills and experiences that matter most.

## Features

- **Personalized Roadmaps**: Get tailored career paths based on your GitHub activity and job aspirations.
- **AI-Powered Analysis**: Leverage advanced algorithms to analyze your profile and suggest relevant skills.
- **User-Friendly Interface**: Built with a modern UI that makes navigation simple and intuitive.
- **Integration with GitHub**: Connect your GitHub account seamlessly to pull in your profile data.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **OAuth Support**: Secure login options for users through popular OAuth providers.
- **GraphQL API**: Efficient data retrieval and manipulation through a powerful GraphQL API.
- **Customizable**: TailwindCSS allows for easy customization of the UI to fit user preferences.

## Technologies

GitPro is built using a variety of modern technologies, including:

- **Next.js 14**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **NextAuth**: Authentication for Next.js applications.
- **Gemini API**: For accessing additional data services.
- **GraphQL**: For flexible data querying.
- **Lucide React**: A collection of icons for React applications.
- **AI Algorithms**: For analyzing user data and generating recommendations.

## Installation

To get started with GitPro, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/scrapsicles/GitPro.git
   ```

2. Navigate to the project directory:
   ```bash
   cd GitPro
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables. Create a `.env.local` file and add the necessary configurations:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Your application will be running on `http://localhost:3000`.

## Usage

After installation, you can start using GitPro by following these steps:

1. Open your browser and go to `http://localhost:3000`.
2. Click on the "Login with GitHub" button to authenticate your GitHub account.
3. Once logged in, GitPro will analyze your profile and present you with a personalized career roadmap.
4. Explore the recommendations and adjust your skills as needed.

For detailed instructions, refer to the [documentation](https://github.com/scrapsicles/GitPro/wiki).

## Build and Run the Container

```bash
docker-compose up --build
```

Once the container starts, the application will be available at:

[http://localhost:3000](http://localhost:3000)

---

### Stop the Container

Press `CTRL + C` or run:

```bash
docker-compose down
```
## Contributing

We welcome contributions to GitPro! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add my feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Create a pull request.

Please ensure your code follows our coding standards and passes all tests.

## License

GitPro is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Releases

To download the latest release of GitPro, visit [Releases](https://github.com/scrapsicles/GitPro/releases). You can find the necessary files to download and execute.

For more updates, check the [Releases](https://github.com/scrapsicles/GitPro/releases) section of the repository.

## Contact

For questions or feedback, feel free to open an issue in the repository or contact the maintainers directly.

---

Thank you for checking out GitPro! We hope it helps you build a successful career in tech.