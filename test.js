// pbkdf2 알고리즘 적용
const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
    })
})

// createHash() : 사용할 해시 알고리즘을 넣어준다
// update() : 변환할 문자열을 넣어준다
// digest() : 인코딩할 알고리즘을 넣는다.

const password = "kiriri"
console.log('base64:', crypto.createHash('sha512').update(password).digest('base64'));
console.log('hex:', crypto.createHash('sha512').update(password).digest('hex'));
console.log('base64:', crypto.createHash('sha512').update(password).digest('base'));