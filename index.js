const nodemailer = require('nodemailer')
const { program } = require('commander')

async function send (options) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: options.user,
      pass: options.pass,
    },
    tls: {
      ciphers:'SSLv3'
    },
  })

  const info = await transporter.sendMail({
    from: options.user,
    to: options.to,
    subject: options.subj,
    text: options.body,
  })

  console.log('Message sent: %s', info.messageId)
}

program
  .requiredOption('-u, --user <email>', 'Sender email')
  .requiredOption('-p, --pass <password>', 'Sender password')
  .requiredOption('-t, --to <email>', 'Recipient email')
  .option('-s --subj <subject>', 'Message subject', 'Relay test')
  .option('-b --body <text>', 'Message body', 'Message from relay')

program.parse()

send(program.opts()).catch(console.error)
