import proxy from "express-http-proxy";

const proxyWithUrl = async (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.user) {

                proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
            }
        }
    });
}

export default proxyWithUrl;