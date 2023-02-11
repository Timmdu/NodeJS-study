

//await 后面可以跟进一个promise
//
async function readFileData() {
    //同步写法，await 后面可以跟进一个promise
    const aData = await getFileContent('a.json');
    console.log('a data', aData);
    const bData = await getFileContent(aData.next);
    console.log('b data', bData);
    const cData = await getFileContent(bData.next);
    console.log('c data', cData);
}

async function readAData() {
    const aData = await getFileContent('a.json');
    return aData;
}

async function test() {
    const aData = await readAData();
    console.log(aData);
}
test();

//async await 要点：
//1. await 后面可以追加 promise 对象，获取resolve 的值
//2. await 必须包裹在 async 函数里面
//3. async 函数执行返回的是一个promise 对象
//4. try-catch 截获 promise 中reject的值
