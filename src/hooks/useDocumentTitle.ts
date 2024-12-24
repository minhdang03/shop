import { useEffect } from 'react';

export const useDocumentTitle = (title: string, addSuffix = true) => {
  useEffect(() => {
    const suffix = addSuffix ? ' | Shop Nước Hoa' : '';
    document.title = title + suffix;
  }, [title, addSuffix]);
}; 