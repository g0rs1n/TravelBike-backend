
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window
const purify = createDOMPurify(window)

export const sanitize = (dirty: string) => {
    return purify.sanitize(dirty)
}