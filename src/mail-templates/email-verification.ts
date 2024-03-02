// const { BACKEND_BASE_URL } = '../config';

const EmailVerificationTemplate = ({ name, link }: { name: string; link: string }) => {
  return {
    subject: `Confirm your email`,
      body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
                <h2>Welcome to Tride</h2>
                <p>Hello ${name},<br><br>Welcome to Viascrow, we are on a mission to make both the buyer and seller trust much better, thank you for coming on this journey with us.<br><br>Let’s verify your account first to get started.</p>
                <br>
                <a href="${link}" class="button">Verify Account</a>
                <br><br><br>
                <p>Love,<br>The Viascrow Team.</p></td></tr>
                <tr><td class="footer">
                <table width="100%">
                <tr><td><p>Copyright &copy;2023 GoTrideTech Limited. All rights reserved.</p></td></tr>
                <tr>
                <td align="center">
                <table class="social-links">
                <tr>
                <td><a href="https://twitter.com/" target="_blank"><img src="'$'{BACKEND_BASE_URL}/uploads/images/twitter.png alt="Twitter"></a></td>
                <td><a href="https://www.linkedin.com/company/" target="_blank"><img src="'$'{BACKEND_BASE_URL}/uploads/images/linkedin.png" alt="LinkedIn"></a></td>
                <td><a href="https://www.instagram.com/" target="_blank"><img src="'$'{BACKEND_BASE_URL}/uploads/images/instagram.png" alt="Instagram"></a></td>
                </tr>
                </table></td></tr>
                </table></td></tr>
                </table></div>
                </center>
                </body>
                </html>`,
  };
};

export default EmailVerificationTemplate;
