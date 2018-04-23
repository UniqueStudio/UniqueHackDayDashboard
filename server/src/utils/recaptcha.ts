import fetch from 'node-fetch';

async function recaptcha(antiRobotToken: string) {
  return await fetch('https://recaptcha.net/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `secret=6LdC6U0UAAAAAKxQvzAGTxn_D-ywU0epu111lW8o&response=${antiRobotToken}`,
  })
    .then(res => res.json())
    .then(json => json.success);
}

export default recaptcha;
