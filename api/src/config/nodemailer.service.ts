import { createTransport } from "nodemailer"
export class Mailer {

    private static mailer = createTransport({
        service: process.env.MAILER_SERVICE,
        port: 500,
        auth: {
            user: process.env.MAILER_ADDRESSE,
            pass: process.env.MAILER_PASSWORD,
        }
    })

    public static getMailer() {
        return this.mailer;
    }
}