# Frontend Implementation Guide

## Overview
This guide provides step-by-step instructions to implement the frontend features for:
1. Employee photo upload during creation
2. Displaying employee details to clients
3. Employee visit scheduling

## 1. Admin Dashboard - Employee Photo Upload

### File: `src/pages/AdminDashboard.jsx`

#### Step 1.1: Update State for Photo
Find the `newEmployee` state and add a photo field:

```javascript
const [newEmployee, setNewEmployee] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    department: '',
    photo: null  // ADD THIS
});

// Add new state for photo preview
const [photoPreview, setPhotoPreview] = useState(null);  // ADD THIS
```

#### Step 1.2: Add Photo Input Handler
Add this function after the state declarations:

```javascript
const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setNewEmployee({ ...newEmployee, photo: file });
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
};
```

#### Step 1.3: Update createEmployee Function
Replace the existing `createEmployee` function with:

```javascript
const createEmployee = async (e) => {
    e.preventDefault();
    try {
        // Create FormData instead of JSON
        const formData = new FormData();
        formData.append('email', newEmployee.email);
        formData.append('password', newEmployee.password);
        formData.append('name', newEmployee.name);
        formData.append('phone', newEmployee.phone);
        formData.append('department', newEmployee.department);
        if (newEmployee.photo) {
            formData.append('photo', newEmployee.photo);
        }

        const response = await fetch(`${API_URL}/api/admin/employees`, {
            method: 'POST',
            headers: {
                // Remove 'Content-Type' - browser will set it automatically with boundary
                ...getAuthHeader()
            },
            body: formData  // Send FormData instead of JSON
        });

        if (response.ok) {
            setShowEmployeeForm(false);
            setNewEmployee({
                email: '',
                password: '',
                name: '',
                phone: '',
                department: '',
                photo: null
            });
            setPhotoPreview(null);
            fetchData();
            alert('Employee created successfully!');
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to create employee');
        }
    } catch (error) {
        console.error('Error creating employee:', error);
        alert('Failed to create employee');
    }
};
```

#### Step 1.4: Update Employee Form JSX
Find the employee form in the JSX and add the photo input field:

```jsx
{/* Add this after the department input */}
<div className="form-group">
    <label>Employee Photo (Optional)</label>
    <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="form-control"
    />
    {photoPreview && (
        <div style={{ marginTop: '10px' }}>
            <img 
                src={photoPreview} 
                alt="Preview" 
                style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                }} 
            />
        </div>
    )}
</div>
```

#### Step 1.5: Display Employee Photos in List
Update the employee list to show photos:

```jsx
{/* In the employee list section */}
<div className="employee-card">
    {employee.photoPath && (
        <img 
            src={`${API_URL}${employee.photoPath}`} 
            alt={employee.name}
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px'
            }}
        />
    )}
    <div>
        <strong>{employee.name}</strong>
        <div>{employee.email}</div>
    </div>
</div>
```

---

## 2. Client Portal - Display Employee Details

### File: `src/pages/UserDashboard.jsx`

#### Step 2.1: Update Complaint/Enquiry Display
Find where complaints are displayed and add employee information:

```jsx
{/* For each complaint */}
{complaint.assignedEmployeeName && (
    <div className="assigned-employee-card" style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    }}>
        {complaint.assignedEmployeePhoto && (
            <img 
                src={`${API_URL}${complaint.assignedEmployeePhoto}`}
                alt={complaint.assignedEmployeeName}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
            />
        )}
        <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#2563eb' }}>
                Assigned to: {complaint.assignedEmployeeName}
            </h4>
            {complaint.assignedEmployeePhone && (
                <p style={{ margin: '0', color: '#666' }}>
                    📞 {complaint.assignedEmployeePhone}
                </p>
            )}
            {complaint.visitSchedule && (
                <div style={{
                    marginTop: '10px',
                    padding: '8px',
                    backgroundColor: '#e0f2fe',
                    borderRadius: '4px'
                }}>
                    <strong>Scheduled Visit:</strong>
                    <div>
                        📅 {new Date(complaint.visitSchedule.scheduledDate).toLocaleDateString()}
                    </div>
                    <div>
                        🕐 {complaint.visitSchedule.scheduledTime}
                    </div>
                    {complaint.visitSchedule.notes && (
                        <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                            Note: {complaint.visitSchedule.notes}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
)}
```

---

## 3. Employee Portal - Visit Scheduling

### File: `src/pages/EmployeeDashboard.jsx`

#### Step 3.1: Add State for Scheduling
```javascript
const [showScheduleModal, setShowScheduleModal] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
const [scheduleData, setScheduleData] = useState({
    scheduledDate: '',
    scheduledTime: '',
    notes: ''
});
```

