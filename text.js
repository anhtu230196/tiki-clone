let arr = [
    { name: "di động" },
    { name: "điện thoại", parent: "di động" },
    { name: "laptop", parent: "di động" },
    { name: "samsung", parent: "điện thoại" },
    { name: "iphone", parent: "điện thoại" },
    { name: "huwei", parent: "điện thoại" },
    { name: "thể thao" }
]

function newArray(inputArr, parentId = undefined) {
    let category;
    const outputArray = []
    if (!parentId) {
        category = inputArr.filter(cat => cat.parent === undefined)
    } else {
        category = inputArr.filter(cat => cat.parent === parentId)
    }
    for (let cat of category) {
        outputArray.push({
            ...cat,
            children: newArray(inputArr, cat.name)
        })
    }

    return outputArray
}

let newarr = newArray(arr)



