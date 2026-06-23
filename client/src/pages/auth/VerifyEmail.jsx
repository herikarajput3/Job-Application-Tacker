import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../service/api";
import toast from "react-hot-toast";

const VerifyEmail = () => {

      console.log(
        "Verify Email Page Loaded"
    );

    const { token } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [verified, setVerified] =
        useState(false);

    useEffect(() => {

        const verifyEmail = async () => {

            try {

                const response =
                    await API.post(
                        "/auth/verify-email",
                        { token }
                    );

                toast.success(
                    response.data.message
                );

                setVerified(true);

                setTimeout(() => {

                    navigate("/login");

                }, 3000);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Verification failed"
                );

            } finally {

                setLoading(false);

            }

        };

        verifyEmail();

    }, [token, navigate]);

    return (

        <div className="container py-5">

            {loading ? (

                <h2>
                    Verifying Email...
                </h2>

            ) : verified ? (

                <div>

                    <h2>
                        Email Verified ✅
                    </h2>

                    <p>
                        Redirecting to login...
                    </p>

                </div>

            ) : (

                <div>

                    <h2>
                        Verification Failed ❌
                    </h2>

                </div>

            )}

        </div>

    );

};

export default VerifyEmail;