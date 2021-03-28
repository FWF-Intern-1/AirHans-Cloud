import { bubble } from "./bubble";

//临时解决id的存储
let id = null;
const saveId = (iid) => {
    id = iid;
}
const getId = () => {
    return id;
}

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
let dataMy = null;

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

let dbreq = window.indexedDB.open("db--AirHans-Cloud");
dbreq.onerror = function (event) {
    console.log('数据库打开报错');
  };


dbreq.onsuccess = function (event) {
    db = dbreq.result;
    console.log('数据库打开成功');
};

dbreq.onupgradeneeded = function(event) {
    db = event.target.result;

    //新建对象仓库(建新表),主键是index
    if (!db.objectStoreNames.contains('message')) {
        var objectStore = db.createObjectStore('message', { autoIncrement: true });
        objectStore.createIndex('email', 'email', { unique: false });
        objectStore.createIndex('text', 'text', { unique: false });
        objectStore.createIndex('time', 'time', { unique: false });

    }
}

function dbAdd(data) {
    switch (data.code) {
        case 1:
            //群聊
            
            let request = db.transaction(['message'], 'readwrite')
            .objectStore('message')
            .add({ 
                email: data.email,
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
    var objectStore = db.transaction('message').objectStore('message');
  
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            //cursor.key
            let data = {
                email: cursor.value.email,
                text: cursor.value.text,
                time: cursor.value.time,

            }
            bubble(data);
            cursor.continue();
        } else {
            console.log('没有更多数据了！');
        }
    };
  }
export { saveId, getId, isPanel, isPanelChange,storage, getStorage, dataMy }