import { APP_NAME } from '../config';

const WelcomeTemplate = ({ name }: { name: string }) => {
  return {
    subject: `Confirm your email`,
    body: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${APP_NAME}</title>
    <style>
        /* Styles for better email rendering */
        @font-face {
          @import url('https://fonts.cdnfonts.com/css/satoshi');
        }             
        body {
            font-family: 'Satoshi', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
            color: #000080;
            margin-bottom: 20px;
        }
        p {
            line-height: 1.6;
            font-size:16px;
            padding:0 0 16px;
            line-height:24px;
            font-family:'Satoshi', sans-serif;
            margin:0
        }
        .footer p {
          line-height: 1.6;
          font-size:16px;
          padding:0 0 16px;
          line-height:24px;
          font-family:'Satoshi', sans-serif;
          margin:0
      }
        .footer {
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            margin-top: 20px;
        }
        .social-links img {
            width: 30px;
            margin: 0 10px;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome to ${APP_NAME}</h2>
            <p>Hello ${name},</p>
            <p>We are Dean Listers, Christ Followers, Department of Love, Care and Fellowship, Devoted Life-Transformed Followers of Christ.</p>
            <p>Thank you for signing up.</p
            <p>Love,<br>The ${APP_NAME} Team</p>
        </div>
        <div class="footer">
            <p>Copyright &copy; 2024 ${APP_NAME} Limited. All rights reserved.</p>
            <div>
                <a href="https://twitter.com/FutaDlcf" target="_blank"><img src="uploads/images/twitter.png" alt="Twitter"></a>
                <a href="https://facebook.com/futadlcf" target="_blank"><img src="uploads/images/facebook.png" alt="Facebook"></a>
                <a href="https://www.instagram.com/futadlcf/" target="_blank"><img src="uploads/images/instagram.png" alt="Instagram"></a>
            </div>
        </div>
    </body>
</html>
      `,
  };
};

export default WelcomeTemplate;
