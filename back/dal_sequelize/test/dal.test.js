const dal = require('../index.js');
const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;

const testUser = {
    id:'testId',
    password:'password'
}

beforeAll(async()=>{
    console.log('beforeAll')
})
afterAll(async() => {
    console.log('afterAll')
    await dal.deleteUser(testUser)
  }, 9000);

test('put user', async ()=>{
    let user = await dal.createUser(testUser)
},1500)