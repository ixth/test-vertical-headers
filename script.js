const supportsSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
const isIE = navigator.appVersion.indexOf('MSIE') != -1 && navigator.systemLanguage;

applyVerticalLayout(document.querySelectorAll('th.vertical'));

function applyVerticalLayout(cells) {
    if (isIE || !supportsSVG) {
        return;
    }

    cells.forEach((elem) => {
        const replacement = createTextReplacement(elem);
        setTimeout(() => {
            elem.replaceChild(replacement, elem.firstChild);
        }, 0);
    });
}

function createTextReplacement(elem) {
    const obj = document.createElement('object');
    obj.width = Math.min(elem.clientHeight, elem.clientWidth);
    obj.height = Math.max(elem.clientHeight, elem.clientWidth);
    obj.type = 'image/svg+xml';
    obj.data = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><text transform="rotate(-90) translate(${-obj.height} ${obj.width})">${elem.textContent}</text></svg>`;
    return obj;
}

