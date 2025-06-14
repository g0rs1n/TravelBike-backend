
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window
const purify = DOMPurify(window)

export const sanitize = (dirty: string) => {
    return purify.sanitize(dirty)
}