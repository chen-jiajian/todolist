const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url === "favicon.ico") {
        res.end();
    } else {
        console.log("路由", req.url);
        if (req.url === "/list") {
            const list = await getList();
            res.end(responseFormat(list), "utf-8");
        } else if (req.url === "/add") {
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
                        res.end(responseFormat(''), "utf-8");
                    })
                } else {
                    res.end(responseError, "utf-8");
                }
            });

            // console.log("body", req.body);
        } else if (req.url === '/update') {
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
                        res.end(responseFormat(''), "utf-8");
                    })
                } else {
                    res.end(responseError, "utf-8");
                }
            });
        }
        else if (req.url === '/del') {
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
                    delListById(id)
                    res.end(responseFormat(''), "utf-8");
                } else {
                    res.end(responseError, "utf-8");
                }
            });
        }
    }
});

const getId = function () {
    const timeStr = String(Date.now())
    const randomStr = Math.random().toString(36).slice(3)
    return timeStr+randomStr;
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
const list = [
];
const crud = require('./crud.js')
const getList = async function () {
    const dataList = await crud.readData();
    return dataList;
};
const addList = async function (item) {
    await crud.createData(item);
}
const updateItem = async function (item) {
    await crud.updateData(item);
}
const delListById = async function (id) {
    await crud.deleteData(id);
    // const index = list.findIndex((item) => {
    //     return item.id === id
    // })
    // list.splice(index, 1)
}



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
