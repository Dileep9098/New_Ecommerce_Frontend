import { useEffect, useState } from 'react';

const useExternalScripts = (scriptUrls) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        script.onload = () => {
          console.log(`Script loaded: ${src}`);
          resolve();
        };
        
        script.onerror = () => {
          console.error(`Script failed to load: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };

        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        setLoaded(false);
        setError(null);
        
        for (const url of scriptUrls) {
          await loadScript(url);
        }
        
        setLoaded(true);
        console.log('All external scripts loaded successfully');
      } catch (err) {
        setError(err);
        console.error('Error loading scripts:', err);
      }
    };

    if (scriptUrls.length > 0) {
      loadAllScripts();
    }
  }, [scriptUrls]);

  return { loaded, error };
};

export default useExternalScripts;
