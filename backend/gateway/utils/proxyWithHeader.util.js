import proxy from "express-http-proxy";

const proxyWithUrl =(serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            // proxyReqOpts.headers = proxyReqOpts.headers || {};
            if (srcReq.user) {
                proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
            }


            return proxyReqOpts;
        }
    });
}

export default proxyWithUrl;