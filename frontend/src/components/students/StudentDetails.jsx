import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentById } from '../../services/studentService';
import {
    getMarksByStudentId,
    createMark,
    updateMark,
    deleteMark,
} from '../../services/markService';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMark, setNewMark] = useState({
        subject: '',
        score: '',
    });
    const [editingMarkId, setEditingMarkId] = useState(null);
    const [editedMark, setEditedMark] = useState({
        subject: '',
        score: '',
    });

    useEffect(() => {
        const fetchStudentDetails = async () => {
            setLoading(true);
            try {
                const studentData = await getStudentById(id);
                setStudent(studentData);

                const marksData = await getMarksByStudentId(id);
                setMarks(marksData);
            } catch (error) {
                console.error('Error fetching student details:', error);
                Swal.fire('Error!', 'Failed to load student details.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [id]);

    const handleNewMarkChange = (e) => {
        setNewMark({ ...newMark, [e.target.name]: e.target.value });
    };

    const handleAddMark = async (e) => {
        e.preventDefault();
        const isSubjectDuplicate = marks.some(mark => mark.subject.toLowerCase() === newMark.subject.toLowerCase());

        if (isSubjectDuplicate) {
            Swal.fire('Warning!', 'This subject has already been added for this student.', 'warning');
            return;
        }

        try {
            await createMark({ ...newMark, student_id: parseInt(id, 10) });
            Swal.fire('Added!', 'Mark has been added.', 'success');
            const updatedMarks = await getMarksByStudentId(id);
            setMarks(updatedMarks);
            setNewMark({ subject: '', score: '' });
        } catch (error) {
            console.error('Error adding mark:', error);
            Swal.fire('Error!', 'Failed to add mark.', 'error');
        }
    };

    const handleEditMark = (mark) => {
        setEditingMarkId(mark.mark_id);
        setEditedMark({ subject: mark.subject, score: mark.score });
    };

    const handleEditedMarkChange = (e) => {
        setEditedMark({ ...editedMark, [e.target.name]: e.target.value });
    };

    const handleSaveEditMark = async (markId) => {
        try {
            await updateMark(markId, editedMark);
            Swal.fire('Updated!', 'Mark has been updated.', 'success');
            const updatedMarks = await getMarksByStudentId(id);
            setMarks(updatedMarks);
            setEditingMarkId(null);
            setEditedMark({ subject: '', score: '' });
        } catch (error) {
            console.error('Error updating mark:', error);
            Swal.fire('Error!', 'Failed to update mark.', 'error');
        }
    };

    const handleCancelEditMark = () => {
        setEditingMarkId(null);
        setEditedMark({ subject: '', score: '' });
    };

    const handleDeleteMark = async (markId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteMark(markId);
                    Swal.fire('Deleted!', 'Mark has been deleted.', 'success');
                    const updatedMarks = await getMarksByStudentId(id);
                    setMarks(updatedMarks);
                } catch (error) {
                    console.error('Error deleting mark:', error);
                    Swal.fire('Error!', 'Failed to delete mark.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className="container mt-4">Loading student details...</div>;
    }

    if (!student) {
        return <div className="container mt-4">Student not found</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Student Details</h2>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text">Email: {student.email}</p>
                    <p className="card-text">Age: {student.age}</p>
                    <p className="card-text">Student Parent ID: {student.parent_id}</p>
                    <Link to="/students" className="btn btn-primary">
                        Back to List
                    </Link>
                </div>
            </div>

            <h3 className="mt-4">Add New Mark</h3>
            <form onSubmit={handleAddMark} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                        Subject
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={newMark.subject}
                        onChange={handleNewMarkChange}
                        required
                        placeholder="Enter subject name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="score" className="form-label">
                        Score (Out of 100)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="score"
                        name="score"
                        value={newMark.score}
                        onChange={handleNewMarkChange}
                        min="0"
                        max="100"
                        required
                        placeholder="Enter score"
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Add Mark
                </button>
            </form>

            <h3 className="mt-4">Marks</h3>
            {marks.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Subject</th>
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((mark) => (
                                <tr key={mark.mark_id}>
                                    {editingMarkId === mark.mark_id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="subject"
                                                    value={editedMark.subject}
                                                    onChange={handleEditedMarkChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    name="score"
                                                    value={editedMark.score}
                                                    onChange={handleEditedMarkChange}
                                                    min="0"
                                                    max="100"
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-success me-2" onClick={() => handleSaveEditMark(mark.mark_id)}>Save</button>
                                                <button className="btn btn-sm btn-secondary" onClick={handleCancelEditMark}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{mark.subject}</td>
                                            <td>{mark.score}</td>
                                            <td>
                                                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditMark(mark)}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteMark(mark.mark_id)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No marks available for this student.</p>
            )}
        </div>
    );
};

export default StudentDetails;