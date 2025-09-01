import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(false); // toggle between signup and login
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        acceptTerms: false,
    });
    const [passwordError, setPasswordError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleCheckboxChange = () => {
        setFormData((prev) => ({ ...prev, acceptTerms: !prev.acceptTerms }));
    };

    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            setPasswordError(
                "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
            );
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordError && formData.password) {
            console.log("Form submitted:", formData);
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex bg-gradient-to-tr from-[#00416A] to-[#0072BB] text-white overflow-hidden">
            <div className="flex w-full relative">
                <AnimatePresence mode="wait">
                    {!isLogin ? (
                        // SIGNUP FORM LEFT
                        <motion.div
                            key="signupForm"
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-1/2 flex flex-col justify-center px-8 py-12 bg-white rounded-tr-[150px] rounded-br-[150px] text-black z-10"
                        >
                            <div className="max-w-sm mx-auto">
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                                    Create Your HelpDesk Account
                                </h3>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-gray-600 text-sm"
                                        >
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="johndev"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full border-b-2 text-black border-neutral-400 focus:border-[#00416A] outline-none transition-colors duration-300 px-0 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-600 text-sm"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full border-b-2 text-black border-neutral-400 focus:border-[#00416A] outline-none transition-colors duration-300 px-0 py-2"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label
                                            htmlFor="password"
                                            className="block text-gray-600 text-sm"
                                        >
                                            Password
                                        </label>

                                        {/* Wrapper for input + eye icon */}
                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`mt-1 w-full border-b-2 ${passwordError
                                                    ? "border-red-500"
                                                    : "border-neutral-400 focus:border-[#00416A]"
                                                    } text-black outline-none transition-colors duration-300 px-0 py-2 pr-10`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>

                                        {/* Error message below input */}
                                        {passwordError && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {passwordError}
                                            </p>
                                        )}
                                    </div>


                                    <div className="flex items-center space-x-2 pt-2">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={formData.acceptTerms}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600">
                                            I accept the terms & conditions
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full h-12 bg-[#00416A] text-white font-semibold rounded hover:bg-[#0072BB] mt-4 transition-colors duration-300 disabled:bg-gray-400"
                                        disabled={!!passwordError}
                                    >
                                        SIGN UP
                                    </button>
                                </form>

                                <div className="text-center mt-6">
                                    <span className="text-gray-600">Already have an account? </span>
                                    <button
                                        className="text-[#00416A] font-semibold hover:underline"
                                        onClick={() => {
                                            setIsLogin(true), setFormData({
                                                email: "",
                                                password: "",
                                                confirmPassword: "",
                                            });
                                        }}
                                    >
                                        Login here
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // LOGIN FORM RIGHT
                        <motion.div
                            key="loginForm"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-1/2 flex flex-col justify-center px-8 py-12 bg-white rounded-tl-[150px] rounded-bl-[150px] text-black order-2 z-10"
                        >
                            <div className="max-w-sm mx-auto">
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                                    Login to HelpDesk
                                </h3>
                                <form className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-600 text-sm"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full border-b-2 text-black border-neutral-400 focus:border-[#00416A] outline-none transition-colors duration-300 px-0 py-2"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label
                                            htmlFor="password"
                                            className="block text-gray-600 text-sm"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full border-b-2 text-black border-neutral-400 focus:border-[#00416A] outline-none transition-colors duration-300 px-0 py-2 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full h-12 bg-[#00416A] text-white font-semibold rounded hover:bg-[#0072BB] mt-4 transition-colors duration-300"
                                    >
                                        LOGIN
                                    </button>
                                </form>

                                <div className="text-center mt-6">
                                    <span className="text-gray-600">Don’t have an account? </span>
                                    <button
                                        className="text-[#00416A] font-semibold hover:underline"
                                        onClick={() => {
                                            setIsLogin(false), setFormData({
                                                email: "",
                                                password: "",
                                                confirmPassword: "",
                                            });
                                        }}
                                    >
                                        Sign up here
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Design Section */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? "designLeft" : "designRight"}
                        initial={{ x: isLogin ? -300 : 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: isLogin ? -300 : 300, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col w-1/2 justify-center items-center px-12 relative overflow-hidden ${isLogin ? "order-1" : "order-2"
                            }`}
                    >
                        <div className="absolute top-8 left-8 flex items-center gap-3">
                            <div className="w-12 h-12 bg-white backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <img
                                    src="https://res.cloudinary.com/dmyq2ymj9/image/upload/v1753870586/anthem_infotech_pvt_ltd__logo-removebg-preview_qd1tk4.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                            </div>
                            <h1 className="text-2xl font-bold">HelpDesk</h1>
                        </div>

                        <div className="flex flex-col items-center text-center max-w-lg">
                            <div className="mb-8 relative">
                                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <img
                                        src="https://res.cloudinary.com/dmyq2ymj9/image/upload/v1756709421/vecteezy_woman-in-headphones-with-laptop-for-customer-support_50894418-removebg-preview_nnmdau.png"
                                        alt="Help Desk Illustration"
                                        className="w-72 h-auto object-contain"
                                    />
                                </div>
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-300/30 rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full animate-pulse delay-700"></div>
                                <div className="absolute top-1/2 -left-8 w-8 h-8 bg-purple-300/40 rounded-full animate-pulse delay-1000"></div>
                            </div>

                            <h2 className="text-4xl font-bold mb-4 leading-tight">
                                Manage Tickets & Support
                                <br />
                                Efficiently
                            </h2>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {isLogin
                                    ? "Login to access your HelpDesk dashboard and manage tickets."
                                    : "Sign up to access the HelpDesk dashboard, track tickets, and provide support seamlessly."}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AuthPage;