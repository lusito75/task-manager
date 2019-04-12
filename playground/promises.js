const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum);

//     // nesting another call to add Promise
//     add(sum, 5).then((sum2) => {
//         console.log(sum2)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e);
// })

// with Promise chaining
add(1, 2).then((sum) => {
    console.log(sum)
    return add(sum, 4)    // return a new Promise call, and tack on a new 'then' clause. Can keep going, no nesting!!
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})