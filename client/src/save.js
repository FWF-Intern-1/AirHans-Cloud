import { loadBubble } from "./bubble.js";
import { init } from "./init.js";

//临时解决状态存储
let isPanel = true;
const isPanelChange = () => {
    if (isPanel) isPanel = false; else isPanel = true;
}
/**
 * 
 * @param {Object} data
 * @author Hans
 */
let arrOnline = null;

const getAccountData = () => {
    //TODO 接收后端传来的在线成员后，进行保存

}

let dataMy = new Object();

dataMy = {
    email: window.localStorage.getItem("email"),
    id: window.localStorage.getItem("id")
}

//dataMy作为对象保存当前用户的信息


const storage = (data) => {
    let id = data.id.toString();
    switch (data.code) {
        case 1:
            //存在线用户信息           
            arrOnline = data.arr;
            //暂且认为是对象数组
            break;


        case 2:
            if (sessionStorage.getItem(id)) {
                sessionStorage.removeItem(id);
            }
            sessionStorage.setItem(id,((data) => {
                return {
                    //按需所取，或者简单一点，全部存进去
                }
            })(data));

            break;
    }
}


const getStorage = (data) => {
    switch (data.code) {
        case 1:
            
    }

}



let db = null;

const dbOpen = () => {
    let p = new Promise((resolve,reject) => {

        let dbreq = window.indexedDB.open("db--AirHans-Cloud");
        dbreq.onerror = function (event) {
            console.log('数据库打开报错');
            reject();
        };
        
        
        dbreq.onsuccess = function (event) {
            db = dbreq.result;
            console.log('数据库打开成功');
            resolve();
        };
        
        dbreq.onupgradeneeded = function(event) {
            db = event.target.result;
            
            //新建对象仓库(建新表),主键是index
            if (!db.objectStoreNames.contains('message')) {
                var objectStore = db.createObjectStore('message', { autoIncrement: true });
        
                // objectStore.createIndex('email', 'email', { unique: true });
                // 暂时以ID作为唯一标识符
                objectStore.createIndex('id', 'id', { unique: false });
        
                objectStore.createIndex('text', 'text', { unique: false });
                objectStore.createIndex('time', 'time', { unique: false });
        
            }
            console.log("message“表”建立成功");
        };
    });
    p.then(init);
}

function dbAdd(data) {
    switch (data.code) {
        case 1:
            //群聊
            
            let request = db.transaction(['message'], 'readwrite')
            .objectStore('message')
            .add({ 
                // email: data.email,
                id: data.id,
                text: data.text,
                time: data.time
            });

            request.onsuccess = function (event) {
                console.log('数据写入成功');
            }

            request.onerror = function (event) {
                console.log('数据写入失败');
            
            }

            break;
    }
}


function dbRead() {
    console.log(db.transaction('message'));
    var objectStore = db.transaction('message', 'readonly').objectStore('message');
    let data = new Array();
    let i = 0;
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            //cursor.key
            data[i++] = {
                // email: cursor.value.email,
                id: cursor.value.id,
                text: cursor.value.text,
                time: cursor.value.time,

            }

            cursor.continue();
        } else {
            console.log('没有更多数据了！');
            loadBubble(data);

        }
    };


}
export { isPanel, isPanelChange,storage, getStorage, dataMy, dbAdd, dbRead, dbOpen }
