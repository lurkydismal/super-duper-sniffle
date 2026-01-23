if (!window.structuredClone) {
    import("@ungap/structured-clone").then((mod) => {
        window.structuredClone = mod.default;
    });
}

if (!Array.prototype.findLastIndex) {
    Array.prototype.findLastIndex = function (callback, thisArg) {
        for (let index = this.length - 1; index >= 0; index--) {
            if (callback.call(thisArg, this[index], index, this)) {
                return index;
            }
        }

        return -1;
    };
}
