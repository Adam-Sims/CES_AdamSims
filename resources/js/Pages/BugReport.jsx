import { useState } from 'react';
import axios from 'axios';

export default function BugReportForm() {
    const [form, setForm] = useState({title: '', description: '', severity: 'medium'});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value});
        setErrors({});
        setSuccess(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.post('/api/bugs', form);
            setSuccessMessage(response.data.msg);
            setSuccess(true);
            setForm({title: '', description: '', severity: 'medium'});
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bug Reporter</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {success && (
                    <div data-testid="success-message" className="mb-4 p-3 text-green-700 bg-green-100 rounded">
                        {successMessage}
                    </div>
                )}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <span className={`text-sm ${form.title.length >= 100 ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                            {form.title.length} / 100
                        </span>
                    </div>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-600 mt-1">{errors.title[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
                    </textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                        name="severity"
                        value={form.severity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow"
                >
                    Report Bug
                </button>
            </form>
        </div>
    );

}