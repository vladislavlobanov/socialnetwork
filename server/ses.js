const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "us-east-1",
});

exports.sendEmail = function (recipient, code) {
    return ses
        .sendEmail({
            Source: "Social Network " + "<" + secrets.email + ">",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data:
                            "Please use this code: " +
                            code +
                            " to reset your password",
                    },
                },
                Subject: {
                    Data: "Password Reset",
                },
            },
        })
        .promise()
        .then(() => console.log("Reset psw sent"))
        .catch((err) => console.log(err));
};
