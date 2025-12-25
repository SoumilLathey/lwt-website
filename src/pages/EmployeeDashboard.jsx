import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    AlertCircle, Mail, Upload, CheckCircle, Clock,
    LogOut, User, Image as ImageIcon, X, Briefcase, ChevronDown, ChevronUp
} from 'lucide-react';
import API_URL from '../config/api';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [activeTab, setActiveTab] = useState('complaints');
    const [complaints, setComplaints] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadingImage, setUploadingImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState({});
    const navigate = useNavigate();

    const employeeData = JSON.parse(localStorage.getItem('employeeData') || '{}');
    const employeeToken = localStorage.getItem('employeeToken');

    useEffect(() => {
        if (!employeeToken) {
            navigate('/employee/login');
            return;
        }
        fetchData();
    }, []);

    // State for expanded card details
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const sortItems = (items) => {
        return [...items].sort((a, b) => {
            const isCompletedA = a.status === 'Resolved' || a.status === 'Completed';
            const isCompletedB = b.status === 'Resolved' || b.status === 'Completed';
            if (isCompletedA === isCompletedB) return 0;
            return isCompletedA ? 1 : -1;
        });
    };

    const getAuthHeader = () => ({
        'Authorization': `Bearer ${employeeToken}`
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            };

            const [complaintsRes, enquiriesRes, projectsRes] = await Promise.all([
                fetch(`${API_URL}/api/employees/complaints`, { headers }),
                fetch(`${API_URL}/api/employees/enquiries`, { headers }),
                fetch(`${API_URL}/api/employees/projects`, { headers })
            ]);

            if (complaintsRes.ok) setComplaints(await complaintsRes.json());
            if (enquiriesRes.ok) setEnquiries(await enquiriesRes.json());
            if (projectsRes.ok) setProjects(await projectsRes.json());
        } catch (error) {
            console.error('Error fetching employee data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (type, id) => {
        // Check if image already exists
        const item = type === 'complaint'
            ? complaints.find(c => c.id === id)
            : enquiries.find(e => e.id === id);

        if (item?.images && item.images.length > 0) {
            alert('Only one photo can be uploaded per ' + type + '. Photo already exists.');
            return;
        }

        const description = prompt('Enter a description for this photo (optional):') || 'Photo with client';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);
            formData.append('description', description);

            setUploadingImage(`${type}-${id}`);

            try {
                const endpoint = type === 'complaint'
                    ? `${API_URL}/api/employees/complaints/${id}/images`
                    : `${API_URL}/api/employees/enquiries/${id}/images`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: getAuthHeader(),
                    body: formData
                });

                if (response.ok) {
                    fetchData(); // Refresh data
                    alert('Image uploaded successfully!');
                } else {
                    const data = await response.json();
                    alert(data.error || 'Failed to upload image');
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('Failed to upload image');
            } finally {
                setUploadingImage(null);
            }
        };

        fileInput.click();
    };

    const updateStatus = async (type, id, status) => {
        try {
            const endpoint = type === 'complaint'
                ? `${API_URL}/api/employees/complaints/${id}/status`
                : `${API_URL}/api/employees/enquiries/${id}/status`;

            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            console.error('Update status error:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('employeeToken');
        localStorage.removeItem('employeeData');
        navigate('/employee/login');
    };

    const viewImage = (imagePath) => {
        window.open(`${API_URL}${imagePath}`, '_blank');
    };

    // State for inline upload form
    const [activeUploadProject, setActiveUploadProject] = useState(null);
    const [uploadFormData, setUploadFormData] = useState({
        dayNumber: '',
        description: '',
        isFinal: false,
        file: null
    });

    const startUploadProject = (project) => {
        const nextDay = (project.images?.length || 0) + 1;
        setActiveUploadProject(project.id);
        setUploadFormData({
            dayNumber: nextDay,
            description: '',
            isFinal: false,
            file: null
        });
    };

    const cancelUpload = () => {
        setActiveUploadProject(null);
        setUploadFormData({
            dayNumber: '',
            description: '',
            isFinal: false,
            file: null
        });
    };

    const updateProjectStatus = async (projectId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/employees/projects/${projectId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchData();
                alert('Project status updated successfully');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating project status:', error);
            alert('Failed to update status');
        }
    };

    const handleProjectUploadSubmit = async (e) => {
        e.preventDefault();

        if (!uploadFormData.file) {
            alert('Please select an image file');
            return;
        }

        if (!uploadFormData.dayNumber || uploadFormData.dayNumber < 1) {
            alert('Please enter a valid day number');
            return;
        }

        const formData = new FormData();
        formData.append('dayNumber', uploadFormData.dayNumber.toString());
        formData.append('isFinal', uploadFormData.isFinal.toString());
        if (uploadFormData.description) {
            formData.append('description', uploadFormData.description);
        }
        formData.append('image', uploadFormData.file);

        setUploadingImage(`project-${activeUploadProject}`);

        try {
            const response = await fetch(`${API_URL}/api/employees/projects/${activeUploadProject}/images`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: formData
            });

            if (response.ok) {
                const responseData = await response.json();
                fetchData();
                alert(`Project image uploaded successfully!\nFinal Day: ${responseData.isFinal ? 'Yes' : 'No'}\nStatus: ${responseData.isFinal ? 'Completed' : 'In Progress'}`);
                cancelUpload();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingImage(null);
        }
    };




    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loader"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="employee-dashboard">
            <div className="dashboard-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-left">
                            <div className="employee-avatar">
                                <User size={24} />
                            </div>
                            <div>
                                <h1>Welcome, {employeeData.name}</h1>
                                <p>{employeeData.department || 'Employee'}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon complaints">
                            <AlertCircle size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{complaints.length}</h3>
                            <p>Assigned Complaints</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon enquiries">
                            <Mail size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{enquiries.length}</h3>
                            <p>Assigned Queries</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon projects">
                            <Briefcase size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{projects.length}</h3>
                            <p>Assigned Projects</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-tabs">
                    <button
                        className={`tab ${activeTab === 'complaints' ? 'active' : ''}`}
                        onClick={() => setActiveTab('complaints')}
                    >
                        <AlertCircle size={18} />
                        Complaints ({complaints.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'enquiries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('enquiries')}
                    >
                        <Mail size={18} />
                        Queries ({enquiries.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <Briefcase size={18} />
                        Projects ({projects.length})
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'complaints' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="items-section"
                        >
                            <h2>My Assigned Complaints</h2>
                            {complaints.length === 0 ? (
                                <div className="empty-state">
                                    <AlertCircle size={48} />
                                    <p>No complaints assigned to you</p>
                                </div>
                            ) : (
                                <div className="items-grid">
                                    {sortItems(complaints).map((complaint) => (
                                        <div key={complaint.id} className="item-card">
                                            <div
                                                className="item-header"
                                                onClick={() => toggleExpand(complaint.id)}
                                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                    <h3>{complaint.subject}</h3>
                                                    <span className={`status-badge ${(complaint.status || 'Pending').toLowerCase().replace(' ', '-')}`}>
                                                        {complaint.status}
                                                    </span>
                                                </div>
                                                {expandedItems[complaint.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>

                                            {expandedItems[complaint.id] && (
                                                <div className="item-details" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                    <p className="item-description">{complaint.description}</p>

                                                    <div className="item-meta">
                                                        <span><strong>Customer:</strong> {complaint.userName}</span>
                                                        <span><strong>Email:</strong> {complaint.userEmail}</span>
                                                        {complaint.userPhone && (
                                                            <span><strong>Phone:</strong> {complaint.userPhone}</span>
                                                        )}
                                                        <span><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</span>
                                                    </div>

                                                    <div className="image-section">
                                                        <h4>Photo with Client</h4>
                                                        {complaint.images && complaint.images.length > 0 ? (
                                                            <div className="uploaded-images">
                                                                {complaint.images.map(img => (
                                                                    <button
                                                                        key={img.id}
                                                                        className="image-preview"
                                                                        onClick={() => viewImage(img.imagePath)}
                                                                    >
                                                                        <ImageIcon size={16} />
                                                                        View Photo
                                                                        {img.imageType && <small>{img.imageType}</small>}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="upload-btn"
                                                                onClick={() => handleImageUpload('complaint', complaint.id)}
                                                                disabled={uploadingImage === `complaint-${complaint.id}`}
                                                            >
                                                                <Upload size={16} />
                                                                {uploadingImage === `complaint-${complaint.id}` ? 'Uploading...' : 'Upload Photo'}
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="status-actions">
                                                        <button
                                                            className="status-btn pending"
                                                            onClick={() => updateStatus('complaint', complaint.id, 'Pending')}
                                                            disabled={complaint.status === 'Pending'}
                                                        >
                                                            Pending
                                                        </button>
                                                        <button
                                                            className="status-btn progress"
                                                            onClick={() => updateStatus('complaint', complaint.id, 'In Progress')}
                                                            disabled={complaint.status === 'In Progress'}
                                                        >
                                                            In Progress
                                                        </button>
                                                        <button
                                                            className="status-btn resolved"
                                                            onClick={() => updateStatus('complaint', complaint.id, 'Resolved')}
                                                            disabled={complaint.status === 'Resolved'}
                                                        >
                                                            Resolved
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'enquiries' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="items-section"
                        >
                            <h2>My Assigned Queries</h2>
                            {enquiries.length === 0 ? (
                                <div className="empty-state">
                                    <Mail size={48} />
                                    <p>No queries assigned to you</p>
                                </div>
                            ) : (
                                <div className="items-grid">
                                    {sortItems(enquiries).map((enquiry) => (
                                        <div key={enquiry.id} className="item-card">
                                            <div
                                                className="item-header"
                                                onClick={() => toggleExpand(enquiry.id)}
                                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                    <h3>{enquiry.name}</h3>
                                                    <span className={`status-badge ${(enquiry.status || 'Pending').toLowerCase().replace(' ', '-')}`}>
                                                        {enquiry.status || 'Pending'}
                                                    </span>
                                                </div>
                                                {expandedItems[enquiry.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>

                                            {expandedItems[enquiry.id] && (
                                                <div className="item-details" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                    {enquiry.service && (
                                                        <span className="service-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>{enquiry.service}</span>
                                                    )}
                                                    <p className="item-description">{enquiry.message}</p>

                                                    <div className="item-meta">
                                                        <span><strong>Email:</strong> {enquiry.email}</span>
                                                        {enquiry.phone && (
                                                            <span><strong>Phone:</strong> {enquiry.phone}</span>
                                                        )}
                                                        <span><strong>Submitted:</strong> {new Date(enquiry.createdAt).toLocaleString()}</span>
                                                    </div>

                                                    <div className="image-section">
                                                        <h4>Photo with Client</h4>
                                                        {enquiry.images && enquiry.images.length > 0 ? (
                                                            <div className="uploaded-images">
                                                                {enquiry.images.map(img => (
                                                                    <button
                                                                        key={img.id}
                                                                        className="image-preview"
                                                                        onClick={() => viewImage(img.imagePath)}
                                                                    >
                                                                        <ImageIcon size={16} />
                                                                        View Photo
                                                                        {img.imageType && <small>{img.imageType}</small>}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="upload-btn"
                                                                onClick={() => handleImageUpload('enquiry', enquiry.id)}
                                                                disabled={uploadingImage === `enquiry-${enquiry.id}`}
                                                            >
                                                                <Upload size={16} />
                                                                {uploadingImage === `enquiry-${enquiry.id}` ? 'Uploading...' : 'Upload Photo'}
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="status-actions">
                                                        <button
                                                            className="status-btn pending"
                                                            onClick={() => updateStatus('enquiry', enquiry.id, 'Pending')}
                                                            disabled={enquiry.status === 'Pending'}
                                                        >
                                                            Pending
                                                        </button>
                                                        <button
                                                            className="status-btn progress"
                                                            onClick={() => updateStatus('enquiry', enquiry.id, 'In Progress')}
                                                            disabled={enquiry.status === 'In Progress'}
                                                        >
                                                            In Progress
                                                        </button>
                                                        <button
                                                            className="status-btn resolved"
                                                            onClick={() => updateStatus('enquiry', enquiry.id, 'Completed')}
                                                            disabled={enquiry.status === 'Completed'}
                                                        >
                                                            Completed
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'projects' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="items-section"
                        >
                            <h2>My Assigned Projects</h2>
                            {projects.length === 0 ? (
                                <div className="empty-state">
                                    <Briefcase size={48} />
                                    <p>No projects assigned to you</p>
                                </div>
                            ) : (
                                <div className="items-grid">
                                    {sortItems(projects).map((project) => (
                                        <div key={project.id} className="item-card project-card">
                                            <div
                                                className="item-header"
                                                onClick={() => toggleExpand(project.id)}
                                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                    <h3>{project.name}</h3>
                                                    <span className={`status-badge ${(project.status || 'Active').toLowerCase().replace(' ', '-')}`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                                {expandedItems[project.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>

                                            {expandedItems[project.id] && (
                                                <div className="item-details" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                    <div className="status-control" style={{ marginBottom: '15px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                                                        <label><strong>Update Status:</strong></label>
                                                        <select
                                                            value={project.status}
                                                            onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                                                            className="form-input"
                                                            style={{ marginLeft: '10px', width: 'auto', display: 'inline-block', padding: '5px' }}
                                                        >
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="On Hold">On Hold</option>
                                                        </select>
                                                    </div>
                                                    <p className="item-description">{project.description}</p>

                                                    <div className="item-meta">
                                                        <span><strong>Created by:</strong> {project.creatorName}</span>
                                                        {project.startDate && (
                                                            <span><strong>Start:</strong> {new Date(project.startDate).toLocaleDateString()}</span>
                                                        )}
                                                        {project.endDate && (
                                                            <span><strong>End:</strong> {new Date(project.endDate).toLocaleDateString()}</span>
                                                        )}
                                                    </div>

                                                    {project.teamMembers && project.teamMembers.length > 0 && (
                                                        <div className="team-section">
                                                            <h4>Team Members ({project.teamMembers.length})</h4>
                                                            <div className="team-badges">
                                                                {project.teamMembers.map(member => (
                                                                    <span key={member.id} className="team-badge">
                                                                        {member.name}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="project-images-section">
                                                        <h4>Progress Images ({project.images?.length || 0})</h4>
                                                        {project.images && project.images.length > 0 && (
                                                            <div className="progress-images-grid">
                                                                {project.images.map(img => (
                                                                    <button
                                                                        key={img.id}
                                                                        className="progress-image-btn"
                                                                        onClick={() => viewImage(img.imagePath)}
                                                                    >
                                                                        <ImageIcon size={16} />
                                                                        Day {img.dayNumber}{img.isFinal ? ' (Final)' : ''}
                                                                        {img.description && <small>{img.description}</small>}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {activeUploadProject === project.id ? (
                                                            <form className="inline-upload-form" onSubmit={handleProjectUploadSubmit}>
                                                                <div className="form-group">
                                                                    <label>Day Number</label>
                                                                    <input
                                                                        type="number"
                                                                        value={uploadFormData.dayNumber}
                                                                        onChange={e => setUploadFormData({ ...uploadFormData, dayNumber: e.target.value })}
                                                                        required
                                                                        min="1"
                                                                        className="form-input"
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Description (Optional)</label>
                                                                    <input
                                                                        type="text"
                                                                        value={uploadFormData.description}
                                                                        onChange={e => setUploadFormData({ ...uploadFormData, description: e.target.value })}
                                                                        placeholder="e.g. Completed wiring"
                                                                        className="form-input"
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Select Image</label>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={e => setUploadFormData({ ...uploadFormData, file: e.target.files[0] })}
                                                                        required
                                                                        className="form-input"
                                                                    />
                                                                </div>
                                                                <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`final-${project.id}`}
                                                                        checked={uploadFormData.isFinal}
                                                                        onChange={e => setUploadFormData({ ...uploadFormData, isFinal: e.target.checked })}
                                                                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                                                    />
                                                                    <label htmlFor={`final-${project.id}`} style={{ margin: 0, cursor: 'pointer', fontWeight: '500' }}>
                                                                        This is the final day (Mark Project Completed)
                                                                    </label>
                                                                </div>
                                                                <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                                    <button type="submit" className="submit-btn" disabled={uploadingImage === `project-${project.id}`}>
                                                                        {uploadingImage === `project-${project.id}` ? 'Uploading...' : 'Upload'}
                                                                    </button>
                                                                    <button type="button" onClick={cancelUpload} className="cancel-btn">Cancel</button>
                                                                </div>
                                                            </form>
                                                        ) : (
                                                            <button
                                                                className="upload-btn primary"
                                                                onClick={() => startUploadProject(project)}
                                                            >
                                                                <Upload size={16} />
                                                                Upload Progress Image
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
