import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import API from '../service/api'

const Layout = () => {

    const [applications, setApplications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchApplications = async () => {
        try {
            const response = await API.get("/applications");
            console.log("response", response.data.data);
            setApplications(response.data.data);
        } catch (error) {
            console.error("Error fetching applications", error);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [])

    return (
        <div>

            {/* 🔹 Navbar gets control */}
            <Navbar onAddClick={() => setIsModalOpen(true)} />

            <main className='min-h-screen'>
                <Outlet context={{ applications, setApplications }} />
            </main>

            <Footer />

            {/* 🔹 Global Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <ApplicationForm
                    onAdd={(newApp) => {
                        setApplications(prev => [...prev, newApp]);
                        setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>

        </div>
    )
}

export default Layout