'use client';
import { useState, useEffect } from 'react';

const Settings = ({ admin }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState('');

  // Properly handle admin prop changes
  useEffect(() => {
    if (admin) {
      // Handle both id and _id cases
      const id = admin._id || admin.id;
      if (id) {
        setAdminId(id);
      } else {
        console.error('Admin object missing ID:', admin);
        setMessage('Admin information incomplete. Please refresh the page.');
      }
    } else {
      console.error('Admin prop not provided');
      setMessage('Admin information not available. Please refresh the page.');
    }
  }, [admin]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate all fields including adminId
    if (!adminId || !currentPassword || !newPassword || !confirmPassword) {
      return setMessage('All fields are required.');
    }

    if (newPassword !== confirmPassword) {
      return setMessage('New passwords do not match.');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      setMessage('✅ Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Password update error:', err);
      setMessage(`❌ ${err.message || 'Server error. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state if adminId isn't set yet
  if (!adminId) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <p className="text-center">Loading admin information...</p>
        {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-12  border border-gray-100 transition-all duration-300 hover:shadow-2xl">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-1">Update Password</h2>
    <p className="text-sm text-gray-500">Secure your account with a new password</p>
  </div>
  
  <form onSubmit={handlePasswordUpdate} className="space-y-5">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
      <div className="relative">
        <input
          type="password"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
        <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
      <div className="relative">
        <input
          type="password"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
        <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <p className="text-xs text-gray-500">Minimum 8 characters with at least one number</p>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
      <div className="relative">
        <input
          type="password"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
        <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    {message && (
      <div className={`p-3 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} transition-opacity duration-300`}>
        <div className="flex items-center">
          {message.includes('✅') ? (
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="text-sm">{message}</span>
        </div>
      </div>
    )}

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
    >
      <div className="flex items-center justify-center">
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {loading ? 'Updating Password...' : 'Update Password'}
      </div>
    </button>
  </form>
</div>
  );
};

export default Settings;