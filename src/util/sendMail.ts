import nodemailer from 'nodemailer'
import createEmailTemplate from './template/email'
import { toTitleCase } from './util'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: import.meta.env.PROXY_EMAIL,
    pass: import.meta.env.PROXY_EMAIL_PASSWORD
  }
})

// async..await is not allowed in global scope, must use a wrapper
export default async function sendMail(submission: any) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"donotreply" <${import.meta.env.SENDER_EMAIl}>`, // sender address
    to: `${import.meta.env.RECIPIENT_EMAIL}`, // list of receivers
    subject: `You got mail from ${toTitleCase(submission.name)}!`, // Subject line
    text: `${submission.name}, from an email address of ${submission.email} and IP of ${submission.metadata.ip}, sent you the following message.\n${submission.message}`, // plain text body
    html: createEmailTemplate(submission) // html body
  })
}
