"use client";

import Link from "next/link";
import { useAuth } from "@/common/auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center space-y-8 mt-16">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Next.js Firebase Auth
      </h1>
      <p className="text-lg text-gray-600 max-w-md">
        A simple authentication system built with Next.js and Firebase
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {!user && (
          <>
            <Link
              href="/signin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
        {user && (
          <Link
            href="/profile"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            View Profile
          </Link>
        )}
      </div>
    </div>
  );
}
