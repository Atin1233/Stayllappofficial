import React, { useState, useEffect } from 'react';
import { getTenants, type Tenant } from '../services/api';
import toast from 'react-hot-toast';
import AddTenantModal from './AddTenantModal';

const TenantManagement: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTenants = async () => {
    setIsLoading(true);
    try {
      const response = await getTenants();
      setTenants(response.data);
    } catch (error) {
      toast.error('Failed to fetch tenants.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleTenantCreated = () => {
    setIsModalOpen(false);
    fetchTenants(); // Refetch tenants to show the new one
  };

  const getActiveLease = (leases: Tenant['leases']) => {
    return leases?.find(lease => lease?.status === 'ACTIVE');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Tenant Management</h1>
          <p className="text-gray-400">Manage your tenants and their lease agreements.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          + Add Tenant
        </button>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Current Lease
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-900 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Rent
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <p className="text-gray-400">Loading tenants...</p>
                </td>
              </tr>
            ) : tenants.length > 0 ? (
              tenants.map(tenant => {
                const activeLease = getActiveLease(tenant.leases);
                return (
                  <tr key={tenant.id} className="hover:bg-gray-700">
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      <p className="text-white whitespace-no-wrap">{tenant.firstName ?? ''} {tenant.lastName ?? ''}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      <p className="text-gray-300 whitespace-no-wrap">{tenant.email}</p>
                      <p className="text-gray-400 whitespace-no-wrap">{tenant.phone || 'N/A'}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      {activeLease ? (
                        <div>
                          <p className="text-white whitespace-no-wrap">{activeLease.property?.title ?? 'N/A'}</p>
                          <p className="text-gray-400 text-xs whitespace-no-wrap">
                            {activeLease.startDate ? new Date(activeLease.startDate).toLocaleDateString() : 'N/A'} - {activeLease.endDate ? new Date(activeLease.endDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-500">No Active Lease</span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                      <p className="text-white whitespace-no-wrap">
                        {activeLease && typeof activeLease.monthlyRent === 'number' ? `$${activeLease.monthlyRent.toFixed(2)}` : 'N/A'}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-700 text-sm text-right">
                      <button className="text-blue-400 hover:text-blue-300 font-semibold">
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <p className="text-gray-400">No tenants found. Get started by adding one.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddTenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTenantCreated={handleTenantCreated}
      />
    </div>
  );
};

export default TenantManagement; 