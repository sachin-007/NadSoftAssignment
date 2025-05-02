import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStudent, updateStudent, getStudentById } from '../../services/studentService';
import Swal from 'sweetalert2';

const StudentForm = () => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        age: '',
        parent_id: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setLoading(true);
            getStudentById(id)
                .then((data) => {
                    setStudent(data);
                })
                .catch((error) => {
                    console.error('Error fetching student:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await updateStudent(id, student);
                Swal.fire('Updated!', 'Student has been updated.', 'success');
            } else {
                await createStudent(student);
                Swal.fire('Created!', 'Student has been created.', 'success');
            }
            navigate('/students');
        } catch (error) {
            console.error('Error saving student:', error);
            Swal.fire('Error!', 'There was an error saving the student.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Student' : 'Add New Student'}</h2>
            {loading && <div>Loading...</div>}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            value={student.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="parent_id" className="form-label">
                            Parent ID
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="parent_id"
                            name="parent_id"
                            value={student.parent_id}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Update Student' : 'Create Student'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default StudentForm;