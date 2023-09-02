import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Blob } from 'node:buffer';
import { installGlobals } from '@remix-run/node';

global.Blob = Blob;
window.ENV = process.env;

installGlobals();

afterEach(() => {
    cleanup();
});
