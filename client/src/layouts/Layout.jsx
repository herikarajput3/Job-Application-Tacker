import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'

const Layout = () => {

    const [applications, setApplications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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