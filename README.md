
# 🎓 EdTech Placement Platform  

An **EdTech platform** that provides **placement courses** with recorded lectures and collaborates with colleges for student placements. It includes authentication, user login, institute login, and other backend features.

## 🛠 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Frontend:** React (to be integrated)  

---

## 🔐 Authentication & User Management  
### 📌 User Roles  
- **Student** - Can register, access courses, and take placement tests.  
- **Institute (College Admin)** - Can register and manage student data.  
- **Admin** - Manages the platform, users, and placements.  

### 📌 Authentication Routes  

| Route                     | Method | Description                          |
|---------------------------|--------|--------------------------------------|
| `/routes/courseData/register`      | POST   | Register a new user                 |
| `/routes/courseData/login`         | POST   | Login for users (Students & Admins) |
| `/routes/courseData/logout`        | POST   | Logout user                         |
| `/routes/courseData/userdetail`            | GET    | Get logged-in user details          |

---

## 🏫 Institute (College) Routes  

| Route                         | Method | Description                         |
|--------------------------------|--------|-------------------------------------|
| `/routes/courseDatainstuteRegister`    | POST   | Register a new institute           |
| `/routes/courseData/instituteLogin`       | POST   | Login for institute admins         |
| `/routes/courseData/students`    | GET    | Get list of students from an institute |
| `/routes/courseData/instuteRegister/addStudent` |GET  | Add a student to the database      |

---



## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/sakhilsharma/edTech.git
cd edTech
