/**
 * POPIA-Compliant Cookie Consent Banner
 * Friends of TUT - Cookie Consent Manager
 * 
 * Complies with Protection of Personal Information Act (POPIA) of South Africa
 * - Explicit consent required before setting non-essential cookies
 * - Granular control over cookie categories
 * - Right to withdraw consent at any time
 * - Must disclose cookie purposes
 */

(function () {
  'use strict';

  // Cookie consent configuration
  const COOKIE_CONFIG = {
    consentKey: 'fot_cookie_consent',
    consentVersion: '1.0',
    cookieExpiryDays: 365,
    bannerId: 'cookie-consent-banner',
    settingsId: 'cookie-settings-modal'
  };

  // Cookie categories and their purposes (POPIA-required disclosure)
  const COOKIE_CATEGORIES = {
    essential: {
      name: 'Essential Cookies',
      description: 'Required for basic website functionality (security, navigation)',
      required: true,
      enabled: true
    },
    analytics: {
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website',
      required: false,
      enabled: false
    },
    marketing: {
      name: 'Marketing Cookies',
      description: 'Used to track visitors across websites for advertising purposes',
      required: false,
      enabled: false
    }
  };

/**
   * Get stored consent from localStorage
   */
  function getConsent() {
    try {
      const stored = localStorage.getItem(COOKIE_CONFIG.consentKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading consent:', e);
    }
    return null;
  }

  /**
   * Save consent to localStorage
   */
  function saveConsent(consent) {
    try {
      const data = {
        version: COOKIE_CONFIG.consentVersion,
        timestamp: new Date().toISOString(),
        categories: consent
      };
      localStorage.setItem(COOKIE_CONFIG.consentKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving consent:', e);
      return false;
    }
  }

  /**
   * Check if user has given consent
   */
  function hasConsented() {
    const consent = getConsent();
    return consent !== null && consent.timestamp !== undefined;
  }

  // Apply consent - load analytics tools based on consent
  function applyConsent(consent) {
    if (consent && consent.analytics) {
      loadGoogleAnalytics();
      loadFirebase();
    } else {
      // Remove analytics scripts if consent withdrawn
      removeGoogleAnalytics();
      removeFirebase();
    }
  }

  // Remove Google Analytics
  function removeGoogleAnalytics() {
    const script = document.getElementById(GA_CONFIG.scriptId);
    if (script) {
      script.remove();
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'event': 'analytics_opt_out' });
  }

  // Remove Firebase
  function removeFirebase() {
    window.firebaseInitialized = false;
  }

// Google Analytics Configuration
  const GA_CONFIG = {
    measurementId: 'G-KYDWLJLE7Z', // GA4 Measurement ID
    scriptId: 'ga-analytics-script',
    scriptSrc: 'https://www.googletagmanager.com/gtag/js?id=G-KYDWLJLE7Z'
  };

  /**
   * Load Google Analytics (GA4)
   */
  function loadGoogleAnalytics() {
    // Check if GA script already exists
    if (document.getElementById(GA_CONFIG.scriptId)) {
      console.log('Google Analytics already loaded');
      return;
    }

    // Create and load GA4 script
    const script = document.createElement('script');
    script.id = GA_CONFIG.scriptId;
    script.async = true;
    script.src = GA_CONFIG.scriptSrc;
    
    // Add script to head
    document.head.appendChild(script);

    // Initialize GA4
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_CONFIG.measurementId, {
      // Enhanced privacy settings
      'anonymize_ip': true, // Anonymize IP for GDPR/POPIA compliance
      'ads_storage': 'denied', // Require consent for ads storage
      'analytics_storage': 'granted' // User explicitly consented
    });

    console.log('Google Analytics loaded');
  }

  // Firebase Configuration
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDiT428hi-inMYj879TJfO_ZGe1WlGLb8Y",
    authDomain: "friendsoftut-cc753.firebaseapp.com",
    projectId: "friendsoftut-cc753",
    storageBucket: "friendsoftut-cc753.firebasestorage.app",
    messagingSenderId: "764214129480",
    appId: "1:764214129480:web:8bc88888a7f3902faeb97d",
    measurementId: "G-KYDWLJLE7Z"
  };

/**
   * Load Firebase Analytics
   */
  function loadFirebase() {
    if (window.firebaseInitialized) {
      console.log('Firebase already initialized');
      return;
    }

    // Load Firebase App + Analytics (combined bundle)
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = function() {
      // Initialize Firebase
      if (typeof firebase !== 'undefined') {
        firebase.initializeApp(FIREBASE_CONFIG);
        // Initialize Analytics
        firebase.analytics();
        window.firebaseInitialized = true;
        console.log('Firebase Analytics initialized');
      }
    };
  }

  /**
   * Remove Google Analytics
   */

  /**
   * Create banner HTML
   */
  function createBannerHTML() {
    const banner = document.createElement('div');
    banner.id = COOKIE_CONFIG.bannerId;
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-banner-title');
    banner.setAttribute('aria-describedby', 'cookie-banner-desc');
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: #000000;
      color: #ffffff;
      padding: 1.5rem;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
      transform: translateY(100%);
      transition: transform 0.3s ease-out;
      font-family: 'Inter', sans-serif;
    `;

    const title = `<h2 id="cookie-banner-title" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; margin: 0 0 0.5rem 0; color: hsl(330 100% 65%);">🍪 Cookie Consent</h2>`;
    const description = `<p id="cookie-banner-desc" style="margin: 0 0 1rem 0; font-size: 0.875rem; line-height: 1.5; color: rgba(255, 255, 255, 0.8);">We use cookies to improve your experience. Under POPIA, we need your consent for non-essential cookies. Essential cookies are required for basic functionality.</p>`;
    
    const buttons = `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
        <button id="cookie-accept-all" style="flex: 1; min-width: 140px; padding: 0.75rem 1.5rem; background: hsl(330 100% 65%); color: #ffffff; border: none; border-radius: 1.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.05em; cursor: pointer; transition: background 0.2s;">Accept All</button>
        <button id="cookie-accept-selected" style="flex: 1; min-width: 140px; padding: 0.75rem 1.5rem; background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 1.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.05em; cursor: pointer; transition: background 0.2s;">Customize</button>
        <button id="cookie-reject-all" style="flex: 1; min-width: 140px; padding: 0.75rem 1.5rem; background: rgba(255, 255, 255, 0.1); color: #ffffff; border: none; border-radius: 1.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.05em; cursor: pointer; transition: background 0.2s;">Reject Non-Essential</button>
      </div>
    `;

    const privacyLink = `<p style="margin: 1rem 0 0 0; font-size: 0.75rem; color: rgba(255, 255, 255, 0.5);">By clicking "Accept All" or "Reject Non-Essential", you agree to our <a href="#/privacy-policy" style="color: hsl(330 100% 65%); text-decoration: underline;">Privacy Policy</a> and <a href="#/terms" style="color: hsl(330 100% 65%); text-decoration: underline;">Terms of Service</a>.</p>`;

    banner.innerHTML = `
      <div style="max-width: 1400px; margin: 0 auto;">
        ${title}${description}${buttons}${privacyLink}
      </div>
    `;

    return banner;
  }

  /**
   * Create settings modal HTML
   */
  function createSettingsModal() {
    const modal = document.createElement('div');
    modal.id = COOKIE_CONFIG.settingsId;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'cookie-settings-title');
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    `;

    let categoriesHTML = '';
    for (const [key, category] of Object.entries(COOKIE_CATEGORIES)) {
      const checked = category.required || category.enabled ? 'checked' : '';
      const disabled = category.required ? 'disabled' : '';
      const requiredNote = category.required ? '<span style="font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); margin-left: 0.5rem;">(Required)</span>' : '';
      
      categoriesHTML += `
        <div style="padding: 1rem; border-radius: 0.75rem; background: rgba(255, 255, 255, 0.05); margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <label for="cookie-category-${key}" style="font-weight: 600; cursor: ${category.required ? 'not-allowed' : 'pointer'};">
              ${category.name}
              ${requiredNote}
            </label>
            <input type="checkbox" id="cookie-category-${key}" data-category="${key}" ${checked} ${disabled} style="width: 1.25rem; height: 1.25rem; accent-color: hsl(330 100% 65%);">
          </div>
          <p style="margin: 0; font-size: 0.875rem; color: rgba(255, 255, 255, 0.6);">${category.description}</p>
        </div>
      `;
    }

    modal.innerHTML = `
      <div style="background: #000000; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 2rem; max-width: 32rem; width: 100%; max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h2 id="cookie-settings-title" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; margin: 0; color: hsl(330 100% 65%);">Cookie Settings</h2>
          <button id="cookie-settings-close" style="background: none; border: none; color: rgba(255, 255, 255, 0.6); cursor: pointer; padding: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <p style="margin: 0 0 1.5rem 0; font-size: 0.875rem; color: rgba(255, 255, 255, 0.7);">Manage your cookie preferences. Essential cookies cannot be disabled as they are required for basic functionality.</p>
        <div style="margin-bottom: 1.5rem;">
          ${categoriesHTML}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="cookie-save-settings" style="flex: 1; padding: 0.75rem 1.5rem; background: hsl(330 100% 65%); color: #ffffff; border: none; border-radius: 1.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.05em; cursor: pointer;">Save Preferences</button>
        </div>
      </div>
    `;

    return modal;
  }

  /**
   * Show the cookie consent banner
   */
  function showBanner() {
    let banner = document.getElementById(COOKIE_CONFIG.bannerId);
    if (!banner) {
      banner = createBannerHTML();
      document.body.appendChild(banner);
      
      // Add event listeners
      document.getElementById('cookie-accept-all').addEventListener('click', handleAcceptAll);
      document.getElementById('cookie-accept-selected').addEventListener('click', handleOpenSettings);
      document.getElementById('cookie-reject-all').addEventListener('click', handleRejectAll);
    }
    
    // Show banner with animation
    requestAnimationFrame(() => {
      banner.style.transform = 'translateY(0)';
    });
  }

  /**
   * Hide the cookie consent banner
   */
  function hideBanner() {
    const banner = document.getElementById(COOKIE_CONFIG.bannerId);
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  /**
   * Show settings modal
   */
  function showSettings() {
    let modal = document.getElementById(COOKIE_CONFIG.settingsId);
    if (!modal) {
      modal = createSettingsModal();
      document.body.appendChild(modal);
      
      // Add event listeners
      document.getElementById('cookie-settings-close').addEventListener('click', closeSettings);
      document.getElementById('cookie-save-settings').addEventListener('click', handleSaveSettings);
      
      // Close on backdrop click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSettings();
      });
    }
    
    modal.style.display = 'flex';
  }

  /**
   * Close settings modal
   */
  function closeSettings() {
    const modal = document.getElementById(COOKIE_CONFIG.settingsId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  /**
   * Handle Accept All button
   */
  function handleAcceptAll() {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true
    };
    saveConsent(consent);
    applyConsent(consent);
    hideBanner();
  }

  /**
   * Handle Reject Non-Essential button
   */
  function handleRejectAll() {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false
    };
    saveConsent(consent);
    applyConsent(consent);
    hideBanner();
  }

  /**
   * Handle Open Settings button
   */
  function handleOpenSettings() {
    showSettings();
  }

  /**
   * Handle Save Settings button
   */
  function handleSaveSettings() {
    const consent = {
      essential: true, // Always required
      analytics: document.getElementById('cookie-category-analytics')?.checked || false,
      marketing: document.getElementById('cookie-category-marketing')?.checked || false
    };
    saveConsent(consent);
    applyConsent(consent);
    closeSettings();
    hideBanner();
  }

  /**
   * Get current consent (for external use)
   */
  function getCurrentConsent() {
    return getConsent();
  }

  /**
   * Re-open consent settings (for "Cookie Settings" link)
   */
  function reopenSettings() {
    showSettings();
  }

  /**
   * Withdraw consent (POPIA right to withdraw)
   */
  function withdrawConsent() {
    localStorage.removeItem(COOKIE_CONFIG.consentKey);
    applyConsent({
      essential: true,
      analytics: false,
      marketing: false
    });
    showBanner();
  }

  /**
   * Initialize cookie consent
   */
  function init() {
    // Check if user has already consented
    if (hasConsented()) {
      const consent = getConsent();
      applyConsent(consent);
      return; // Don't show banner
    }
    
    // Show banner if no consent yet
    showBanner();
  }

  // Expose public API
  window.CookieConsent = {
    getConsent: getCurrentConsent,
    reopenSettings: reopenSettings,
    withdrawConsent: withdrawConsent,
    showSettings: showSettings
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
