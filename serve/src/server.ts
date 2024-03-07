const http = require("node:http");
const url = require("url");
const getId = function () {
    const timeStr = String(Date.now());
    const randomStr = Math.random().toString(36).slice(3);
    return timeStr + randomStr;
};
const responseFormat = function (data) {
    return JSON.stringify({
        code: 0,
        data: data,
    });
};
const responseError = JSON.stringify({
    code: 1,
    text: "数据格式有误",
});

const list = [];
const crud = require("./crud.js");
const getList = async function (cotalogId) {
    const dataList = await crud.readData(cotalogId);
    return dataList;
};
const addList = async function (item) {
    await crud.createData(item);
};
const updateItem = async function (item) {
    await crud.updateData(item);
};
const delListById = async function (id) {
    await crud.deleteData(id);
};
const getCotalogList = async function () {
    return await crud.readCotalogData();
};
const addCotalog = async function (item) {
    return await crud.createCotalogData(item);
};
const delCotalog = async function (id) {
    return await crud.deleteCotalogData(id);
};
const route = require("./router.ts");
// const handle = require("./operation.ts");
const { searchQueryParse } = require("./tools.ts");
const server = http.createServer(async (req, res) => {
    const urlParse = url.parse(req.url);
    const pathname = url.parse(req.url).pathname;
    console.log(urlParse.query, "pathname", pathname);
    const urlQuery = searchQueryParse(urlParse.query || "");
    // route(handle, pathname);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (pathname === "/list") {
        const list = await getList(urlQuery.cotalogId);
        res.write(responseFormat(list), "utf-8");
        res.end();
    } else if (pathname === "/add") {
        // 新增
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            // 接收完消息
            const parseBody = JSON.parse(body);
            if (parseBody.data) {
                const item = parseBody.data;
                item.id = getId();
                addList(item).then(() => {
                    res.end(responseFormat(""), "utf-8");
                });
            } else {
                res.end(responseError, "utf-8");
            }
        });

        // console.log("body", req.body);
    } else if (pathname === "/update") {
        // 新增
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            // 接收完消息
            const parseBody = JSON.parse(body);
            if (parseBody.data) {
                const item = parseBody.data;
                updateItem(item).then(() => {
                    res.end(responseFormat(""), "utf-8");
                });
            } else {
                res.end(responseError, "utf-8");
            }
        });
    } else if (pathname === "/del") {
        // 删除
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            // 接收完消息
            console.log("body", typeof body);
            const parseBody = JSON.parse(body);
            if (parseBody.data) {
                const id = parseBody.data.id;
                delListById(id);
                res.end(responseFormat(""), "utf-8");
            } else {
                res.end(responseError, "utf-8");
            }
        });
    } else if (pathname === "/cotalog") {
        const cotalogs = await getCotalogList();
        console.log(cotalogs);
        res.write(responseFormat(cotalogs), "utf-8");
        res.end();
    } else if (pathname === "/cotalog/add") {
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            // 接收完消息
            const parseBody = JSON.parse(body);
            if (parseBody.data) {
                const item = parseBody.data;
                item.id = getId();
                addCotalog(item).then(() => {
                    res.end(responseFormat(""), "utf-8");
                });
            } else {
                res.end(responseError, "utf-8");
            }
        });
    } else if (pathname === "/cotalog/delete") {
        const cotalogId = urlQuery.id;
        console.log('delete id:', cotalogId)
        await delCotalog(cotalogId);
        res.end(responseFormat(""), "utf-8");
    }
});
exports.server = server;
