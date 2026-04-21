"use client";

import { useEffect } from 'react';

export default function VisitTracker() {
  useEffect(() => {
    // Only track once per session to avoid duplicate pings on navigation
    const sessionKey = 'tp_tracked_session';
    const alreadyTracked = sessionStorage.getItem(sessionKey);
    
    if (!alreadyTracked) {
        fetch('/api/analytics', { method: 'POST' })
            .then(() => sessionStorage.setItem(sessionKey, 'true'))
            .catch(() => {});
    }
  }, []);

  return null;
}
