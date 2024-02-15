import { toast } from 'react-toastify';
import { toastInitialSettings } from './utils';

export const copyTextToClipboard = async text => {
    toast.success('The word is copied!', toastInitialSettings);
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
};
