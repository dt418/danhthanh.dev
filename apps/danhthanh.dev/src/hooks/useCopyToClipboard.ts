'use client';

import { useRef, useState } from 'react';
/**
 * Custom hook to copy content from a referenced HTML element (like <pre>)
 * to the clipboard and manage the 'copied' state.
 *
 * @returns {object} An object containing:
 * - codeRef: A ref object to be attached to the target element (e.g., <pre>).
 * - isCopied: A boolean state indicating whether the content has been copied.
 * - copyToClipboard: An async function to trigger the copy operation.
 */
export function useCopyToClipboard<T extends HTMLElement = HTMLPreElement>() {
  const codeRef = useRef<T>(null);
  const [isCopied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      // Get the text content of the element referenced by codeRef
      const content = codeRef.current?.textContent || '';

      // Use the modern Clipboard API
      await navigator.clipboard.writeText(content);

      // Set the copied state and then reset it after 1 second (1000ms)
      if (!isCopied) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }
    } catch (err) {
      setCopied(false); // Ensure state is reset on error
      throw new Error('Failed to copy to clipboard', { cause: err });
    }
  };

  return { codeRef, isCopied, copyToClipboard } as const;
}
