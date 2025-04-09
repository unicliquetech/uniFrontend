import React, { useState, useEffect } from 'react';
import { DeliveryPersonnelType } from '@/types/types';
import Nav from '@/components/vendorDashboard/nav';
import Aside from '@/components/vendorDashboard/Aside';


interface DeliveryPersonnelListProps {
    personnel: DeliveryPersonnelType[];
    onPersonnelSelect: (personnel: DeliveryPersonnelType) => void;
}

const DeliveryPersonnelList: React.FC<DeliveryPersonnelListProps> = ({
    personnel,
    onPersonnelSelect,
}) => {
    return (
        <ul>
            {personnel.map((person) => (
                <li
                    key={person.id}
                    onClick={() => onPersonnelSelect(person)}
                    className="cursor-pointer hover:bg-gray-200"
                >
                    {person.name} - {person.location}
                </li>
            ))}
        </ul>
    );
};

interface DeliveryPersonnelDetailsProps {
    personnel: DeliveryPersonnelType;
}

const DeliveryPersonnelDetails: React.FC<DeliveryPersonnelDetailsProps> = ({
    personnel,
}) => {
    return (
        <div>
            <h2>{personnel.name}</h2>
            <p>Location: {personnel.location}</p>
            <p>Phone Number: {personnel.phoneNumber}</p>
            <p>Email: {personnel.email}</p>
            <p>Fee: {personnel.fee}</p>
            <p>Service Area: {personnel.serviceArea}</p>
            <p>Availability: {personnel.availability}</p>
            <p>Vehicle: {personnel.vehicle}</p>
        </div>
    );
};

interface MessagePanelProps {
    personnel: DeliveryPersonnelType | null;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ personnel }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Implement logic to send message
        console.log(`Sending message to ${personnel?.name}: ${message}`);
        setMessage('');
    };

    return (
        <div>
            {personnel ? (
                <div className='mt-6'>
                    <h2>Call {personnel.name} to handle your delivery </h2>
                    {/* <h2>Send Message to {personnel.name}</h2>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                    ></textarea>
                    <button onClick={handleSendMessage}>Send</button> */}
                </div>
            ) : (
                <p>Select a delivery personnel to send a message</p>
            )}
        </div>
    );
};




interface DeliveryPersonnelTableProps {
    personnel: DeliveryPersonnelType[];
    onPersonnelSelect: (personnel: DeliveryPersonnelType) => void;
}

