import { useState } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast({ title, description, variant = 'default' }: ToastProps) {
  // In a real application, you would use a proper toast library
  // This is a simple implementation for demonstration
  alert(`${title}\n${description || ''}`);
}