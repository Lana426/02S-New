'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function Page() {
  useEffect(() => {
    fetch('/content.html')
      .then(r => r.text())
      .then(html => {
        const root = document.getElementById('appRoot');
        if (root) root.innerHTML = html;
      });
  }, []);

  return (
    <>
      <div id="appRoot" />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
