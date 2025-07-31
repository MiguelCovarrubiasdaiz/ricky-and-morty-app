'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-stars bg-cover bg-fixed bg-center">
      <div className="bg-space absolute inset-0"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto max-w-2xl px-4 py-6">
          <div
            className={`
              transform rounded-lg border border-red-500 bg-gray-800/50 p-8
              text-center backdrop-blur-sm transition-all duration-700 ease-out
              ${
                isVisible
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-8 scale-95 opacity-0'
              }
            `}
          >
            <div className="mb-6 flex justify-center">
              <FaExclamationTriangle
                className={`
                  h-16 w-16 text-red-400 transition-all delay-200 duration-500
                  ${isVisible ? 'rotate-0 opacity-100' : 'rotate-12 opacity-0'}
                `}
              />
            </div>

            <h1
              className={`
                mb-4 text-6xl font-bold text-red-400 transition-all delay-300 duration-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              `}
            >
              404
            </h1>

            <h2
              className={`
                delay-400 mb-4 text-2xl font-semibold text-white transition-all duration-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              `}
            >
              Dimension Not Found
            </h2>

            <p
              className={`
                mb-6 text-gray-300 transition-all delay-500 duration-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              `}
            >
              Looks like you've wandered into an unknown dimension! This page doesn't exist in our
              multiverse. Rick would probably blame it on a portal gun malfunction.
            </p>

            <div
              className={`
                delay-600 flex justify-center transition-all duration-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
            >
              <Link href="/">
                <Button variant="primary" size="lg">
                  <div className="flex justify-center">
                    <FaHome className="h-5 w-5" />
                  </div>
                  <span>Return to Home Dimension</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
