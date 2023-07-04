
const request = async function (path: string, options: any):Promise<any>{
    const fetchRes = await fetch(path, options);
    const strRes = await fetchRes.json()
    return strRes
}

export {request}