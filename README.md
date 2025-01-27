# **User Management App**

## **Project Overview**
This is a simple user management application where users can view, add, edit, and delete user details. The app interacts with a mock backend API (JSONPlaceholder or a local Express server) to demonstrate CRUD operations.

---

## **Project Setup**

1. **Clone the Repository**  
   ```bash
   git clone <repository_url>
   cd user-management-app
   ```

2. **Install Dependencies**  
   Run the following command to install the required packages:  
   ```bash
   npm install
   ```

3. **Start the Application**  
   Start the development server with:  
   ```bash
   npm start
   ```

4. **Backend Setup (Optional)**  
   If you are running a local backend server (e.g., Express), make sure it’s running on `http://localhost:5000`.

---

## **Components Overview**

### **1. `App` Component**
The root component that wraps all other components. It manages global state and serves as the central point for passing props and state updates.
![image](https://github.com/user-attachments/assets/e824121f-902a-4432-b70a-82d4992e3817)


### **2. `Edit UserManagement` Component**
The main component displaying the list of users and integrating other subcomponents like `AddUser`.
![image](https://github.com/user-attachments/assets/c2c3934a-bcec-4a34-a879-be49e70aeaaf)


### **3. `AddUser` Component**
A form to add new users or edit existing user details. It handles form state and makes POST/PUT requests to the backend.
![image](https://github.com/user-attachments/assets/6fa29a52-a2f9-42eb-8b90-9589cc4890d8)


### **4. `UserList` Component**
Displays the list of users in a clean, formatted list. Each user card includes options to edit or delete a user.
![image](https://github.com/user-attachments/assets/efafa499-ee46-4a3a-bf21-c7ac59c2a3d5)


### **5. `ErrorBoundary` Component**
(Optional) Wraps other components to catch and display errors without crashing the app.

---

## **API Interaction**

The application interacts with the backend using the following endpoints:

### **Endpoints**
- **GET `/users`**  
  Fetches the list of users to display in the UI.

- **POST `/users`**  
  Adds a new user. This endpoint requires a JSON payload with the following structure:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering"
  }
  ```

- **PUT `/users/:id`**  
  Updates an existing user. Similar to the POST request, but includes the `id` of the user being updated.

- **DELETE `/users/:id`**  
  Deletes a user with the specified `id`.

### **Data Management**
- The app uses `useState` and `useEffect` for managing state and fetching data.
- Newly added or edited users are updated in the UI without a full page refresh by updating the state.

---

## **Known Issues and Limitations**

1. **JSONPlaceholder Mock API**  
   - JSONPlaceholder is a mock API and does not persist data. Any changes (additions, edits, or deletions) will not be reflected after refreshing the page.

2. **Local Backend**  
   - If using a local backend server, ensure it's running on `http://localhost:5000` to avoid CORS issues.

3. **Error Handling**  
   - While API errors are handled, some edge cases (e.g., network issues) may not have detailed error messages.

---

## **Future Improvements**

1. **Authentication**  
   Add user authentication to restrict access to certain features (e.g., adding or deleting users).

2. **Pagination/Infinite Scrolling**  
   Implement pagination or infinite scrolling for the user list to handle large datasets efficiently.

3. **Search and Filtering**  
   Add functionality to search users by name or filter them by department.

4. **Form Validation**  
   Implement more robust client-side validation (e.g., email format, required fields) and real-time feedback.

5. **Responsive Design Enhancements**  
   Further optimize the UI for mobile devices and smaller screens.

6. **Persist Data**  
   Use a real database (e.g., MySQL, MongoDB) to persist data instead of relying on a mock API.

---

## **Contributing**
Feel free to fork the repository, create a new branch, and submit a pull request for any improvements or bug fixes.

---

## **License**
This project is licensed under the MIT License.
