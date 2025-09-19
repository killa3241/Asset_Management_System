# 💻 Asset Management System

A Full-Stack IT Asset Tracking Solution with Robust Security and Reporting

## 🎯 Project Overview & Business Value

This project is a corporate-level IT asset tracking system designed to solve a critical business problem: gaining full visibility and control over a company's technology assets. Built as an Object-Oriented Analysis and Design (OOAD) mini-project, this solution goes beyond a simple inventory list. It provides a comprehensive platform for secure asset management, real-time tracking, and performance reporting, which is essential for informed IT and financial decision-making.

By implementing this system, a company can:
- Reduce operational costs by extending asset lifecycles through proactive maintenance
- Improve accountability with a clear chain of custody for all assets
- Streamline audit processes with a detailed, automated history of every asset
- Enhance security by knowing who has what, and when

## 🚀 Key Features

- **User Authentication & Role-Based Access Control (RBAC)**: Secure user login powered by Spring Security and JWTs. Different roles (Admin, Manager, Employee) have distinct permissions, ensuring data integrity and access control.

- **End-to-End Asset Lifecycle Management**: Tracks assets from procurement to retirement. Users can add new assets, update their status, assign them to employees, and mark them as retired or lost.

- **Real-Time Tracking & Assignment**: Assets are dynamically assigned to employees, with the system providing an up-to-the-minute view of who is using which asset.

- **Maintenance & Audit History**: A comprehensive history log tracks all maintenance events and changes to an asset's status or ownership, providing a clear and non-repudiable audit trail.

- **Automated Notifications & Alerts**: The system triggers alerts for upcoming maintenance, warranty expirations, or overdue assets, enabling proactive management.

- **Dynamic Reporting & Visualization**: Generates insightful reports on asset usage, performance, and allocation. Chart.js provides graphical representations for easy data interpretation.

## 🛠️ Tech Stack & Architecture

This project demonstrates a modern, modular, and scalable software architecture.

### Backend (API & Business Logic)
- **Java 21**: The backend is built on the latest LTS version of Java, showcasing a commitment to modern and secure development practices.
- **Spring Boot 3.x.x**: The choice of Spring Boot enabled rapid development with a microservices-friendly structure, dependency injection, and auto-configuration.
- **Spring Security**: Implemented for robust authentication and authorization. It protects all API endpoints and enforces role-based access.
- **Spring Data JPA**: Simplifies database interactions with Object-Relational Mapping (ORM), allowing for a clean separation between the business logic and the database layer.
- **H2 Database**: A lightweight, in-memory database used for development, which makes the project easy to set up and run without requiring external database installation.

### Frontend (User Interface)
- **React 18.x.x**: A modern JavaScript library used to build a dynamic and responsive user interface. The component-based architecture makes the UI scalable and maintainable.
- **React Router**: Manages client-side routing, providing a seamless single-page application experience.
- **Axios**: A widely-used HTTP client for making API calls to the Spring Boot backend, ensuring reliable data communication.
- **Chart.js**: An elegant charting library that visualizes asset data, turning raw numbers into actionable insights.

## 📂 Project Structure

```
asset-management-system/
│
├── backend/
│   ├── src/main/java/com/asset/… # Spring Boot application code
│   └── pom.xml                   # Maven dependencies
│
└── frontend/
    ├── src/components/           # Reusable React components
    ├── src/pages/                # Major UI views
    └── package.json              # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites
- Java Development Kit (JDK) 21
- Node.js & npm
- Maven

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/asset-management-system.git
   cd asset-management-system
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Start the Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

The application will be accessible at `http://localhost:3000`.

## 💡 Future Enhancements

- **PostgreSQL/MySQL Integration**: Migrate from the in-memory H2 database to a production-grade database for persistent data.
- **Email Notifications**: Integrate a mailing service to send automated alerts directly to users.
- **QR Code Scanning**: Add functionality to scan QR codes on physical assets for quick lookups and updates.
- **Dockerization**: Containerize both the backend and frontend services to simplify deployment and management.
