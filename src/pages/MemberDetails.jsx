import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faEdit, faTrashAlt, faTimes, faSave, faSync, faUsers, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Utility component for consistent modal structure (Modern/Professional Style)
const Modal = ({ title, children, onClose }) => (
	<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 p-4 backdrop-blur-sm'>
		<div className='bg-white text-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg transition-all duration-300 transform scale-100'>
			<div className='flex justify-between items-center border-b border-gray-100 pb-4 mb-6'>
				<h2 className='text-2xl font-bold text-blue-600'>{title}</h2>
				<button
					onClick={onClose}
					className='text-gray-500 hover:text-gray-900 p-1 rounded-full transition-colors'
					aria-label="Close Modal"
				>
					<FontAwesomeIcon icon={faTimes} size='lg' />
				</button>
			</div>
			{children}
		</div>
	</div>
);

const MemberDetails = () => {
	const [memberDetails, setMemberDetails] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddModel, setIsAddModel] = useState(false);
	const [isEditModel, setIsEditModel] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		sno: "",
		name: "",
		mobile_no: "",
		email: ""
	});

	const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

	// Fetch Members
	const fetchMemberDetails = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${apiUrl}/api/memberdetails`);
			setMemberDetails(response.data);
		} catch (err) {
			console.error('Fetching Error:', err);
			alert('Error fetching member data. Check network connection.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMemberDetails();
	}, []);

	// Form Handlers (Kept clean and simple)
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const openAddModal = () => {
		setFormData({ sno: "", name: "", mobile_no: "", email: "" });
		setIsAddModel(true);
	};

	const openEditModal = (member) => {
		setSelectedId(member._id);
		setFormData({
			sno: member.sno || "",
			name: member.name,
			mobile_no: member.mobile_no,
			email: member.email
		});
		setIsEditModel(true);
	};

	const handleSave = async () => {
		if (!formData.name || !formData.mobile_no || !formData.email) {
			alert("Name, Mobile No, and Email are required fields.");
			return;
		}
		try {
			await axios.post(`${apiUrl}/api/memberadd`, formData);
			alert("New Member successfully added.");
			setIsAddModel(false);
			fetchMemberDetails();
		} catch (error) {
			console.error('Save Error:', error);
			alert("Failed to save member details.");
		}
	};

	const handleUpdate = async () => {
		if (!formData.name || !formData.mobile_no || !formData.email) {
			alert("Name, Mobile No, and Email are required fields.");
			return;
		}
		try {
			await axios.put(`${apiUrl}/api/memberupdate/${selectedId}`, formData);
			alert("Member details updated successfully.");
			setIsEditModel(false);
			fetchMemberDetails();
		} catch (error) {
			console.error('Update Error:', error);
			alert("Failed to update member details.");
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to permanently delete this member's record? This action cannot be undone.")) {
			try {
				await axios.delete(`${apiUrl}/api/memberdelete/${id}`);
				alert("Member record deleted successfully.");
				fetchMemberDetails();
			} catch (error) {
				console.error('Delete Error:', error);
				alert("Failed to delete member record.");
			}
		}
	};

	// Filter Members for Search
	const filteredMembers = memberDetails.filter((member) =>
		member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(member.mobile_no && member.mobile_no.includes(searchTerm)) ||
		(member.sno && String(member.sno).includes(searchTerm))
	);

	return (
		// Clean, slightly off-white background
		<div className='min-h-screen p-6 sm:p-10 bg-gray-50 text-gray-800'>

			{/* Header and Description Card */}
			<div className='bg-white p-6 rounded-xl shadow-lg mb-8 border-l-4 border-blue-600'>
				<h1 className='font-extrabold text-xl lg:text-3xl text-gray-900 flex items-center mb-1'>
					<FontAwesomeIcon icon={faUsers} className='mr-3 text-blue-600' /> Member Directory
				</h1>
				<p className='text-sm text-gray-500'>
					Comprehensive list and management tools for all registered members. Use the search bar for quick filtering.
				</p>
			</div>


			{/* Controls Section */}
			<div className='flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4'>
				<div className='relative w-full md:w-96'>
					<FontAwesomeIcon icon={faSearch} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
					<input
						type='text'
						className='border border-gray-300 bg-white text-gray-800 p-3 pl-10 w-full rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm'
						placeholder='Search by Name, Email, or Mobile'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='flex gap-3 w-full md:w-auto'>
					<button
						className='bg-blue-600 mt-2 lg:mt-0 font-medium p-3 rounded-lg text-white hover:bg-blue-700 transition duration-200 flex items-center justify-center w-full shadow-md'
						onClick={openAddModal}
					>
						<FontAwesomeIcon icon={faUserPlus} className='mr-2' /> Add Member
					</button>
				</div>
			</div>

			{/* Member Table Card */}
			<div className='overflow-x-auto shadow-xl rounded-xl bg-white'>
				<table className="min-w-full divide-y divide-gray-200">
					<thead className='bg-slate-800'>
						<tr className='h-14 font-xs lg:font-md uppercase tracking-wider text-white font-semibold text-sm'>
							<th className='px-6 py-3 font-semibold'>S.No</th>
							<th className='px-6 py-3 font-semibold'>Name</th>
							<th className='px-6 py-3 font-semibold hidden sm:table-cell'>Mobile No</th>
							<th className='px-6 py-3 font-semibold hidden lg:table-cell'>Email Address</th>
							<th className='px-6 py-3 text-center font-semibold'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100'>
						{isLoading ? (
							<tr>
								<td colSpan="5" className='p-6 text-center text-gray-500'>
									<FontAwesomeIcon icon={faSync} className='animate-spin mr-2' /> Loading data...
								</td>
							</tr>
						) : filteredMembers.length === 0 ? (
							<tr>
								<td colSpan="5" className='p-6 text-center text-gray-500'>
									<FontAwesomeIcon icon={faInfoCircle} className='mr-2' /> No members found.
								</td>
							</tr>
						) : (
							filteredMembers.map((member, index) => (
								<tr
									key={member._id}
									className={`text-xs lg:text-base hover:bg-blue-50 transition duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
								>
									<td className='p-4 px-6 text-center'>{index + 1}</td>
									<td className='p-4 px-6 text-center text-gray-900'>{member.name}</td>
									<td className='p-4 px-6 text-center text-gray-600 hidden sm:table-cell'>{member.mobile_no}</td>
									<td className='p-4 px-6 text-center text-gray-600 hidden lg:table-cell'>{member.email}</td>
									<td className='p-4 px-6 text-center'>
										<div className='flex gap-2 justify-center'>
											<button
												className='text-blue-600 hover:text-blue-800 p-2 rounded transition-colors text-xs sm:text-base border border-transparent hover:border-blue-100'
												onClick={() => openEditModal(member)}
												aria-label="Edit Member"
											>
												<FontAwesomeIcon icon={faEdit} className='mr-1.5' />
												<span className='hidden sm:inline'>Edit</span>
											</button>
											<button
												className='text-red-600 hover:text-red-800 p-2 rounded transition-colors text-xs sm:text-base border border-transparent hover:border-red-100'
												onClick={() => handleDelete(member._id)}
												aria-label="Delete Member"
											>
												<FontAwesomeIcon icon={faTrashAlt} className='mr-1.5' />
												<span className='hidden sm:inline'>Delete</span>
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Add Member Modal */}
			{isAddModel && (
				<Modal title="Create New Member Record" onClose={() => setIsAddModel(false)}>
					{/* <input type='text' name='sno' placeholder='S.No (Optional)' value={formData.sno} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' /> */}
					<input type='text' name='name' placeholder='Name *' value={formData.name} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />
					<input type='text' name='mobile_no' placeholder='Mobile No *' value={formData.mobile_no} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />
					<input type='email' name='email' placeholder='Email Address *' value={formData.email} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-6 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />

					<div className='flex justify-end gap-3 pt-4'>
						<button onClick={handleSave} className='bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center shadow-md'>
							<FontAwesomeIcon icon={faSave} className='mr-2' /> Save Record
						</button>
						<button onClick={() => setIsAddModel(false)} className='bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition shadow-sm'>
							Cancel
						</button>
					</div>
				</Modal>
			)}

			{/* Edit Member Modal */}
			{isEditModel && (
				<Modal title="Update Member Record" onClose={() => setIsEditModel(false)}>
					<input type='text' name='sno' placeholder='S.No (Optional)' value={formData.sno} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />
					<input type='text' name='name' placeholder='Name *' value={formData.name} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />
					<input type='text' name='mobile_no' placeholder='Mobile No *' value={formData.mobile_no} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />
					<input type='email' name='email' placeholder='Email Address *' value={formData.email} onChange={handleChange} className='w-full p-3 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg mb-6 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition' />

					<div className='flex justify-end gap-3 pt-4'>
						<button onClick={handleUpdate} className='bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition flex items-center shadow-md'>
							<FontAwesomeIcon icon={faEdit} className='mr-2' /> Update Record
						</button>
						<button onClick={() => setIsEditModel(false)} className='bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition shadow-sm'>
							Cancel
						</button>
					</div>
				</Modal>
			)}

		</div>
	);
};

export default MemberDetails;