/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  "/gta-ynov-vue/precache-manifest.4215ec0ee3903223b87f2754b21bb54c.js"
=======
  "/gta-ynov-vue/precache-manifest.0791dff3c7b1f047be9293f99863dede.js"
>>>>>>> 027438e... Initialisation de l'appli
=======
  "/gta-ynov-vue/precache-manifest.7e804e1d94ffbcdb9881594f748e0e69.js"
>>>>>>> 56753bd... Test déploiement
=======
  "/gta-ynov-vue/precache-manifest.0791dff3c7b1f047be9293f99863dede.js"
>>>>>>> 78e885f... Build & deploy
);

workbox.core.setCacheNameDetails({prefix: "gta-ynov-vue"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
