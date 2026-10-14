/*
 * config.js — central configuration for the KinoPUB MSX shell.
 *
 * IMPORTANT (ES5 ONLY): TV browsers (webOS, Tizen, older NetCast) generally do
 * NOT support ES6 (let/const/arrow/template-literals/class). Everything under
 * /public/js is written in ES5 on purpose. Keep it that way.
 *
 * Everything you are likely to change lives here.
 */
(function (global) {
    "use strict";
    // --- Where the KinoPUB API is reached -----------------------------------
    //
    // An MSX "interaction plugin" runs inside the TV browser, so requests to the
    // KinoPUB API are subject to CORS. The public KinoPUB API does not reliably
    // send permissive CORS headers, therefore the DEFAULT here points at a thin
    // proxy you host yourself (see /worker/worker.js — a Cloudflare Worker).
    //
    // If your platform/build happens to allow direct cross-origin calls, set
    // API_BASE directly to one of API_MIRRORS below and drop the proxy.
    var CONFIG = {
        // Base URL used for every API call. Must end WITHOUT a trailing slash.
        // Replace with your deployed proxy, e.g. "https://kp-proxy.<you>.workers.dev".
        API_BASE: "https://kinopub-msx-proxy.mfkrdruid.workers.dev",

        // Known official API hosts / mirrors (the proxy forwards to one of these).
        API_MIRRORS: [
            "https://api.service-kp.com",
            "https://api.srvkp.com" // secondary mirror, if/when available
        ],
        // OAuth2 Device-Flow client credentials.
        // Request your own pair from support@kino.pub. If you route through the
        // proxy you can instead inject these server-side and leave them blank here.
        CLIENT_ID: "",
        CLIENT_SECRET: "",

        // A human-readable device title reported to KinoPUB (/device/notify).
        DEVICE_TITLE: "LG webOS (Media Station X)",
        SOFTWARE: "kinopub-msx",
        // --- Persistent storage keys (TVXStorage / localStorage) -------------
        STORAGE: {
            ACCESS: "kp.access_token",
            REFRESH: "kp.refresh_token",
            EXPIRES: "kp.expires_at", // epoch ms when access_token expires
            SETTINGS: "kp.settings",
            DEVICE_CODE: "kp.device_code"
        },
        // --- Default user settings (mirrors kino.pub device settings) --------
        DEFAULT_SETTINGS: {
            streamType: "hls4",   // hls4 | hls2 | hls | http
            serverLocation: "",   // "" = auto
            quality: "1080p",
            allow4k: true,
            hdr: true,
            preferAudioLang: "rus",
            preferSubLang: "",
            showAdultContent: false,
            perPage: 30
        },
        // --- tvOS-flavoured palette (used inside MSX JSON) -------------------
        COLOR: {
            accent: "#0A84FF",
            accentSoft: "rgba(10,132,255,0.25)",
            card: "rgba(255,255,255,0.06)",
            cardFocus: "rgba(255,255,255,0.14)",
            glass: "msx-glass",
            text: "msx-white",
            textDim: "rgba(255,255,255,0.55)",
            progress: "#0A84FF",
            progressBack: "rgba(255,255,255,0.18)",
            good: "#30D158",
            warn: "#FF9F0A",
            bad: "#FF453A",
            gold: "#FFD60A",
            pageBg: "#0B0B0F"
        },
        // --- Poster grid geometry (MSX grid is 12 x 6) ----------------------
        LAYOUT: {
            posterW: 2,
            posterH: 3,
            homeRowItems: 6,
            gridPerPage: 30
        },
        // --- Category / section definitions ---------------------------------
        SECTIONS: [
            { id: "movie",      title: "Фильмы",              type: "movie" },
            { id: "serial",     title: "Сериалы",             type: "serial" },
            { id: "cartoon",    title: "Мультфильмы",         type: "movie",  genreTitle: "Мультфильм" },
            { id: "cartoonser", title: "Мультсериалы",        type: "serial", genreTitle: "Мультфильм" },
            { id: "anime",      title: "Аниме",               type: "serial", genreTitle: "Аниме" },
            { id: "documovie",  title: "Документальные",      type: "documovie" },
            { id: "docuserial", title: "Докум. сериалы",      type: "docuserial" },
            { id: "concert",    title: "Концерты",            type: "concert" },
            { id: "3d",         title: "3D",                  type: "3D" },
            { id: "tvshow",     title: "ТВ-шоу",              type: "tvshow" }
        ],
        SORTS: [
            { id: "updated-", title: "Недавно обновлённые" },
            { id: "created-", title: "Недавно добавленные" },
            { id: "rating-",  title: "По рейтингу" },
            { id: "views-",   title: "По популярности" },
            { id: "year-",    title: "По году (новее)" },
            { id: "title",    title: "По алфавиту" }
        ]
    };
    function baseDir() {
        var href = global.location ? global.location.href : "";
        href = href.split("#")[0].split("?")[0];
        return href.replace(/[^/]*$/, "");
    }
    CONFIG.APP_URL = (baseDir() + "app.html");
    CONFIG.PLAYER_URL = (baseDir() + "player.html");
    global.KP_CONFIG = CONFIG;

})(typeof window !== "undefined" ? window : this);
