export const errorHandler
    = async (err, req, res, next) => {

        const statusCode = res.statusCode === 200 ? 200 : res.statusCode;
        res.status(statusCode);
        res.json({
            status: false,
            message: err.message,
            error: err.error
        });

    };

