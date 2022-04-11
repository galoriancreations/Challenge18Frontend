import Url from "url-parse";

export default (req, res, next) => {
    const url = new Url(req.url);
    if (url.pathname.split("/")[1] === "webhook") {
        return redirect(res, "https://c18.freemyip.com" + url.href);
    }
    next();
};

const redirect = (res, location) => {
    res.writeHead(301, { location });
    res.end();
};