
let formatData = (obj, url = '')=>{
    //url不为空(get请求: 设置url信息)
    let isPost = url === ''
    for(var k in obj){
        url += (url.indexOf("?")==-1 ? "?" : "&");
        url+=encodeURIComponent(k)+ "=" +encodeURIComponent(obj[k]);
    }
    if(isPost && url) url = url.substr(1)
    //返回拼接好的信息
    return url;
}
let ajax = ({method = 'get', url = '', data = {}, headers = {}})=>{
    return new Promise((resolve, reject)=>{
        method = method.toLocaleLowerCase()
        if(method === 'post') headers = Object.assign(headers, {"Content-Type": "application/x-www-form-urlencoded"})
        let xhr=new XMLHttpRequest();
        if(method === 'post'){
            xhr.open("post", url, true);
        }else{
            url = formatData(data, url);
            xhr.open("get", url, true);
        }
        Object.keys(headers).forEach(v=>{
            xhr.setRequestHeader(v, headers[v]);
        })
        if(method === 'post') {
            xhr.send(formatData(data));
        }else{
            xhr.send();
        }
        
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4){
                if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject(new Error(xhr.statusText));
                }
            }
        }
    })
}

export default ajax