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
            type="radio"
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
              type="radio"
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
              type="radio"
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
              type="radio"
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
              type="radio"
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


// Password reset form
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const PasswordResetForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setResetSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (resetSent) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Password reset link sent
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                We've sent a password reset link to your email. This link will expire in 30 Minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address*
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  );
};

export default PasswordResetForm;


// Institution Registration
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadDocuments } from '../services/documentService';
import { applyForInstitutionRegistration } from '../services/institutionService';

const InstitutionRegistrationForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [zones, setZones] = useState([]);
  const [documents, setDocuments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch data functions would be implemented here
  const fetchCounties = async () => { /* ... */ };
  const fetchSubCounties = async (countyId) => { /* ... */ };
  const fetchZones = async (subCountyId) => { /* ... */ };

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

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Institution registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">
          Institution Name*
        </label>
        <input
          type="text"
          id="institutionName"
          {...register('institutionName', { required: 'Institution name is required' })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.institutionName ? 'border-red-500' : ''}`}
        />
        {errors.institutionName && <p className="mt-1 text-sm text-red-600">{errors.institutionName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700">
            Institution Type*
          </label>
          <select
            type="checkbox"
            id="institutionType"
            {...register('institutionType', { required: 'Institution type is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.institutionType ? 'border-red-500' : ''}`}
          >
            <option value="">Select type</option>
            <option value="Early Learning">Early Learning</option>
            <option value="Primary">Primary</option>
            <option value="Junior Secondary">Junior Secondary</option>
            <option value="High School">High School</option>
            <option value="TVET">TVET</option>
            <option value="University">University</option>
          </select>
          {errors.institutionType && <p className="mt-1 text-sm text-red-600">{errors.institutionType.message}</p>}
        </div>

        <div>
          <label htmlFor="institutionCategory" className="block text-sm font-medium text-gray-700">
            Institution Category*
          </label>
          <select
            type="dropdown"
            id="institutionCategory"
            {...register('institutionCategory', { required: 'Institution category is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.institutionCategory ? 'border-red-500' : ''}`}
          >
            <option value="">Select category</option>
            <option value="Community Based">Community Based</option>
            <option value="Faith Based">Faith Based</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
          {errors.institutionCategory && <p className="mt-1 text-sm text-red-600">{errors.institutionCategory.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="county_id" className="block text-sm font-medium text-gray-700">
            County*
          </label>
          <select
            type="dropdown"
            id="county_id"
            {...register('county_id', { required: 'County is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.county_id ? 'border-red-500' : ''}`}
            onChange={(e) => fetchSubCounties(e.target.value)}
          >
            <option value="">Select county</option>
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
            type="dropdown"
            id="sub_county_id"
            {...register('sub_county_id', { required: 'Subcounty is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.sub_county_id ? 'border-red-500' : ''}`}
            disabled={!selectedCounty}
            onChange={(e) => fetchZones(e.target.value)}
          >
            <option value="">Select subcounty</option>
            {subCounties.map(subCounty => (
              <option key={subCounty.id} value={subCounty.id}>{subCounty.name}</option>
            ))}
          </select>
          {errors.sub_county_id && <p className="mt-1 text-sm text-red-600">{errors.sub_county_id.message}</p>}
        </div>

        <div>
          <label htmlFor="zone_id" className="block text-sm font-medium text-gray-700">
            Zone*
          </label>
          <textarea
            id="zone_id"
            {...register('zone_id', { required: 'Zone is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.zone_id ? 'border-red-500' : ''}`}
            disabled={!selectedSubCounty}
          >
            <option value="">Select zone</option>
            {zones.map(zone => (
              <option key={zone.id} value={zone.id}>{zone.name}</option>
            ))}
          </select>
          {errors.zone_id && <p className="mt-1 text-sm text-red-600">{errors.zone_id.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="physicalAddress" className="block text-sm font-medium text-gray-700">
          Physical Address*
        </label>
        <textarea
          id="physicalAddress"
          rows={3}
          {...register('physicalAddress', { required: 'Physical address is required' })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.physicalAddress ? 'border-red-500' : ''}`}
        />
        {errors.physicalAddress && <p className="mt-1 text-sm text-red-600">{errors.physicalAddress.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
            Contact Email*
          </label>
          <input
            type="email"
            id="contactEmail"
            {...register('contactEmail', { 
              required: 'Contact email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.contactEmail ? 'border-red-500' : ''}`}
          />
          {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>}
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
            Contact Phone*
          </label>
          <input
            type="tel"
            id="contactPhone"
            {...register('contactPhone', { required: 'Contact phone is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.contactPhone ? 'border-red-500' : ''}`}
          />
          {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Registration Documents*
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="documents"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  // onChange={(e) => handleDocumentUpload(e, 'CertificateOfIncoporation', 'kraPin', 'PremiseTitle', )}
                  multiple
                  {...register('documents', { required: 'Registration documents are required' })}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, JPG, PNG up to 10MB
            </p>
          </div>
        </div>
        {errors.documents && <p className="mt-1 text-sm text-red-600">{errors.documents.message}</p>}
      </div>

          
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default InstitutionRegistrationForm;


// Institution status update form
import { useForm } from 'react-hook-form';

const InstitutionStatusForm = ({ institution, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      status: institution?.status || 'Pending'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Status</label>
        <p className="mt-1 text-sm text-gray-900">{institution?.status}</p>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          New Status*
        </label>
        <select
          type="radio"
          id="status"
          {...register('status', { required: 'Status is required' })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.status ? 'border-red-500' : ''}`}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Suspended">Suspended</option>
          <option value="Deregistered">Deregistered</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          {...register('notes')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Status
        </button>
      </div>
    </form>
  );
};

export default InstitutionStatusForm;


// Learner Registration
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LearnerRegistrationForm = ({ institutionId, onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isForeign, setIsForeign] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const DateOfBirthPicker = ({ register, errors }) => {
  const [startDate, setStartDate] = useState(null);


  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        institutionId,
        isForeign
      });
    } catch (error) {
      console.error('Learner registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="surName" className="block text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            id="surName"
            {...register('surName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
          Date of Birth*
        </label>
        <DatePicker
          id="dateOfBirth"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            // Update the form value for react-hook-form
            register('dateOfBirth', { required: 'Date of birth is required' }).onChange(date);
          }}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.dateOfBirth ? 'border-red-500' : ''}`}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select date"
        />
        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
      </div>
    </div>
            );
};

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender*
          </label>
          <select
            type="radio"
            id="gender"
            {...register('gender', { required: 'Gender is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.gender ? 'border-red-500' : ''}`}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="currentGrade" className="block text-sm font-medium text-gray-700">
            Current Grade*
          </label>
          <select
            type="dropdown"
            id="currentGrade"
            {...register('currentGrade', { required: 'Current grade is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.currentGrade ? 'border-red-500' : ''}`}
          >
            <option value="">Select grade</option>
            <option value="pp1">pp1</option>
            <option value="pp2">pp2</option>
            <option value="garde1">garde1</option>
            <option value="grade2">grade2</option>
            <option value="grade3">grade3</option>
            <option value="grade4">garde4</option>
            <option value="grade5">grade5</option>
            <option value="grade6">grade6</option>
            <option value="grade7">grade7</option>
            <option value="grade8">grade8</option>
            <option value="grade9">grade9</option>
            <option value="form1">form1</option>
            <option value="form2">form2</option>
            <option value="form3">form3</option>
            <option value="tivet4">tivet4</option>
            <option value="tivet5">tivet5</option>
            <option value="tivet6">tivet6</option>
            <option value="university_first_year">university_first_year</option>
            <option value="university_first_year">university_second_year</option>
            <option value="university_first_year">university_third_year</option>
            <option value="university_first_year">university_fourth_year</option>
          </select>
          {errors.currentGrade && <p className="mt-1 text-sm text-red-600">{errors.currentGrade.message}</p>}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isForeign"
          name="isForeign"
          type="checkbox"
          checked={isForeign}
          onChange={(e) => setIsForeign(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isForeign" className="ml-2 block text-sm text-gray-900">
          Foreign Learner
        </label>
      </div>

      {isForeign ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">
              Passport Number*
            </label>
            <input
              type="text"
              id="passportNumber"
              {...register('passportNumber', { 
                required: isForeign ? 'Passport number is required for foreign learners' : false 
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.passportNumber ? 'border-red-500' : ''}`}
            />
            {errors.passportNumber && <p className="mt-1 text-sm text-red-600">{errors.passportNumber.message}</p>}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country of Origin*
            </label>
            <input
              type="text"
              id="country"
              {...register('country', { 
                required: isForeign ? 'Country is required for foreign learners' : false 
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.country ? 'border-red-500' : ''}`}
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
          </div>

          <div>
            <label htmlFor="visaType" className="block text-sm font-medium text-gray-700">
              Visa Type
            </label>
            <input
              type="text"
              id="visaType"
              {...register('visaType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      ) : (
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
            <label htmlFor="birthCertificateNo" className="block text-sm font-medium text-gray-700">
              Birth Certificate No.
            </label>
            <input
              type="text"
              id="birthCertificateNo"
              {...register('birthCertificateNo')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Parent/Guardian Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="parentFirstName" className="block text-sm font-medium text-gray-700">
            First Name*
          </label>
          <input
            type="text"
            id="parentFirstName"
            {...register('parentFirstName', { required: 'Parent first name is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.parentFirstName ? 'border-red-500' : ''}`}
          />
          {errors.parentFirstName && <p className="mt-1 text-sm text-red-600">{errors.parentFirstName.message}</p>}
        </div>

        <div>
          <label htmlFor="parentLastName" className="block text-sm font-medium text-gray-700">
            Last Name*
          </label>
          <input
            type="text"
            id="parentLastName"
            {...register('parentLastName', { required: 'Parent last name is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.parentLastName ? 'border-red-500' : ''}`}
          />
          {errors.parentLastName && <p className="mt-1 text-sm text-red-600">{errors.parentLastName.message}</p>}
        </div>

        <div>
          <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
            Relationship*
          </label>
          <select
            type="radio"
            id="relationship"
            {...register('relationship', { required: 'Relationship is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.relationship ? 'border-red-500' : ''}`}
          >
            <option value="">Select relationship</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="guardian">guardian</option>
          </select>
          {errors.relationship && <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <input
            type="tel"
            id="parentPhone"
            {...register('parentPhone', { required: 'Phone number is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.parentPhone ? 'border-red-500' : ''}`}
          />
          {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone.message}</p>}
        </div>

        <div>
          <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="parentEmail"
            {...register('parentEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Registering...' : 'Register Learner'}
        </button>
      </div>
    </form>
  );
};

export default LearnerRegistrationForm;


// Learner Progress
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { recordLearnerProgress } from '../services/progressService';

const ProgressForm = ({ learner, academicYears, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics', marks: '', grade: '' },
    { name: 'English', marks: '', grade: '' },
    { name: 'Kiswahili', marks: '', grade: '' },
    { name: 'Integrated Science', marks: '', grade: '' },
    { name: 'Home Science', marks: '', grade: '' },
    { name: 'Creative Arts', marks: '', grade: '' },
    { name: 'Performing Arts', marks: '', grade: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;

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
          grade: subj.grade,
        })),
        remarks: data.remarks,
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to record progress:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">Academic Year*</label>
          <select
            id="academicYear"
            {...register('academicYear', { required: 'Academic year is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.academicYear ? 'border-red-500' : ''}`}
          >
            <option value="">Select year</option>
            {academicYears.map(year => (
              <option key={year.id} value={year.year}>{year.year}</option>
            ))}
          </select>
          {errors.academicYear && <p className="mt-1 text-sm text-red-600">{errors.academicYear.message}</p>}
        </div>

        <div>
          <label htmlFor="term" className="block text-sm font-medium text-gray-700">Term*</label>
          <select
            id="term"
            {...register('term', { required: 'Term is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.term ? 'border-red-500' : ''}`}
          >
            <option value="">Select term</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
          {errors.term && <p className="mt-1 text-sm text-red-600">{errors.term.message}</p>}
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade/Class*</label>
          <input
            type="text"
            id="grade"
            {...register('grade', { required: 'Grade is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.grade ? 'border-red-500' : ''}`}
          />
          {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.grade || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks*</label>
        <textarea
          id="remarks"
          {...register('remarks', { required: 'Remarks are required' })}
          rows={3}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.remarks ? 'border-red-500' : ''}`}
        />
        {errors.remarks && <p className="mt-1 text-sm text-red-600">{errors.remarks.message}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Progress'}
        </button>
      </div>
    </form>
  );
};

export default ProgressForm;


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
