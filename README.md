# 💯 HRPulse - Human Resource Management System 💯

HRPulse is a comprehensive Human Resource Management System designed to streamline HR operations and simplify employee management. It offers a user-friendly interface built with React and Bootstrap on the front end, while the back end is powered by Node.js and Express, with MySQL for data storage. The project also employs bcrypt for password encryption to ensure data security.

### Features

* User Authentication: Secure user authentication using bcrypt for password hashing.
* Employee Management: Easily add, edit, and delete employee records.
* Leave Management: Efficiently manage employee leaves and track their usage.
* Attendance Tracking: Keep tabs on employee attendance and generate reports.
* Salary Management: Calculate and disburse employee salaries with precision.
* Task Management: Assign tasks and monitor their progress.


### Prerequisites
Before you begin, ensure you have met the following requirements:

* Node.js and npm installed on your machine.
* MySQL database server set up with the necessary tables (database schema provided in the /database directory).

### Installation

1. Clone the repository:

`git clone https://github.com/Raz4546/HRPulse.git`

2. Install the project dependencies:

`cd HRPulse`

`npm install`

3. Configure the database connection in /server/config/db.config.js.

4. Start the development server:

`cd .\frontend\`

`npm run dev`

5. Start the backend server:

`cd .\backend`

`npm start`


### Usage

1. Access the application by navigating to http://localhost:5173 in your web browser.
2. Log in using the provided credentials or create a new account.
3. Explore the various features of HRPulse to manage your HR tasks efficiently.

### Contributing

Contributions are welcome! Feel free to open issues and pull requests to enhance the project. Please adhere to the **__Contributing Guidelines__**.

### License
This project is licensed under the MIT License - see the __**LICENSE**__ file for details.

### Acknowledgments
* Thanks to the open-source community for their contributions to the libraries and tools used in this project. 😽
