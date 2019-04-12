require('../src/db/mongoose');
const Task = require('../src/models/task')

// 5cabc08c48987e1eb875df14 5ca83669e22ee14aac912242

// Task.findByIdAndDelete('5ca83669e22ee14aac912242').then(() => {
//     console.log('deleted ok')
//     return Task.countDocuments({ completed: false})
// }).then((count) => {
//     console.log('Total incomplete: ' + count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false})
    return count
}

deleteTaskAndCount('5cabc07a48987e1eb875df13').then((result) => {
    console.log('Remaining incomplete tasks', result)
}).catch((e) => {
    console.log(e)
})