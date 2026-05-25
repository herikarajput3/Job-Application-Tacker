import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import API from '../service/api'
import toast from 'react-hot-toast'

const Layout = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>

            {/* 🔹 Navbar */}
            <Navbar onAddClick={() => setIsModalOpen(true)} />

            <main className='min-h-screen'>
                <Outlet />
            </main>

            <Footer />

            {/* 🔹 Global Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <ApplicationForm
                    onAdd={() => {
                        toast.success("Application added!");
                        setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>

        </div>
    );
};

export default Layout