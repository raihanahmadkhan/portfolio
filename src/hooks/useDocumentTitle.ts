import { useEffect } from 'react';
import { site } from '../data/site';

const DEFAULT_TITLE = document.title;

export const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} | ${site.name}`;
        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [title]);
};
