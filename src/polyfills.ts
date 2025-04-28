/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome, Edge, and Firefox.
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, ZoneJS will patch all possible events and add 'zone.js' to the global scope.
 * If you are using ZoneJS in a different way, you can configure ZoneJS to patch a subset of events.
 */
import 'zone.js'; // Included with Angular CLI.

/**
 * Fix for 'global is not defined' error (common in some environments).
 */
(window as any).global = window;

/**
 * Add polyfills for specific browser features if needed.
 * Uncomment the following lines if you need support for older browsers.
 */

// import 'core-js/features/array/find'; // Polyfill for Array.prototype.find
// import 'core-js/features/promise'; // Polyfill for Promise
// import 'core-js/features/object/assign'; // Polyfill for Object.assign

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Add any application-specific imports here.
 */