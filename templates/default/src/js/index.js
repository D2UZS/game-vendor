const cache = {};
function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
}

// --------- Импортируем скрипты компонентов --------
importAll(require.context("../components/", true, /\.js$/));
// --------------------------------------------------
