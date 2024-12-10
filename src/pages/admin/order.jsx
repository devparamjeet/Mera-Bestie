import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar';
import { Search, ArrowUpDown } from 'lucide-react';
import { Helmet } from "react-helmet";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      orderId: "ORD001",
      date: "2024-03-15",
      time: "14:30",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      price: 149.99,
      address: "123 Main Street, Apt 4B, New York, NY 10001",
      trackingId: "TRK7891234"
    },
    {
      orderId: "ORD002",
      date: "2024-03-15",
      time: "15:45",
      name: "Michael Chen",
      email: "m.chen@example.com",
      price: 89.99,
      address: "456 Oak Avenue, San Francisco, CA 94102",
      trackingId: "TRK7891235"
    },
    {
      orderId: "ORD003",
      date: "2024-03-14",
      time: "09:15",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      price: 199.99,
      address: "789 Pine Road, Chicago, IL 60601",
      trackingId: "TRK7891236"
    },
    {
      orderId: "ORD004",
      date: "2024-03-14",
      time: "16:20",
      name: "James Rodriguez",
      email: "j.rodriguez@example.com",
      price: 299.99,
      address: "567 Maple Drive, Miami, FL 33101",
      trackingId: "TRK7891237"
    },
    {
      orderId: "ORD005",
      date: "2024-03-13",
      time: "11:05",
      name: "Priya Patel",
      email: "priya.p@example.com",
      price: 79.50,
      address: "890 Cedar Lane, Austin, TX 78701",
      trackingId: "TRK7891238"
    },
    {
      orderId: "ORD006",
      date: "2024-03-13",
      time: "13:45",
      name: "Alex Thompson",
      email: "alex.t@example.com",
      price: 159.99,
      address: "234 Birch Street, Seattle, WA 98101",
      trackingId: "TRK7891239"
    },
    {
      orderId: "ORD007",
      date: "2024-03-12",
      time: "10:30",
      name: "Lisa Kim",
      email: "lisa.k@example.com",
      price: 249.99,
      address: "678 Elm Court, Boston, MA 02108",
      trackingId: "TRK7891240"
    },
    {
      orderId: "ORD008",
      date: "2024-03-12",
      time: "09:15",
      name: "David Miller",
      email: "david.m@example.com",
      price: 129.99,
      address: "901 Willow Way, Denver, CO 80202",
      trackingId: "TRK7891241"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-orders');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  const sortedOrders = React.useMemo(() => {
    if (!Array.isArray(orders)) return [];
    
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle numeric values (like price)
        if (!isNaN(aValue) && !isNaN(bValue)) {
          return sortConfig.direction === 'ascending' 
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        // Handle string values
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();

        if (aString < bString) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aString > bString) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const filteredOrders = React.useMemo(() => {
    return sortedOrders.filter(order => {
      const searchLower = searchQuery.toLowerCase();
      const orderId = order.orderId?.toString().toLowerCase() || '';
      const customerName = order.name?.toLowerCase() || '';
      
      return orderId.includes(searchLower) || customerName.includes(searchLower);
    });
  }, [sortedOrders, searchQuery]);

  return (
    <div className="flex">
    <Helmet>
      <title>Orders | Admin | Mera Bestie</title>
    </Helmet>
      <Sidebar />
      <div className="flex-1 p-8 ml-[5rem] lg:ml-72 bg-pink-50 min-h-screen">
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-pink-100">
              <tr>
                <th onClick={() => handleSort('orderId')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Order ID
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('date')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('time')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Time
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Customer Name
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Email
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('price')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('address')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Address
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('trackingId')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Tracking ID
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {order.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.trackingId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
