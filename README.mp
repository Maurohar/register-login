para darle comienzo a esta app, abra dos terminales en ambas carpetas frontend y backend "npm start"









//utilizamos en nuestro backend.

token = mlsn.f0ac658e1ce7d403ff41dcd90346a373ffc2231ce393c9c8a0e424fcb2c7dca4
curl -X POST \
https://api.mailersend.com/v1/email \
-H 'Content-Type: application/json' \
-H 'X-Requested-With: XMLHttpRequest' \
-H 'Authorization: Bearer {place your token here without brackets}' \
-d '{
    "from": {
        "email": "info@domain.com"
    },
    "to": [
        {
            "email": "recipient@email.com"
        }
    ],
    "subject": "Hello from MailerSend!",
    "text": "Greetings from the team, you got this message through MailerSend.",
    "html": "Greetings from the team, you got this message through MailerSend."
}'