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


// User registration form
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { roles, institutionTypes, institutionCategories } from '../constants';

const UserRegistrationForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  
  const selectedRole = watch('role');
  const selectedCounty = watch('county_id');

  // Fetch counties, subcounties, and institutions based on selections
  // Implement these functions as needed
  const fetchCounties = async () => { /* ... */ };
  const fetchSubCounties = async (countyId) => { /* ... */ };
  const fetchInstitutions = async (subCountyId) => { /* ... */ };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email*
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">
            National ID
          </label>
          <input
            type="text"
            id="nationalId"
            {...register('nationalId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role*
          </label>
          <select
            id="role"
            {...register('role', { required: 'Role is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.role ? 'border-red-500' : ''}`}
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>
      </div>

      {/* Conditional fields based on role */}
      {selectedRole === 'county_admin' && (
        <div>
          <label htmlFor="county_id" className="block text-sm font-medium text-gray-700">
            County*
          </label>
          <select
            id="county_id"
            {...register('county_id', { required: 'County is required for county admin' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.county_id ? 'border-red-500' : ''}`}
            onChange={(e) => fetchSubCounties(e.target.value)}
          >
            <option value="">Select a county</option>
            {counties.map(county => (
              <option key={county.id} value={county.id}>{county.name}</option>
            ))}
          </select>
          {errors.county_id && <p className="mt-1 text-sm text-red-600">{errors.county_id.message}</p>}
        </div>
      )}

      {selectedRole === 'subcounty_admin' && (
        <>
          <div>
            <label htmlFor="county_id" className="block text-sm font-medium text-gray-700">
              County*
            </label>
            <select
              id="county_id"
              {...register('county_id', { required: 'County is required for subcounty admin' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.county_id ? 'border-red-500' : ''}`}
              onChange={(e) => fetchSubCounties(e.target.value)}
            >
              <option value="">Select a county</option>
              {counties.map(county => (
                <option key={county.id} value={county.id}>{county.name}</option>
              ))}
            </select>
            {errors.county_id && <p className="mt-1 text-sm text-red-600">{errors.county_id.message}</p>}
          </div>

          <div>
            <label htmlFor="sub_county_id" className="block text-sm font-medium text-gray-700">
              Subcounty*
            </label>
            <select
              id="sub_county_id"
              {...register('sub_county_id', { required: 'Subcounty is required for subcounty admin' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.sub_county_id ? 'border-red-500' : ''}`}
            >
              <option value="">Select a subcounty</option>
              {subCounties.map(subCounty => (
                <option key={subCounty.id} value={subCounty.id}>{subCounty.name}</option>
              ))}
            </select>
            {errors.sub_county_id && <p className="mt-1 text-sm text-red-600">{errors.sub_county_id.message}</p>}
          </div>
        </>
      )}

      {selectedRole === 'institution_admin' || selectedRole === 'institution_staff' && (
        <>
          <div>
            <label htmlFor="county_id" className="block text-sm font-medium text-gray-700">
              County*
            </label>
            <select
              id="county_id"
              {...register('county_id', { required: 'County is required' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.county_id ? 'border-red-500' : ''}`}
              onChange={(e) => fetchSubCounties(e.target.value)}
            >
              <option value="">Select a county</option>
              {counties.map(county => (
                <option key={county.id} value={county.id}>{county.name}</option>
              ))}
            </select>
            {errors.county_id && <p className="mt-1 text-sm text-red-600">{errors.county_id.message}</p>}
          </div>

          <div>
            <label htmlFor="sub_county_id" className="block text-sm font-medium text-gray-700">
              Subcounty*
            </label>
            <select
              id="sub_county_id"
              {...register('sub_county_id', { required: 'Subcounty is required' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.sub_county_id ? 'border-red-500' : ''}`}
              onChange={(e) => fetchInstitutions(e.target.value)}
            >
              <option value="">Select a subcounty</option>
              {subCounties.map(subCounty => (
                <option key={subCounty.id} value={subCounty.id}>{subCounty.name}</option>
              ))}
            </select>
            {errors.sub_county_id && <p className="mt-1 text-sm text-red-600">{errors.sub_county_id.message}</p>}
          </div>

          <div>
            <label htmlFor="institution_id" className="block text-sm font-medium text-gray-700">
              Institution*
            </label>
            <select
              id="institution_id"
              {...register('institution_id', { required: 'Institution is required' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.institution_id ? 'border-red-500' : ''}`}
            >
              <option value="">Select an institution</option>
              {institutions.map(institution => (
                <option key={institution.institution_id} value={institution.institution_id}>
                  {institution.name} ({institution.type})
                </option>
              ))}
            </select>
            {errors.institution_id && <p className="mt-1 text-sm text-red-600">{errors.institution_id.message}</p>}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password*
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password*
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => 
                value === watch('password') || 'Passwords do not match'
            })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          {...register('terms', { required: 'You must accept the terms and conditions' })}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          I accept the terms and conditions
        </label>
      </div>
      {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default UserRegistrationForm;


// Institutuion registration form
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

      <div>
          <label className="block text-sm font-medium text-gray-700">Institution Category</label>
          <select
            {...register("institutionCategory", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select type</option>
            <option value="Community Based">Community Based</option>
            <option value="Faith Based">Faith Based</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
          {errors.institutionCategory && <span className="text-red-500 text-sm">This field is required</span>}
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

// Dashboards
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
  
// Learner Progress
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { recordLearnerProgress } from '../services/progressService';

const ProgressEntryForm = ({ learner, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics', marks: '', grade: '' },
    { name: 'English', marks: '', grade: '' },
    { name: 'Kiswahil', marks: '', grade: '' },
    { name: 'Integrated Science', marks: '', grade: '' },
    { name: 'Home Science', marks: '', grade: '' },
    { name: 'Creative Arts', marks: '', grade: '' },
    { name: 'Performing Arts', marks: '', grade: '' },
    // More subjects...
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    
    // Auto-calculate grade if marks are entered
    if (field === 'marks' && value) {
      const marks = parseFloat(value);
      newSubjects[index].grade = calculateGrade(marks);
    }
    
    setSubjects(newSubjects);
  };

  const calculateGrade = (marks) => {
    if (marks >= 80) return 'A';
    if (marks >= 75) return 'A-';
    if (marks >= 70) return 'B+';
    if (marks >= 65) return 'B';
    if (marks >= 60) return 'B-';
    if (marks >= 55) return 'C+';
    if (marks >= 50) return 'C';
    if (marks >= 45) return 'C-';
    if (marks >= 40) return 'D+';
    if (marks >= 35) return 'D';
    if (marks >= 30) return 'D-';
    return 'E';
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await recordLearnerProgress({
        learnerId: learner.learner_id,
        academicYear: data.academicYear,
        term: data.term,
        grade: data.grade,
        subjects: subjects.map(subj => ({
          subject: subj.name,
          marks: parseFloat(subj.marks),
          grade: subj.grade
        })),
        remarks: data.remarks
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to record progress:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Year</label>
          <select
            {...register("academicYear", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select year</option>
            <option value="2023">2025</option>
            <option value="2024">2026</option>
            <option value="2023">2027</option>
            <option value="2024">2028</option>
            <option value="2023">2029</option>
            <option value="2024">2030</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Term</label>
          <select
            {...register("term", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select term</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Grade/Class</label>
          <input
            {...register("grade", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Subjects</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={subject.marks}
                      onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.grade || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Remarks</label>
        <textarea
          {...register("remarks")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Progress'}
      </button>
    </form>
  );
};

export default ProgressEntryForm;

  
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
