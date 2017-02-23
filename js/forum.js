var commonurl = "http://121.42.161.29/mobile/app/forum/get.php?type=0&";
var comment_time = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"  "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
function setBounce(){
            appcan.window.setBounce({
                bounceType:[0,1],
                upEndCall:function(type){ 
                    if(type=="0"){         
                        setTimeout(function(){
                            getdata(type);
                        }, 1000);
                    }else{
                        setTimeout(function(){
                            getdata(type); 
                            window.scrollBy(0,100);
                        },1000);
                    } 
                },
                color:'#EEEEEE',
                imgSettings:{ 
                    "imagePath":"res://reload.gif",    
                    "textColor":"#EB6996",
                    "pullToReloadText":"拖动刷新",
                    "releaseToReloadText":"释放刷新",
                    "loadingText":"加载中，请稍等"
                }
            })
}
function getdata(type){
            if(type=="0"){
                url = commonurl + newurl;   
            }else{
                url= commonurl+ preurl + page;
            }
            appcan.request.get(url,function(data){  
                if(eval('('+data+')').status=="success"){
                    appcan.window.resetBounceView(type);
                    if(type=="0"){
                        count1 = eval('('+data+')').count; 
                        if((count1-count)==0){
                            $$('loadbg').className= 'uhide'; 
                            appcan.window.resetBounceView(type);
                            appcan.window.openToast({
                                msg:"没有最新帖子",
                                duration:1500,
                                position:5,
                                type:0
                            }); 
                            return;
                        }else{
                            $$('loadbg').className= 'uhide'; 
                            display(data,type); 
                            count=count1;             
                        }          
                    }else{
                        if(page==1){ 
                            count = eval('('+data+')').count;
                        } 
                        $$('loadbg').className= 'uhide'; 
                        display(data,type); 
                        if(page>1){
                            window.scrollBy(0,200);
                        }
                        page+=1;  
                        appcan.window.closeToast(); 
                    }
                }else{   
                    $$('loadbg').className= 'uhide'; 
                    appcan.window.resetBounceView(type);
                    if(type=="0"){
                        appcan.window.openToast({
                           msg:"没有最新贴子",
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
function display(data,type){
     var tempdata = data;
     var da = eval('('+data+')');
     var data=da.data;
     var datalength;
     if(type=="0"){
         datalength = count1-count;
         for(var i=0;i<datalength;i++){
             var picaddress = data[i].forum_picaddress1;
             var str1 = '<div class="uinn ub ub-ver  bc-bg uc-a umar-b" style="border-bottom:2px solid #">'+
                            '<div class="ub umar-l ub-pe">'+
                                '<img onclick="picdetail(&quot;'+data[i].forum_headpicaddress+'&quot;)" class="ub-img uc-a2 wh2 " src="'+data[i].forum_headpicaddress+'"/>'+
                                '<div class="ub ub-f1 ub-ac">'+
                                '<p class="ub ub-pc ulev-1 sc-text" style="width:45%">用户：'+data[i].forum_author+'</p>'+
                                '<p class="ub ub-f1 ulev-1 sc-text ">发表于：'+data[i].forum_time+'</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="ub ub-ver ub-pc">'+
                                '<div  onclick="forumdetail(&quot;'+data[i].forum_headpicaddress+'&quot;,&quot;'+data[i].forum_author+'&quot;,&quot;'+data[i].forum_time+'&quot;,&quot;'+data[i].forum_title+'&quot;,&quot;'+data[i].forum_content+'&quot;,&quot;'+data[i].forum_picaddress1+'&quot;,&quot;'+data[i].forum_picaddress2+'&quot;,&quot;'+data[i].forum_id+'&quot;)" class="ub ulev1 ub-ac ub-f1 umh4 uinn">'+data[i].forum_title+'</div>';   
             var str2 = '<div class="ub"><img onclick="picdetail(&quot;'+data[i].forum_picaddress1+'&quot;)" style="height:12em;margin-left:0.5em" src="'+data[i].forum_picaddress1+'"/>'+
                         '<div class="ub ub-f1" onclick="forumdetail(&quot;'+data[i].forum_headpicaddress+'&quot;,&quot;'+data[i].forum_author+'&quot;,&quot;'+data[i].forum_time+'&quot;,&quot;'+data[i].forum_title+'&quot;,&quot;'+data[i].forum_content+'&quot;,&quot;'+data[i].forum_picaddress1+'&quot;,&quot;'+data[i].forum_picaddress2+'&quot;,&quot;'+data[i].forum_id+'&quot;)"></div>'+
                         '</div>';     
             var str3 = '</div>'+
                            '<div class="ub ub-ac">'+
                                '<p class="sc-text-active ub ub-pc ulev-1" style="width:20%">'+data[i].forum_type+'</p>'+
                                '<p class=" ub ub-pc" style="width:20%"></p>'+
                                '<div class="ub-f1 ub" style="margin-right:2em ">'+
                                    '<div class="ub ub-f1 ub-ac ub-pe">'+
                                        '<div class="ub-img read wh3"></div>'+
                                        '<p class="ulev-1 sc-text ub umar-l">'+data[i].forum_read+'</p>'+
                                    '</div>'+
                                    '<div class="ub ub-f1 ub-ac ub-pe">'+
                                        '<div class="ub-img comment wh4"></div>'+
                                        '<p class="ulev-1 sc-text ub umar-l">'+data[i].forum_comment+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';   
             if(data[i].forum_picaddress1==""){
                temp+=str1+str3;
             }else{
                temp+=str1+str2+str3;
            }    
         }
         temp+=str;
         document.getElementById("listview").innerHTML = temp;  
         str=temp;    
         temp=''; 
     }else{
         datalength = data.length;
         for(var i=0;i<datalength;i++){
             var str1 = '<div  class="uinn ub ub-ver bc-bg uc-a umar-b" style="border-bottom:2px solid #">'+
                            '<div  class="ub umar-l ub-pe">'+
                                '<img onclick="picdetail(&quot;'+data[i].forum_headpicaddress+'&quot;)" class="ub-img uc-a2 wh2 " src="'+data[i].forum_headpicaddress+'"/>'+
                                '<div class="ub ub-f1 ub-ac">'+
                                '<p class="ub ub-pc ulev-1 sc-text" style="width:45%">用户：'+data[i].forum_author+'</p>'+
                                '<p class="ub ub-f1 ulev-1 sc-text ">发表于：'+data[i].forum_time+'</p>'+
                                '</div>'+
                            '</div>'+
                            '<div  class="ub ub-ver ub-pc">'+ 
                                '<div onclick="forumdetail(&quot;'+data[i].forum_headpicaddress+'&quot;,&quot;'+data[i].forum_author+'&quot;,&quot;'+data[i].forum_time+'&quot;,&quot;'+data[i].forum_title+'&quot;,&quot;'+data[i].forum_content+'&quot;,&quot;'+data[i].forum_picaddress1+'&quot;,&quot;'+data[i].forum_picaddress2+'&quot;,&quot;'+data[i].forum_id+'&quot;)" class="ub ulev1 ub-ac ub-f1 umh4 uinn">'+data[i].forum_title+'</div>';   
             var str2 = '<div class="ub"><img onclick="picdetail(&quot;'+data[i].forum_picaddress1+'&quot;)" style="height:12em;margin-left:0.5em" src="'+data[i].forum_picaddress1+'"/>'+
                         '<div class="ub ub-f1" onclick="forumdetail(&quot;'+data[i].forum_headpicaddress+'&quot;,&quot;'+data[i].forum_author+'&quot;,&quot;'+data[i].forum_time+'&quot;,&quot;'+data[i].forum_title+'&quot;,&quot;'+data[i].forum_content+'&quot;,&quot;'+data[i].forum_picaddress1+'&quot;,&quot;'+data[i].forum_picaddress2+'&quot;,&quot;'+data[i].forum_id+'&quot;)"></div>'+
                         '</div>'; 
             var str3 = '</div>'+
                            '<div  class="ub ub-ac">'+
                                '<p class="sc-text-active ub ub-pc ulev-1" style="width:20%">'+data[i].forum_type+'</p>'+
                                '<p class=" ub ub-pc" style="width:20%"></p>'+
                                '<div class="ub-f1 ub" style="margin-right:2em ">'+
                                    '<div class="ub ub-f1 ub-ac ub-pe">'+
                                        '<div class="ub-img read wh3"></div>'+
                                        '<p class="ulev-1 sc-text ub umar-l">'+data[i].forum_read+'</p>'+
                                    '</div>'+
                                    '<div class="ub ub-f1 ub-ac ub-pe">'+
                                        '<div class="ub-img comment wh4"></div>'+
                                        '<p class="ulev-1 sc-text ub umar-l">'+data[i].forum_comment+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';   
             if(data[i].forum_picaddress1==""){
                str+=str1+str3;
             }else{
                str+=str1+str2+str3;
            }    
         }
         document.getElementById("listview").innerHTML = str;
     }  
      
}S
function picdetail(x){
    var data ={
    displayActionButton:true,
    displayNavArrows:true,
    enableGrid:true,
    startIndex:0,
    data:[x]
}
var json=JSON.stringify(data);
uexImage.openBrowser(json);
}
//存储帖子详细信息
function forumdetail(x,y,z,j,k,l,w,m){
    setStorage("headpicaddress",x);
    setStorage("author",y);
    setStorage("time",z);
    setStorage("title",j);
    setStorage("content",k);
    setStorage("picaddress1",l);
    setStorage("picaddress2",w);
    setStorage("forumid",m);
    uexWindow.open("forum_detail", '0', "forum_detail.html", 2, '', '',0,280);
}
//在帖子详情页显示帖子内容
function dispalyforum(){
        var str1='';
        var str2='';
             str1='<div class="uinn ub ub-ver" style="border-bottom:2px solid #EEEEEE">'+
                          '<div class="ub umar-l ub-pe">'+
                              '<img class="ub-img uc-a2 wh2 " src="'+getStorage("headpicaddress")+'"/>'+
                              '<div class="ub ub-f1 ub-ac">'+
                                  '<p class="ub ub-pc ulev sc-text" style="width:40%">'+getStorage("author")+'</p>'+
                                  '<p class="ub ub-f1 ulev-1 sc-text ">发表于：'+getStorage("time")+'</p>'+
                              '</div>'+
                           '</div>'+
                           '<div class="ub ub-ver ub-pe umar-l">'+
                               '<div class="ub ulev1 ub-ac ub-pc umar-l ub-f1 umar-t">'+getStorage("title")+'</div>'+
                               '<div class="ub ulev uinn"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+getStorage("content")+'</p></div>';     
        if(getStorage("picaddress1")==""){
             str2='</div></div></div>';
        }else{
            if(getStorage("picaddress2")==""){
                str2='<img onclick="picdetail(&quot;'+getStorage("picaddress1")+'&quot;)" style="height:12em;margin-left:0.5em" src="'+getStorage("picaddress1")+'"/></div></div></div>';
            }else{
                str2='<img onclick="picdetail(&quot;'+getStorage("picaddress1")+'&quot;)" style="height:12em;margin-left:0.5em" src="'+getStorage("picaddress1")+'"/>'+
                     '<img onclick="picdetail(&quot;'+getStorage("picaddress2")+'&quot;)" style="height:12em;margin-left:0.5em" src="'+getStorage("picaddress2")+'"/>'+
                     '</div></div></div>'; 
            }
        }                       
        $$('forum_detail').innerHTML=str1+str2;
} 
//显示评论      
function dispalycomment(){
      getComment();             
}
//获取评论
function getComment(){
    appcan.request.get(commneturl,function(data){
          var da = eval('('+data+')');
          if(da.status=="success"){
              $$('nocomment').innerHTML="";//把暂无评论撤销
              var data = da.data;
              newcount=data.length;//获取全部评论数
              for(var i=precount;i<newcount;i++){
                  str+='<div class="uinn ub ub-ver" style="border-bottom:2px solid #EEEEEE">'+
                            '<div class="ub">'+
                                '<img onclick="picdetail(&quot;'+data[i].comment_headpicaddress+'&quot;)" class="ub-img uc-a2 wh2 " src="'+data[i].comment_headpicaddress+'"/>'+
                                '<div class="ub ub-f1 ub-ac">'+
                                '<p class="ub ub-pc ulev-2 sc-text" style="width:50%">用户：'+data[i].comment_author+'</p>'+
                                '<p class="ub ub-f1 ulev-2 sc-text ">评论时间：'+data[i].comment_time+'</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="ub ub-ac umar-l">'+
                                '<div class="ub ulev ub-ac ub-f1 umh4 uinn">'+data[i].comment_content+'</div>'+
                            '</div>'+   
                        '</div>';       
              }  
              $$('comment').innerHTML = str;
              precount=data.length;//已经显示的存储起来
             // $("#comment").append(str1);      
          }else{
          } 
      })
}
//用户提交评论
function inputComment(){
     if(getStorage("isLogin")){
         var comment_content = $$('comment_content').value;
         if(comment_content==""){
             alert("评论内容为空！");
             return;
         }
         //var comment_author='';
         //var comment_headpicaddress;
         toast("评论提交中,请稍候...");
         setTimeout(function(){appcan.request.get(addcommenturl,function(data){});
             appcan.request.get(
                 inputcommenturl,
                 {comment_content:comment_content,
                  comment_time:comment_time,
                  comment_author:getStorage("nick_name"),
                  comment_headpicaddress:getStorage("user_headerimg")
                 },
                 function(data){
                    var da=eval('('+data+')');
                    if(da.status=="success"){
                        appcan.window.openToast("评论提交成功！","1500","5","0"); 
                        $$('comment_content').value='';
                        getComment(); 
                    }else{
                        appcan.window.openToast("评论提交失败！","1500","5","0");
                    }        
                 }
             ) 
         },1500)
     }else{
         alert("请您先登陆再评论");
         setTimeout(uexWindow.open("login", '0', "login.html", 2, '', '',0,280),1000);
     }
}
//
function getPrivageforum(){
    appcan.request.get(priurl,function(data){
        var da = eval('('+data+')');
        $$('loadbg').className= 'uhide'; 
        if(da.status=="success"){
             var data = da.data;
             for(var i=0;i<data.length;i++){
                 var picaddress = data[i].forum_picaddress1;
                 var str1 = '<div class="uinn ub ub-ver bc-bg uc-a umar-b" style="border-bottom:2px solid #">'+
                                '<div class="ub umar-l ub-pe">'+
                                    '<img onclick="picdetail(&quot;'+data[i].forum_headpicaddress+'&quot;)" class="ub-img uc-a2 wh2 " src="'+data[i].forum_headpicaddress+'"/>'+
                                    '<div class="ub ub-f1 ub-ac">'+
                                    '<p class="ub ub-pc ulev-1 sc-text" style="width:45%">用户：'+data[i].forum_author+'</p>'+
                                    '<p class="ub ub-f1 ulev-1 sc-text ">发表于：'+data[i].forum_time+'</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="ub ub-ver ub-pc">'+
                                    '<div  onclick="forumdetail(&quot;'+data[i].forum_headpicaddress+'&quot;,&quot;'+data[i].forum_author+'&quot;,&quot;'+data[i].forum_time+'&quot;,&quot;'+data[i].forum_title+'&quot;,&quot;'+data[i].forum_content+'&quot;,&quot;'+data[i].forum_picaddress1+'&quot;,&quot;'+data[i].forum_picaddress2+'&quot;,&quot;'+data[i].forum_id+'&quot;)" class="ub ulev1 ub-ac ub-f1 umh4 uinn">'+data[i].forum_title+'</div>';   
                 var str2 = '<div class="ub"><img onclick="picdetail(&quot;'+data[i].forum_picaddress1+'&quot;)" style="height:12em;margin-left:0.5em" src="'+data[i].forum_picaddress1+'"/>'+
                             '<div class="ub ub-f1" onclick="forumdetail(&quot;'+data[i].forum_headpicaddress+'&quot;,&quot;'+data[i].forum_author+'&quot;,&quot;'+data[i].forum_time+'&quot;,&quot;'+data[i].forum_title+'&quot;,&quot;'+data[i].forum_content+'&quot;,&quot;'+data[i].forum_picaddress1+'&quot;,&quot;'+data[i].forum_picaddress2+'&quot;,&quot;'+data[i].forum_id+'&quot;)"></div>'+
                             '</div>';     
                 var str3 = '</div>'+
                                '<div class="ub ub-ac">'+
                                    '<p class="sc-text-active ub ub-pc ulev-1" style="width:20%">'+data[i].forum_type+'</p>'+
                                    '<p class=" ub ub-pc" style="width:20%"></p>'+
                                    '<div class="ub-f1 ub" style="margin-right:2em ">'+
                                        '<div class="ub ub-f1 ub-ac ub-pe">'+
                                            '<div class="ub-img read wh3"></div>'+
                                            '<p class="ulev-1 sc-text ub umar-l">'+data[i].forum_read+'</p>'+
                                        '</div>'+
                                        '<div class="ub ub-f1 ub-ac ub-pe">'+
                                            '<div class="ub-img comment wh4"></div>'+
                                            '<p class="ulev-1 sc-text ub umar-l">'+data[i].forum_comment+'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';   
                 if(data[i].forum_picaddress1==""){
                    str+=str1+str3;
                 }else{
                    str+=str1+str2+str3;
                 }    
            } 
            document.getElementById("listview").innerHTML = str; 
        }else{
            $$("listview").innerHTML = '<div class="ub ub-f1 ub-ac ub-pc sc-text">您还没发过帖子呢，赶紧发一个吧！</div> ';
        } 
    })
}




