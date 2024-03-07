const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname + "/../source/data.json");
// 数据库
const { databaseInit } = require("../database/database.js");
const connection = databaseInit();
const readData = async (cotalog = "") => {
    if (cotalog) {
        console.log("cotalog", cotalog);
        return await new Promise((resolve, rejected) => {
            connection.query(
                "SELECT * FROM todo_tbl WHERE cotalog=?",
                [cotalog],
                function (error, results, fields) {
                    if (error) rejected();
                    resolve(results);
                }
            );
        });
    } else {
        return await new Promise((resolve, rejected) => {
            connection.query(
                "SELECT * FROM todo_tbl",
                function (error, results, fields) {
                    if (error) rejected();
                    resolve(results);
                }
            );
        });
    }
    // 文件方式存储
    // const data = await fs.readFileSync(filePath);
    // return JSON.parse(data.toString())
};

// 全量更新
// const updateData = async (list) => {
//     const text = JSON.stringify(list)
//     const result = await fs.writeFileSync(filePath, text)
//     console.log('写入文件结果', result)
// }

// 一条更新
const updateData = async (item) => {
    console.log("update", item);
    const updateSql = "UPDATE todo_tbl SET state = ?, content = ? WHERE Id = ?";
    const updateSqlParams = [item.state, item.content, item.id];
    connection.query(updateSql, updateSqlParams, function (err, result) {
        if (err) {
            console.log("[UPDATE ERROR] - ", err.message);
            return;
        }
    });
};

const createData = async (item) => {
    const createDate = Date.now;
    const addSql =
        "INSERT INTO todo_tbl(id,state,content,cotalog) VALUES(?,?,?,?)";
    const addSqlParams = [item.id, item.state, item.content, item.cotalog];
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log("[INSERT ERROR] - ", err.message);
            return;
        }
    });
    // const list = await readData()
    // list.push(item)
    // updateData(list)
};
const deleteData = async (id) => {
    const delSql = "DELETE FROM todo_tbl where id=?";
    connection.query(delSql, [id], function (err, result) {
        if (err) {
            console.log("[INSERT ERROR] - ", err.message);
            return;
        }
        resolve("success");
    });
    // let list = await readData()
    // const index = list.findIndex((item => item.id === id))
    // console.log('del position', index)
    // if (index > -1) {
    //     list.splice(index,1)
    // }
    // console.log('after data', list, list.length)
    // updateData(list)
};
const readCotalogData = async () => {
    return await new Promise((resolve, rejected) => {
        connection.query(
            "SELECT * FROM cotalog_tbl",
            function (error, results, fields) {
                if (error) rejected();
                resolve(results);
            }
        );
    });
};
const createCotalogData = async (cotalogItem) => {
    return await new Promise((resolve, rejected) => {
        const addSql = "INSERT INTO cotalog_tbl(id,title) VALUES(?,?)";
        const addSqlParams = [cotalogItem.id, cotalogItem.title];
        connection.query(
            addSql,
            addSqlParams,
            function (error, results, fields) {
                if (error) rejected();
                resolve(results);
            }
        );
    });
};
const deleteCotalogData = async (id) => {
    return await new Promise((resolve, rejected) => {
        const delSql = "DELETE FROM cotalog_tbl where id=?";
        connection.query(delSql, [id], function (err, result) {
            if (err) {
                console.log("[INSERT ERROR] - ", err.message);
                return;
            }
            resolve("success");
        });
    });
};
exports.readData = readData;
exports.createData = createData;
exports.deleteData = deleteData;
exports.updateData = updateData;
exports.readCotalogData = readCotalogData;
exports.createCotalogData = createCotalogData;
exports.deleteCotalogData = deleteCotalogData;
