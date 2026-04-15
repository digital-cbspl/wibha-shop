"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [view, setView] = useState<"login" | "register">("login");
    const [showPassword, setShowPassword] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-sans selection:bg-[#18582e] selection:text-white">
            
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div 
                className="relative w-full max-w-[440px] bg-white rounded-[2rem] shadow-2xl shadow-gray-900/20 overflow-hidden animate-in fade-in zoom-in-95 duration-300 slide-in-from-bottom-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 md:p-10 pt-12">
                    
                    {/* Header & Tabs */}
                    <div className="mb-8">
                        <div className="flex gap-6 border-b border-gray-100">
                            <button 
                                onClick={() => setView("login")}
                                className={`pb-4 font-serif text-xl sm:text-2xl transition-all relative ${
                                    view === "login" 
                                    ? "text-[#1a1a1a] font-medium" 
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                Sign In
                                {view === "login" && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#18582e] rounded-t-full"></div>
                                )}
                            </button>
                            <button 
                                onClick={() => setView("register")}
                                className={`pb-4 font-serif text-xl sm:text-2xl transition-all relative ${
                                    view === "register" 
                                    ? "text-[#1a1a1a] font-medium" 
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                Register
                                {view === "register" && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#18582e] rounded-t-full"></div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Form Area */}
                    <div className="relative">
                        <form className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" key={view}>
                            
                            {/* Conditional Name Field for Registration */}
                            {view === "register" && (
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Full Name" 
                                        className="w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium" 
                                    />
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="Email Address" 
                                    className="w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium" 
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    placeholder="Password" 
                                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Forgot Password Link (Only in Login) */}
                            {view === "login" && (
                                <div className="flex justify-end pt-1">
                                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-[#18582e] transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-medium hover:bg-black shadow-lg shadow-black/5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                                    {view === "login" ? "Sign In Securely" : "Create Account"}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>

                        {/* Social Login Separator */}
                        <div className="mt-8 mb-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-100"></div>
                            <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Or continue with</span>
                            <div className="flex-1 h-px bg-gray-100"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm text-gray-700">
                                {/* Google SVG Icon */}
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-3 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm text-gray-700">
                                {/* Apple SVG Icon */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.87.68 3.56 1.74-3.05 1.83-2.52 5.56.38 6.78-1.04 2.4-2.12 3.8-2.61 4.41zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                Apple
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}