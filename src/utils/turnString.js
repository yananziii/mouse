
export function null2str(data) {
    for (let x in data) {
        if (data[x] === null) {
            // 如果是null 把直接内容转为 ''
            data[x] = "";
            console.log(333)
        } else {
            if (Array.isArray(data[x])) {
                // 是数组遍历数组 递归继续处理
                console.log(444)
                data[x] = data[x].map((z) => {
                    return null2str(z);
                });
            }
            if (typeof data[x] === "object") {
                console.log(555)
                // 是json 递归继续处理
                data[x] = null2str(data[x]);
            }
        }
    }
    return data;
}