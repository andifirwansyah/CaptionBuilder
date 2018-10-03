import cherio from "react-native-cheerio";
// import RNFetchBlob from "rn-fetch-blob";
// import { NativeModules } from "react-native";



export function cari(kata, callback = () => { }, index = 0){
    let params = kata[index].tag.split(" ");
    let param = params.join("+");
    console.log(param)
    fetch("https://jagokata.com/kutipan/kata-" + param + ".html").then((res) => {
        return res.text();
    }).then((html) => {
        let $ = cherio.load(html);
        let result = [];
        let list = $("#citatenrijen > li").map((_, li) => {
            result.push({
                author: $(".auteurfbnaam", li).text(),
                quote: $('.fbquote', li).text()
            })
        })
        if(result || kata.length === index){
            callback(result);
        }else{
            cari(kata,callback,index++);
        }
    })
    // return result;
}

export async function upload(image, callback = () => { }) {

     let uri = image.uri;
     let uriparts = uri.split('.');
     let type = uriparts[uriparts.length - 1];
     let data = new FormData();
        data.append("image", {
            uri : uri,
            type : "image/"+type,
            name: "ccccc."+type
        });
        console.log(data)
        fetch("https://api.imagga.com/v1/content", {
            method: 'POST',
            body: data,
            headers: {
                "Authorization": "Basic YWNjXzUxMGNmYmMyYjkyNDY1YzozZmM2ZWY3NGRiNmQyNTBjYjQzZGI5YmI2YWViMGEwYg=="
            }
        }).then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            callback(json);
        }).catch((err => {
            console.log(err)
        }))

    // const req = new XMLHttpRequest();
    // req.open('GET', image.uri, true);
    // req.responseType = 'blob';
    // req.onload = () => {
    //     // let data = new FormData();
    //     // data.append("image", req.response._data,"test");
    //     // console.log(data)
    //     // fetch("https://api.imagga.com/v1/content", {
    //     //     method: 'POST',
    //     //     body: data,
    //     //     headers: {
    //     //         "Authorization": "Basic YWNjXzUxMGNmYmMyYjkyNDY1YzozZmM2ZWY3NGRiNmQyNTBjYjQzZGI5YmI2YWViMGEwYg=="
    //     //     }
    //     // }).then(res => {
    //     //     return res.json()
    //     // }).then(json => {
    //     //     console.log(json)
    //     //     callback(json);
    //     // }).catch((err => {
    //     //     console.log(err)
    //     // }))
    //     let form = new FormData();
    //     // form.append("image","");
    //     form.append("image",{
    //         uri: image.uri,
    //         type:image.mime,
    //         size: image.size,
    //     },'name');
    //     console.log(form);
    //     xhr = new XMLHttpRequest();
    //     xhr.open("POST", "https://api.imagga.com/v1/content");
    //     // xhr.setRequestHeader("cookie", "session=eyJyZXF1ZXN0X2lkIjpudWxsfQ.DpXElQ.IJ8tMjBZe-Nf8EvH7Hdc7EVC_Gs");
    //     xhr.setRequestHeader("authorization", "Basic YWNjXzUxMGNmYmMyYjkyNDY1YzozZmM2ZWY3NGRiNmQyNTBjYjQzZGI5YmI2YWViMGEwYg==");
    //     xhr.onload = () => {
    //         console.log(xhr.response);
    //     }
    //     xhr.send(form);
    // };
    // req.onerror = () => {
    //     console.log(req.response);
    // };
    // req.send();
}

export function getTag(id,callback = () => {}) {
    fetch("https://api.imagga.com/v1/tagging?language=id&content=" + id,{
        headers: {
            "Authorization": "Basic YWNjXzUxMGNmYmMyYjkyNDY1YzozZmM2ZWY3NGRiNmQyNTBjYjQzZGI5YmI2YWViMGEwYg=="
        }
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log(json)
        callback(json);
    }).catch(err => {
        console.log(err)
    })
}