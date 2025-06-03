'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-md space-y-6 text-center bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-red-600">Application Error</h1>
            <div className="space-y-2">
              <p className="text-lg text-gray-600">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Button
                onClick={this.handleReset}
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

    return this.props.children;
  }
} 