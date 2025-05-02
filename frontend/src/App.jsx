import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/students/StudentList';
import StudentForm from './components/students/StudentForm';
import StudentDetails from './components/students/StudentDetails';
import MarkList from './components/marks/MarkList';

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<StudentList />} />
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/students/new" element={<StudentForm />} />
                    <Route path="/students/:id" element={<StudentDetails />} />
                    <Route path="/students/:id/edit" element={<StudentForm />} />
                    <Route path="/students/:id/marks" element={<MarkList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;