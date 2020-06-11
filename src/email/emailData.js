
const emailData = (type, to, extra) => {
  switch (type) {
    case 'reg':
      const {regToken} = extra;
      return {
        to: to,
        from: "no-reply@connectar.io",
        subject: "Welcome to connectar - Verify your email address\n",
        textBody: `Thank you for signing up for our service.\n\n To complete the process please verify your account by clicking the link: http://localhost:3001/verify-email?token=${regToken}`,
        messageType: 'basic'
      };
    default:
      return {}
  }
};

export default emailData
