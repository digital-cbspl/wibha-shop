"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowLeft,
    ShieldCheck
} from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Simulated login handler
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate a network request (e.g., Supabase, Firebase, or NextAuth)
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to the main admin dashboard after "successful" login
            router.push("/admin"); 
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#18582e]/5 to-transparent pointer-events-none"></div>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                {/* Login Card */}
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
                    <div className="mb-6">
                        <h2 className="text-xl font-serif font-medium text-gray-900">Welcome back</h2>
                        <p className="text-sm text-gray-500 mt-1">Please enter your credentials to continue.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@wibha.com" 
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <input 
                                    id="remember-me" 
                                    name="remember-me" 
                                    type="checkbox" 
                                    className="h-4 w-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" 
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="#" className="font-medium text-[#18582e] hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#1a1a1a] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <span>Sign in to Workspace</span>
                                )}
                            </button>
                        </div>
                    </form>

                </div>
                
                {/* Footer Note */}
                <p className="text-center text-xs text-gray-400 mt-8">
                    Secure Area. Unauthorized access is strictly prohibited.
                </p>
            </div>
        </div>
    );
}