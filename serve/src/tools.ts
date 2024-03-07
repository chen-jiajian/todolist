exports.searchQueryParse = function (str) {
    console.log("searchQueryParse",str, typeof str);
    str = str.replace("/\?/g", "");
    const strArr = str.split("&");
    const query = {};
    strArr.forEach((i) => {
        if (i.indexOf("=") > -1) {
            const arr = i.split("=");
            if (arr.length === 2) {
                query[arr[0]] = arr[1];
            }
        }
    });
    console.log("str", str, strArr, query);
    return query;
};
