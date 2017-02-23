var commonurl = "http://121.42.161.29/mobile/app/news/get.php?type=0&";
var color = '#EEEEEE';
function setBounce(){
            appcan.initBounce(); 
            appcan.frame.setBounce({
                bounceType:[0,1],
                upEndCall:function(type){ 
                    if(type=="0"){         
                        setTimeout(function(){
                            appcan.window.resetBounceView(type);
                            getdata(type);
                        }, 1500);
                    }else{
                        setTimeout(function(){
                            appcan.window.resetBounceView(type);
                            getdata(type);           
                        },1500);
                    } 
                },
                color:'#FFFFFF',
                imgSettings:{ 
                    "imagePath":"res://reload.gif",    
                    "textColor":"#EB6996",
                    "pullToReloadText":"拖动刷新",
                    "releaseToReloadText":"释放刷新",
                    "loadingText":"加载中，请稍候"
                }
            })
}
function display(data,type){
    var da = eval('('+data+')');
    var data=da.data;
    var datalength;
    if(type=="0"){
        datalength = count1-count;
        for(var i=0;i<datalength;i++){ 
            var j=Math.random()*10;
            var k = data[i].article_id;
            var isSetPicaddress = data[i].article_picaddress;
            if(isSetPicaddress==""){
                temp += '<div class="ub-f1 ub  uinn" style="border-bottom:2px solid #E3E3E3" onclick="detail('+k+');">'+
                       '<div class="ub ub-f1 ub-ver umar-r" style="height:6em;width:8em;">'+
                            '<div class="ub ub-f3 ulev1">'+data[i].article_title+'</div>'+
                            '<div class="ub-f1 ub">'+
                               '<p class="ulev-2 umar-r1">阅读数:'+data[i].article_read+'</p>'+
                               '<p class="ulev-2 umar-r1">评论:'+data[i].article_comment+'</p>'+
                               '<p class="ulev-2">发布时间:'+data[i].article_time+'</p>'+  
                            '</div>'+
                       '</div>'+    
                   '</div>';        
            }else{
                if(data[i].display_type==0){
                temp += '<div class="ub-f1 ub  uinn" style="border-bottom:2px solid #E3E3E3" onclick="detail('+k+')">'+
                       '<div  class="ub ub-f1 ub-ver umar-r">'+
                            '<div class="ub ub-f3 ulev1">'+data[i].article_title+'</div>'+
                            '<div class="ub-f1 ub">'+
                               '<p class="ulev-2 umar-r1">阅读数:'+data[i].article_read+'</p>'+
                               '<p class="ulev-2 umar-r1">评论:'+data[i].article_comment+'</p>'+
                               '<p class="ulev-2">发布时间:'+data[i].article_time+'</p>'+  
                            '</div>'+
                       '</div>'+
                       '<div  id="picture" class="ub  umar-l">'+
                            '<img style="height:6em;width:8em;" src="'+data[i].article_picaddress+'"/>'+
                       '</div>'+
                   '</div>';
            }else{
                temp +='<div class="ub ub-ver uinn ubb" style="border-bottom:2px solid #E3E3E3" onclick="detail('+k+')">'+
                          '<div class="ulev1">'+data[i].article_title+'</div>'+
                          '<img style="height:14em;width:100%;margin-top:0.4em;" src="'+data[i].article_picaddress+'"/>'+
                          '<div class="umar-t ub">'+
                              '<p class="ulev-2 umar-r1">阅读数:'+data[i].article_read+'</p>'+
                              '<p class="ulev-2 umar-r1">评论:'+data[i].article_comment+'</p>'+
                              '<p class="ulev-2">发布时间:'+data[i].article_time+'</p>'+   
                          '</div>'+
                      '</div>';
            }
            }
            
       } 
       temp+=str;
       document.getElementById("listview").innerHTML = temp;  
       str=temp;    
       temp='';
    }else{
        datalength = data.length;
        for(var i=0;i<datalength;i++){
            var k = data[i].article_id;
            var isSetPicaddress = data[i].article_picaddress;
            if(isSetPicaddress==""){
                str += '<div class="ub-f1 ub  uinn" style="border-bottom:2px solid #E3E3E3" onclick="detail('+k+')">'+
                       '<div class="ub ub-f1 ub-ver umar-r" style="height:6em;width:8em;">'+
                            '<div class="ub ub-f3 ulev1">'+data[i].article_title+'</div>'+
                            '<div class="ub-f1 ub">'+
                               '<p class="ulev-2 umar-r1">阅读数:'+data[i].article_read+'</p>'+
                               '<p class="ulev-2 umar-r1">评论:'+data[i].article_comment+'</p>'+
                               '<p class="ulev-2">发布时间:'+data[i].article_time+'</p>'+  
                            '</div>'+
                       '</div>'+    
                   '</div>';        
            }else{
                if(data[i].display_type==0){
                str += '<div class="ub-f1 ub  uinn" style="border-bottom:2px solid #E3E3E3" onclick="detail('+k+')">'+
                       '<div class="ub ub-f1 ub-ver umar-r">'+
                            '<div class="ub ub-f3 ulev1">'+data[i].article_title+'</div>'+
                            '<div class="ub-f1 ub">'+
                               '<p class="ulev-2 umar-r1">阅读数:'+data[i].article_read+'</p>'+
                               '<p class="ulev-2 umar-r1">评论:'+data[i].article_comment+'</p>'+
                               '<p class="ulev-2">发布时间:'+data[i].article_time+'</p>'+  
                            '</div>'+
                       '</div>'+
                       '<div id="picture" class="ub  umar-l">'+
                            '<img style="height:6em;width:8em;" src="'+data[i].article_picaddress+'"/>'+
                       '</div>'+
                   '</div>';
            }else{
                str +='<div class="ub ub-ver uinn ubb" style="border-bottom:2px solid #E3E3E3" onclick="detail('+k+')">'+
                          '<div class="ulev1">'+data[i].article_title+'</div>'+
                          '<img style="height:14em;width:100%;margin-top:0.4em;" src="'+data[i].article_picaddress+'"/>'+
                          '<div class="umar-t ub">'+
                              '<p class="ulev-2 umar-r1">阅读数:'+data[i].article_read+'</p>'+
                              '<p class="ulev-2 umar-r1">评论:'+data[i].article_comment+'</p>'+
                              '<p class="ulev-2">发布时间:'+data[i].article_time+'</p>'+   
                          '</div>'+
                      '</div>';
            }
            }
     } 
     document.getElementById("listview").innerHTML = str;
    }    
}
function getdata(type){
            if(type=="0"){
                url = commonurl + newurl;   
            }else{
                url= commonurl+ preurl + page;
            }
            appcan.request.get(url,function(data){  
                if(eval('('+data+')').status=="success"){
                    $$('loadbg').className= 'uhide'; 
                    if(type=="0"){
                        count1 = eval('('+data+')').count;
                        if((count1-count)==0){
                            appcan.window.openToast({
                                msg:"没有最新资讯",
                                duration:1500,
                                position:5,
                                type:0
                            }); 
                            return;
                        }else{
                            display(data,type); 
                            count=count1;             
                        }          
                    }else{
                        if(page==1){
                            count = eval('('+data+')').count;
                        }
                        display(data,type); 
                        if(page>1){
                            window.scrollBy(0,200);    
                        }
                        
                        page+=1;  
                        appcan.window.closeToast(); 
                    }
                   
                   
                }else{
                    $$('loadbg').className= 'uhide'; 
                    if(type=="0"){
                        appcan.window.openToast({
                           msg:"没有最新资讯",
                           duration:1500,
                           position:5,
                           type:0
                        });
                    }else{
                        appcan.window.openToast({
                           msg:"没有更多了",
                           duration:1500,
                           position:5,
                           type:0
                        }); 
                    } 
                    
                }
            })   
        }
function detail(x){
    setStorage("article_id",x);
    openWin("news_detail","news_detail.html","2","300");   
}
function loading(){
            setHtml('loadbg','<div class="ub ub-ac ub-pc"><div id="loading_spinner" class="x-loading-spinner" style=""><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div></div><div class="t-gra uinn" id="lodingTxt">努力加载中...</div>');
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
