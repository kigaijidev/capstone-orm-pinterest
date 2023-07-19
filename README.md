# Capstone ORM Pinterest

Capstone ORM Pinterest is a project inspired by the popular website Pinterest. It allows users to create, share, and discover visual content through organized collections called boards. This project is developed by A and B.

## Technologies Used

The project utilizes the following technologies:

- [Yarn](https://yarnpkg.com/): Package manager for managing dependencies.
- [MySQL](https://www.mysql.com/): An open-source relational database management system.
- [Prisma](https://www.prisma.io/): Database toolkit and ORM (Object-Relational Mapping) for working with databases.
- [Swagger](https://swagger.io/): Open-source tooling for designing, building, documenting, and consuming RESTful web services.

## Installation

To set up the Capstone ORM Pinterest project on your local machine, please follow the steps below:

1. Clone the repository:

    ```bash
    git clone <repository_url>

2. Navigate to the project directory:

    ```bash
    cd Capstone-ORM-Pinterest

3. Install project dependencies using Yarn:
    
    ```bash
    yarn install

4. Set up the database using Prisma:

    ```bash
    yarn prisma migrate dev

This command will apply any pending migrations and create the necessary database tables.

5. Start the development server:

    ```bash
    yarn start:dev

The server should now be running at http://localhost:3000

6. Visit the Swagger documentation to explore the available API endpoints:

    ```bash
    http://localhost:3000/api

Use this documentation to understand and interact with the various routes provided by the Capstone ORM Pinterest API.

## Usage
To use Capstone ORM Pinterest:

1. Open a web browser and navigate to http://localhost:3000.
2. Sign up for a new account or log in with existing credentials.
3. Explore the application's features, including creating boards, adding pins, and discovering content shared by other users.
4. Use the Swagger documentation for reference on available API endpoints and their functionality.
## Contributing
We welcome contributions to the Capstone ORM Pinterest project. If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit and push your changes to your forked repository.
5. Submit a pull request detailing the changes you have made.
Please ensure your contributions adhere to the project's coding conventions and guidelines.

## License
This project is licensed under the MIT License.
Feel free to customize this README.md file to match the specific details and requirements of your Capstone ORM Pinterest project.