const DeliveryPersonnelTable: React.FC<DeliveryPersonnelTableProps> = ({
    personnel,
    onPersonnelSelect,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filterOptions, setFilterOptions] = useState({ location: '', vehicle: '', type: '' });
    const [filter, setFilter] = useState<boolean>(false);
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

    const toggleMobileVisibility = () => {
      setIsMobileVisible(!isMobileVisible);
    };


    const applyFilters = (person: DeliveryPersonnelType) => {
        const { location, vehicle, type } = filterOptions;
        return (
            (!location || person.location.toLowerCase().includes(location.toLowerCase())) &&
            (!vehicle || person.vehicle.toLowerCase().includes(vehicle.toLowerCase())) &&
            (!type || person.serviceArea.toLowerCase().includes(type.toLowerCase()))
        );
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = personnel.filter(applyFilters).slice(indexOfFirstItem, indexOfLastItem);

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };

    const handleFilterAPI = async () => {
        const { location, vehicle, type } = filterOptions;
        const filterParams = new URLSearchParams();
        if (location) filterParams.append('location', location);
        if (vehicle) filterParams.append('vehicle', vehicle);
        if (type) filterParams.append('type', type);

        const res = await fetch(`https://unibackend-4ebp.onrender.com/api/v1/deliveryPersonnel/filter?${filterParams.toString()}`);
        const data = await res.json();
        onPersonnelSelect(data);
    };

    const totalPages = Math.ceil(personnel.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleFilterChange = (value: boolean) => {
        setFilter(value);
    };

    return (
        <div className="bg-white w-{100%} rounded-lg shadow-md">
            <div className="flex items-center justify-between px-4 py-2 rounded-t-lg">
            <h1 className="font-bolder mb-4 text-red-900">Delivery Service Providers</h1>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Copy
                    </button>
                    <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Download .csv
                    </button>
                    <button className="px-3 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                        Sort
                    </button>
                    <div className="relative">
                        <input
                            placeholder='Filter'
                            type='button'
                            value="filter"
                            name="filter"
                            checked={filter}
                            onChange={() => handleFilterChange(true)}
                            className="px-3 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        />
                        {filter && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <div className="py-1">
                                <div className="px-4 py-2 text-gray-600">Filter by:</div>
                                <div className="px-4 pb-2">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
                                        value={filterOptions.location}
                                        onChange={handleFilter}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All</option>
                                        <option value="new york">New York</option>
                                        <option value="los angeles">Los Angeles</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="px-4 pb-2">
                                    <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
                                        Vehicle
                                    </label>
                                    <select
                                        id="vehicle"
                                        name="vehicle"
                                        value={filterOptions.vehicle}
                                        onChange={handleFilter}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="car">Car</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="px-4 pb-2">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        Service Area
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={filterOptions.type}
                                        onChange={handleFilter}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All</option>
                                        <option value="manhattan">Manhattan</option>
                                        <option value="west los angeles">West Los Angeles</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="px-4 py-2">
                                    <button
                                        onClick={handleFilterAPI}
                                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-red-900 text-white">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Fee</th>
                        <th className="px-4 py-2">Service Area</th>
                        <th className="px-4 py-2">Availability</th>
                        <th className="px-4 py-2">Vehicle</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((person) => (
                        <tr
                            key={person.id}
                            onClick={() => onPersonnelSelect(person)}
                            className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
                        >
                            <td className="px-4 py-2 ">{person.name}</td>
                            <td className="px-4 py-2 ">{person.location}</td>
                            <td className="px-4 py-2 ">{person.email}</td>
                            <td className="px-4 py-2 ">{person.fee}</td>
                            <td className="px-4 py-2 ">{person.serviceArea}</td>
                            <td className="px-4 py-2 ">{person.availability}</td>
                            <td className="px-4 py-2 ">{person.vehicle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-b-lg">
                <div>
                    <span className="text-sm text-gray-500">
                        Showing {indexOfFirstItem + 1} to{' '}
                        {indexOfLastItem > personnel.length ? personnel.length : indexOfLastItem} of{' '}
                        {personnel.length} entries
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`px-3 py-2 rounded-md hover:bg-gray-500 ${page === currentPage ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};



//////   DELIVEERY PERSONNEL COMPONENT ////////////////
const DeliveryPersonnel: React.FC = () => {
    const [deliveryPersonnel, setDeliveryPersonnel] = useState<DeliveryPersonnelType[]>([]);
    const [selectedPersonnel, setSelectedPersonnel] = useState<DeliveryPersonnelType | null>(null);
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

    const toggleMobileVisibility = () => {
      setIsMobileVisible(!isMobileVisible);
    };

    useEffect(() => {
        // Fetch delivery personnel data from the API
        fetch('https://unibackend-4ebp.onrender.com/api/v1/deliveryPersonnel')
            .then((res) => res.json())
            .then((data) => setDeliveryPersonnel(data));
    }, []);

    const handlePersonnelSelect = (personnel: DeliveryPersonnelType) => {
        setSelectedPersonnel(personnel);
    };

    return (
        <div>
            <Nav toggleMobileVisibility={toggleMobileVisibility} />
            <Aside isMobileVisible={isMobileVisible} />
            <div className="grid bg-white w-{100%}">
                <div className=" p-4 w-{100%}" style={{width: 1200}}>
                    <DeliveryPersonnelTable
                        personnel={deliveryPersonnel}
                        onPersonnelSelect={handlePersonnelSelect}
                    />
                </div>
                <main className="w-3/4 p-4">
                    {selectedPersonnel && (
                        <div>
                            <DeliveryPersonnelDetails personnel={selectedPersonnel} />
                            <MessagePanel personnel={selectedPersonnel} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DeliveryPersonnel;