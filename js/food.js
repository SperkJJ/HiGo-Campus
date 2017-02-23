function getUrl(){
             var serverUrl = "http://api.dianping.com/";
             var apiPath = "v1/business/find_businesses";
             var appkey = "971799358";
             var secret = "5592f1e435654c5db00018780ee0c319";
             
             var param = {};
             param["page"] = page;
             param["format"]="json";
             param["latitude"]=getStorage("latitude");
             param["longitude"]=getStorage("longtitude");
             param["category"]=getStorage("category");
             param["platform"] = 2;
             param["limit"]="10";
             param["radius"]="5000";
             //param["has_deal"]="1";
             param["sort"]="7";
             
             var array = new Array();
             for(var key in param)
             {
                 array.push(key);
             }
             array.sort();  
             var paramArray = new Array();
             paramArray.push(appkey);
             for(var index in array)
             {
                 var key = array[index];
                 paramArray.push(key + param[key]);
             }
             paramArray.push(secret);
             var shaSource = paramArray.join("");
             var sign = new String(CryptoJS.SHA1(shaSource)).toUpperCase();
            
             var queryArray = new Array();
             queryArray.push("appkey=" + appkey);
             queryArray.push("sign=" + sign);
             for(var key in param)
             {
                 queryArray.push(key + "=" + param[key]);
             }
             var queryString = queryArray.join("&");
             var url = serverUrl + apiPath + "?" + queryString;
             return encodeURI(url);
}
function getData(){
            appcan.request.getJSON(getUrl(),function(data){  
                var da = data;      
                if(da.status=="OK"){
                    page++;
                    count = da.total_count;
                    appcan.window.resetBounceView(1);
                    if(count==((page-2)*10+da.count)){
                        str1='<div id="" class="ub " id="dzmore" style="width:80%;margin-left:10%"><div  class="ub  umar-t ub-f1 ub-ac ub-pc uba bc-bg t-gra" style="height:2em;">全部商户显示完毕.(最大5KM范围)</div></div>';    
                    }else{
                        str1='<div id="" class="ub " id="dzmore" style="width:80%;margin-left:10%"><div  onclick="getData()" class="ub  umar-t ub-f1 ub-ac ub-pc uba bc-bg t-gra" style="height:2em;">点击显示更多商户.(最大5KM范围)</div></div>';
                    }
                    var reasult = da.businesses;
                    for(var i=0;i<da.count;i++){
                        var distance;
                        if(reasult[i].distance>1000){
                            distance = parseInt((reasult[i].distance)/1000) + "." + parseInt(reasult[i].distance%1000/100)+" km";
                        }else{
                            distance = reasult[i].distance+" m"; 
                        }
                        str+='<div onclick="openshopdetail('+reasult[i].business_id+')" class="ub" style="border-bottom:1px solid #EEEEEE">'+
                                 '<div class="ub uinn">'+
                                      '<img src="'+reasult[i].s_photo_url+'" class="ub ub-img uc-a" style="width: 8em;height:6em;"/>'+
                                 '</div>'+
                                 '<div class="ub ub-f1 ub-ver uinn ">'+
                                      '<div class="ub ub-f1 ulev1 ub-ac sc-text-tab">'+reasult[i].name+'</div>'+
                                      '<div class="ub ub-f1 ulev-1 ub-ac sc-text">类型：'+reasult[i].categories+'</div>'+
                                      '<div class="ub ub-f1 ">'+
                                          '<div class="ub ulev-2 ub-f1 ub-ac sc-text">'+reasult[i].address+'</div>'+
                                          '<div class="ub ulev-2 ub-f1 ub-ac ub-pe sc-text ">'+distance+'</div>'+
                                      '</div>'+
                                 '</div>'+
                             '</div>';   
                    }
                    str2='<div class="ub" id="dzicon" ><div class="ub-f1 t-gra tx-c ulev-1" style="margin:0.5em 0 0.1em 0">数据支持<img src="css/image/dz2.png">大众点评 </div></div>'
                    $$('loadbg').className= 'uhide';
                    $$("deals").innerHTML=str+str1+str2;
                }
            })
        }
        function openshopdetail(x){
            setStorage("business_id",x);
            uexWindow.open("shop_detail", '0', "shop_detail.html", 2, '', '',0,280);
        }
