// 负责操作localStorage的帮助文件
/*
*  获取数据：var Str  =localStorage.getItem(key);
*  添加和追加数据： localStorage.setItem(key,value) ,value 是一个字符串
*  移除数据 ： localStorage.removeItem(key);
* */

// 1.0 定义常量key,将来操作的localStorage中的数据都以这个key来作为标识
export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};

// 2.0 实现数据的增加
// value;格式： {goodsid:87,count:10}
export function setItem(value){
  //1.0 获取json格式
  var jsonString =  localStorage.getItem(KEY);
  jsonString = jsonString || '[]';
  var arr =   JSON.parse(jsonString);
  // 2.0 将value追加进入arr
  arr.push(value);
  // 3.0 将arr 转换成json字符串保存起来
  localStorage.setItem(KEY,JSON.stringify(arr));
}

// 3.0 获取数据
export function getItem(){
  var jsonString =  localStorage.getItem(KEY);
//    将json格式字符串转换成 js对象
  // jsonString：是一个标准的json格式
  jsonString = jsonString || '[]';

  return JSON.parse(jsonString);
}

/// 4.0 移除数据 goodsid:商品id
export function remoteItem(goodsid){
  var arr = getItem();
//    查找arr中的goodsid和传入的参数goodsid一致的数据全部移除
  for(var i= arr.length -1;i>=0 ; i--){
    if(arr[i].goodsid == goodsid){
      arr.splice(i,1);
    }
  }

//    将最新的arr保存回localStorage中
  localStorage.setItem(KEY,JSON.stringify(arr));

}
//5.0
export function getgoodsObject(){
  //   获取 数组
  var arr=getItem();
  var resObj={};
  //遍历数组中的数据
  for(var i=0;i<arr.length;i++){
    var item =arr[i];
    if(!resObj[item.goodsid]){
      resObj[item.goodsid]=item.count;
    }
    //如果数据已经存在就要进行追加数据到数组中去
    else{
      var count = resObj[item.goodsid];
      resObj[item.goodsid] = count + item.count;
    }
  }
  return resObj;
}
export function updateData(obj){
    var arr  = getItem();

    var count = 1;
    if(obj.type =='add'){
        //加
        arr.push({goodsid:obj.goodsid,count:count});
    }else{
        //减
        for(var i =0 ;i < arr.length ; i++){
            //如果这个对象中的count值等于1，则删除这个对象，否则将这个对象的count减1以后保存回去
            if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1){
                    arr[i].count = arr[i].count -1;
                    break;
                }else{
                    //删除此对象
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }

//    将最新的arr保存回localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));

}