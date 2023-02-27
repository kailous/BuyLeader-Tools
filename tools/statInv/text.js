function loadjson() {
    // 获取 #json 标签
    const text = document.querySelector('#json')
    // 判断 #json 标签中的内容是否为空，为空则在 #result 的DIV中插入内容"请先输入json数据"
    if (text.value === '') {
        const result = document.querySelector('#result')
        result.innerHTML = '<p>请先输入json数据</p>'
        return
    }
    // 将数据转化为json格式，如果转化失败，则在 #result 的DIV中插入内容"json数据格式不正确"
    try {
        var data = JSON.parse(text.value)
    }
    catch (e) {
        const result = document.querySelector('#result')
        result.innerHTML = '<p>json数据格式不正确</p>'
        return
    }
    // 判断是keys是否为空，为空则在 #result 的DIV中插入内容"json数据格式不正确"
    if (Object.keys(data).length === 0) {
        const result = document.querySelector('#result')
        result.innerHTML = '<p>json数据格式不正确</p>'
        return
    }
    // 获取keys
    const keys = Object.keys(data[0])
    // 获取keys中的第二个值，定义为products
    const products = keys[1]
    // 获取products中的数据
    const productsData = data.map(item => item[products])
    // 统计products中的数据
    const productCounts = {};
    data.forEach((customer) => {
        const products = customer.products;
        Object.keys(products).forEach((product) => {
            const count = products[product];
            if (productCounts[product]) {
                productCounts[product] += count;
            } else {
                productCounts[product] = count;
            }
        });
    });

    // 计算 productCounts 的总和
    const sum = Object.values(productCounts).reduce((a, b) => a + b, 0)

    // 将结果格式化成list和总计结果输出到<div id="result"></div>中
    const result = document.querySelector('#result')
    result.innerHTML = `<p>总计：${sum}</p><ul>${Object.keys(productCounts).map(key => `<li>${key}：${productCounts[key]}</li>`).join('')}</ul>`

}

// 方法 #result 标签的后面增加一层全屏的 div
function tan() {
    // 获取 #result 标签
    const result = document.querySelector('#result')
    // 在 #result 标签后面增加一层全屏的 div
    result.insertAdjacentHTML('afterend', '<div id="mask" onclick="hide()"></div>')
}
// 新方法 弹出层
function show() {
    // 删除 #result 标签中的 style="display:none;"
    result.removeAttribute('style')
    // 调用 tan() 方法
    tan()
}
// 方法 hide() 用于关闭弹出层
function hide() {
    // 在 #result 中插入 style="display:none;"
    result.setAttribute('style', 'display:none;')
    // 删除 #mask 标签
    document.querySelector('#mask').remove()
}