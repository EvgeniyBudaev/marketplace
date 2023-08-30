import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { Blob } from 'node:buffer';

expect.extend(matchers);

global.Blob = Blob;

afterEach(() => {
    cleanup();
});
