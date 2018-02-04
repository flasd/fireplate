export default async function requestFileRequest(request, response, next) {
    if (request.url.includes('.')) {
        // If there's a '.' inside the url string, it means that the firebase
        // static files didn't found any matches and delegate the request to
        // the https function. Since we don't serve static files from the express
        // app, we return a 404 here.
        return response.status(404).end();
    }

    return next();
}
