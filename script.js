var cells = filter(document.getElementsByTagName('th'), function (elem) {
    return /\bvertical\b/i.test(elem.className);
});

var isIE = navigator.appVersion.indexOf('MSIE') != -1 && navigator.systemLanguage;
if (!isIE) {
    applyVerticalLayout(cells);
}

function applyVerticalLayout(cells) {
    map(cells, function (elem) {
        var replacement = createTextReplacement(elem);
        setTimeout(function () {
            elem.replaceChild(replacement, elem.firstChild);
        }, 0);
    });
}

function createTextReplacement(elem) {
    var supportsSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

    if (supportsSVG) {
        return _svgObject(elem);
    }
}

function _svgObject(elem) {
    var obj = document.createElement('object');
    obj.width = Math.min(elem.clientHeight, elem.clientWidth);
    obj.height = Math.max(elem.clientHeight, elem.clientWidth);

    obj.type = 'image/svg+xml';
    obj.data = sprintf('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><text transform="%transform">%text</text></svg>', {
        transform: 'rotate(-90) translate(' + -obj.height + ' ' + obj.width + ')',
        text: elem.textContent
    });

    return obj;
}

function map(arr, callback) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
    }
    return result;
}

function filter(arr, callback) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}

function sprintf(template, context) {
    if (!(typeof template === 'string' || template instanceof String)) {
        throw TypeError(sprintf('template is `%type`, but `string` is expected', {
            type: typeof template
        }));
    }
    return template.replace(/%(\w+)/g, function (match, key) {
        return context[key];
    });
}