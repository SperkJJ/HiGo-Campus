//本地存取相关函数
function setStorage(objName,objValue){
	appcan.locStorage.setVal(objName,objValue);
}
function getStorage(objName){
	return appcan.locStorage.getVal(objName);
}
function clearStorage(objName){
	appcan.locStorage.remove(objName);
}
function setStorageJson(objName,json){
    appcan.locStorage.setVal(objName,JSON.stringify(json));
}
function getStorageJson(objName){
    var ret = {};
	var str = getStorage(objName);
	if(str)
		ret = JSON.parse(str);
	return ret;
}
//window、frame相关
function openWin(inWndName, html, inAniID, duRa, f) {
    appcan.window.open({
        name : inWndName,
        data : html,
        dataType : "0",
        animDuration: duRa ? duRa : "280",
        aniId : inAniID ? inAniID : '10',
        width : "",
        height : "",
        type : ( f ? f : '4')
    });
}
function closeWin() {
    appcan.window.close(-1);
}
function closewin(anim) {
    var a = '-1';
    if (anim)
        a = anim;
    appcan.window.close(a, "200");
}

//toast、confirm和alert相关
function toast(mes) {
    appcan.window.openToast({
        msg : mes,
        duration : 10000,
        position : 5,
        type : 1
    });
}
function closeToast() {
    appcan.window.closeToast();
}
function alert(str, callback) {
    if (callback) {
        appcan.window.confirm({
            title : '提示',
            content : str,
            buttons : ['确定', '取消'],
            callback : function(err, data, dataType, optId) {
                if (data == 0)
                    callback();
            }
        });
    } else
        appcan.window.alert({
            title : '提示',
            content : str,
            buttons : '确定',
            callback : function(err, data, dataType, optId) {
            }
        });
}
//打开新窗口
function openNewWin(wname, html, aid){
    uexWindow.open(wname, '0', html, aid, '', '0', 0x0);
}

function testExit(){
    uexWindow.setReportKey(0, 1);
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == '0') {
             uexWidgetOne.exit();
        }
    }
}
function $$(id)
{
    return document.getElementById(id);
}
function loading(mesg){
            setHtml('loadbg','<div class="ub ub-ac ub-pc"><div id="loading_spinner" class="x-loading-spinner" style=""><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div></div><div class="t-gra uinn" id="lodingTxt">'+mesg+'</div>');
        }
function setHtml(id, html) {
    if ("string" == typeof(id)) {
          var ele = $$(id);
          if (ele != null) {
               ele.innerHTML = html == null ? "" : html;
          }
    } else if (id != null) {
        id.innerHTML = html == null ? "" : html;
    }
}
function getLocation() {
    uexLocation.openLocation();
    uexLocation.onChange = function(inLat, inLog){ 
        setStorage("latitude",inLat);
        setStorage("longtitude",inLog);
        uexLocation.closeLocation();     
    }
}

/*function getSessionId(){
            appcan.request.get({
                url:"http://sperk.cn/test/initial.php",
                success:function(data, status, requestCode, response, xhr){
                    var data = eval('('+data+')');
                    if(data.status=="success"){
                        appcan.locStorage.setVal("SESSIONID",data.sessionid);
                        uexWindow.open("index", '0', "index.html", 2, '', '',0,280);
                    }else{
                        alert("服务器错误！"); 
                    }
                }           
            })
 }
 */


