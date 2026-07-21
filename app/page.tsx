'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    fetch('/content.html')
      .then(r => r.text())
      .then(html => {
        const root = document.getElementById('appRoot');
        if (!root) return;
        root.innerHTML = html;
        const script = document.createElement('script');
        script.src = '/app.js';
        document.body.appendChild(script);
      });
  }, []);

  return <div id="appRoot" />;
}
