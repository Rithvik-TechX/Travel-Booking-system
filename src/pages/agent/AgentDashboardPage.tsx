import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { usePackages } from '../../context/PackagesContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import MainLayout from '../layouts/MainLayout';
import PackagesList from '../../components/agent/PackagesList';
import Button from '../../components/common/Button';

const AgentDashboardPage: React.FC = () => {
  const { currentUser, registerAgent } = useAuth();
  const { getPackagesByAgent, deletePackage } = usePackages();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const packages = currentUser ? getPackagesByAgent(currentUser.id) : [];

  // Create Agent Account form state
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPassword, setAgentPassword] = useState('');
  const [agentError, setAgentError] = useState('');
  const [agentLoading, setAgentLoading] = useState(false);

  const handleCreatePackage = () => {
    navigate('/agent/create-package');
  };
  
  const handleEditPackage = (id: string) => {
    navigate(`/agent/edit-package/${id}`);
  };
  
  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(id);
      showToast('Package deleted successfully', 'success');
    }
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    setAgentError('');

    if (!agentName || !agentEmail || !agentPassword) {
      setAgentError('Please fill in all fields');
      return;
    }
    if (agentPassword.length < 6) {
      setAgentError('Password must be at least 6 characters');
      return;
    }

    setAgentLoading(true);
    setTimeout(() => {
      const success = registerAgent(agentName, agentEmail, agentPassword);
      if (success) {
        showToast(`Agent account created for ${agentName}!`, 'success');
        setAgentName('');
        setAgentEmail('');
        setAgentPassword('');
        setShowAgentForm(false);
      } else {
        setAgentError('Failed. Email might already be in use.');
      }
      setAgentLoading(false);
    }, 500);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-100 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAgentForm(!showAgentForm)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {showAgentForm ? 'Cancel' : 'Add Agent'}
              </Button>
              <Button onClick={handleCreatePackage}>
                Create New Package
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Welcome, {currentUser?.name}</h2>
            <p className="text-gray-600">
              Manage your travel packages below. You have <strong>{packages.length}</strong> active package{packages.length !== 1 ? 's' : ''}.
            </p>
          </div>

          {/* Create Agent Account Section */}
          {showAgentForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold mb-1">Create New Agent Account</h2>
              <p className="text-sm text-gray-500 mb-4">
                Create a login for another travel agent. They will be able to manage their own packages.
              </p>

              {agentError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                  <p className="text-sm text-red-700">{agentError}</p>
                </div>
              )}

              <form onSubmit={handleCreateAgent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="agent-name"
                    type="text"
                    required
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Agent name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="agent-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="agent-email"
                    type="email"
                    required
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    placeholder="agent@email.com"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="agent-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="agent-password"
                    type="password"
                    required
                    value={agentPassword}
                    onChange={(e) => setAgentPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <Button type="submit" isLoading={agentLoading}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Agent Account
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Travel Packages</h2>
            <PackagesList
              packages={packages}
              onEdit={handleEditPackage}
              onDelete={handleDeletePackage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentDashboardPage;