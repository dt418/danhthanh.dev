import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import Toast from '@/components/Toast';

import useFocusMode from '@/hooks/useFocusMode';
import useGlobal from '@/hooks/useGlobal';
import useShortcut from '@/hooks/useShortcut';
import useTheme from '@/hooks/useTheme';

const focusToast = {
  title: 'Focus Turned {STATUS}',
  message:
    'Focus helps reduce distractions by hiding floating components, like navigation and reactions.',
};

function Shortcuts() {
  const toastIdRef = useRef<string | null>(null);

  const { theme, setTheme } = useTheme();
  const { isQuickAccessOpen, setQuickAccessOpen } = useGlobal();
  const { focusMode, setFocusMode } = useFocusMode();

  useShortcut('KeyD', () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  });

  useShortcut('KeyQ', () => {
    setQuickAccessOpen(!isQuickAccessOpen);
  });

  useShortcut('KeyF', () => {
    setFocusMode(!focusMode);
  });

  useEffect(() => {
    // 1. Clean up any existing toast if its ID is stored
    if (toastIdRef.current) {
      toast.remove(toastIdRef.current);
    }

    // 2. Display the new toast and store its ID in the ref
    const status = focusMode ? 'On' : 'Off';

    toastIdRef.current = toast.custom(
      (t) => (
        <Toast
          title={focusToast.title.replace('{STATUS}', status)}
          message={focusToast.message}
          t={t}
        />
      ),
      { duration: Infinity }
    ); // Use a long duration or Infinity if it should persist

    // 3. Clean up function: removes the toast when the component unmounts
    return () => {
      if (toastIdRef.current) {
        toast.remove(toastIdRef.current);
        toastIdRef.current = null; // Clear the ref after removal
      }
    };
  }, [focusMode]);

  return null;
}

export default Shortcuts;