#### Step 3.2: Add Schedule Functions
```javascript
const openScheduleModal = async (task, type) => {
    setSelectedTask({ ...task, type }); // type: 'complaint' or 'enquiry'
    
    // Fetch existing schedule if any
    try {
        const endpoint = type === 'complaint' 
            ? `/api/employees/complaints/${task.id}/schedule`
            : `/api/employees/enquiries/${task.id}/schedule`;
            
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: getAuthHeader()
        });
        
        if (response.ok) {
            const schedule = await response.json();
            if (schedule) {
                setScheduleData({
                    scheduledDate: schedule.scheduledDate,
                    scheduledTime: schedule.scheduledTime,
                    notes: schedule.notes || ''
                });
            }
        }
    } catch (error) {
        console.error('Error fetching schedule:', error);
    }
    
    setShowScheduleModal(true);
};

const handleScheduleVisit = async (e) => {
    e.preventDefault();
    
    try {
        const endpoint = selectedTask.type === 'complaint'
            ? `/api/employees/complaints/${selectedTask.id}/schedule`
            : `/api/employees/enquiries/${selectedTask.id}/schedule`;
            
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(scheduleData)
        });
        
        if (response.ok) {
            alert('Visit scheduled successfully!');
            setShowScheduleModal(false);
            setScheduleData({ scheduledDate: '', scheduledTime: '', notes: '' });
            fetchTasks(); // Refresh tasks
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to schedule visit');
        }
    } catch (error) {
        console.error('Error scheduling visit:', error);
        alert('Failed to schedule visit');
    }
};
```

#### Step 3.3: Add Schedule Button to Tasks
```jsx
{/* Add this button to each complaint/enquiry card */}
<button
    onClick={() => openScheduleModal(complaint, 'complaint')}
    className="btn btn-primary"
    style={{ marginTop: '10px' }}
>
    📅 Schedule Visit
</button>
```

#### Step 3.4: Add Schedule Modal JSX
```jsx
{/* Add this modal at the end of the component, before the closing div */}
{showScheduleModal && (
    <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Schedule Visit</h3>
            <form onSubmit={handleScheduleVisit}>
                <div className="form-group">
                    <label>Date *</label>
                    <input
                        type="date"
                        value={scheduleData.scheduledDate}
                        onChange={(e) => setScheduleData({
                            ...scheduleData,
                            scheduledDate: e.target.value
                        })}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                
                <div className="form-group">
                    <label>Time *</label>
                    <input
                        type="time"
                        value={scheduleData.scheduledTime}
                        onChange={(e) => setScheduleData({
                            ...scheduleData,
                            scheduledTime: e.target.value
                        })}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea
                        value={scheduleData.notes}
                        onChange={(e) => setScheduleData({
                            ...scheduleData,
                            notes: e.target.value
                        })}
                        rows="3"
                        placeholder="Any special notes about the visit..."
                    />
                </div>
                
                <div className="modal-actions">
                    <button type="submit" className="btn btn-primary">
                        Save Schedule
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setShowScheduleModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
```

#### Step 3.5: Display Scheduled Visits in Task List
```jsx
{/* Add this inside each task card */}
{complaint.visitSchedule && (
    <div className="visit-schedule-badge" style={{
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: '8px',
        borderRadius: '4px',
        marginTop: '10px',
        fontSize: '14px'
    }}>
        <strong>Scheduled:</strong> {' '}
        {new Date(complaint.visitSchedule.scheduledDate).toLocaleDateString()} at {' '}
        {complaint.visitSchedule.scheduledTime}
    </div>
)}
```

---

## 4. CSS Additions

Add these styles to your CSS files:

```css
/* Modal styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: flex-end;
}

/* Employee card styles */
.assigned-employee-card {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## Testing Checklist

### Admin Dashboard
- [ ] Can upload employee photo during creation
- [ ] Photo preview shows before submission
- [ ] Employee created successfully with photo
- [ ] Employee created successfully without photo
- [ ] Employee photos display in employee list

### Client Portal
- [ ] Employee details show when assigned to complaint
- [ ] Employee photo displays correctly
- [ ] Employee phone number is visible
- [ ] Visit schedule displays when scheduled
- [ ] All information updates in real-time

### Employee Portal
- [ ] "Schedule Visit" button appears on tasks
- [ ] Schedule modal opens correctly
- [ ] Can set date and time
- [ ] Can add optional notes
- [ ] Schedule saves successfully
- [ ] Scheduled visit displays in task card
- [ ] Can update existing schedule

---

## Important Notes

1. **API_URL**: Make sure `API_URL` is correctly imported in all files
2. **Auth Headers**: Ensure `getAuthHeader()` function is available
3. **Image Paths**: All employee photos are served from `/uploads/` directory
4. **Date Format**: Use `new Date().toISOString().split('T')[0]` for date inputs
5. **Error Handling**: Always add try-catch blocks and user-friendly error messages

## Next Steps After Implementation

1. Test all features locally
2. Deploy to production
3. Test on production environment
4. Gather user feedback
5. Iterate based on feedback
