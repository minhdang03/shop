import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useDocumentTitle(title: string, isPage: boolean = false) {
  const location = useLocation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | PINO.VN`;

    return () => {
      if (isPage) {
        document.title = prevTitle;
      }
    };
  }, [title, isPage, location]);
} 