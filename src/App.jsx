import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import HorizontalCourses from './components/HorizontalCourses';
import SignIn from './components/sigIn'
import UserDetails from './components/userDetails'
function App() {
  
  return (
    <>
    
   <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/all-courses" element={<HorizontalCourses/>}></Route>
        <Route path="/horizontalCourses" element={<HorizontalCourses/>}></Route>
        <Route path="/signIn" element={<SignIn/>}></Route>
        <Route path="/userDetails" element ={<UserDetails/>}></Route>
      </Routes>
    </Router>
 
    </>
  )
}

export default App
