import { useState, useCallback } from 'react';
import { AppError, ErrorType } from '../utils/errors/error-types';

interface ErrorState {
  message: string;
  type: ErrorType;
  visible: boolean;
}

export const useErrorHandler = (initialMessage: string = '') => {
  const [error, setError] = useState<ErrorState>({
    message: initialMessage,
    type: ErrorType.FUNCTIONAL,
    visible: false,
  });

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AppError) {
      setError({
        message: error.message,
        type: error.type,
        visible: true,
      });
    } else if (error instanceof Error) {
      setError({
        message: error.message,
        type: ErrorType.TECHNICAL,
        visible: true,
      });
    } else {
      setError({
        message: 'An unknown error occurred',
        type: ErrorType.TECHNICAL,
        visible: true,
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError((prev) => ({ ...prev, visible: false }));
  }, []);

  const ErrorDisplay = useCallback(() => {
    if (!error.visible) return null;

    const bgColor = error.type === ErrorType.FUNCTIONAL 
      ? 'bg-amber-50 border-amber-200 text-amber-800' 
      : 'bg-red-50 border-red-200 text-red-800';

    return (
      <div className={`p-4 mb-4 rounded border ${bgColor}`} role="alert">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          <span className="font-medium">
            {error.type === ErrorType.FUNCTIONAL ? 'Attention: ' : 'Erreur: '}
          </span>
          <span className="ml-1">{error.message}</span>
        </div>
        <button 
          onClick={clearError}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    );
  }, [error, clearError]);

  return {
    error,
    handleError,
    clearError,
    ErrorDisplay,
  };
};