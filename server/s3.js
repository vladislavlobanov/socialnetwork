const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }
    // console.log(req.file);
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "socialnetwork-spiced2021",
            ACL: "public-read",
            Key: `user/${req.session.userId}/` + filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("amazon upload complete");
            // delets file from the local machine
            fs.unlink(path, () => {});
            next();
        })
        .catch((err) => {
            // uh oh
            console.log("Error in Amazon upload " + err);
        });
};

exports.getListAndDelete = async (req, res, next) => {
    const promiseList = s3
        .listObjectsV2({
            Bucket: "socialnetwork-spiced2021",
            Prefix: `user/${req.session.userId}/`,
        })
        .promise();

    promiseList
        .then(async (data) => {
            if (data.Contents.length == 0) {
                return next();
            }
            const promiseDelete = s3
                .deleteObjects({
                    Bucket: "socialnetwork-spiced2021",
                    Delete: {
                        Objects: data.Contents.map((image) => {
                            return { Key: image.Key };
                        }),
                        Quiet: false,
                    },
                })
                .promise();

            await promiseDelete;
            console.log("amazon delete complete");
            next();
        })
        .catch((err) => {
            console.log("Error in Amazon delete " + err);
        });
};
