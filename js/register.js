$(document).ready(function () {

    function browserRedirect() {  
        var sUserAgent = navigator.userAgent.toLowerCase();  
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";  
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
        var bIsAndroid = sUserAgent.match(/android/i) == "android";  
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";  
        document.writeln("您的浏览设备为：");  
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {  
            document.writeln("phone");  
        } else {  
            document.writeln("pc");  
        }  
    }  




    $('#showRegPage').click(function () {
        $('#registerPage').fadeIn();
        $('#welcome').hide();

       // window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.winsyo.ccmanager&channel=0002160650432d595942&fromcase=60001';
      // browserRedirect();

    });

    $('#submitBtn').click(function () {


        var phone = $('#phone').val();
        var smsCode = $('#smsCode').val();
        var pwd = $('#pwd').val();
        var pwd1 = $('#pwd1').val();

        
        var regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (!regex.test(phone)) {
            alert('手机号不合法');
        } else if (smsCode.length !== 6) {
            alert('验证码位数不正确');
        } else if (!pwd.length>=6) {
            alert('密码位数不对！');
        } else if (pwd !== pwd1) {
            alert('两次密码输入不同！');
        } else {

            

            var data = {"phone":phone,"smsCode":smsCode,"password":pwd,"inviteCode":''}


            $.ajax({
                type:'post',
                url: '/CardStewardTest/user/registerFromWeb',
                data:JSON.stringify(data),
                dataType:'json',
                contentType:'application/json;charset=utf-8' 
            }).done(function (data){

                    



                var resultStatus = data.resultStatus;
                alert(resultStatus);
                if(resultStatus==='200'){
                    $('#successPage').fadeIn();
                    $('#registerPage').fadeOut();
                }else if(resultStatus==='401'){
                    alert('注册失败---该号码已注册过');
                }else if(resultStatus==='4012'){
                    alert('注册失败---手机验证码错误');
                }
                
            }).fail(function (){
                alert('注册请求失败');
            });
        }
    });


    $('#verification').click(function () {

        var phone = $('input[id="phone"]').val();

        alert(phone);

         var jsonstr = {"kindCode":"1","phone":phone};
         var regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
         if(regex.test(phone)){
           $.ajax({
               type:'post',
               url:'/CardStewardTest/user/sendSmsCode',
               data:JSON.stringify(jsonstr),
               dataType:'json',
               contentType:'application/json;charset=utf-8'
               
           }).done(function (data){
              alert(data.resultMessage);
           }).fail(function (){
               alert('发送失败！');
           });
   
         }else{
             alert('手机号错误！');
         }
    });

});