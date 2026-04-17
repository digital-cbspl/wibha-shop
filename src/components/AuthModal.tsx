"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../src/utils/config";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [view, setView] = useState<"login" | "register">("login");
    const [showPassword, setShowPassword] = useState(false);

    // API Integration State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Field-level validation state
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        name: "",
        identifier: "", // Used for Login (Email or Phone)
        email: "",      // Used for Register
        phone: "",      // Used for Register
        password: "",
    });

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            resetState();
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const resetState = () => {
        setError(null);
        setSuccess(null);
        setFieldErrors({});
        setFormData({
            name: "",
            identifier: "",
            email: "",
            phone: "",
            password: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear global error and specific field error as soon as the user starts typing
        setError(null); 
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    }

    // --- NEW: Robust Client-Side Validation ---
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (view === "register") {
            if (!formData.name.trim() || formData.name.trim().length < 2) {
                errors.name = "Name must be at least 2 characters.";
            }
            
            // Standard Email Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = "Please enter a valid email address.";
            }

            // Phone Regex: 10 to 15 digits
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(formData.phone)) {
                errors.phone = "Enter a valid 10-15 digit phone number.";
            }

            if (formData.password.length < 6) {
                errors.password = "Password must be at least 6 characters.";
            }
        } else {
            // Login Validation
            if (!formData.identifier.trim()) {
                errors.identifier = "Please enter your email or phone number.";
            }
            if (!formData.password) {
                errors.password = "Please enter your password.";
            }
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Run validation before making the API call
        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const endpoint = view === "login" 
                ? `${API_BASE_URL}/api/auth/login` 
                : `${API_BASE_URL}/api/auth/register`;
                
            const payload = view === "login" 
                ? { identifier: formData.identifier, password: formData.password }
                : { name: formData.name, email: formData.email, phone: formData.phone, password: formData.password };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Authentication failed.");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            if (view === "register") {
                setSuccess("Account created successfully!");
            } else {
                setSuccess("Signed in successfully!");
            }
            
            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const switchView = (newView: "login" | "register") => {
        setView(newView);
        setError(null);
        setSuccess(null);
        setFieldErrors({}); // Clear validation errors on view switch
    };

    // Helper to apply dynamic classes based on field error state
    const getInputClassName = (fieldName: string) => `
        w-full pl-12 pr-5 py-4 rounded-xl outline-none transition-all font-medium
        ${fieldErrors[fieldName] 
            ? "bg-red-50/50 border-red-300 text-red-900 placeholder-red-300 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent" 
            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent border"}
    `;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-sans selection:bg-[#18582e] selection:text-white">

            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[2rem] shadow-2xl shadow-gray-900/20 overflow-hidden animate-in fade-in zoom-in-95 duration-300 slide-in-from-bottom-4" onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors z-10">
                    <X size={20} />
                </button>

                <div className="p-8 md:p-10 pt-12">

                    {/* Header & Tabs */}
                    <div className="mb-8">
                        <div className="flex gap-6 border-b border-gray-100">
                            <button
                                onClick={() => switchView("login")}
                                className={`pb-4 font-serif text-xl sm:text-2xl transition-all relative ${view === "login" ? "text-[#1a1a1a] font-medium" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                Sign In
                                {view === "login" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#18582e] rounded-t-full"></div>}
                            </button>
                            <button
                                onClick={() => switchView("register")}
                                className={`pb-4 font-serif text-xl sm:text-2xl transition-all relative ${view === "register" ? "text-[#1a1a1a] font-medium" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                Register
                                {view === "register" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#18582e] rounded-t-full"></div>}
                            </button>
                        </div>
                    </div>

                    {/* Server Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50/50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}
                    
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-[#18582e]/5 text-[#18582e] text-sm rounded-xl border border-[#18582e]/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#18582e]" />
                            <span className="font-medium">{success}</span>
                        </div>
                    )}

                    {/* Dynamic Form Area */}
                    <div className="relative">
                        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" key={view} noValidate>

                            {view === "register" && (
                                <>
                                    {/* Name Field */}
                                    <div>
                                        <div className="relative">
                                            <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none ${fieldErrors.name ? "text-red-400" : "text-gray-400"}`}>
                                                <User size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                                className={getInputClassName("name")}
                                            />
                                        </div>
                                        {fieldErrors.name && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-in fade-in">{fieldErrors.name}</p>}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <div className="relative">
                                            <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none ${fieldErrors.phone ? "text-red-400" : "text-gray-400"}`}>
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                                className={getInputClassName("phone")}
                                            />
                                        </div>
                                        {fieldErrors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-in fade-in">{fieldErrors.phone}</p>}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <div className="relative">
                                            <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none ${fieldErrors.email ? "text-red-400" : "text-gray-400"}`}>
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email Address"
                                                className={getInputClassName("email")}
                                            />
                                        </div>
                                        {fieldErrors.email && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-in fade-in">{fieldErrors.email}</p>}
                                    </div>
                                </>
                            )}

                            {view === "login" && (
                                /* Combined Email/Phone Field for Login */
                                <div>
                                    <div className="relative">
                                        <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none ${fieldErrors.identifier ? "text-red-400" : "text-gray-400"}`}>
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="identifier"
                                            value={formData.identifier}
                                            onChange={handleChange}
                                            placeholder="Email or Phone Number"
                                            className={getInputClassName("identifier")}
                                        />
                                    </div>
                                    {fieldErrors.identifier && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-in fade-in">{fieldErrors.identifier}</p>}
                                </div>
                            )}

                            {/* Password Field (Shared) */}
                            <div>
                                <div className="relative">
                                    <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none ${fieldErrors.password ? "text-red-400" : "text-gray-400"}`}>
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className={`${getInputClassName("password")} pr-12`} // Keep padding for the eye icon
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute inset-y-0 right-0 pr-5 flex items-center transition-colors ${fieldErrors.password ? "text-red-400 hover:text-red-600" : "text-gray-400 hover:text-gray-600"}`}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {fieldErrors.password && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-in fade-in">{fieldErrors.password}</p>}
                            </div>

                            {/* Forgot Password Link */}
                            {view === "login" && (
                                <div className="flex justify-end pt-1">
                                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-[#18582e] transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-medium hover:bg-black shadow-lg shadow-black/5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-80 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin text-gray-400" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{view === "login" ? "Sign In Securely" : "Create Account"}</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform opacity-70" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}