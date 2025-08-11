// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


// Institutuion registration
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadDocuments } from '../services/documentService';
import { applyForInstitutionRegistration } from '../services/institutionService';

const InstitutionRegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [documents, setDocuments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDocumentUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const uploadResult = await uploadDocuments(file);
      setDocuments(prev => ({
        ...prev,
        [fieldName]: uploadResult.filePath
      }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const onSubmit = async (data) => {
    if (Object.keys(documents).length < 3) {
      alert('Please upload all required documents');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await applyForInstitutionRegistration({
        ...data,
        documents
      });
      setSuccess(true);
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded-lg">
        <h3 className="font-bold text-lg">Application Submitted Successfully!</h3>
        <p>Your application ID is: {Date.now()}</p>
        <p>You will be notified once your application is reviewed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Institution Name</label>
          <input
            {...register("institutionName", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.institutionName && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Institution Type</label>
          <select
            {...register("institutionType", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select type</option>
            <option value="Early Learning">Early Learning</option>
            <option value="Primary">Primary</option>
            <option value="Junior Secondary">Junior Secondary</option>
            <option value="High School">High School</option>
            <option value="TVET">TVET</option>
            <option value="University">University</option>
          </select>
          {errors.institutionType && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Required Documents</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Certificate</label>
          <input
            type="file"
            onChange={(e) => handleDocumentUpload(e, 'registrationCertificate')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">KRA Pin Certificate</label>
          <input
            type="file"
            onChange={(e) => handleDocumentUpload(e, 'kraPin')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        {/* More document upload fields */}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default InstitutionRegistrationForm;

// RBAC Views
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CountyDashboard from './dashboards/CountyDashboard';
import InstitutionDashboard from './dashboards/InstitutionDashboard';
import NationalDashboard from './dashboards/NationalDashboard';
import PublicDashboard from './dashboards/PublicDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardComponent, setDashboardComponent] = useState(null);

  useEffect(() => {
    const loadDashboard = () => {
      switch (user?.role) {
        case 'national_admin':
          setDashboardComponent(<NationalDashboard />);
          break;
        case 'county_admin':
          setDashboardComponent(<CountyDashboard />);
          break;
        case 'institution_admin':
        case 'institution_staff':
          setDashboardComponent(<InstitutionDashboard />);
          break;
        default:
          setDashboardComponent(<PublicDashboard />);
      }
      setLoading(false);
    };

    loadDashboard();
  }, [user]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {dashboardComponent}
    </div>
  );
};

export default Dashboard;
  

// src/components/GradeChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GradeChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Performance by Subject',
      },
    },
  };

  const data = {
    labels: ['Math', 'English', 'Science', 'History', 'Geography'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 78, 92, 65, 70],
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

// src/App.js
import React from 'react';
import { GradeChart } from './components/GradeChart';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        education Management System
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <GradeChart />
      </div>
    </div>
  );
}

export default App;
