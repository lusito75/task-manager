require('../src/db/mongoose');
const User = require('../src/models/user')

// 5ca82ff074bed446eca0f2dd 5ca702d9f95e611d085384d4

// User.findByIdAndUpdate('5ca702d9f95e611d085384d4', { age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5ca700925328f231188713f6', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
