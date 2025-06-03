'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Enhanced error logging
    console.error('Application error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });

    // You can add error reporting service here
    // Example: reportError(error);
  }, [error]);

  const handleReset = () => {
    try {
      reset();
    } catch (resetError) {
      console.error('Error during reset:', resetError);
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-6 text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
        <div className="space-y-2">
          <p className="text-lg text-gray-600">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="space-x-4 pt-4">
          <Button
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md transition-colors"
          >
            Go to home
          </Button>
        </div>
      </div>
    </div>
  );
} 