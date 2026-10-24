export function track(event, props) {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event,
            ...props,
            timestamp: new Date().toISOString(),
        });
        // Log in development for auditability
        if (process.env.NODE_ENV !== 'production') {
            console.info(`[Analytics: ${event}]`, props);
        }
    }
}
