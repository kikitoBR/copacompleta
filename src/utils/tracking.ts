/**
 * Utility for professional marketing pixels tracking (Meta, Google Tag, TikTok)
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    ttq?: {
      load: (id: string, options?: any) => void;
      page: () => void;
      track: (event: string, data?: any) => void;
      [key: string]: any;
    };
  }
}

const META_PIXEL_ID = (import.meta as any).env.VITE_META_PIXEL_ID || '';
const GOOGLE_TAG_ID = (import.meta as any).env.VITE_GOOGLE_TAG_ID || '';
const TIKTOK_PIXEL_ID = (import.meta as any).env.VITE_TIKTOK_PIXEL_ID || '';

/**
 * Initialize all marketing scripts dynamically if environment IDs are present.
 */
export function initTracking() {
  if (typeof window === 'undefined') return;

  // Initialize Meta Pixel (Facebook)
  if (META_PIXEL_ID) {
    /* eslint-disable */
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq?.('init', META_PIXEL_ID);
    window.fbq?.('track', 'PageView');
    console.log('[Tracking] Meta Pixel initialized successfully.');
  }

  // Initialize Google Tag / Analytics (gtag.js)
  if (GOOGLE_TAG_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_TAG_ID);
    console.log('[Tracking] Google Tag initialized successfully.');
  }

  // Initialize TikTok Pixel
  if (TIKTOK_PIXEL_ID) {
    /* eslint-disable */
    (function(w: any, d: any, t: any) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      ttq.methods = [
        'page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'clean'
      ];
      ttq.setAndDefer = function(t: any, e: any) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (var i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      ttq.instance = function(t: any) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n]);
        }
        return e;
      };
      ttq.load = function(e: any, n: any) {
        var r = 'https://analytics.tiktok.com/i18n/pixel/events.js', o = n && n.type;
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        var a = d.createElement('script');
        a.type = 'text/javascript';
        a.async = !0;
        a.src = r + '?sdkid=' + e + '&lib=' + t;
        var c = d.getElementsByTagName('script')[0];
        c.parentNode.insertBefore(a, c);
      };
      ttq.load(TIKTOK_PIXEL_ID);
      ttq.page();
    })(window, document, 'ttq');
    /* eslint-enable */
    console.log('[Tracking] TikTok Pixel initialized successfully.');
  }
}

/**
 * Standard interface for passing custom variables to pixel events
 */
interface TrackingData {
  value?: number;
  currency?: string;
  [key: string]: any;
}

/**
 * Fire tracking event across all active platforms.
 * 
 * @param eventName The standard/custom event name to dispatch.
 * @param data Optional parameters (e.g. price value, currency, item name).
 */
export function trackEvent(eventName: string, data?: TrackingData) {
  if (typeof window === 'undefined') return;

  // 1. Meta Pixel Tracking
  if (META_PIXEL_ID && window.fbq) {
    if (eventName === 'PageView') {
      window.fbq('track', 'PageView');
    } else if (eventName === 'InitiateCheckout') {
      window.fbq('track', 'InitiateCheckout', {
        value: data?.value,
        currency: data?.currency || 'BRL',
      });
    } else {
      // Custom events
      window.fbq('trackCustom', eventName, data);
    }
  }

  // 2. Google Analytics Tracking (gtag.js)
  if (GOOGLE_TAG_ID && window.gtag) {
    if (eventName === 'PageView') {
      window.gtag('event', 'page_view');
    } else if (eventName === 'InitiateCheckout') {
      window.gtag('event', 'begin_checkout', {
        value: data?.value,
        currency: data?.currency || 'BRL',
        items: [{
          item_id: 'album_copa_2026',
          item_name: 'Álbum Completo da Copa 2026',
          price: data?.value,
        }]
      });
    } else {
      // Custom GA4 event
      window.gtag('event', eventName, data);
    }
  }

  // 3. TikTok Pixel Tracking
  if (TIKTOK_PIXEL_ID && window.ttq) {
    if (eventName === 'PageView') {
      window.ttq.page();
    } else if (eventName === 'InitiateCheckout') {
      window.ttq.track('InitiateCheckout', {
        value: data?.value,
        currency: data?.currency || 'BRL',
        contents: [{
          content_id: 'album_copa_2026',
          content_name: 'Álbum Completo da Copa 2026',
          price: data?.value,
        }]
      });
    } else {
      // Custom events
      window.ttq.track(eventName, data);
    }
  }

  console.log(`[Tracking] Event fired: "${eventName}"`, data);
}
