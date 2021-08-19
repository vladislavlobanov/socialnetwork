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

exports.delete = (req, res, next) => {
    const promiseDelete = s3
        .deleteObject({
            Bucket: "socialnetwork-spiced2021",
            Key: `user/${req.session.userId}/`,
        })
        .promise();

    promiseDelete
        .then(() => {
            console.log("amazon delete complete");
            next();
        })
        .catch((err) => {
            // uh oh
            console.log("Error in Amazon delete " + err);
        });
};
