import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMarksByStudentId } from '../../services/markService';

const MarkList = () => {
    const { studentId } = useParams();
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarks = async () => {
            setLoading(true);
            try {
                const data = await getMarksByStudentId(studentId);
                setMarks(data);
            } catch (error) {
                console.error('Error fetching marks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, [studentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Marks for Student ID: {studentId}</h3>
            {marks.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((mark) => (
                            <tr key={mark.mark_id}>
                                <td>{mark.subject}</td>
                                <td>{mark.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No marks available for this student.</p>
            )}
        </div>
    );
};

export default MarkList;