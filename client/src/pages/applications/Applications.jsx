import React, { useState } from 'react'
import ApplicationForm from '../../components/ApplicationForm'

const Applications = () => {
    const [applications, setApplications] = useState([])

    const handleAddApplication = (newApp) => {
        setApplications(prev => [...prev, newApp])
    }
    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <ApplicationForm onAdd={handleAddApplication} />
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Applications</h1>
                <p className="text-gray-500">Manage all your job applications</p>
            </div>
            <div className='space-y-4'>
                {applications.length === 0 ? (
                    <p className='text-gray-500 text-center'>No applications yet</p>
                ) : (
                    applications.map((app) => (
                        <div
                            key={app.id}
                            className='bg-white p-4 rounded shadow mb-3'
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{app.role}</p>
                                    <p className="text-sm text-gray-500">{app.company}</p>
                                </div>

                                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {app.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                Applied on: {app.appliedDate}
                            </p>

                            {app.notes && (
                                <p className="text-sm mt-1">{app.notes}</p>
                            )}


                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Applications