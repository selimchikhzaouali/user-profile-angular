# User Profile with Todos - Angular

This is a simple Angular project where users can view a random user's profile and their tasks (todos) fetched from the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API. The project is designed to demonstrate how to integrate Angular with external APIs, handle user interactions, display dynamic data, and include features like error handling, loading spinners, and responsive design.

### Features:
- **Random User Fetching**: Fetches a random user and displays their profile.
- **Todos**: Fetches the tasks (todos) of the user and displays them in a table format with a visual representation of whether the task is completed or ongoing.
- **Error Handling**: Catches and displays errors gracefully.
- **Loading Spinner**: Shows a loading spinner when fetching data to enhance the user experience.
- **Responsive Design**: The UI adjusts to different screen sizes for better user interaction on mobile and desktop devices.

### Learning Focus:
This project was created primarily to learn and demonstrate **unit testing in Angular**. It includes:
- Unit tests for **UserService** using `HttpClientTestingModule`.
- Unit tests for the **UserProfileComponent** using **TestBed** and mocking service calls with **spyOn**.

### Technologies Used:
- **Angular**: Framework for building the frontend.
- **JSONPlaceholder API**: For fetching random users and todos.
- **Karma & Jasmine**: For unit testing the application.

### Setup & Installation:

1. Clone the repository:

```bash
git clone https://github.com/selimchikhzaouali/user-profile-angular.git
cd user-profile-angular
```

2. Install the dependencies:

```bash
Copy code
npm install
```

3. Run the application:

```bash
ng serve
```

4. Navigate to http://localhost:4200 to view the app.

### Running Tests:
To run the unit tests, simply use:

```bash
ng test
```