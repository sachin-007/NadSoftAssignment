import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../../services/studentService';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadStudents = async (page = currentPage, itemsPerPage = limit) => {
        setLoading(true);
        try {
            const response = await fetchStudents(page, itemsPerPage);
            setStudents(response.data);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error('Error fetching members:', error);
            Swal.fire('Error!', 'Failed to load members.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, [currentPage, limit]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "If you delete this Student then this action can not be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteStudent(id);
                    Swal.fire('Deleted!', 'Student has been deleted.', 'success').then(() => loadStudents());
                } catch (error) {
                    console.error('Error deleting student:', error);
                    Swal.fire('Error!', 'There was an error deleting the Student.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className="container mt-4">Loading members...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>All Students</h2>
                <div>
                    <Link to="/students/new" className="btn btn-primary me-2">
                        Add New Student
                    </Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Age</th>
                            <th>Student Parent ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.parent_id}</td>
                                <td>
                                    <Link to={`/students/${student.student_id}`} className="btn btn-info btn-sm me-2">
                                        View
                                    </Link>
                                    <Link to={`/students/${student.student_id}/edit`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.student_id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
<div>
    <label htmlFor="itemsPerPage" className="form-label me-2">Show</label>
    <select
        id="itemsPerPage"
        className="form-select form-select-sm me-2"
        value={limit}
        onChange={handleLimitChange}
        style={{ width: 'auto', display: 'inline-block' }}
    >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
    </select>
    <span className="form-label me-2">entries</span>
</div>
<nav aria-label="Page navigation">
    <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                </button>
            </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </button>
        </li>
    </ul>
</nav>
</div>

        </div>
    );
};

export default StudentList;