let cache;

function imageExists(url) {
    return Array.from(cache.children).some((i) => i.src == url);
}

export function initializeCache() {
    cache = document.createElement("cache");
    document.body.appendChild(cache);
}

export function preloadImages(images) {
    for (const url of images) {
        if (imageExists(url)) {
            continue;
        }

        const image = new Image();
        
        image.src = url;
        cache.append(image);
    }
}

export function setCache(key, value) {
    localStorage.setItem(`cache-${key}`, JSON.stringify({ d: Date.now(), v: value }));
}

export function getCache(key, max = 7) {
    const cache = localStorage.getItem(`cache-${key}`);

    if (cache) {
        let json;

        try { json = JSON.parse(cache) }
        catch { return };

        const diff = Date.now() - json.d;
        const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (daysDiff < max) {
            return json.v;
        }
    }

    return;
}