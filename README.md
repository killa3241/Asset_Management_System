🚀 Asset Management System
A JavaFX & Spring Boot application for managing assets efficiently.

📌 Project Structure
bash
Copy
Edit
AssetManagementSystem/
│── frontend/  
│   ├── src/  
│   │   ├── controller/         # JavaFX controllers  
│   │   ├── model/              # JavaFX models  
│   │   ├── view/               # FXML views  
│   │   ├── util/               # Utility classes  
│   ├── resources/  
│   │   ├── css/                # Stylesheets  
│   │   ├── images/             # App images  
│── backend/  
│   ├── src/main/java/com/ams/  
│   │   ├── config/             # Security & Config files  
│   │   ├── controller/         # REST Controllers  
│   │   ├── dto/                # Data Transfer Objects  
│   │   ├── entity/             # Database Entities  
│   │   ├── repository/         # Database Repositories  
│   │   ├── service/            # Business Logic  
│   │   ├── util/               # Utility classes  
│   ├── src/main/resources/  
│   │   ├── application.properties  # Spring Boot configuration  
│   ├── pom.xml                 # Maven dependencies  

🎯 Features
✅ Admin Dashboard: Manage assets, assign users, and view reports
✅ User Dashboard: View assigned assets and submit maintenance requests
✅ Spring Boot Backend: REST APIs for asset management
✅ JavaFX Frontend: Responsive UI using FXML
✅ Database Integration: MySQL or PostgreSQL
✅ Authentication: Secure login system using Spring Security
✅ Styled UI: Custom CSS themes

🛠 Tech Stack
💻 Frontend (JavaFX)
JavaFX (FXML, CSS)

Scene Builder

Java 17

🛠 Backend (Spring Boot)
Spring Boot

Spring Data JPA (Hibernate)

Spring Security

PostgreSQL / MySQL

Maven

🚀 Setup & Installation
📌 1. Clone the repository
sh
Copy
Edit
git clone https://github.com/your-username/AssetManagementSystem.git
cd AssetManagementSystem

📌 2. Set up the backend
sh
Copy
Edit
cd backend
mvn clean install
mvn spring-boot:run
📌 3. Set up the frontend
sh
Copy
Edit
cd frontend
mvn javafx:run
📸 Screenshots
<img src="frontend/resources/images/admin_dashboard.png" width="600"> <img src="frontend/resources/images/user_dashboard.png" width="600">
📜 API Endpoints (Backend)
Endpoint	Method	Description
/api/admin/assets	GET	Get all assets
/api/admin/assets	POST	Add a new asset
/api/user/assets	GET	View assigned assets
/api/admin/assign	POST	Assign assets to users
/api/reports	GET	Generate reports
👨‍💻 Contributors
Your Name – Developer & Maintainer








