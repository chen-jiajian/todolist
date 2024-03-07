function route (handle, pathname) {
    console.log('route is', pathname)
    if (typeof handle[pathname] === 'function') {
        return handle[pathname]()
    } else {
        console.log('no request handle found for' + pathname)
        return "无此路径接口"
    }
}