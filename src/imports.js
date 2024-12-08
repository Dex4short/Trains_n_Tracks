const importmap = document.createElement('script');
importmap.type = 'importmap';
importmap.textContent = JSON.stringify({
    imports: {
        "three": "https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/"
    }
});
document.currentScript.after(importmap);
