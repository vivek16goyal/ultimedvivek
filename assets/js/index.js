/* Created by ..... [*YASHASWI*] ..... */



//varible hold loading msg
var loadmsg="Please Wait....";
var GBCServicePath = "http://tiaapp.goyalonline.in/";

//var GBCServicePath = "http://localhost:51738/";
var isprint = '0';
var pictureSource;
var destinationType;
var timerUpdateLoginTime;

var folderPathImg = "file:///storage/sdcard0/" + FolderName + "/";
var FolderName = "TiaERP@App";
var folderPath = "file:///storage/sdcard0";


var VrRcptCount = 0;
var MISScroll, SaleScroll,RcptTabl;
function loaded() {
    try {
        MISScroll = new IScroll('#wrapper', {
            zoom: true,
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            wheelAction: 'zoom'
        });
        SaleScroll = new IScroll('#wrapper1', {
            zoom: true,
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            wheelAction: 'zoom'
        });
        RcptTabl = new IScroll('#wrapper2', {
            zoom: true,
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            wheelAction: 'zoom'
        });
    }
    catch (e) {
        alert(e.message);
    }
}
function onDeviceReady() {
    clearInterval(timerUpdateLoginTime);
    loaded();
    //$("#menu-side-bar").hide();   
    $("#imgcheck").show();
    $("#on").hide();
    $("#off").hide();
    $("#iPartySelect").hide();
    localStorage.setItem("ShowMsg", '1');
    document.addEventListener("deviceready", HideWaiting, true);
    document.addEventListener("backbutton", BackButton, true); 
    document.addEventListener("pause", BackButton, false);
   // window.addEventListener("batterystatus", onBatteryStatus, false);
    loadmsg = "Checking Data...";
  //  $(".show-page-loading-msg").click();
    window.location.href = "#page-con";
    
    var pa= setInterval(
        function ab() {
            clearInterval(pa);
            CheckPartyRegistration("1")
        }, 1000);

    
    var destination = $('#sel_image').offset();
    var a = destination.top +10;
    var b = destination.right + 200
    $('#A1').css({ top: a, right: b });
    
    $(function () {
        $(".slide-menu").slidemenu();
    });
}
function Reset() {
    if (confirm("Do you really want to Reset App?")) {
        window.localStorage.clear();
        window.location.reload();
    }
   
}

function HideWaiting() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;    
}

function fun_CheckPartyReg() {
    var txtClientCode = $("#txt-clientCode").val().trim();
    if (txtClientCode == "" || txtClientCode == null) {
        textAnim('txt-clientCode', 'bounce');
    }
    else {
        localStorage.setItem("ClientCode", txtClientCode);
        CheckPartyRegistration("0");        
    }
}

function ShowGBCLOgin()
{
    $("#a_div-clientCode").click();
    $("#ClCode").slideUp();
    $("#creditial").slideDown();
    $("#txt-GBCUserId").focus();
}

function fun_Creditial()
{
    if (window.localStorage.getItem("GbcLogin") == "0" || window.localStorage.getItem("GbcLogin") == null) {
        ShowGBCLOgin();
    }
    else {
        $("#imgcheck").hide();
        $("#off").show();
        $("#txt-GBCUserId").val(localStorage.getItem("txtUsr"));
        $("#txt-GBCPass").val(localStorage.getItem("txtPass"));
        fun_GBCLogin("0");
    }
}
function showClient()
{
    $("#imgcheck").hide();
    $("#off").show();
    $("#a_div-clientCode").click();
    $("#creditial").slideUp();
}

function CheckPartyRegistration(val) {
    var clientCode = localStorage.getItem("ClientCode");
    if (clientCode == null || clientCode == "") {
        showClient();
    }
    else {
        var url = GBCServicePath + "/Values/getServiceStatus?pcode=" + clientCode ;
        try {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                cache: false,
                success: function (data) {
                    showDisplayMsg(data, val);
                },
                error: function (event) {
                    alert('Please Check Your Internet Connection.\nThere Is Some Problem While Getting Information From GBC Server' + event.responseText);
                    showClient()
                }
            });
        }
        catch (e) {
            alert(e.message);
            showClient()
        }      

    }

}

function textAnim(evt, str) {
    try {
        $('#' + evt).addClass(str + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('#' + evt).removeClass(str + ' animated');
        });
    } catch (err) {
    }
};

function ShowServerConnection(data) {

    if (data == '0') {
        $("#imgcheck").hide();
        $("#on").hide();
        $("#off").show();
        $("#lnk_login").hide();
        $("#lnk_setting").show();
    }
    else {
        $("#imgcheck").hide();
        $("#on").show();
        $("#off").hide();
        $("#lnk_setting").hide();
        if (localStorage.getItem("LoginUser") == null || localStorage.getItem("LoginUser") == "") {
            BeforeLoginPage();
        }
        else {           
            AfterLoginPage();
        }

    }
}

function UnLoadMenu() {
    $("#menuList").html("<ul class='menu-items' id='run-ul' style='left:-50px;'>" +
        "<li class='menu-item' title='SETTING'>"+
    "<div class='menu-header'>"+
        "<div class='menu-icon'>"+
            "<i class='fa fa-cog'></i>"+
        "</div>"+
        "<div class='menu-content'>"+
            "<span>SETTING</span>"+
        "</div>"+
        "<div class='menu-close'>"+
            "<i class='fa fa-times'></i>"+
        "</div>"+
    "</div>"+
    "<div class='menu-body'>"+
        "<center>"+
            "<br />"+
        "<ul data-role='listview' style='width:70%' class='ui-listview' id='setting-menu'>"+
            "</ul>"+
        "</center>"+
    "</div>"+
"</li>" +
    "<li class='menu-item' id='li3' onclick='exitAppMenu()' style='position: absolute; top: 46px;'><div class='menu-header'><div class='menu-icon'><i class='fa fa-sign-out'></i></div><div class='menu-content'><span>Exit</span> </div><div class='menu-close'><i class='fa fa-times'></i></div></div></li>" +
"</ul>");
    $("#setting-menu").append("<li onclick='GetAppUserInfo();' class='ui-li-has-icon ui-first-child' ><a href='#appSetting-div'  data-transition='flip' style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/cog2.png' alt='USA' class='ui-li-icon'>App Setting</a></li>");
        //"<li  class='ui-li-has-icon ui-first-child' style='position: absolute; '><a href='#DisplaySetting'   data-transition='flip' style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/cog2.png' alt='USA' class='ui-li-icon'>Display Setting</a></li>"
        
    
}

function LoadMenu() {
    try {
        var Invoice = '0';
        var Order = '0';
        var Report = '0';
        var Accounts = '0';
        $("#menuList").html("<ul class='menu-items' style='left:-50px;'>"+           
                "<li class='menu-item' title='HOME' id='liHome'>"+
                    "<div class='menu-header'>"+
                        "<div class='menu-icon'>"+
                            "<i class='fa fa-home'></i>"+
                        "</div>  "+
                         "<div class='menu-content'>"+
                            "<span>HOME</span>"+
                        "</div>   "+
                        "<div class='menu-close'>"+
                            "<i class='fa fa-times'></i>"+
                        "</div>               "+
                    "</div>              "+  
                "</li>"+
                "<li class='menu-item' title='INVOICE' id='mnuliinvoice'>"+
                    "<div class='menu-header'>"+
                        "<div class='menu-icon'>"+
                            "<i class='fa fa-dedent'></i>"+
                        "</div>"+
                        "<div class='menu-content'>"+
                            "<span>Invoice</span>"+
                        "</div>"+
                        "<div class='menu-close'>"+
                            "<i class='fa fa-times'></i>"+
                        "</div>"+
                    "</div>"+
                    "<div class='menu-body'>"+
                        "<center>"+
                            "<br />"+
                            "<ul data-role='listview' style='width:70%' class='ui-listview' id='invoice-menu'>"+
                            "</ul>"+
                         "</center>"+
                    "</div>"+
                "</li>" +
                "<li class='menu-item' title='ACCOUNTS' id='mnuliaccount'>" +
                    "<div class='menu-header'>" +
                        "<div class='menu-icon'>" +
                            "<i class='fa fa-rupee'></i>" +
                        "</div>" +
                        "<div class='menu-content'>" +
                            "<span>ACCOUNTS</span>" +
                        "</div>" +
                        "<div class='menu-close'>" +
                            "<i class='fa fa-times'></i>" +
                        "</div>" +
                    "</div>" +
                    "<div class='menu-body'>" +
                        "<center>" +
                            "<br />" +
                            "<ul data-role='listview' style='width:70%' class='ui-listview' id='accounts-menu'>" +
                            "</ul>" +
                         "</center>" +
                    "</div>" +
                "</li>" +
                "<li class='menu-item' title='ORDER' id='mnuliorder'>"+
                   "<div class='menu-header'>"+
                       "<div class='menu-icon'>"+
                           "<i class='fa fa-shopping-cart'></i>"+
                       "</div>"+
                       "<div class='menu-content'>"+
                           "<span>ORDER</span>"+
                       "</div>"+
                       "<div class='menu-close'>"+
                           "<i class='fa fa-times'></i>"+
                       "</div>"+
                   "</div>"+
                   "<div class='menu-body'>"+
                       "<center>   "+
                           "<br />"+
                           "<ul data-role='listview' style='width:70%' class='ui-listview' id='order-menu'>"+
                           "</ul>"+
                       "</center>"+

                   "</div>"+
               "</li>"+
               "<li class='menu-item' title='REPORT' id='mnulireport'>"+
                   "<div class='menu-header'>"+
                       "<div class='menu-icon'>"+
                           "<i class='fa fa-book'></i>"+
                       "</div>"+
                       "<div class='menu-content'>"+
                           "<span>REPORT</span>"+
                       "</div>"+
                       "<div class='menu-close'>"+
                           "<i class='fa fa-times'></i>"+
                       "</div>"+
                   "</div>"+
                   "<div class='menu-body'>"+
                       "<center>   "+
                           "<br />      "+           
                           "<ul data-role='listview' style='width:70%' class='ui-listview' id='report-menu'>"+
                           "</ul>"+
                       "</center>"+

                   "</div>"+
               "</li>"         +  
               "<li class='menu-item' title='SETTING'>"+
                   "<div class='menu-header'>"+
                       "<div class='menu-icon'>"+
                           "<i class='fa fa-cog'></i>"+
                       "</div>"+
                       "<div class='menu-content'>"+
                           "<span>SETTING</span>"+
                       "</div>"+
                       "<div class='menu-close'>"+
                           "<i class='fa fa-times'></i>"+
                       "</div>"+
                   "</div>"+
                   "<div class='menu-body'>"+
                       "<center>"+
                           "<br />"+
                       "<ul data-role='listview' style='width:70%' class='ui-listview' id='setting-menu'>"+
                           "</ul>"+
                       "</center>"+
                   "</div>"+
               "</li>"+
                "<li class='menu-item' title='' id='li3' onclick='exitAppMenu()'><div class='menu-header'><div class='menu-icon'><i class='fa fa-sign-out'></i></div><div class='menu-content'><span>Exit</span> </div><div class='menu-close'><i class='fa fa-times'></i></div></div></li>" +
           "</ul>");
        var MenuList = localStorage.getItem("MnuList");
        //invoice
        if (MenuList.indexOf("INV003") >= 0) {
            $("#s-ser").show();
            Invoice = '1';
            $("#invoice-menu").append(" <li class='ui-li-has-icon ui-first-child' onclick='Retail_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/Invoice.png' alt='USA' class='ui-li-icon'>Retail</a></li>");
        }
        else {
            $("#s-ser").hide();
        }
        if (MenuList.indexOf("INV055") >= 0) {
            $("#w-ser").show();
            Invoice = '1';
            $("#invoice-menu").append("<li class='ui-li-has-icon ui-last-child' onclick='Wsale_Invoice()'><a style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/wordpress2.png' alt='Great Britain' class='ui-li-icon'>Wholesale</a></li>");
        }
        else {
            $("#w-ser").hide();
        }

        //Accounts
        if (MenuList.indexOf("ACC003") >= 0) {
            Accounts = '1';
            $("#rec-rcpt").show();
            $("#accounts-menu").append("<li class='ui-li-has-icon ui-first-child' onclick='Receipt_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/receipts.png' alt='USA' class='ui-li-icon'>Receipts</a></li>");
        }
        else {
            $("#rec-rcpt").hide();
        }
        if (MenuList.indexOf("ACC003") >= 0) {
            Accounts = '1';
            $("#pay-ser").show();
            $("#accounts-menu").append("<li class='ui-li-has-icon ui-first-child' onclick='Payment_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/Payment.png' alt='USA' class='ui-li-icon'>Payments</a></li>");
        }
        else {
            $("#pay-ser").hide();
        }

        //Order
        if (MenuList.indexOf("INV081") >= 0 || MenuList.indexOf("INV105") >= 0) {
            Order = '1';
            $("#order-menu").append(" <li class='ui-li-has-icon ui-first-child' onclick='Order_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/cart.png' alt='USA' class='ui-li-icon'>Order</a></li>");
        }

        //Report
        if (MenuList.indexOf("ACC021") >= 0) {
            Report = '1';
            $("#report-menu").append("<li class='ui-li-has-icon ui-first-child' onclick='Ldg_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/address-book.png' alt='USA' class='ui-li-icon'>Party Ledger</a></li>");
        }
        if (MenuList.indexOf("ACC068") >= 0) {
            Report = '1';
            $("#report-menu").append("<li class='ui-li-has-icon ui-first-child' onclick='MISReport()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/misreport.png' alt='USA' class='ui-li-icon'>MIS</a></li>");
        }
        if (MenuList.indexOf("ACC070") >= 0) {
            Report = '1';
            $("#report-menu").append("<li class='ui-li-has-icon ui-first-child' onclick='LoadSaleReport()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/SaleRpt.png' alt='USA' class='ui-li-icon'>Sale Report</a></li>");
        }
        //$("#invoice-menu").html(" <li class='ui-li-has-icon ui-first-child' onclick='Retail_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/Invoice.png' alt='USA' class='ui-li-icon'>Retail</a></li>" +
        //                      "<li class='ui-li-has-icon ui-last-child' onclick='Wsale_Invoice()'><a style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/wordpress2.png' alt='Great Britain' class='ui-li-icon'>Wholesale</a></li>");
        //$("#order-menu").html(" <li class='ui-li-has-icon ui-first-child' onclick='Order_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/cart.png' alt='USA' class='ui-li-icon'>Order</a></li>");
        //$("#report-menu").html(" <li class='ui-li-has-icon ui-first-child' onclick='Ldg_click()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/address-book.png' alt='USA' class='ui-li-icon'>Party Ledger</a></li>"+
        //    "<li class='ui-li-has-icon ui-first-child' onclick='MISReport()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/misreport.png' alt='USA' class='ui-li-icon'>MIS</a></li>"+
        //    "<li class='ui-li-has-icon ui-first-child' onclick='LoadSaleReport()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/SaleRpt.png' alt='USA' class='ui-li-icon'>Sale Report</a></li>");
        $("#setting-menu").append(" <li class='ui-li-has-icon ui-first-child' onclick='SettingWind()'><a  style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/html52.png' alt='USA' class='ui-li-icon'>Series</a></li>" +
            //"<li  class='ui-li-has-icon ui-first-child' ><a href='#DisplaySetting'   data-transition='flip' style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/cog2.png' alt='USA' class='ui-li-icon'>Display Setting</a></li>"+
            "<li onclick='GetAppUserInfo();' class='ui-li-has-icon ui-first-child' ><a href='#appSetting-div'  data-transition='flip' style='background-color:#999; color:white;' class='ui-btn'><img style='margin-top:-7px;' src='assets/img/cog2.png' alt='USA' class='ui-li-icon'>App Setting</a></li>");
        if (Invoice == '0') {
            $("#mnuliinvoice").hide();
        }
        else {
            $("#mnuliinvoice").show();
        }
        if (Accounts == '0') {
            $("#mnuliaccount").hide();
        }
        else {
            $("#mnuliaccount").show();
        }
        if (Order == '0') {
            $("#mnuliorder").hide();
        }
        else {
            $("#mnuliorder").show();
        }
        if (Report == '0') {
            $("#mnulireport").hide();
        }
        else {
            $("#mnulireport").show();
        }
        select = document.getElementById('Select1');
        if (MenuList.indexOf("INV081") >= 0) {
            $("#o-ser").show();
            var opt = document.createElement('option');
            opt.value = 'ORDS';
            opt.innerHTML = 'Order Sale (ORDS)';
            select.appendChild(opt);
        }
        else {
            $("#o-ser").hide();
            $("#Select1 option[value='ORDS']").remove();
        }
        if (MenuList.indexOf("INV105") >= 0) {
            $("#or-ser").show();
            var opt = document.createElement('option');
            opt.value = 'ORDR';
            opt.innerHTML = 'Order Retail (ORDR)';
            select.appendChild(opt);
        }
        else {
            $("#or-ser").hide();
            $("#Select1 option[value='ORDR']").remove();
        }
        
    }
    catch (e) {
        alert(e.message);
    }
}

function Receipt_click() {
    clear_ReceiptDetail();
    if (localStorage.getItem("sr_rcpt") == "" || localStorage.getItem("sr_rcpt") == null || localStorage.getItem("sr_rcpt") == "null") {
        alert("Please Select Series!!!");
        window.location.href = "#series_div";
    }
    else {
        $("#rptPy1").text("Receipt");
        $("#rptPy").text("Receipt");
        localStorage.setItem("FDName", "MNRC");
        window.location.href = '#Receipt-part1';
    }
}

function Payment_click() {
    clear_ReceiptDetail();
    if (localStorage.getItem("sr_pay") == "" || localStorage.getItem("sr_pay") == null || localStorage.getItem("sr_pay") == "null") {
        alert("Please Select Series!!!");
        window.location.href = "#series_div";
    }
    else {
        $("#rptPy1").text("Payment");
        $("#rptPy").text("Payment");
        localStorage.setItem("FDName", "MNPY");
        window.location.href = '#Receipt-part1';
    }
}

function BeforeLoginPage() {
    $("#lnk_logout").hide();
    $("#lnk_login").show();
    $("#HomePage").show();
    $("#menuBottun").hide();
    $("#setting_a").hide();
    $("#user_a").hide();
    textAnim('HomePage', 'bounceInDown');
}
function AfterLoginPage()
{
    try{
        LoadMenu();
        //$("#user_a").show();
        //$("#setting_a").show();
        $("#off").hide();
        $("#on").show();
        $("#HomePage").hide();
        $("#lnk_login").hide();
        $("#lnk_logout").show();
        $("#menuBottun").show();
        $("#Body-invoice-order").hide();    
        $("#img_lnk_back").hide();


        var item = localStorage.getItem("ListFDNAME");
        GetSereisList();
        var tdCnt = 0;

        $("#liHome").click();
        $("#liHome").click();
        
        
    }
    catch (e) {
        alert(e.message());
    }
}

function ConnectLocally() {    
    //Ask For Static Ip
    var retVal;
    if (localStorage.getItem("StaticIp") == "" || localStorage.getItem("StaticIp") == null) {
        retVal = prompt("Static Ip To Connect Locally : ", "Static Ip");
        if (retVal != null) {
            localStorage.setItem("StaticIp", retVal.trim());
        }
        else {
            $(".hide-page-loading-msg").click();
        }
    }
    else {
        retVal = localStorage.getItem("StaticIp");
    }
    var localUrl = "http://" + retVal.trim() + ":9979/";
    localStorage.setItem("APIURL", localUrl);
    PingTiaAppService('0');
    //Change APIURL value and Ping
}

function StartTimerForServiceStatusCheck() {
    localStorage.setItem("ShowMsg", '0');
    PingTiaAppService("1");
}

function ServiceStopMsg() {
    $('.activeImg').attr('src', 'assets/img/red.gif');
    alert("Your TiaERPApp service is stop!!! To use TiaERP@App Application, start TiaERPApp Service from AppServiceStarter.");
}

function PingTiaAppService(flag) {
    var GlobalUrl = localStorage.getItem("APIURL");
    GlobalUrl = GlobalUrl + "/Connection/Ping";
    $.ajax({
        url: GlobalUrl,
        type: "GET",
        success: function (data) {
            $("#p-activePath").text(localStorage.getItem("APIURL"));
            ////data=1 means service active
            ///flag=1 means call for global connection
            $(".hide-page-loading-msg").click();
            if (data != "1") {
                if (flag == "1") {
                    ConnectLocally();
                } else {
                    $('.activeImg').attr('src', 'assets/img/red.gif');
                    if (localStorage.getItem("ShowMsg") == '0') {
                        if (localStorage.getItem("ShowMsgSetting") == '1') {
                            ServiceStopMsg();
                            localStorage.setItem("ShowMsgSetting", '0');
                        }
                    }
                    else {
                        ServiceStopMsg();
                    }
                    
                }
            }
            else {
                //cahnge Active Image

                if (localStorage.getItem("APIURL") == localStorage.getItem("GlobalAPIURL")) {
                    $('.activeImg').attr('src', 'assets/img/green.gif');
                    $('.activeImg').attr('style', 'width:23px;height:22px;margin-top:2px;');
                }
                else {
                    $('.activeImg').attr('src', 'assets/img/Green-.gif');
                    $('.activeImg').attr('style', 'width:19px;height:18px;margin-top:3px;');
                }

                if (localStorage.getItem("APIURL") == localStorage.getItem("GlobalAPIURL")) {
                    $('.activeImg').attr('src', 'assets/img/green.gif');
                    $('.activeImg').attr('style', 'width:23px;height:22px;margin-top:2px;');
                }
                else {
                    $('.activeImg').attr('src', 'assets/img/Green-.gif');
                    $('.activeImg').attr('style', 'width:19px;height:18px;margin-top:3px;');
                }

            }
            
        },
        error: function (event) {
            $(".hide-page-loading-msg").click();
            if (flag == "1") {
                ConnectLocally();
            } else {
                $('.activeImg').attr('src', 'assets/img/red.gif');
                if (localStorage.getItem("ShowMsg") == '0') {
                    if (localStorage.getItem("ShowMsgSetting") == '1') {
                        ServiceStopMsg();
                        localStorage.setItem("ShowMsgSetting", '0');
                    }
                }
                else {
                    ServiceStopMsg();
                }
            }
        }
    });
}


function showDisplayMsg(AppURL,val)
{    
    if (AppURL == "*") { //Party not registered
        localStorage.setItem("ClientCode", "");
        alert("Party is not registered. Please contact with GBC Administrator.");
        showClient();
        return false;
    } else if (AppURL == "@") { //Party code blank
        // add pcode in Setting page
        return false;
    } else if (AppURL == "#") { //service stop
        localStorage.setItem("ClientCode", "");
        alert("Your TiaERPApp service is stop!!! To use TiaERP@App Application, start TiaERPApp Service from AppServiceStarter.");
        showClient()
        return false;
    } else if (AppURL == "%") { //license Expired
        localStorage.setItem("ClientCode", "");
        alert("Licensing for TiaERP@App Application has expired. Please contact with GBC administrator.");
        showClient()
        return false;
    } else if (AppURL == "$") { // Deactive
        localStorage.setItem("ClientCode", "");
        alert("Your License is currently deactivated by GBC Server. Please contact with GBC Administrator.");
        showClient()
        return false;
    } else if (AppURL == "&") {
        if (val == "1") {
            return true;
        }
        else{
            return false;
        }
    }
    else {
        if (AppURL == "!") {
            alert("Error occurred while getting information from GBC Server. Please contact with GBC Administrator or check your internet connection.");
            localStorage.setItem("ClientCode", ""); showClient();
        }
        else {
            var itmstr = AppURL.split('<|>');
            localStorage.setItem("GlobalAPIURL", itmstr[0]);
            if (localStorage.getItem("DefaultAPIURL") != null && localStorage.getItem("DefaultAPIURL") != "") {
                localStorage.setItem("APIURL", localStorage.getItem("DefaultAPIURL"));                
            } else {
                localStorage.setItem("APIURL", itmstr[0]);
            }
            localStorage.setItem("GBCUserID", itmstr[1]);
            localStorage.setItem("GBCPass", itmstr[2]);
            localStorage.setItem("ListFDNAME", itmstr[3]);
            localStorage.setItem("PType", itmstr[4]);
            localStorage.setItem("Status", itmstr[5]);
           
            fun_Creditial();
            return true;
        }
    }

}

function SetStaticIP() {
    if ($("#p-static").val() != "" && $("#p-static").val() != null) {
        localStorage.setItem("StaticIp", $("#p-static").val());
        $("#p-local").text("Localy Connect On IP:" + $("#p-static").val());
        alert(localStorage.getItem("StaticIp") + " Set Successfully!");
    }
    else {
        $("#p-static").focus();
    }
}

function SetConnectionLocally() {
    localStorage.setItem("ShowMsgSetting", '1');
    loadmsg = "Connecting App Locally...";
    $(".show-page-loading-msg").click();
    ConnectLocally();
}

function SetConnectionGlobally() {
    localStorage.setItem("ShowMsgSetting", '1');
    loadmsg = "Connecting App Globally...";
    $(".show-page-loading-msg").click();
    localStorage.setItem("APIURL", localStorage.getItem("GlobalAPIURL"));
    PingTiaAppService('0');
}

function SetDefaultPath() {
    if ($("#def-path").prop("checked") == true) {
        localStorage.setItem("DefaultAPIURL", localStorage.getItem("APIURL"));
    }
    else if ($("#def-path").prop("checked") == false) {
        localStorage.setItem("DefaultAPIURL", "");
    }
}

function GetAppUserInfo() {
    loadmsg = "Loading App User Data";
    $(".show-page-loading-msg").click();
    $("#p-node").text(":" + GetDeviceNameId("3"));
    $("#p-static").val(localStorage.getItem("StaticIp"));
    $("#p-activePath").text(localStorage.getItem("APIURL"));
    var d = new Date();
    var month = (d.getMonth().toString().length == 1) ? "0" + Number(d.getMonth() + 1) : Number(d.getMonth() + 1);
    var year = d.getFullYear().toString().substr(2, 2);
    $("#appVersion").text(":"+year);
    $("#appRelease").text(":"+month);
    if (localStorage.getItem("DefaultAPIURL") != null && localStorage.getItem("DefaultAPIURL") != "") {
        $("#def-path").prop("checked", true);
    }
    else {
        $("#def-path").prop("checked", false);
    }
    $.ajax({
        url: GBCServicePath + "/Values/GetSuppAppUserData?pcode=" + localStorage.getItem("ClientCode"),
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            $(".hide-page-loading-msg").click();
            if (data != "") {
                var itmstr = data.split('<|>');
                localStorage.setItem("APPUName", itmstr[0]);
                localStorage.setItem("APPUNO", itmstr[1]);
                localStorage.setItem("APPUEMAIL", itmstr[2]);
                localStorage.setItem("APPUADD", itmstr[3]);
                localStorage.setItem("APPUSTATUS", itmstr[4]);
                localStorage.setItem("APPUGIP", itmstr[5]);
                $("#p-code").text(":"+localStorage.getItem("ClientCode"));
                $("#p-name").text(":" + itmstr[0]);
                $("#p-no").text(":" + itmstr[1]);
                $("#p-email").text(":" + itmstr[2]);
                $("#p-add").text(":" + itmstr[3]);
                $("#p-global").text("Globaly Connect On IP:" + itmstr[5]);
                $("#p-local").text("Localy Connect On IP:" + localStorage.getItem("StaticIp"));
                
            }
        },
        //if any error occure
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            $(".hide-page-loading-msg").click();
        }
    })
}

function fun_GBCLogin(val) {
    var GBCUSERID = localStorage.getItem("GBCUserID");
    var GBCPASS = localStorage.getItem("GBCPass");
    var UserNmae = $("#txt-GBCUserId").val().trim();
    var Pass = $("#txt-GBCPass").val().trim();
  
    if (UserNmae == "") {
        ShowGBCLOgin();
        textAnim('txt-GBCUserId', 'bounce');        
    }
    else if (Pass == "") {
        ShowGBCLOgin();
        textAnim('txt-GBCPass', 'bounce');
    }else {
        if (GBCUSERID.toString().toLowerCase() == UserNmae.toString().toLowerCase()) {
            if (Pass.toString().toLowerCase() == GBCPASS.toString().toLowerCase()) {
                if (localStorage.getItem("Status") == "#") {
                    ConnectLocally();
                }
                else {
                    PingTiaAppService('1')
                }
                setTimeout(function chk() {
                    setInterval(StartTimerForServiceStatusCheck, 30000);
                }, 3000);
                $("#on").show();
                $("#off").hide();
                $("#div-clientCode").popup("close");
                $("#div-clientCode").popup("close");
                //if (localStorage.getItem("LoginUser") == "" || localStorage.getItem("LoginUser") == null) {
                //    if (localStorage.getItem("PType") == "C") {
                //        $("#user_a").show();
                //        textAnim('user_a', 'zoomIn');
                //    }
                //    $("#lnk_login").show();
                //    window.localStorage.setItem("txtUsr", UserNmae);
                //    window.localStorage.setItem("txtPass", Pass);
                //} else {                    
                //    AfterLoginPage();
                //}
                $("#menu-side-bar").show();
                $("#lnk_login").show();
                window.localStorage.setItem("txtUsr", UserNmae);
                window.localStorage.setItem("txtPass", Pass);

                window.localStorage.setItem("GbcLogin", "1");
                $("#imgcheck").hide();
                $("#a_div-clientCode").hide();
            }
            else {
                ShowGBCLOgin();
                if (val == "1") {
                    alert("Incorrect Password!!!");
                }
                $("#txt-GBCPass").focus();
                window.localStorage.setItem("GbcLogin", "0");
            }
        }
        else {
            ShowGBCLOgin();
            if (val == "1") {
                alert("Incorrect UserId!!!");
            }
            $("#txt-GBCUserId").focus();
            window.localStorage.setItem("GbcLogin", "0");
        }
    }
}

function login() {
    $('#div-btn-login').addClass('ui-btn-active');
    $('#div-btn-login').addClass('ui-focus');
    $("#LoginMsg").text("Please Wait...");
    var UserNmae = $("#UserNmae").val().trim();
    UserNmae = UserNmae.toUpperCase();
    var Pass = $("#Pass").val();
    if (UserNmae == "" || UserNmae == null || Pass == "" || Pass == null) {
        $("#LoginMsg").text("Please Insert All Details..");
    }
    else {
        WebSerUrl = localStorage.getItem("APIURL");
        $.ajax({
            url: WebSerUrl + "/Connection/Login",
            data: { UserNmae: UserNmae, Pass: Pass, Device: GetDeviceNameId("3") },
            type: "GET",
            success: function (data) {
                if (data[0] == "1") { 
                    localStorage.setItem("LoginUser", UserNmae);
                    localStorage.setItem("LoginUserName", data[1]);
                    localStorage.setItem("MnuList", data[2]);
                    $("#Login").popup("close");                   
                    AfterLoginPage();
                    Clear_control();                    
                    timerUpdateLoginTime = setInterval(UpdateLoginTime, 50000);
                }
                else if (data[0] == "0") {
                    $("#LoginMsg").text("Invalid User Name Or Password!!!");
                }
                else {
                    alert(data[0]);
                    $("#LoginMsg").text(data[0]);
                }
            },
            error: function (event) {
                ServiceStopMsg();
                $("#LoginMsg").text("Network Error! Please Try Latter.");
            }
        });
    }
    textAnim('LoginMsg', 'zoomIn');
    setTimeout(function () {
        $('#div-btn-login').removeClass('ui-btn-active');
    }, 1000);
}

function UpdateLoginTime() {
    var WebSerUrl = localStorage.getItem("APIURL");
    var UserId = localStorage.getItem("LoginUser");
    $.ajax({
        url: WebSerUrl + "/Connection/UpdateUserLoginTime",
        data: { HRCODE: UserId },
        type: "GET",
        success: function (data) {
        },
        error: function (event) {
        }
    });
}


function logout()
{       
    var UserId = localStorage.getItem("LoginUser");
    var WebSerUrl = localStorage.getItem("APIURL");
    $.ajax({
        url: WebSerUrl + "/Connection/Logout",
        data: { UserNmae: UserId },
        type: "GET",
        success: function (data) {
        },
        error: function (event) {
        }
    });
    clearInterval(timerUpdateLoginTime);
    UnLoadMenu()
    localStorage.setItem("LoginUser", "");
    localStorage.setItem("LoginUserName", "");
    if (localStorage.getItem("APIURL") == null) {
        data = 0;
    } else {
        data = 1;
    }
    ShowServerConnection(data);
}
function Retail_click() {
    if (localStorage.getItem("sr_R") == "" || localStorage.getItem("sr_R") == null || localStorage.getItem("sr_R") == "null") {
        alert("Please Select Series!!!");
        window.location.href = "#series_div";
    } else {
        $("#div-party").css('display', 'block');
        var Pcode = localStorage.getItem("pcodeSale");
        if (Pcode == null || Pcode == "") {
            localStorage.setItem("pcodeSale", "ZZZZZZ");
        }
        $("#heading-Info-Search-Body").text("Retail Bill");
        $("#h_item-Info").text("Retail Bill");        
        localStorage.setItem("FDName", "SALE");
        fun_nextItem();
        $("#iPartySelect").show();
        GetTmpSiVrno();
    }
    SetItem_Count();
}




function Clear_control() {
    $('#setting-form').find('input:text').val('');
    $('#login-form').find('input:text').val('');
    $('#login-form').find('input:password').val('');
    $("#LoginMsg").text("");
    $("#SettingMsg").text("");
}

$(document).on("click", ".show-page-loading-msg", function () {
    var $this = $(this),
        theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
        msgText = loadmsg,
        textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData("textonly");
    html = $this.jqmData("html") || "";
    $.mobile.loading("show", {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        html: html
    });
    var loading = document.querySelector(".ui-loader");
    loading.style.display = "block";
})
   .on("click", ".hide-page-loading-msg", function () {
       var loading = document.querySelector(".ui-loader");
       loading.style.display = "none";
       $.mobile.loading("hide");

   });

function SubstitudeItemList() {
    $("#gnameS").text($("#lblContent").text());
    loadmsg = "Loading Item List...";
    $(".show-page-loading-msg").click();
    var WebSerUrl = localStorage.getItem("APIURL") + "/Product/AlternateIMList?icode=" + $("#lblItmCode").text();
    $.ajax({
        url: WebSerUrl,
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            $(".hide-page-loading-msg").click();
            var itm = data;
            $("#Substitude_Grid").html("");
            for (var i = 0; i < itm.length; i++) {
                var data1 = itm[i];
                var a = '"';
                if (localStorage.getItem("FDName") == "SALE" || localStorage.getItem("FDName") == "WSAL") {
                    $("#Substitude_Grid").append("<li onclick= " + a + "SetDataFromSubstitudeInvoice('" + data1.Icode + "','" + data1.Rate + "','" + data1.MRP + "','" + data1.Iname + "','" + data1.Packing.replace("'", "$") + "','" + data1.Genric + "','" + data1.Stk + "','" + data1.shelf + "','" + data1.pursize + "');" + a + " class='ui-first-child ui-last-child' id=" + i + ">" +
                                                "<a href='#'  class='ui-btn '>" +
                                                    "<p style='color:#137ab0;font-weight:bold'>" + data1.Iname + "</p>" +
                                                    "<label style='float:right;background-color:#137ab0;color:white;padding:3px;font-weight:lighter;margin-top:-14px;margin-right:-10px;'>" + data1.MRP.toFixed(2) + "</label>" +
                                                    "<p style='margin-top:0px;'>" + data1.Packing + "{Stock: "+data1.Stk +"} </p>" +
                                                    "<p style='display:inline;float:left;font-weight:bold;margin-top:-3px;'> Rate: " + data1.Rate + " </p>" +
                                                    "<p style='display:inline;float:left;font-weight:bold;margin-top:-3px;width:100%;white-space:initial;'> Expiry Date: { Min :" + data1.minexpiry + " - Max :" + data1.maxexpiry + " }</p>" +
                                                    
                                                "</a>" +
                                            "</li>"

                                                );
                }
                else {
                    $("#Substitude_Grid").append("<li onclick= " + a + "SetDataFromSubstitude('" + data1.Icode + "','" + data1.Rate + "','" + data1.MRP + "','" + data1.Iname + "','" + data1.Packing.replace("'", "$") + "','" + data1.Genric + "');" + a + " class='ui-first-child ui-last-child' id=" + i + ">" +
                                                 "<a href='#'  class='ui-btn '>" +
                                                     "<p style='color:#137ab0;font-weight:bold'>" + data1.Iname + "</p>" +
                                                     "<label style='float:right;background-color:#137ab0;color:white;padding:3px;font-weight:lighter;margin-top:-14px;margin-right:-10px;'>" + data1.MRP.toFixed(2) + "</label>" +
                                                     "<p style='margin-top:0px;'>" + data1.Packing + "</p>" +
                                                     "<p style='display:inline;float:left;font-weight:bold;margin-top:-3px;'> Rate: " + data1.Rate + "</p>" +
                                                 "</a>" +
                                             "</li>"

                                                 );
                }
            }
        },
        error: function (d) {
            $(".hide-page-loading-msg").click();
            alert(d.responseText);
        }
    });
}


function SetDataFromSubstitudeInvoice(icode, rate, mrp, iname, pack, gname, Stk, shelf, pursz) {
    pack = pack.replace("$", "'");
    ClearItemInfo();
    $("#lblItmCode").text(icode);
    $("#lblRate").text(rate);
    $("#lblItmMRP").text(mrp);
    $("#lblItmName").text(iname);
    $("#lbl_Packing").text(pack);
    $("#lblContent").text(gname);
    $("#lblItmstk").text(Stk);
    $("#lblItmPurSz").text(pursz);
    $("#b-pack").text(pack);
    $("#txt-qty").val($("#txt-qty").val());
    $("#txt-free").val($("#txt-free").val());

    var FDName = localStorage.getItem("FDName");
    var Series;
    var pcode = "";
    var pac;
    var SlNo = "";
    var VrNo = "";
    if (FDName == "SALE") {
        Series = localStorage.getItem("sr_R");
        pcode = localStorage.getItem("pcodeSale");
        if (pcode == "" || pcode == null) {
            pcode = "ZZZZZZ";
        }
        SlNo = Number(ItemCountSALE) + 1;
        window.localStorage.setItem("IndexSlNo", SlNo);
        VrNo = window.localStorage.getItem("TmpVRnoSALE");
    }
    else {
        Series = localStorage.getItem("sr_W");
        pcode = localStorage.getItem("pcodeWsale");
        SlNo = Number(ItemCountWSAL) + 1;
        window.localStorage.setItem("IndexSlNoWsale", SlNo);
        VrNo = window.localStorage.getItem("TmpVRnoWSAl");
    }
    WebSerUrl = localStorage.getItem("APIURL");
    $.ajax({
        url: WebSerUrl + "/Product/GetBatch",
        data: { ICode: icode, vrno: VrNo, slno: SlNo, FdName: FDName },
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data == null) {
                $(".hide-page-loading-msg").click();
                alert('No Batch Found');
                fun_nextItem();
            }
            else {
                if (CheckExpiryDate(data[0].Expirydate)) {
                    var mrp = data[0].Mrp;
                    $.ajax({
                        url: WebSerUrl + "/Product/GetItemRate",
                        data: { ICode: icode, MRP: mrp, Pcode: pcode, FDName: FDName, Series: Series, PurSz: pursz, vrno: data[0].VrNo, slno: data[0].slno },
                        type: "GET",
                        dataType: "json",
                        cache: false,
                        success: function (data) {
                            $("#lblRate").text(data);
                            $(".hide-page-loading-msg").click();
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            $(".hide-page-loading-msg").click();
                        }
                    });

                    $("#lblItmMRP").text(data[0].Mrp.toFixed(2));
                    $("#lblItmBtch").text(data[0].BatchNo);
                    $("#b-Mrp").text(data[0].Mrp.toFixed(2));
                    $("#lbl_Exp").text(data[0].Expirydate);
                    $("#lbl_ConVr").text(data[0].VrNo);
                    $("#lbl_ConSl").text(data[0].slno);
                    $("#lbl_BatckStkTot").text(data[0].TotStk);

                    if (shelf == null) {
                        shelf = "";
                    }
                    $("#lbl_shelf").text(shelf);
                    $("#PackExp").text(pack + " (" + data[0].Expirydate + ") [Shelf:" + shelf + "]");

                }
                else {
                    $(".hide-page-loading-msg").click();
                    fun_nextItem();
                }
            }
        }
    });

    $("#a_Item-Info-Search-Body").click();
}

function SetDataFromSubstitude(icode, rate, mrp, iname, pack, gname) {
    pack = pack.replace("$", "'");
    $("#lblItmCode").text(icode);
    $("#lblRate").text(rate);
    $("#lblItmMRP").text(mrp);
    $("#lblItmName").text(iname);
    $("#PackExp").text(pack);
    $("#lblContent").text(gname);
    $("#txt-qty").val($("#txt-qty").val());
    $("#txt-free").val($("#txt-free").val());
    $("#a_Item-Info-Search-Body").click();
}

///////////**********Item Search*******************//////////////////
$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#itm-srch').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetItem",
                    data: { Iname: request.term, FdName: localStorage.getItem("FDName") },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {                       
                        response($.map(data, function (item, id) {
                            if (item.INAME.indexOf("$")==0)
                            {
                                ShowErrorFromServer(item.INAME);
                                return null;
                            }                            
                                var mydata = {
                                    label: item.INAME ,
                                    Icode: item.ICODE,
                                    Mrp: item.Mrp,
                                    stk: item.stk,
                                    packing: item.packing,
                                    shelf: item.shelf,
                                    pursize: item.pursize,
                                    GNAME: item.GNAme
                                };
                            return mydata;                        
                        }));
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            
            messages: {
                noResults: function (resultsCount) {
                    $("#msgText2").removeClass('hide');
                    textAnim('msgText2', 'bounceInDown');
                    setTimeout(function () {
                        $("#msgText2").addClass('hide');
                    }, 2000);
                   
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                $("#td-lblstk").show();
                $("#td-lblstkval").show();
                $("#row-batch").show();
                $("#row-qty-purchSz").show();

                $("#lblContent").text(ui.item.GNAME);
                ClearItemInfo();
                HideShowinIntemInfo();
                loadmsg = "Loading Data...";
                $(".show-page-loading-msg").click();
                var FDName = localStorage.getItem("FDName");
                var Series;
                var pcode = "";
                var pac;
                var SlNo = "";
                var VrNo = "";
                if (FDName == "SALE") {
                    Series = localStorage.getItem("sr_R");
                    pcode = localStorage.getItem("pcodeSale");
                    if(pcode=="" || pcode== null)
                    {
                        pcode = "ZZZZZZ";
                    }
                    SlNo = Number(ItemCountSALE) + 1;
                    window.localStorage.setItem("IndexSlNo", SlNo);
                    VrNo = window.localStorage.getItem("TmpVRnoSALE");
                }
                else {
                    Series = localStorage.getItem("sr_W");
                    pcode = localStorage.getItem("pcodeWsale");
                    SlNo = Number(ItemCountWSAL) + 1;
                    window.localStorage.setItem("IndexSlNoWsale", SlNo);
                    VrNo = window.localStorage.getItem("TmpVRnoWSAl");
                }
               
             
                $.ajax({
                    url: WebSerUrl + "/Product/GetBatch",
                    data: { ICode: ui.item.Icode, vrno: VrNo, slno: SlNo, FdName: localStorage.getItem("FDName") },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data == null) {
                            $(".hide-page-loading-msg").click();
                            alert('No Batch Found');
                            fun_nextItem();
                        }
                        else {
                            if (CheckExpiryDate(data[0].Expirydate)) {
                                var mrp = data[0].Mrp;
                                $.ajax({
                                    url: WebSerUrl + "/Product/GetItemRate",
                                    data: { ICode: ui.item.Icode, MRP: mrp, Pcode: pcode, FDName: FDName, Series: Series, PurSz: ui.item.pursize, vrno: data[0].VrNo, slno: data[0].slno },
                                    type: "GET",
                                    dataType: "json",
                                    cache: false,
                                    success: function (data) {
                                        $("#lblRate").text(data);
                                        $(".hide-page-loading-msg").click();
                                    },
                                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                                        $(".hide-page-loading-msg").click();
                                    }
                                });

                                $("#lblItmMRP").text(data[0].Mrp.toFixed(2));
                                $("#lblItmBtch").text(data[0].BatchNo);
                                $("#b-Mrp").text(data[0].Mrp.toFixed(2));

                                $("#lbl_Exp").text(data[0].Expirydate);
                                $("#lbl_ConVr").text(data[0].VrNo);
                                $("#lbl_ConSl").text(data[0].slno);
                                $("#lbl_Packing").text(ui.item.packing);
                                $("#lblItmstk").text(ui.item.stk);
                                $("#lbl_BatckStkTot").text(data[0].TotStk);
                                if (ui.item.shelf == null) {
                                    ui.item.shelf = "";
                                }
                                $("#lbl_shelf").text(ui.item.shelf);
                                $("#PackExp").text(ui.item.packing + " (" + data[0].Expirydate + ") [Shelf:" + ui.item.shelf + "]");
                                $("#lblItmPurSz").text(ui.item.pursize);
                                $("#b-pack").text(ui.item.packing);
                            }
                            else {
                                $(".hide-page-loading-msg").click();
                                fun_nextItem();
                            }
                        }
                    }
                });             
                
                $("#lblItmCode").text(ui.item.Icode);
                $("#lblItmName").text(ui.item.label);
                fun_showItmInfo("#");
                setTimeout(function () {
                    $(".hide-page-loading-msg").click();
                }, 10000);               
                
                $("#b-iname").text(ui.item.label);
               
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            return $('<li></li>')
                .append("<a>" + item.label + "<b style='float:right'> " + item.stk + "{"+item.Mrp+"}</b></a>")
                .appendTo(ul);
        };
    } catch (err) {
    }
});






$(function () {
    try {
        $('#txtOrdItem').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetItemConsumer",
                    data: { Iname: request.term, PCODE: localStorage.getItem("pcode") },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.INAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.INAME);
                                return null;
                            }
                            var mydata = {
                                label: item.INAME,
                                Icode: item.ICODE,
                                Mrp: item.Mrp,
                                packing: item.packing,
                                pursize: item.pursize,
                                GNAME: item.GNAme,
                                Rate: item.Rate
                            };
                            return mydata;
                        }));
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                        alert(errorThrown);
                    }
                })
            },

            messages: {
                noResults: function (resultsCount) {
                    $("#lblOrdItm").removeClass('hide');
                    textAnim('lblOrdItm', 'bounceInDown')
                    setTimeout(function () {
                        $("#lblOrdItm").addClass('hide');
                    }, 2000);

                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                ClearItemInfo();
                $("#td-lblstk").hide();
                $("#td-lblstkval").hide();
                $("#row-batch").hide();
                $("#row-qty-purchSz").hide();

                $("#lblRate").text(ui.item.Rate);
                $("#lblItmCode").text(ui.item.Icode);
                $("#lblItmMRP").text(ui.item.Mrp);
                $("#lblItmName").text(ui.item.label);
                $("#PackExp").text(ui.item.packing);
                $("#lblContent").text(ui.item.GNAME);
                window.location.href = "#Item-Info-Search-Body";
                $("#txt-qty").focus();
                SetItem_Count();
                $("#insert_itemInfo").show();
                $("#update_itemInfo").hide();
                //fun_showItmInfo("#");
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            return $('<li></li>')
                .append("<a>" + item.label + "<b style='float:right'> " + item.Mrp + "</b></a>")
                .appendTo(ul);
        };
    } catch (err) {
    }
});



function CheckExpiryDate(date) {
    if (localStorage.getItem("FDName") == "ORDS") {
        return true;
    } else {
        var Expdt = new Date(date.split('/')[2], Number(date.split('/')[1]) - 1, date.split('/')[0]);
        var curr_dt = new Date();
        var new_dt = new Date(curr_dt.getFullYear(), curr_dt.getMonth() + 2, curr_dt.getDate(), 0, 0, 0, 0);
        if (Expdt.getTime() < curr_dt.getTime()) {
            alert("EXPIRED GOODS");
            return false;
        }
        if (Expdt.getTime() > curr_dt.getTime() && Expdt.getTime() < new_dt.getTime()) {
            alert("SHORT EXPIRED GOODS");
            return true;
        }
        return true;
    }
}

function ShowErrorFromServer(err)
{
    alert("Error Occured! Structur Rebuild Required! If problem not Solved, Contact with Administrator. \n" + err);
}

function Forward()
{
    window.history.forward();  
}

////*********Patient Search***************///////////
$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    var pcode = localStorage.getItem("pcodeSale");
   
    try {
        $('#pn-name').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetPt",
                    data: { Iname: request.term, Pcode:  localStorage.getItem("pcodeSale") },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.Desr.indexOf("$") == 0) {
                                ShowErrorFromServer(item.Desr);
                                return null;
                            }
                            var mydata = {
                                label: item.Desr,
                                Pcode: item.Code,
                                Phone:item.Phone,
                                Add: item.Address
                            };
                            return mydata;
                        }));
                        
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    NORecord1();
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                if (localStorage.getItem("pcodeSale") == "ZZZZZZ")
                {
                    getPartyInfo(ui.item.Pcode);
                }
                $("#pt-info-body").removeClass("display-none");
                $("#pt_infoMoNo").text(ui.item.Phone);
                $("#pt_infoAdd").text(ui.item.Add);
                window.localStorage.setItem("PtCode", ui.item.Pcode);
                textAnim('pt-info-body', 'zoomIn');                
                $("#dr-name").focus();
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    var pcode = localStorage.getItem("pcodeSale");

    try {
        $('#saleRptPtName').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetPt",
                    data: { Iname: request.term, Pcode: localStorage.getItem("SALERPTPcode") },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.Desr.indexOf("$") == 0) {
                                ShowErrorFromServer(item.Desr);
                                return null;
                            }
                            var mydata = {
                                label: item.Desr,
                                Pcode: item.Code,
                                Phone: item.Phone,
                                Add: item.Address
                            };
                            return mydata;
                        }));

                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgtxtsalerpt").text("No Record Found.");
                    $("#msgtxtsalerpt").removeClass('hide');
                    textAnim('msgtxtsalerpt', 'bounceInDown')
                    setTimeout(function () {
                        $("#msgtxtsalerpt").addClass("hide");
                    }, 2000);
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                localStorage.setItem("salerptPTname", ui.item.Pcode)
                $("#saleRptPtName").blur();
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

$(function () {
    
    try {
        $('#ordPatient').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetPt",
                    data: { Iname: request.term, Pcode: '' },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.Desr.indexOf("$") == 0) {
                                ShowErrorFromServer(item.Desr);
                                return null;
                            }
                            var mydata = {
                                label: item.Desr,
                                Pcode: item.Code,
                                Phone: item.Phone,
                                Add: item.Address
                            };
                            return mydata;
                        }));

                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                  
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                localStorage.setItem("OrdPt", ui.item.Pcode)
                $("#ordDoctor").focus();
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});
////**************Doctor Search****************/////
$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#dr-name').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetDr",
                    data: { Iname: request.term },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.Name.indexOf("$") == 0) {
                                ShowErrorFromServer(item.Name);
                                return null;
                            }
                            var mydata = {
                                label: item.Name,
                                HrCode: item.HrCode,
                                Add: item.Address
                            };
                            return mydata;
                        }));

                    },
                    messages: {
                        noResults: function (resultsCount) {
                            NORecord1();
                        },
                        results: function (resultsCount) {

                        }
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            select: function (event, ui) {
                $("#dr-info-body").removeClass("display-none");
                textAnim('dr-info-body', 'zoomIn');
                $("#dr_infoAdd").text(ui.item.Add);
                window.localStorage.setItem("DrCode", ui.item.HrCode);
                window.scrollTo(0, 300);               
                $("#dr-name").blur();
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#ordDoctor').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Product/GetDr",
                    data: { Iname: request.term },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.Name.indexOf("$") == 0) {
                                ShowErrorFromServer(item.Name);
                                return null;
                            }
                            var mydata = {
                                label: item.Name,
                                HrCode: item.HrCode,
                                Add: item.Address
                            };
                            return mydata;
                        }));

                    },
                    messages: {
                        noResults: function (resultsCount) {
                        },
                        results: function (resultsCount) {

                        }
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            select: function (event, ui) {
                window.localStorage.setItem("OrdDrCode", ui.item.HrCode);
                window.localStorage.setItem("OrdDrAdd", ui.item.Add);
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

////*************Area Search**************////////////
$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#area-srch').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetArea",
                    data: { name: request.term },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.AreaName.indexOf("$") == 0) {
                                ShowErrorFromServer(item.AreaName);
                                return null;
                            }
                            var mydata = {
                                label: item.AreaName,
                                AreaCode: item.AreaCode
                            };
                            return mydata;
                        }));
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    localStorage.setItem("SelectedArea", "");
                    $("#msgText").text("No Record Found.");
                    NORecord();                    
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                localStorage.setItem("SelectedArea", ui.item.AreaCode);
               
                $('#d-lbl-areaInvoice').text(ui.item.label);
                $('#party-srch').focus(); 
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

////*************Party Search**************////////////


$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#txt-party-p').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                var area = localStorage.getItem("SelectedArea");
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetParty",
                    data: { name: request.term, area: area },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE,
                                Add: item.Add1

                            };
                            return mydata;
                        }));
                        getStartEndDate();
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgText").text("No Record Found.");
                    NORecord();
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                $("#txt-party-p").blur();
                var pcode = ui.item.Pcode;
                $.ajax({
                    url: WebSerUrl + "/Order/Getldgbal",
                    data: { pcode: pcode },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        $("#lblLdgBal1").text(data);
                        $('#lblPnameldgBal').text(pcode + " : " + ui.item.label);
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {

                    }
                })
                $("#party-srch-body").removeClass("display-none");
                textAnim('party-srch-body', 'zoomIn');
                localStorage.setItem("pcodeSale", pcode);
                $("#pt-info-body").removeClass("display-none");
               
                if ($("#pn-name").val().trim() == "") {
                    getptInfo(ui.item.label, ui.item.Add);
                }
                $("#txt-party-pa").val(ui.item.label);
                window.localStorage.setItem("PtCode", "000000");
                $("#div-ldgrpt1").removeClass('hide');
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

function getPartyInfo(Ptcode) {
    $.ajax({
        url: WebSerUrl + "/Product/GetPartyInfo",
        data: { PtCode: Ptcode },
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data == "") {                
            }
            else {
                $("#party-srch-body").removeClass("display-none");
                textAnim('party-srch-body', 'zoomIn');
                var str = data.split('|');
                if (str.length >= 0) {
                    localStorage.setItem("pcodeSale", str[0]);
                }
                if (str.length >= 1) {
                    $("#txt-party-pa").val(str[1]);
                    $("#txt-party-p").val(str[1]);
                }
                if (str.length >= 2) {
                    $("#lblLdgBal1").text(str[2]);
                }
                $("#div-ldgrpt1").removeClass('hide');
            }
        },
        //if any error occure
        error: function (xmlHttpRequest, textStatus, errorThrown) {

        }
    })
}

function getptInfo(name,add)
{
    var pcode = localStorage.getItem("pcodeSale");
    $.ajax({
        url: WebSerUrl + "/Product/GetPtInfo",
        data: { Pcode: pcode },
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data == "") {
                $("#pn-name").val(name);
                $("#pt_infoAdd").text(add);
                $("#pt_infoMoNo").text("");
            }
            else {
                var str = data.split('|');
                if (str.length >= 0) {
                    $("#pn-name").val(str[0]);
                }
                if (str.length >= 1) {
                    $("#pt_infoAdd").text(str[1]);
                }
                if (str.length >= 2) {
                    $("#pt_infoMoNo").text(str[2]);
                }
                if(str.length>=3)
                {
                    window.localStorage.setItem("PtCode", str[3]);
                }
            }
        },
        //if any error occure
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            
        }
    })
}

$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#txt-party-pa').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                var area = localStorage.getItem("SelectedArea");
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetParty",
                    data: { name: request.term, area: area },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE,
                                Add: item.Add1

                            };
                            return mydata;
                        }));
                        getStartEndDate();
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgText").text("No Record Found.");
                    NORecord();
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                $("#txt-party-pa").blur();
                var pcode = ui.item.Pcode;
                $.ajax({
                    url: WebSerUrl + "/Order/Getldgbal",
                    data: { pcode: pcode },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {                       
                        $("#lblLdgBal1").text(data);
                        $('#lblPnameldgBal').text(pcode + " : " + ui.item.label);
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {

                    }
                })
                $("#party-srch-body").removeClass("display-none");
                textAnim('party-srch-body', 'zoomIn');
                localStorage.setItem("pcodeSale", pcode);
                $("#pt-info-body").removeClass("display-none");
                //$("#pn-name").val(ui.item.label);
                //$("#pt_infoAdd").text(ui.item.Add);
                //$("#pt_infoMoNo").text("");
                if ($("#pn-name").val().trim() == "") {
                    getptInfo(ui.item.label, ui.item.Add);
                }
                $("#txt-party-p").val(ui.item.label);
                $("#div-ldgrpt1").removeClass('hide');
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});


$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#saleRptPName').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetParty",
                    data: { name: request.term, area: "" },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE,
                                Add: item.Add1
                            };
                            return mydata;
                        }));
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgtxtsalerpt").text("No Record Found."); 
                    $("#msgtxtsalerpt").removeClass('hide');
                    textAnim('msgtxtsalerpt', 'bounceInDown')
                    setTimeout(function () {
                        $("#msgtxtsalerpt").addClass("hide");
                    }, 2000);
                },
                results: function (resultsCount) {

                }
            },
            select: function (event, ui) {
                localStorage.setItem("SALERPTPcode", ui.item.Pcode);
                $("#saleRptPtName").focus();
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});


$(function () {
    WebSerUrl = localStorage.getItem("APIURL");    
    try {
        $('#party-srch').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                var area = localStorage.getItem("SelectedArea");
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetParty",
                    data: { name: request.term, area: area },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE
                            };
                            return mydata;
                        }));
                        getStartEndDate();
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgText").text("No Record Found.");
                    NORecord();
                },
                results: function (resultsCount) {
                    
                }
                
            },
            select: function (event, ui) {
                var pcode = ui.item.Pcode;
                localStorage.setItem("pcodeWsale", pcode);
                $.ajax({
                    url: WebSerUrl + "/Order/Getldgbal",
                    data: { pcode: pcode },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {                        
                        $("#lblLdgBal").text(data);
                        $("#div-party-info").removeClass('display-none');
                        textAnim('div-party-info', 'zoomIn');
                        $('#lblPnameldgBal').text(pcode +" : "+ ui.item.label);
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                       
                    }
                })
                $('#party-srch').blur();
                $("#div-okparty").removeClass('hide');
                $("#nxt-partysearch").removeClass('hide');
                $("#div-ldgrpt").removeClass('hide');                
                $("#cart-img-lbl").removeClass("display-none");


            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});


$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#party-srch-ldg').autocomplete({
            autoFocus: true,
            source: function (request, response) {            
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetPartyALL",
                    data: { name: request.term},
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE
                            };
                            return mydata;
                        }));
                        getStartEndDate();
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgText12").text("No Record Found.");
                    textAnim('msgText12', 'bounceInDown')
                    $("#msgText12").removeClass("hide");
                    setTimeout(function () {
                        $("#msgText12").addClass("hide");
                    }, 2000);
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                $("#party-srch-ldg").blur();
                localStorage.setItem("pcodeLdg", ui.item.Pcode);
                var pcode = ui.item.Pcode;               
                $.ajax({
                    url: WebSerUrl + "/Order/Getldgbal",
                    data: { pcode: pcode },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        $("#lblLdgBal-").text(data);
                        $("#div-party-info-ldg").removeClass('display-none');
                        textAnim('div-party-info-ldg', 'zoomIn');
                        $('#lblPnameldgBal').text(pcode + " : " + ui.item.label);
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {

                    }
                })
                $("#div-okparty").removeClass('hide');
                $("#div-ldgrpt-").removeClass('hide');
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});

$(function () {
    WebSerUrl = localStorage.getItem("APIURL");
    try {
        $('#txtOrderParty').autocomplete({
            autoFocus: true,
            source: function (request, response) {
                var area = localStorage.getItem("SelectedArea");
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetParty",
                    data: { name: request.term, area: area },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE
                            };
                            return mydata;
                        }));
                        getStartEndDate();
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#msgText").text("No Record Found.");
                    NORecord();
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                var pcode = ui.item.Pcode;
                localStorage.setItem("pcode", pcode);
                
                $.ajax({
                    url: WebSerUrl + "/Order/Getldgbal",
                    data: { pcode: pcode },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        $("#Label5").text(data);
                        $("#div10").removeClass('display-none');
                        textAnim('div10', 'zoomIn');
                        $('#lblPnameldgBal').text(pcode + " : " + ui.item.label);
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {

                    }
                })
                $('#txtOrderParty').blur();
                $("#A3").removeClass('hide');
                $("#nxt-partysearch").removeClass('hide');
                $("#A2").removeClass('hide');                
                $("#div-img-a").removeClass('hide');

            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});


$(function () {
    try {
        $('#rcptPCode').autocomplete({
            autoFocus: true,
            source: function (request, response) {                
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/GetPartyRcPy",
                    data: { name: request.term, fdanme: localStorage.getItem("FDName") },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        //alert(localStorage.getItem("FDName");
                        response($.map(data, function (item, id) {
                            if (item.PNAME.indexOf("$") == 0) {
                                ShowErrorFromServer(item.PNAME);
                                return null;
                            }
                            var mydata = {
                                label: item.PNAME,
                                Pcode: item.PCODE,
                                Add: item.Add1
                            };
                            return mydata;
                        }));
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServiceStopMsg();
                    }
                })
            },
            messages: {
                noResults: function (resultsCount) {
                    $("#lblmsgRec").removeClass('hide');
                    textAnim('lblmsgRec', 'bounceInDown')
                    setTimeout(function () {
                        $("#lblmsgRec").addClass("hide");
                    }, 2000);
                },
                results: function (resultsCount) {

                }

            },
            select: function (event, ui) {
                $("#ulpartyRcpt").html("");
                VrRcptCount = 0;
                localStorage.setItem("ReceiptPcode", ui.item.Pcode);
                if (ui.item.Add == null) {
                    $("#rcptPartyAdd").text("");
                }
                else {
                    $("#rcptPartyAdd").text(ui.item.Add);
                }
                $('#rcptPCode').blur();
                GetInsDetailParty();               
                var pcode = ui.item.Pcode;
                $.ajax({
                    url: localStorage.getItem("APIURL") + "/Order/Getldgbal",
                    data: { pcode: pcode },
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        $("#rcptPCodeldgBall").text(data);
                        $('#lblPnameldgBal').text(pcode + " : " + ui.item.label);
                    },
                    //if any error occure
                    error: function (xmlHttpRequest, textStatus, errorThrown) {

                    }
                })
                
                $("#div7").removeClass('hide');
                textAnim('div7', 'zoomIn');
            },
            close: function () {
            },
            minLength: 1,
            delay: 1
        });

    } catch (err) {
    }
});
function getStartEndDate()
{
    var startdt;
    var enddt;
    WebSerUrl = localStorage.getItem("APIURL");
    $.ajax({
        url: WebSerUrl + "/Order/GetStartEndDate",
        type: "GET",
        cache: false,
        success: function (data) {
            var dt = data.split('%');
            startdt = dt[0];
            enddt = dt[1];
            localStorage.setItem("startdt",startdt);
            localStorage.setItem("enddt", startdt);
            document.getElementById("frmdt_ldg").valueAsDate = new Date(startdt);            
            document.getElementById("todt_ldg").valueAsDate = new Date(enddt);
        },
        //if any error occure
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log('some error occured', textStatus, errorThrown);
        }

    });
}


function NORecord()
{   
    $("#msgText1").removeClass('hide');
    textAnim('msgText1', 'bounceInDown')
    setTimeout(function () {
        $("#msgText1").addClass("hide");
    }, 2000);
}

function NORecord1() {
    $("#msgText3").removeClass('hide');
    textAnim('msgText3', 'bounceInDown')
    setTimeout(function () {
        $("#msgText3").addClass("hide");
    }, 2000);
}



function fun_ShowChangeList()
{
    $("#b-iname").text($("#lblItmName").text());
    $("#b-pack").text($("#PackExp").text());
    fun_AddBatchInTable();
    $("#a_opnBatchList").click();
}





function highlight_Control(name)
{
    $("#" + name).addClass('ui-focus');
    setInterval(function () { $("#" + name).removeClass('ui-focus'); }, 2000);
}


function Order_click() {
    var MenuList = localStorage.getItem("MnuList");
    if (MenuList.indexOf("INV105") >= 0 && MenuList.indexOf("INV081") >= 0) {
        if ((localStorage.getItem("sr_O") == "" || localStorage.getItem("sr_O") == null || localStorage.getItem("sr_O") == "null") || (localStorage.getItem("sr_Or") == "" || localStorage.getItem("sr_Or") == null || localStorage.getItem("sr_Or") == "null") ) {
            alert("Please Select Series!!!");
            window.location.href = "#series_div";
        }
        else {
            OrdShow_click();
        }
    } else if (MenuList.indexOf("INV081") >= 0 && MenuList.indexOf("INV105") <= 0) {
        if (localStorage.getItem("sr_O") == "" || localStorage.getItem("sr_O") == null || localStorage.getItem("sr_O") == "null" ) {
            alert("Please Select Series!!!");
            window.location.href = "#series_div";
        }
        else {
            OrdShow_click();
        }
    }
    else {
        if ( localStorage.getItem("sr_Or") == "" || localStorage.getItem("sr_Or") == null || localStorage.getItem("sr_Or") == "null") {
            alert("Please Select Series!!!");
            window.location.href = "#series_div";
        }
        else {
            OrdShow_click();
        }
    }

}

function OrdShow_click() {
    $("#div-party-info").addClass('display-none')
    $('#party-srch').focus();
    $("#div-okparty").addClass('hide');
    $("#nxt-partysearch").addClass('hide');
    $("#div-ldgrpt").addClass('hide');
    $('#lblPnameldgBal').text("");
    $("#cart-img-lbl").addClass("display-none");
    $("#party-srch").val("");
    $("#div-party").css('display', 'none');
    localStorage.setItem("FDName", "ORDS");
    $("#Label3").text(localStorage.getItem("LoginUserName"));
    $("#h_item-Info").text("Order");
    $("#heading-Info-Search-Body").text("Order");
    window.location.href = "#divOrderParty";
    SetItem_Count();
}




function HideShowinIntemInfo()
{
    if (localStorage.getItem("FDName") == "ORDS")
    {
        $("#row-batch").hide();
        $("#row-qty-purchSz").show();        
        $("#td-invioce-nxt").hide();
    }
    else {
        $("#row-batch").show();
        $("#row-qty-purchSz").hide();
        $("#td-invioce-nxt").show();
    }
}


function Ldg_click() {
    localStorage.setItem("FDName","PLDG")
    window.location.href = "#Party-Ldg";
}


function Wsale_Invoice() {
    if (localStorage.getItem("sr_W") == "" || localStorage.getItem("sr_W") == null || localStorage.getItem("sr_W") == "null") {
        alert("Please Select Series!!!");
        window.location.href = "#series_div";
    } else {
        $("#div-party").css('display', 'none');
        $("#heading_party").text("WholeSale Bill");
        $("#heading-Info-Search-Body").text("WholeSale Bill");
        $("#lbl_saleRep").text(localStorage.getItem("LoginUserName"));
        $("#h_item-Info").text("WholeSale Bill");
        localStorage.setItem("FDName", "WSAL");
        window.location.href = "#Party-Info-Search";
    }
    SetItem_Count();
}

function GetLessPerc() {
    var FDName = window.localStorage.getItem("FDName");
    var Ser;
    var Pcode;
    if (FDName == "SALE") {
        Ser = window.localStorage.getItem("sr_R");
        Pcode = localStorage.getItem("pcodeSale");
    }
    else {
        Ser = window.localStorage.getItem("sr_W");
        Pcode = localStorage.getItem("pcodeWsale");
    }

    var WebSerUrl = localStorage.getItem("APIURL");
    var Urlstr = WebSerUrl + "/Product/GetLessPerc" + "?FDName=" + FDName + "&Ser=" + Ser + "&Pcode=" + Pcode;
    $.ajax({
        url: Urlstr,
        type: "GET",
        dataType: 'json',
        processData: true,
        success: function (data) {
            if (FDName == "SALE") {
                window.localStorage.setItem("SALELessPerc", data);
            } else {
                window.localStorage.setItem("WSALLessPerc", data);
            }

        },
        error: function (event) {
            alert("Error While Getting Less Perc");
        }
    })

}

function serchtxt_clear(v,e) {
    //if(v.value=='')
    //{
        if(e=='1')
        {
            $("#div-party-info").addClass('display-none')
            $('#party-srch').focus();
            $("#div-okparty").addClass('hide');
            $("#nxt-partysearch").addClass('hide');
            $("#div-ldgrpt").addClass('hide');
            $('#lblPnameldgBal').text("");
            $("#cart-img-lbl").addClass("display-none");  
        }
        else if(e=='2')
        {
            localStorage.setItem("SelectedArea", "");
            $('#party-srch').focus();           
            $('#d-lbl-areaInvoice').text("___");
        }
        else if (e == '3') {
            $("#pt-info-body").addClass("display-none");
        }
        else if (e == '4') {
            $("#dr-info-body").addClass("display-none");
        }
        else if(e=='5')
        {
            localStorage.setItem("pcodeSale", "ZZZZZZ");
            $("#party-srch-body").addClass("display-none");
            $("#pt-info-body").addClass("display-none");
            $("#txt-party-p").val("");
            $("#txt-party-pa").val("");
            if (window.localStorage.getItem("PtCode") == "000000") {
                window.localStorage.setItem("PtCode", "");
            }
        }
        else if (e == 6) {
            localStorage.setItem("SALERPTPcode","");
        }
        else if (e == 7) {
            localStorage.setItem("salerptPTname", "");
        }
        else if (e == 8) {
            $("#div10").addClass('display-none')
            $('#txtOrderParty').focus();
            $("#A3").addClass('hide');
            $("#A3").addClass('hide');
            $("#A2").addClass('hide');
            $("#div-img-a").addClass('hide');
            $('#Label5').text("");
            $("#cart-img-lbl").addClass("display-none");
        }
        else if (e == 9) {
            $("#div7").addClass('hide');
        }
    //}
}


function ClearItemInfo() {
    $("#lblRate").text('');
    $("#lblItmCode").text("");
    $("#lblItmMRP").text("");
    $("#lblItmName").text("");
    $("#PackExp").text("");
    $("#lblItmstk").text("");
    $("#lblItmPurSz").text("");
    $("#lblItmBtch").text("");
    $("#itm-srch").val("");
    $('#txtOrdItem').val("");
}

/////////////////////************Item Function*************************//////////////////
function addcountToCartLabel(val) {
    $(".cart-cnt-lbl").text(val);
    $(".cart-cnt-lbl").show();
}
function fun_nextItem() {    
    ClearItemInfo();
    if (localStorage.getItem("FDName") == "ORDS") {
        if (localStorage.getItem("pcode") == "") {
            alert('Party Required !');}
        else{
            window.location.href = "#OrderItemSearch";
        }
    }
    else if (localStorage.getItem("FDName") == "WSAL")
    {
        if (localStorage.getItem("pcodeWsale") == "") {
            alert('Party Required !');
        }
        else {
            window.location.href = "#Item-Info-Search";
        }
    }
    else {
        window.location.href = "#Item-Info-Search";
    }
}

function fun_showBatchInItmInfo(BatchNo, Mrp, Expirydate, stock, VrNo, slno, packing) {
    packing = packing.replace("$", "'");
    if (CheckExpiryDate(Expirydate)) {
        var itemcode = $("#lblItmCode").text();
        var FDName = localStorage.getItem("FDName");
        var Series;
        if (FDName == "ORDS") {
            Series = localStorage.getItem("sr_O");
        } else if (FDName == "SALE") {
            Series = localStorage.getItem("sr_R");
        }
        else {
            Series = localStorage.getItem("sr_W");
        }
        var pac;
        var pcode = "";
        $.ajax({
            url: WebSerUrl + "/Product/GetItemRate",
            data: { ICode: itemcode, MRP: Mrp, Pcode: pcode, FDName: FDName, Series: Series, PurSz: $("#lblItmPurSz").text(), vrno: VrNo, slno: slno },
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#lblRate").text(data);
                $(".hide-page-loading-msg").click();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                $(".hide-page-loading-msg").click();
            }
        });

        $("#lblItmMRP").text(Mrp);
        $("#lblItmBtch").text(BatchNo);
        $("#b-Mrp").text(Mrp);

        $("#lbl_Exp").text(Expirydate);
        $("#lbl_ConVr").text(VrNo);
        $("#lbl_ConSl").text(slno);
        
        if (FDName == "WSAL" || FDName == "SALE") {
            $("#PackExp").text(packing + " (" + Expirydate + ")[Shelf:" + $("#lbl_shelf").text() + "]");
        }
        $("#a_Item-Info-Search-Body").click();
    }
   
}

function fun_AddBatchInTable() {
    $("#Btch_Grid").html("");
    WebSerUrl = localStorage.getItem("APIURL");
    var SlNo="";
    var VrNo = "";
    if (localStorage.getItem("FDName") == "SALE") {
        SlNo = window.localStorage.getItem("IndexSlNo");
        VrNo = localStorage.getItem("TmpVRnoSALE");
    } else {
        SlNo = window.localStorage.getItem("IndexSlNoWsale");
        VrNo = localStorage.getItem("TmpVRnoWSAl");
    }
    
    var itemcode = $("#lblItmCode").text();
    $.ajax({
        url: WebSerUrl + "/Product/GetBatch",
        data: { ICode: itemcode, vrno: VrNo, slno: SlNo, FdName: localStorage.getItem("FDName") },
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data == null) {
                alert('No Batch Found!!!');
            }
            else {
                var arrLength = data.length;
                
                for (var i = 0; i <= arrLength - 1; i++) {
                    var data1 = data[i];
                    var a = '"';
                    $("#lbl_BatckStkTot").text(data1.TotStk);
                    $("#Btch_Grid").append("<li onclick= "+a+"fun_showBatchInItmInfo('" + data1.BatchNo + "','" + data1.Mrp + "','" + data1.Expirydate + "','" + data1.stock + "','" + data1.VrNo + "','" + data1.slno + "','" + data1.packing.replace("'","$") + "');"+a+" class='ui-first-child ui-last-child' id=" + i + ">" +
                                            "<a href='#'  class='ui-btn'>" +
                                                "<label style='color:#137ab0;font-weight:bold'>" + data1.BatchNo + "</label>" +
                                                "<label style='float:right;background-color:#137ab0;color:white;padding:3px;font-weight:lighter;margin-top:-14px'>" + data1.Mrp + "</label>" +
                                                "<p style='margin-top:0px;'>" + data1.Expirydate + "</p>" +
                                                "<p style='display:inline;float:left;font-weight:bold;margin-top:-3px;'> Stock: " + data1.stock + "</p>" +
                                            "</a>" +
                                        "</li>"

                                            );

                }
            }
        }
    });
    
}


function fun_getBatchStkCount() {    
    WebSerUrl = localStorage.getItem("APIURL");
    var SlNo = "";
    var VrNo = "";
    if (localStorage.getItem("FDName") == "SALE") {
        SlNo = window.localStorage.getItem("IndexSlNo");
        VrNo = localStorage.getItem("TmpVRnoSALE");
    }
    else {
        SlNo = window.localStorage.getItem("IndexSlNoWsale");
        VrNo = localStorage.getItem("TmpVRnoWSAl");
    }

    var itemcode = $("#lblItmCode").text();
    $.ajax({
        url: WebSerUrl + "/Product/GetBatchTotStk",
        data: { ICode: itemcode, vrno: VrNo, slno: SlNo, FdName: localStorage.getItem("FDName") },
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            $("#lbl_BatckStkTot").text(data);            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            alert('Error In Getting Total Stock');
        }
    });

}


function fun_AddItemInCart() {   
    SetItem_Count();
    var arr = '';
    if (localStorage.getItem("FDName") == "WSAL") {
        arr = localStorage.getItem("SelectedItemInfoWSale");
    } else if (localStorage.getItem("FDName") == "ORDS") {
        arr = localStorage.getItem("SelectedItemInfo");
    } else if (localStorage.getItem("FDName") == "SALE") {
        arr = localStorage.getItem("SelectedItemInfoSale");
    }
    $("#Itm_Grid").html("");
    $("#Itm_GridWSale").html("");
    $("#Itm_GridSale").html("");
    if (arr != null) {
        var splitArr = arr.split("$");
        if (splitArr.length <= 1) {

        }
        else {

            var arrLength = splitArr.length;
            
            for (var i = 1; i <= arrLength - 1; i++) {
                var data = (JSON).parse(splitArr[i]);
                if (data.check == "1") {
                    var amt = Number( Number(data.Rate) *( Number( data.Qty) + Number(data.free))).toFixed(2);
                    if (localStorage.getItem("FDName") == "WSAL") {
                        $("#grid_Ord").hide();
                        $("#grid_Wsal").show();
                        $("#grid_Sale").hide();
                        $("#Itm_GridWSale").append(
                           "<li onclick='fun_showItmInfo(this.id);'  onmousedown='list_Mousedown(this)' onmouseup='list_MouseUp()' class='ui-first-child ui-last-child' id=" + i + ">" +
                               "<a href='#Item-Info-Search-Body' class='ui-btn '>" +
                                   "<label style='margin-top:6px;float:right;background-color:#137ab0;color:white;padding:3px;font-weight:lighter;'>" + data.MRP + "</label>" +
                                   "<p style='color:#137ab0;font-weight:bold'>" + data.Iname + "</p>" +
                                   "<p style='margin-top:-6px;'>" + data.Batch + "(" + data.Exp + ")</p>" +
                                   "<p style='display:inline;float:left ;font-weight:bold;margin-top:3px;margin-top:-3px;'>[" + data.Qty + "+" + data.free + "]</p> " +
                                   "<p style='display:inline;float:left ;margin-top:3px;margin-top:-3px;'>&nbsp;*&nbsp;</p>" +
                                   "<p style='display:inline;float:left ;font-weight:bold;margin-top:3px;margin-top:-3px;'>" + data.Rate + "</p>" +
                                   "<p style='display:inline;float:left ;margin-top:3px;margin-top:-3px;'>&nbsp;=&nbsp;</p>" +
                                   "<p style='color:#137ab0;font-weight:bold;float:right;margin-top:-6px;'>" + amt + "</p>" +
                               "</a>" +
                           "</li>");
                    }
                    else if (localStorage.getItem("FDName") == "ORDS") {
                        $("#grid_Ord").show();
                        $("#grid_Wsal").hide();
                        $("#grid_Sale").hide();
                        $("#Itm_Grid").append(
                            "<li onclick='fun_showItmInfo(this.id);'  onmousedown='list_Mousedown(this)' onmouseup='list_MouseUp()' class='ui-first-child ui-last-child' id=" + i + ">" +
                                                    "<a href='#Item-Info-Search-Body' class='ui-btn '>" +
                                                        "<p style='color:#137ab0;font-weight:bold'>" + data.Iname + "</p>" +
                                                        "<label style='float:left;background-color:#137ab0;color:white;padding:3px;font-weight:lighter;'>" + amt + "</label>" +
                                                        "<p style='display:inline;float:right;font-weight:bold;margin-top:3px;'>" + data.Qty + "+" + data.free + "</p>" +
                                                    "</a>" +
                                                "</li>"
                                                );
                    }
                    else if (localStorage.getItem("FDName") == "SALE") {
                        $("#grid_Ord").hide();
                        $("#grid_Wsal").hide();
                        $("#grid_Sale").show();
                        
                        $("#Itm_GridSale").append(
                            "<li onclick='fun_showItmInfo(this.id);'  onmousedown='list_Mousedown(this)' onmouseup='list_MouseUp()' class='ui-first-child ui-last-child' id=" + i + ">" +
                                "<a href='#Item-Info-Search-Body' class='ui-btn '>" +
                                    "<label style='margin-top:6px;float:right;background-color:#137ab0;color:white;padding:3px;font-weight:lighter;'>" + data.MRP + "</label>" +
                                    "<p style='color:#137ab0;font-weight:bold'>" + data.Iname + "</p>" +
                                    "<p style='margin-top:-6px;'>" + data.Batch + "(" + data.Exp + ")</p>" +
                                    "<p style='display:inline;float:left ;font-weight:bold;margin-top:3px;margin-top:-3px;'>[" + data.Qty + "+" + data.free + "]</p> " +
                                    "<p style='display:inline;float:left ;margin-top:3px;margin-top:-3px;'>&nbsp;*&nbsp;</p>" +
                                    "<p style='display:inline;float:left ;font-weight:bold;margin-top:3px;margin-top:-3px;'>" + data.Rate + "</p>" +
                                    "<p style='display:inline;float:left ;margin-top:3px;margin-top:-3px;'>&nbsp;=&nbsp;</p>" +
                                    "<p style='color:#137ab0;font-weight:bold;float:right;margin-top:-6px;'>" + amt + "</p>" +
                                "</a>"+
                            "</li>"
                      
                                              );
                    }
                }
            }

        }
    }
}

var timerLongPrss;
function list_Mousedown(eve) {
    timerLongPrss = setInterval(function () {        
        clearInterval(timerLongPrss);
        var listitem = $(eve);      
        RemoveItem(eve.id, listitem);        
    }, 1000);
}
function list_MouseUp() {
    clearInterval(timerLongPrss);
}
var index_d;
function RemoveItem(a, listitem) {    
    confirmAndDelete(listitem, "left", a);
    function confirmAndDelete(listitem, transition, id) {
        //window.localStorage.setItem("DeletAtIndex", id);
        index_d = id;
        // Highlight the list item that will be removed
        listitem.children(".ui-btn").addClass("ui-btn-active");
        // Inject topic in confirmation popup after removing any previous injected topics
        $("#confirm .topic").remove();
        listitem.find(".topic").clone().insertAfter("#question");
        // Show the confirmation popup
        $("#confirm").popup("open");

        // Proceed when the user confirms
        $("#confirm #yes").on("click", function () {            
            listitem.remove();
           
            RemoveItemFromCart();
            $("#Itm_Grid").listview("refresh");

        });
        // Remove active state and unbind when the cancel button is clicked
        $("#confirm #cancel").on("click", function () {
            listitem.children(".ui-btn").removeClass("ui-btn-active");
            $("#confirm #yes").off();
        });
    }
}

function fun_showCart() {
    fun_AddItemInCart();
    $("#info").hide();
    window.location.href = "#Item-cart";
}
var isupdateSale = '0'
var isupdateWsale='0'
var isupdate = '0';
var ItemCountWSAL = '0';
var ItemCountSALE = '0';
var IsProcessComplete = '0';
function fun_AddToCart() {
    var totStk = $("#lbl_BatckStkTot").text().trim();
    var Qty = $("#txt-qty").val().trim();
    var free = $("#txt-free").val().trim();
    var qty_free = Number(Qty) + Number(free);
    if (Qty == "" || Qty == "0" || Qty.indexOf("-") == 0) {
        $("#msgText0").removeClass('hide');
        textAnim('msgText0', 'bounceInDown')
        setTimeout(function () {
            $("#msgText0").addClass('hide');
        }, 2000);
        $("#txt-qty").focus();
    }
    else {
        if (qty_free > totStk && (localStorage.getItem("FDName") == "WSAL" || localStorage.getItem("FDName") == "SALE")) {
            if (confirm("Available Stock Is " + totStk+ " Wish To Continue?"))
            {
                $("#txt-qty").val(totStk);
                $("#txt-free").val("0");
                fun_AddToCartCont();
            }
            else {
                $("#txt-qty").focus();
            }
        } else {
            fun_AddToCartCont();
        }
    }
}

function fun_AddToCartCont() {
    loadmsg = "Please Wait...";
    $(".show-page-loading-msg").click();
    InsertDataToarray();
    ShowNxtWind();
    
}

function ShowNxtWind() {
    if (IsProcessComplete == '1') {
        IsProcessComplete = '0';
        if (localStorage.getItem("FDName") == "WSAL") {

            if (isupdateWsale == '1') {
                fun_showCart();
            } else {
                fun_nextItem();
            }
            isupdateWsale = '0';
        } if (localStorage.getItem("FDName") == "ORDS") {
            if (isupdate == '1') {
                fun_showCart();
            } else {
                fun_nextItem();
            }
            isupdate = '0';
        }
        else if (localStorage.getItem("FDName") == "SALE") {
            if (isupdateSale == '1') {
                fun_showCart();
            } else {
                fun_nextItem();
            }
            isupdateSale = '0';
        }
        $(".hide-page-loading-msg").click();
    } else {
        setTimeout(ShowNxtWind, 1000);
    }
}

function InsertDataToarray()
{
    ///create variable
    var qty_free;
    var cntTmpSi;
    var Qty;
    var totalStock;
    var free;
    var Icode;
    var Iname;
    var MRP;
    var Packing;
    var stock;
    var Rate;
    var Pursz;
    var batch;
    var shelf;
    var gname;

    var check = '1';
    var IndexAtFound = null;
    var IndexAtFoundWsale = null;
    var IndexAtFoundSale = null;
    var indexInArray = '';
    var SelectedId = localStorage.getItem("SelectedItemIndex");
    localStorage.setItem("SelectedItemIndex", "");
    var SelectedIdWsale = localStorage.getItem("SelectedItemIndexWsale");
    localStorage.setItem("SelectedItemIndexWsale", "");
    var SelectedIdSale = localStorage.getItem("SelectedItemIndexSale");
    localStorage.setItem("SelectedItemIndexSale", "");
    var WebSerUrl = localStorage.getItem("APIURL");
    //initialise with new value
    shelf = $("#lbl_shelf").text();
    Qty = $("#txt-qty").val();
    free = $("#txt-free").val();
    Icode = $("#lblItmCode").text();
    Iname = $("#lblItmName").text();
    MRP = $("#lblItmMRP").text();
    Packing = $("#PackExp").text();
    stock = $("#lblItmstk").text();
    Rate = $("#lblRate").text();
    Pursz = $("#lblItmPurSz").text();
    batch = $("#lblItmBtch").text();
    gname = $("#lblContent").text();

    var ConVR = $("#lbl_ConVr").text();
    var ConSl = $("#lbl_ConSl").text();
    var Exp = $("#lbl_Exp").text();
    var pack = $("#lbl_Packing").text();
    if (free == "") {
        free = "0";
    }

    ///get item list
    if (localStorage.getItem("FDName") == "WSAL") {
        var arr = localStorage.getItem("SelectedItemInfoWSale");
        if (arr != null) {
            var splitArr = arr.split("$");
            if (splitArr.length <= 1) {
            }
            else {
                for (var i = 1; i <= splitArr.length - 1; i++) {
                    var data = (JSON).parse(splitArr[i]);
                    if (data.SlNo == SelectedIdWsale) {  //update item open from cart to edit item                    
                        IndexAtFoundWsale = SelectedIdWsale;
                        indexInArray = i;
                        }
                }
            }
        }
    }
    else if (localStorage.getItem("FDName") == "ORDS") {
        var arr = localStorage.getItem("SelectedItemInfo");
        if (arr != null) {
            var splitArr = arr.split("$");
            if (splitArr.length <= 1) {
            }
            else {
                for (var i = 1; i <= splitArr.length - 1; i++) {
                    var data = (JSON).parse(splitArr[i]);

                    if (data.Icode == Icode) {
                        if (i == SelectedId) {  //update item open from cart to edit item                    
                            IndexAtFound = i;
                        } else { ////insert item multiple time
                            Qty = Number(Qty) + Number(data.Qty);
                            free = Number(free) + Number(data.free);
                            Qty = String(Qty);
                            free = String(free);
                            IndexAtFound = i;
                        }
                    }
                }
            }
        }
    }
    else if (localStorage.getItem("FDName") == "SALE") {
        var arr = localStorage.getItem("SelectedItemInfoSale");
        if (arr != null) {
            var splitArr = arr.split("$");
            if (splitArr.length <= 1) {
            }
            else {
                for (var i = 1; i <= splitArr.length - 1; i++) {
                    var data = (JSON).parse(splitArr[i]);
                    if (data.SlNo == SelectedIdSale) {
                        IndexAtFoundSale = SelectedIdSale;
                        indexInArray = i;
                    } 
                }
            }
        }
       
    }
    qty_free=Number(Qty)+Number(free);
    ///Create Complete data
    var ItemInfo = {
        "Icode": Icode.trim(),
        "Iname": Iname.trim(),
        "MRP": MRP.trim(),
        "Packing": Packing.trim(),
        "stk": stock.trim(),
        "Rate": Rate.trim(),
        "pursize": Pursz.trim(),
        "Qty": Qty.trim(),
        "check": check.trim(),
        "free": free.trim(),
        "Batch": batch.trim(),
        "ConVR": ConVR.trim(),
        "ConSl": ConSl.trim(),
        "Exp": Exp.trim(),
        "pack": pack.trim(),
        "shelf":shelf.trim(),
        "SlNo": cntTmpSi,
        "GNAMe": gname.trim()
    }

    
    var FDName = window.localStorage.getItem("FDName");
    if (FDName == "SALE" || FDName == "WSAL") {
        var Ser;
        var pcode;//
        var TmpVrNO="";
        var tmpSlNo="";
        if (FDName == "SALE") {
            Ser = window.localStorage.getItem("sr_R");
            pcode = localStorage.getItem("pcodeSale");
            if (pcode == "" || pcode == null) {
                pcode = "ZZZZZZ";
            }
            TmpVrNO = window.localStorage.getItem("TmpVRnoSALE");
            if (IndexAtFoundSale == null) {
                tmpSlNo = Number(ItemCountSALE) + 1;               
            }
            else { ////Update
                tmpSlNo = IndexAtFoundSale;
            }
        }
        else {
            Ser = window.localStorage.getItem("sr_W");
            pcode = localStorage.getItem("pcodeWsale");
            TmpVrNO = window.localStorage.getItem("TmpVRnoWSAl");
            if (IndexAtFoundWsale == null) {
                tmpSlNo = Number(ItemCountWSAL) + 1;
            }
            else { ////Update
                tmpSlNo = IndexAtFoundWsale;
            }
        }

       
        $.ajax({
            url: WebSerUrl + "/Product/IsbatchSkip",
            data: { icode: Icode.trim(), Quty: Qty.trim(), free: free.trim(), Pcode: pcode, FDName: FDName, Series: Ser, PurSz: Pursz.trim(), Convrno: ConVR.trim(), Conslno: ConSl.trim(), rate: Rate.trim(), VrNO: TmpVrNO, Slno: tmpSlNo },
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    ItemInfo.Batch = data[i].BatchNo;
                    ItemInfo.ConVR = data[i].Vrno;
                    ItemInfo.ConSl = data[i].Slno;
                    ItemInfo.MRP = data[i].MRP;
                    ItemInfo.Rate = data[i].Rate;
                    ItemInfo.Exp = data[i].Expirydate;
                    ItemInfo.Qty = data[i].qty;
                    ItemInfo.Packing = data[i].packing;
                    ItemInfo.free = data[i].free;
                    
                    //////insert
                    if (localStorage.getItem("FDName") == "WSAL") {
                        if (IndexAtFoundWsale == null) {
                            cntTmpSi = Number(ItemCountWSAL) + 1;
                            ItemCountWSAL = Number(ItemCountWSAL) + 1;
                            ItemInfo.SlNo = cntTmpSi;
                            var Itemdata = JSON.stringify(ItemInfo);
                            var arr = localStorage.getItem("SelectedItemInfoWSale");
                            arr = arr + '$' + Itemdata;
                            localStorage.setItem("SelectedItemInfoWSale", arr);
                        }
                        else { ////Update
                            isupdateWsale = '1';
                            cntTmpSi = IndexAtFoundWsale;
                            ItemInfo.SlNo = cntTmpSi;
                            IndexAtFoundWsale = null;

                            var Itemdata = JSON.stringify(ItemInfo);
                            var upArr = splitArr.splice(indexInArray, 0, Itemdata); //insert at position
                            upArr = splitArr.splice(Number(indexInArray + 1), 1); //remove old item from  position
                            indexInArray = '';
                            var arrStr;
                            for (var k = 0; k <= splitArr.length - 1; k++) {
                                if (splitArr[k] == ",") {
                                    splitArr[k] = "$";
                                }
                                arrStr = arrStr + splitArr[k];
                                if (k <= splitArr.length - 2) {
                                    arrStr = arrStr + "$";
                                }
                                localStorage.setItem("SelectedItemInfoWSale", arrStr);
                            }
                        }

                        //set label in ItemInfo page
                        var arry = localStorage.getItem("SelectedItemInfoWSale");
                        var a = arry.split('$');
                        addcountToCartLabel(a.length - 1);
                        localStorage.setItem("SelectedItemIndexWsale", "");
                        SaveDataTmpSI(ItemInfo.Icode, ItemInfo.MRP, ItemInfo.Rate, ItemInfo.pursize, ItemInfo.Qty, ItemInfo.free, ItemInfo.Batch, cntTmpSi, ItemInfo.ConVR, ItemInfo.ConSl, ItemInfo.Exp,  ItemInfo.Packing)

                    }
                    else if (localStorage.getItem("FDName") == "SALE") {
                        if (IndexAtFoundSale == null) {
                            cntTmpSi = Number(ItemCountSALE) + 1;
                            ItemCountSALE = Number(ItemCountSALE) + 1;
                            ItemInfo.SlNo = cntTmpSi;
                            var Itemdata = JSON.stringify(ItemInfo);

                            var arr = localStorage.getItem("SelectedItemInfoSale");
                            arr = arr + '$' + Itemdata;
                            localStorage.setItem("SelectedItemInfoSale", arr);

                            //alert('i');
                        }
                        else { ////Update                            
                            isupdateSale = '1';
                            cntTmpSi = IndexAtFoundSale;
                            ItemInfo.SlNo = cntTmpSi;
                            IndexAtFoundSale = null;

                            var Itemdata = JSON.stringify(ItemInfo);
                            var upArr = splitArr.splice(indexInArray, 0, Itemdata); //insert at position
                            upArr = splitArr.splice(Number(indexInArray + 1), 1); //remove old item from  position
                            indexInArray = '';
                            var arrStr;
                            for (var k = 0; k <= splitArr.length - 1; k++) {
                                if (splitArr[k] == ",") {
                                    splitArr[k] = "$";
                                }
                                arrStr = arrStr + splitArr[k];
                                if (k <= splitArr.length - 2) {
                                    arrStr = arrStr + "$";
                                }
                                localStorage.setItem("SelectedItemInfoSale", arrStr);
                            }
                        }
                       
                        //set label in ItemInfo page
                        var arry = localStorage.getItem("SelectedItemInfoSale");
                        var a = arry.split('$');
                        addcountToCartLabel(a.length - 1);
                        localStorage.setItem("SelectedItemIndexSale", "");
                        SaveDataTmpSI(ItemInfo.Icode, ItemInfo.MRP, ItemInfo.Rate, ItemInfo.pursize, ItemInfo.Qty, ItemInfo.free, ItemInfo.Batch, cntTmpSi, ItemInfo.ConVR, ItemInfo.ConSl, ItemInfo.Exp, ItemInfo.Packing)
                    }
                }
                IsProcessComplete = "1";
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
             
            }
        });

    }
    else {
        var Itemdata = JSON.stringify(ItemInfo);
        if (IndexAtFound == null) {
            var arr = localStorage.getItem("SelectedItemInfo");
            arr = arr + '$' + Itemdata;
            localStorage.setItem("SelectedItemInfo", arr);
        }
        else { ////Update
            isupdate = '1';
            var upArr = splitArr.splice(IndexAtFound, 0, Itemdata); //insert at position
            upArr = splitArr.splice(Number(IndexAtFound + 1), 1); //remove old item from  position
            var arrStr;
            for (var i = 0; i <= splitArr.length - 1; i++) {
                if (splitArr[i] == ",") {
                    splitArr[i] = "$";
                }
                arrStr = arrStr + splitArr[i];
                if (i <= splitArr.length - 2) {
                    arrStr = arrStr + "$";
                }
                localStorage.setItem("SelectedItemInfo", arrStr);
            }
        }
        IsProcessComplete = "1";
        //set label in ItemInfo page
        var arry = localStorage.getItem("SelectedItemInfo");
        var a = arry.split('$');
        addcountToCartLabel(a.length - 1);
        localStorage.setItem("SelectedItemIndex", "");

    }
  
   
}

function fun_showItmInfo(id) {
    $("#lblRate").text("");
    $("#txt-qty").val("");
    $("#txt-free").val("");
    $("#lblItmstk").val("");
    if (id != '#') {
        SetItemInfo(id);
        $("#insert_itemInfo").hide();
        $("#update_itemInfo").show();
    }
    else {
        $("#insert_itemInfo").show();
        $("#update_itemInfo").hide();
    }
    $("#txt-qty").focus();    
    SetItem_Count();
    $("#a_Item-Info-Search-Body").click();
}

function SetItemBatchInfo(id) {
    var arr = localStorage.getItem("SelectedItemInfo");
    var splitArr = arr.split("$");
    if (splitArr.length <= 1) {
    }
    else {
        var arrLength = splitArr.length;
        var data = (JSON).parse(splitArr[id]);
        $("#lblItmCode").text(data.Icode);
       
    }

}

function SetItemInfo(id) {
    var arr = '';
    if (localStorage.getItem("FDName") == "WSAL") {
        arr = localStorage.getItem("SelectedItemInfoWSale");        
    } else if (localStorage.getItem("FDName") == "ORDS") {
        localStorage.setItem("SelectedItemIndex", id);
        arr = localStorage.getItem("SelectedItemInfo");
    } else if (localStorage.getItem("FDName") == "SALE") {
        arr = localStorage.getItem("SelectedItemInfoSale");        
    }
    var splitArr = arr.split("$");
    if (splitArr.length <= 1) {
    }
    else {
        var arrLength = splitArr.length;
        var data = (JSON).parse(splitArr[id]);
        $("#lblContent").text(data.GNAMe);
        $("#lbl_shelf").text(data.shelf);
        $("#lblItmCode").text(data.Icode);
        $("#lblRate").text(data.Rate);
        $("#lblItmMRP").text(data.MRP);
        $("#lblItmName").text(data.Iname);
        if (localStorage.getItem("FDName") == "ORDS") {
            $("#PackExp").text(data.Packing );
        }
        else {
            $("#PackExp").text(data.Packing + " (" + data.Exp + ") [Shelf:" + data.shelf + "]");
        }
        $("#lblItmstk").text(data.stk);
        $("#lblItmBtch").text(data.Batch);
        $("#lblItmPurSz").text(data.pursize);
        $("#txt-qty").val(data.Qty)
        $("#txt-free").val(data.free)
        if (localStorage.getItem("FDName") == "SALE") {
            localStorage.setItem("SelectedItemIndexSale", data.SlNo);
            window.localStorage.setItem("IndexSlNo", data.SlNo);
            fun_getBatchStkCount();
        }
        else 
            if (localStorage.getItem("FDName") == "WSAL") {
                localStorage.setItem("SelectedItemIndexWsale", data.SlNo);
                window.localStorage.setItem("IndexSlNoWsale", data.SlNo);
                fun_getBatchStkCount();
            }

    }

}

function RemoveItemFromCart() {    
    var id = index_d;
    index_d = 0;
    var WebSerUrl = localStorage.getItem("APIURL");
    var tmpVno = '';
    if (id >= 1) {
        var arr = '';
        if (localStorage.getItem("FDName") == "WSAL") {
            arr = localStorage.getItem("SelectedItemInfoWSale");
            tmpVno = window.localStorage.getItem("TmpVRnoWSAl");
        } else if (localStorage.getItem("FDName") == "ORDS"){
            arr = localStorage.getItem("SelectedItemInfo");
        } else if (localStorage.getItem("FDName") == "SALE") {
            arr = localStorage.getItem("SelectedItemInfoSale");
            tmpVno = window.localStorage.getItem("TmpVRnoSALE");
        }
        if (localStorage.getItem("FDName") == "WSAL" || localStorage.getItem("FDName") == "SALE") {
            if (arr != null) {
                var splitArr = arr.split("$");
                if (splitArr.length <= 1) {
                }
                else {
                    for (var i = 1; i <= splitArr.length - 1; i++) {
                        var data = (JSON).parse(splitArr[i]);
                        if (i == id) {
                            var SaveUrl = WebSerUrl + "/Product/ClearTmpSI?vrno=" + tmpVno + "&slno=" + data.SlNo + "&flag=A";
                            $.ajax({
                                url: SaveUrl,
                                type: "GET",
                                dataType: 'json',
                                processData: true,
                                success: function (data) {

                                },
                                error: function (event) {
                                }
                            })
                        }
                    }
                }
            }
        }
        var splitArr = arr.split("$");
        var arrLength = splitArr.length;
        splitArr.splice(id, 1);
        var arrStr = "";
        for (var i = 0; i <= splitArr.length - 1; i++) {
            if (splitArr[i] == ",") {
                splitArr[i] = "$";
            }
            arrStr = arrStr + splitArr[i];
            if (i <= splitArr.length - 2) {
                arrStr = arrStr + "$";
            }
        }
        if (localStorage.getItem("FDName") == "WSAL") {
            localStorage.setItem("SelectedItemInfoWSale", arrStr);
        } else if (localStorage.getItem("FDName") == "ORDS") {
            localStorage.setItem("SelectedItemInfo", arrStr);
        } else if (localStorage.getItem("FDName") == "SALE") {
            localStorage.setItem("SelectedItemInfoSale", arrStr);
        }
        
        SetItem_Count();
        fun_AddItemInCart();
    }
}

function SetItem_Count() {
    var arr = '';
    if (localStorage.getItem("FDName") == "WSAL") {
        arr = localStorage.getItem("SelectedItemInfoWSale");
    } else if (localStorage.getItem("FDName") == "ORDS") {
        arr = localStorage.getItem("SelectedItemInfo");
    } else if (localStorage.getItem("FDName") == "SALE") {
        arr = localStorage.getItem("SelectedItemInfoSale");
    }
    if (arr != null) {
        var splitArr = arr.split("$");
        var totalAmt = 0;
        var Count = splitArr.length - 1;
        if (Count < 1) {
            $(".cart-cnt-lbl").hide();
            $(".cart-cnt-lbl").text("0");

            $("#Empty-basket").show();
            $("#Item-grid-table").hide();
            
            //$("#lbl-cart-cnt").hide();
            //$("#lbl-cart-cnt1").hide();
            //$("#d-lbl-cnt").text("Total Item : 0");
            $("#itm-cnt").text("");
            totalAmt = 0;
            var src = document.getElementById('sel_image').src;
            if (src.indexOf("No_image.png") > 0 && localStorage.getItem("FDName") == "ORDS") {
                $("#Item-grid-table").hide();
            } else {
                if (localStorage.getItem("FDName") == "ORDS") {
                    $("#Item-grid-table").show();
                }
            }
        } else {
            $(".cart-cnt-lbl").show();
            $(".cart-cnt-lbl").text(Count);
            //$("#lbl-cart-cnt").show();
            //$("#lbl-cart-cnt1").show();
            $("#Empty-basket").hide();
            $("#Item-grid-table").show();
            var arrLength = splitArr.length;
            $("#itm-cnt").text("Total " + Number(arrLength - 1) + " Item found");
            //$("#lbl-cart-cnt").text(splitArr.length - 1);
            //$("#lbl-cart-cnt-ptdr").text(splitArr.length - 1);
            //$("#lbl-cart-cnt1").text(splitArr.length - 1);
            //$("#lbl-cart-cnt2").text(splitArr.length - 1);
            $("#d-lbl-cnt").text("Total Item : " + Number(splitArr.length - 1));
            for (var i = 1; i <= arrLength - 1; i++) {
                var data = (JSON).parse(splitArr[i]);
                if (data.check == "1") {
                    var amt = Number(data.Rate * data.Qty);
                    totalAmt = totalAmt + amt;
                }
            }
        }
        window.localStorage.setItem("TotalAmt", totalAmt);
        $("#d-lbl-amt").text(totalAmt.toFixed(2));
       
    }
}



function SaveOrderWsale(isPrint)
{
    if (localStorage.getItem("FDName") == "ORDS") {
        isprint = isPrint;
        SaveOrder();
    } else {
        SaveInvoice(isPrint);
    }
}

function SaveOrder() {
    loadmsg = "Saving Data...";
    $(".show-page-loading-msg").click();
    var WebSerUrl = localStorage.getItem("APIURL");
    if ($("#cart-cnt-lbl").text() == "0" || $("#cart-cnt-lbl").text() == "") {
        WebSerUrl = WebSerUrl + "/Order/SaveOrderCon1";
    } else {
        WebSerUrl = WebSerUrl + "/Order/SaveOrderCon";
    }
    $.ajax({
        url: WebSerUrl,
        type: "post",
        data: getUserDataForOrderPlace("0"),
        dataType: 'json',
        processData: true,
        success: function (data) {
            $(".hide-page-loading-msg").click();
            if (data != null) {
                if (data.vrno == null) {
                    ShowErrorFromServer(data.pcode);
                }
                else {
                    var filename = "";
                    var smallImage = document.getElementById('sel_image');
                    var image = smallImage.src;
                    if (smallImage.src.indexOf("No_image.png") < 0) {
                        var imageURI = localStorage.getItem("ImagePath");
                        filename = send(imageURI, data.vrno, "");
                    }
                   
                    SetVrDeetail(data.vrno, data.TotalAmt, data.pcode, data.items);
                    Clear_OrderDetail();
                }
            }
            else {
                alert("Save Failed. Please Try Again!!!");
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            $(".hide-page-loading-msg").click();
            ServiceStopMsg();
        }
    });
}


function window_OrderSaveFailed()
{
    $("#vrdetl").hide();
    $("#data-save-a").hide();
    $("#data-save-b1").show();
    $("#savfal").show();
}

function window_InvoiceSaveFailed() {
    if (localStorage.getItem("FDName") == "WSAL") {
        $("#div-After-InvoiceWSave1").click();
        $("#InvoiceWvrdetl").hide();
        $("#data-InvoiceWsave-a").hide();
        $("#data-InvoiceWsave-b1").show();
        $("#savWfail").show();
    }
    else {
        $("#div-After-InvoiceSave1").click();
        $("#Invoicevrdetl").hide();
        $("#data-Invoicesave-a").hide();
        $("#data-Invoicesave-b1").show();
        $("#savfail").show();
    }
}


function getArrayOfOrder() {
    var arr;
    arr = localStorage.getItem("SelectedItemInfo");
    var splitArr = arr.split("$");
    splitArr.shift();
    splitArr = JSON.parse('[' + splitArr + ']');
    return splitArr;
}



function getUserDataForOrderPlace(val) {
    var pcode;
    var series;
    var pname, ptcode, dname, dcode, dadd;
    var Fdname = window.localStorage.getItem("ORDFDNAME");
    if (Fdname == "ORDR") {
        series = window.localStorage.getItem("sr_Or");
        pname = $("#ordPatient").val();
        ptcode = localStorage.getItem("OrdPt");
        dname = $("#ordDoctor").val();
        dcode = localStorage.getItem("OrdDrCode");
        dadd = localStorage.getItem("OrdDrAdd");
    } else {
        series = window.localStorage.getItem("sr_O");
    }
    pcode = window.localStorage.getItem("pcode");
    var dataArr = getArrayOfOrder();
    if (dataArr == "") {
        var data = {
            "pcode": pcode,
            "PatientID": ptcode,
            "NameP": pname,
            "Addr": "",
            "DCode": dcode,
            "DrName": dname,
            "DrAddr": dadd,
            "FDName": Fdname,
            "series":series
        };
        return data;
    }
    else {
        var data = {
            "items": dataArr,
            "pcode": pcode,
            "PatientID": ptcode,
            "NameP": pname,
            "Addr": "",
            "DCode": dcode,
            "DrName": dname,
            "DrAddr": dadd,
            "FDName": Fdname,
            "series": series
        };
        return data;
    }

}


//prevent poppup to close on backspace
function PreventBackSpace(e) {
    if (e.keyCode == 8 && !$(e.target).is("input") ) {
        e.preventDefault();
    }
}

function homePage()
{
    window.location.href = "#page-con";    
}


function ShowPartyLdgr() {
    
     WebSerUrl = localStorage.getItem("APIURL");
     var pcode;
     if (localStorage.getItem("FDName") == "ORDS") {
         pcode= localStorage.getItem("pcode");
     } else if (localStorage.getItem("FDName") == "WSAL") {      
         pcode = localStorage.getItem("pcodeWsale");
     } else if (localStorage.getItem("FDName") == "SALE") {
         pcode = localStorage.getItem("pcodeSale");
     } else if (localStorage.getItem("FDName") == "MNRC") {
         pcode = localStorage.getItem("ReceiptPcode");
     } else if (localStorage.getItem("FDName") == "MNPY") {
         pcode = localStorage.getItem("ReceiptPcode");
     }
     else {
         pcode = localStorage.getItem("pcodeLdg");
     }
     if (pcode != "" && pcode != null) {
         loadmsg = "Loading Data...";
         $(".show-page-loading-msg").click();
         var frmdate = $("#frmdt_ldg").val();
         var todate = $("#todt_ldg").val();

         if (frmdate == "" || frmdate == null) {
             frmdate = localStorage.getItem("startdt");
         }
         if (todate == "" || todate == null) {
             todate = localStorage.getItem("enddt");
         }
         var IsopbalInclude;
         var Issummary;

         if ("1" == $("#flip-chk-opBal").val()) {
             IsopbalInclude = true;
         } else {
             IsopbalInclude = false;
         }
         if ("1" == $("#flip-chk-sumary").val()) {
             Issummary = true;
         } else {
             Issummary = false
         }
         $.ajax({
             url: WebSerUrl + "/Order/GetPartyLedger",
             type: "get",
             data: { pcode: pcode, frmdate: frmdate, todate: todate, IsOPBalInclude: IsopbalInclude, IsSummary: Issummary },
             dataType: 'json',
             processData: true,
             success: function (data) {
                 $(".hide-page-loading-msg").click();
                 $("#ldgRpt-body").html("");
                 $("#ldgRpt-body").append(" <table id='tbl_ldgrpt' class='CSSTableGenerator' style='border-collapse:collapse;width:600px;'><tr><td style='width:50px;'>Dt</td><td >Description</td><td >DrAmt</td><td >CrAmt</td><td >Balance</td></tr>");
                 for (var i = 0; i < data.length; i++) {
                     if (data[0].Error == "1") {
                         ShowErrorFromServer(data[0].Description);
                     }
                     else {
                         if (IsopbalInclude) {
                             $("#lblOPBal").show();
                             var a;
                             if (data[data.length - 1].OPBalance.toFixed(2) > 0) {
                                 a = data[data.length - 1].OPBalance.toFixed(2) + "Dr";
                             }
                             else {
                                 a = data[data.length - 1].OPBalance.toFixed(2) + "Cr";
                             }
                             $("#lblOPBal").text("OpBal: " + a);
                         } else {
                             $("#lblOPBal").hide();
                         }
                         var balancestr;
                         if (data[i].Balance.toFixed(2) > 0) {
                             balancestr = data[i].Balance.toFixed(2) + "Dr";
                         } else {
                             balancestr = data[i].Balance.toFixed(2) + "Cr";
                         }
                         if (Issummary) {
                             $("#ldgRpt-body").hide();
                             $("#ldgRpt-body-summary").show();
                             $("#lbl-s-dr").text("DrAmt : " + data[data.length - 1].dramt.toFixed(2));
                             $("#lbl-s-cr").text("CrAmt : " + data[data.length - 1].cramt.toFixed(2));
                             $("#lbl-s-bal").text("Balance : " + balancestr);
                         } else {
                             $("#ldgRpt-body-summary").hide();
                             $("#ldgRpt-body").show();

                             if (i == data.length - 1) {
                                 $("#tbl_ldgrpt tr:last").after("<tr><td colspan='2' style='color:purple;font-weight:bold;'>" + data[i].Description + "</td><td style='color:purple;font-weight:bold; text-align:right;width:70px;'>" + data[i].dramt.toFixed(2) + "</td><td  style='color:purple;font-weight: bold; text-align:right;width:70px;'>" + data[i].cramt.toFixed(2) + "</td><td style='color:purple;font-weight:bold; text-align:right;width:70px;'>" + balancestr.replace("-", "") + "</td></tr></tbody>");

                             } else {
                                 $("#tbl_ldgrpt tr:last").after("<tr><td style='width:50px;'>" + data[i].Dt + "</td> <td  style='text-align:justify;width:340px;'>" + data[i].Description + "</td><td style=' text-align:right;'>" + data[i].dramt.toFixed(2) + "</td><td style=' text-align:right;'>" + data[i].cramt.toFixed(2) + "</td><td style=' text-align:right;'>" + balancestr.replace("-","") + "</td></tr>");

                             }
                         }

                     }
                 }
                 setInterval(function setsize() {

                 }, 2000);
             },
             error: function (event) {
                 $(".hide-page-loading-msg").click();
                 ServiceStopMsg();
             }
         });
     }
}

function SaveDataTmpSI(Icode, MRP,  Rate, Pursz, Qty, free, batch, count, ConVR, ConSl, Exp, pack) {
    var WebSerUrl = localStorage.getItem("APIURL");
  //  var PackExp = $("#PackExp").text();
    var FDName = window.localStorage.getItem("FDName");
    var Pcode;
    var Ser;
    var TmpVrNO;
    if (FDName == "SALE")
    {
        Ser = window.localStorage.getItem("sr_R");
        Pcode = window.localStorage.getItem("pcodeSale");
        TmpVrNO = window.localStorage.getItem("TmpVRnoSALE");
    }
    else {
        Ser = window.localStorage.getItem("sr_W");
        Pcode = window.localStorage.getItem("pcodeWsale");
        TmpVrNO = window.localStorage.getItem("TmpVRnoWSAl");
    }
    var LogUserId = window.localStorage.getItem("LoginUser");
  
    $.ajax({
        url: WebSerUrl + "/Product/GetTmpSIData",
        type: "GET",
        data: { FDName: FDName, Ser: Ser, LogUserId: LogUserId, Index: count, Icode: Icode, batchNo: batch, MRP: MRP, Rate: Rate, Qty: Qty, Free: free, expiry: Exp, ConVrNo: ConVR, ConSlNo: ConSl, PurSz: Pursz, packing: pack, TmpVrNO: TmpVrNO, Pcode: Pcode },
        dataType: 'json',
        processData: true,
        success: function (data) {
            if (data.indexOf("$") == 0) {
                alert(data);
            }
            else {
                if (FDName == "SALE") {
                    window.localStorage.setItem("TmpVRnoSALE", data);
                } else {
                    window.localStorage.setItem("TmpVRnoWSAl", data);
                }
            }
        },
        error: function (event) {
            ServiceStopMsg();
        }
    })
}

function GetTmpSiVrno()
{
    var FDName = window.localStorage.getItem("FDName");
    var TmpVrNO;
    var Ser;
    if (FDName == "SALE") {
        Ser = window.localStorage.getItem("sr_R");
        TmpVrNO = window.localStorage.getItem("TmpVRnoSALE");
    }
    else {
        Ser = window.localStorage.getItem("sr_W");
        TmpVrNO = window.localStorage.getItem("TmpVRnoWSAl");
    }
    var LogUserId = window.localStorage.getItem("LoginUser");
    
    var WebSerUrl = localStorage.getItem("APIURL");
    var Urlstr = WebSerUrl + "/Product/GetTmpSIVrNo" + "?FDName=" + FDName + "&Ser=" + Ser + "&LogUserId=" + LogUserId;
   
    if (TmpVrNO == "" || TmpVrNO == null || TmpVrNO == undefined) {
        $.ajax({
            url: Urlstr,
            type: "GET",
            dataType: 'json',
            processData: true,
            success: function (data) {
                if (data.indexOf("$") == 0) {
                    alert(data);
                }
                else {
                    if (FDName == "SALE") {
                        window.localStorage.setItem("TmpVRnoSALE", data);
                    } else {
                        window.localStorage.setItem("TmpVRnoWSAl", data);
                    }
                }
            },
            error: function (event) {
                alert("Temp VrNo is Blank")
            }
        })
    }
}


function nxt_itemCart() {
    if(window.localStorage.getItem("FDName")=="SALE")
    {
        $("#id_aPTDR-body").click();        
    }
    else {
        if (window.localStorage.getItem("FDName") == "ORDS") {
            var MenuList = localStorage.getItem("MnuList");
            if (MenuList.indexOf("INV105") >= 0 && MenuList.indexOf("INV081") >= 0) {
                window.localStorage.setItem("ORDFDNAME", "ORDS");
                $("#A5").click();
                $("#divOrderPTDR").slideUp(100);
            } else if (MenuList.indexOf("INV081") >= 0 && MenuList.indexOf("INV105") <= 0) {
                window.localStorage.setItem("ORDFDNAME", "ORDS");
                $("#id_ainvoice-item-btn2-body").click();
            }
            else {
                window.localStorage.setItem("ORDFDNAME", "ORDR");
                $("#A5").click();
            }
           
        } else {
            $("#id_ainvoice-item-btn2-body").click();
        }
    }
}

function SaveInvoice(isPrint)
{
    if (localStorage.getItem("FDName") == "WSAL") {
        $("#invoice-item-btn2-body").popup("close");
    }
    else {
        $("#ptdr-btn-body").popup("close");
    }
   
    loadmsg = "Saving Data...";
    $(".show-page-loading-msg").click();
    
    var Addr = $("#pt_infoAdd").text();
    var DrAddr=$("#dr_infoAdd").text();
    var DrName = $("#dr-name").val();
    var DCode=window.localStorage.getItem("DrCode");
    var NameP = $("#pn-name").val();
    var PatientID = window.localStorage.getItem("PtCode");
    var UserId = window.localStorage.getItem("LoginUser");
    var pcode;//
    var TmpVrNO;//
    var FDName = window.localStorage.getItem("FDName");
    var Ser;//
    if (FDName == "SALE") {
        Ser = window.localStorage.getItem("sr_R");
        TmpVrNO = window.localStorage.getItem("TmpVRnoSALE");
        pcode = localStorage.getItem("pcodeSale");
        if (pcode == "" || pcode == null) {
            pcode = "ZZZZZZ";
        }
    }
    else {
        Ser = window.localStorage.getItem("sr_W");
        TmpVrNO = window.localStorage.getItem("TmpVRnoWSAl");
        pcode = localStorage.getItem("pcodeWsale");
    }

    var deviceId = GetDeviceNameId("3");
    var WebSerUrl = localStorage.getItem("APIURL");
    var SaveUrl = WebSerUrl + "/Product/SaveInvoice?TempVrNo=" + TmpVrNO + "&PCODE=" + pcode + "&VrSeries=" + Ser + "&TRCODE=" + FDName + "&UserId=" + UserId + "&PatientID=" + PatientID + "&NameP=" + NameP + "&Addr=" + Addr + "&DCode=" + DCode + "&DrName=" + DrName + "&DrAddr=" + DrAddr + "&isPrint=" + isPrint + "&Device=" + deviceId;
    
    $.ajax({
        url: SaveUrl,
        type: "GET",
        dataType: 'json',
        processData: true,
        success: function (data) {
            $(".hide-page-loading-msg").click();            
            if (data.vrno.indexOf("^") == 0) {
                ShowErrorFromServer(data.vrno);
            }
            else {
                if (data.vrno.indexOf("$") == 0) {
                    ShowErrorFromServer(data.vrno);
                } else {
                    if (data.vrno == "") {
                        alert("Save Failed. Please Try Again!!!");
                    }
                    else {
                        SetVrDeetail(data.vrno, data.TotalAmt, data.pcode, data.items);
                        if (localStorage.getItem("FDName") == "WSAL") {                           
                            Clear_WSaleDetail();
                        } else {
                            Clear_SaleDetail();                            
                        }
                    }
                }
            }
        },
            
        
        error: function (event) {
            ServiceStopMsg();
        }
    })
}

function SetVrDeetail(vrno, TotalAmt, pcode, data) {
    $("#vr-detail1").show();
    $("#vr-detail").hide();
    try {
        if (localStorage.getItem("FDName") == "ORDS") {
            var smallImage = document.getElementById('sel_image');
            var image = smallImage.src;
            if (smallImage.src.indexOf("No_image.png") < 0) {
                document.getElementById('Img16').src = smallImage.src;
                $("#img").slideDown(100);
            }
            else {
                $("#img").slideUp(100);
            }
        }
        else {
            $("#img").slideUp(100);
        }
        window.location.href = "#Vrdetail";
        $("#p_VrNO").text(vrno);
        $("#L_NetAmt").text(TotalAmt);
        $("#p1").text(pcode);
        $("#div_itemList").html("");

        try {
            var itm = data
            if (itm.length > 0) {
                $("#div_itemList").append("<table  class='CSSTableGenerator' style='border-collapse:collapse;width:80%'><tr><td style='width:30px;'>SrNo</td><td >Item Name</td><td >Qty</td><td >Value</td></tr>");
            }
            for (var i = 0; i < itm.length; i++) {
                var j = i + 1;
                $("#div_itemList tr:last").after(
                    "<tr><td style='width:50px;text-align:center'>" + j + ".</td> <td  style='width:340px;'> <p style='margin-top:0px;margin-bottom:0px;'>" + itm[i].INAME + "</p></td><td style='text-align:center'><p style='margin-top:0px;margin-bottom:0px;'>" + itm[i].Qty + "+" + itm[i].free + "</p></td><td style=' text-align:right;'><p style='margin-top:0px;margin-bottom:0px;'>" + itm[i].Rate + "</p></td></tr></tbody>");
            }
        }
        catch (e) {
           
        }
    }
    catch (e) {
        alert(e.message);
    }
}
function Clear_WSaleDetail() {
    var WebSerUrl = localStorage.getItem("APIURL");
    var tmpVrno = window.localStorage.getItem("TmpVRnoWSAl");
    var SaveUrl = WebSerUrl + "/Product/ClearTmpSI?vrno=" + tmpVrno + "&slno=0" + "&flag=B";
    $.ajax({
        url: SaveUrl,
        type: "GET",
        dataType: 'json',
        processData: true,
        success: function (data) {
        },
        error: function (event) {
        }
    })
    window.localStorage.setItem("TmpVRnoWSAl", "");
    ItemCountWSAL = 0;
    localStorage.setItem("SelectedItemInfoWSale", "");
    localStorage.setItem("DrCode", "");
    localStorage.setItem("PtCode", "");
    localStorage.setItem("pcodeWsale", "");
    $('#pn-name').val("");
    $('#dr-name').val("");
    $('#party-srch').val("");
    $('#txt-party-p').val("");
    $("#div-party-info").addClass("display-none");
    $("#pt-info-body").addClass("display-none");
    $("#dr-info-body").addClass("display-none");
    localStorage.setItem("WSALLessPerc", "0.0");
   
}


function Clear_SaleDetail() {
    var WebSerUrl = localStorage.getItem("APIURL");
    var tmpVrno = window.localStorage.getItem("TmpVRnoSALE");
    var SaveUrl = WebSerUrl + "/Product/ClearTmpSI?vrno=" + tmpVrno + "&slno=0" + "&flag=B";
    $.ajax({
        url: SaveUrl,
        type: "GET",
        dataType: 'json',
        processData: true,
        success: function (data) {           
        },
        error: function (event) {
        }
    })
    window.localStorage.setItem("TmpVRnoSALE", "");
    ItemCountSALE = 0;
    localStorage.setItem("SelectedItemInfoSale", "");
    localStorage.setItem("DrCode", "");
    localStorage.setItem("PtCode", "");
    localStorage.setItem("pcodeSale", "");
    $('#pn-name').val("");
    $('#dr-name').val("");
    $('#txt-party-pa').val("");
    $('#txt-party-p').val("");
    $("#party-srch-body").addClass("display-none");
    $("#pt-info-body").addClass("display-none");
    $("#dr-info-body").addClass("display-none");
    localStorage.setItem("SALELessPerc", "0.0");
    
}

function Clear_OrderDetail()
{
    try {
        localStorage.setItem("SelectedItemInfo", "");
        localStorage.setItem("SelectedArea", "");
        localStorage.setItem("SelectedItemIndex", "");
        localStorage.setItem("activePage", "");
        localStorage.setItem("curr_window", "");
        localStorage.setItem("pcode", "");
        localStorage.setItem("SelectedItemInfo", "");
        localStorage.setItem("TotalAmt", 0);
        $("#txtOrderParty").val("");
        serchtxt_clear('d', '8')
        Close_img();
        $("#ordPatient").val('');
        localStorage.setItem("OrdPt",'');
        $("#ordDoctor").val('');
        localStorage.setItem("OrdDrCode",'');
        localStorage.setItem("OrdDrAdd", '');
       
    }
    catch (e) {
        alert(e.message);
    }
}

function clear_ReceiptDetail() {
    $("#rcptPCode").val("");
    $("#Rcpttxtamt").val("");
    $("#RcptdocNumber").val("");
    $("#RcptBank").val("");
    $("#RcptBranch").val("");
    $("#narr1").val("");
    $("#narr2").val("");
    $("#Rcpttxtamt1").val("");
    $("#VrAmt").text("0.00");
    $("#AlAmt").text("0.00");
    $("#UnlAmt").text("0.00");
    $("#BalAmt").text("0.00");
    $("#AdjAmt").text("0.00");
    $("#RemAmt").text("0.00");
    $("#ulpartyRcpt").html("");
    VrRcptCount = 0;
    localStorage.setItem("ReceiptPcode", "");
    $("#rcptPartyAdd").text("");
    localStorage.setItem("doc", "");
    localStorage.setItem("docno", "");
    localStorage.setItem("accode", "");
    localStorage.setItem("codedesc", "");
    localStorage.setItem("Banker", "");
    localStorage.setItem("Branch", "");
    $("#RcptBranch").val("");
    $("#RcptBank").val("");
    $("#RcptdocNumber").val("");
    $("#pdocRec").text("");
    $("#div7").addClass('hide');
}

function fun_cancel() {
    var FDName = window.localStorage.getItem("FDName");
    if (confirm("Do you want to cancel Current process?")) {
        if (FDName == "ORDS") {
            Clear_OrderDetail();
        }
        else if (FDName == "SALE") {
            Clear_SaleDetail();
        }
        else if (FDName == "MNRC") {
            clear_ReceiptDetail();
        }
        else {
            Clear_WSaleDetail();
        }
        homePage();
    }
   
}
function fun_cancelWithoutConfim() {
    var FDName = window.localStorage.getItem("FDName");
    if (FDName == "ORDS") {
        if ($("#p-vrno").text() != "") {
            Clear_OrderDetail();
            homePage();            
        }
        else {
            //$("#div-After-save").popup("close");
        }
    }
    else if (FDName == "SALE") {
        if ($("#p-Invoicevrno").text() != "") {
            Clear_SaleDetail();
            homePage();
           
        } else {
            $("#div-After-InvoiceSave").popup("close");
        }
    }
    else if (FDName == "MNRC") {
        clear_ReceiptDetail();
    }
    else {
        if ($("#p-InvoiceWvrno").text() != "") {
            Clear_WSaleDetail();
            homePage();

        } else {
            $("#div-After-InvoiceWSave").popup("close");
        }
    }
   
}


function Close_div_party()
{
    $("#div-party").popup("close");
}

function SetInvoiceDtl()
{
    $("#d-lbl-salerep").text(localStorage.getItem("LoginUserName"));
    var FDName = window.localStorage.getItem("FDName");
    var Ser;
    var Pcode;
    var tmpVrno;
    if (FDName == "ORDS") {
        $('#d-lbl-area').text($('#area-srch').val());
        $('#d-lbl-party').text($('#txtOrderParty').val());
        
        $("#ImgDiv").show();
        var smallImage = document.getElementById('sel_image');
        document.getElementById('Img15').src = smallImage.src;
    }
    else if (FDName == "SALE" || FDName == "WSAL") {
        $("#ImgDiv").hide();
        if (FDName == "SALE")
        {
            tmpVrno = window.localStorage.getItem("TmpVRnoSALE");
            Ser = window.localStorage.getItem("sr_R");
            Pcode = localStorage.getItem("pcodeSale");
            $('#d-lbl-party').text($('#txt-party-pa').val());
        } else {
            $("#d-lbl-salerep").text(localStorage.getItem("LoginUserName"));
            tmpVrno = window.localStorage.getItem("TmpVRnoWSAl");
            Ser = window.localStorage.getItem("sr_W");
            Pcode = localStorage.getItem("pcodeWsale");
            $('#d-lbl-party').text($('#party-srch').val());
        }
        
        
        var WebSerUrl = localStorage.getItem("APIURL");
        var SaveUrl = WebSerUrl + "/Product/GetSaleInfo?tempvrno=" + tmpVrno + "&FDName=" + FDName + "&Ser=" + Ser + "&Pcode=" + Pcode;
        $.ajax({
            url: SaveUrl,
            type: "GET",
            dataType: 'json',
            processData: true,
            success: function (data) {
                $("#Inv-det").html("");
                if (FDName == "SALE") {
                    $("#Inv-det").append("   <p>Party Name</p>" +
               " <a data-rel='close'><label >" + $('#txt-party-pa').val() + "</label></a>" +
               " <p>Patient Name</p>" +
               " <a data-rel='close' ><label >" + $('#pn-name').val() + "</label></a>" +
                "<p>Doctor Name</p>" +
               " <a data-rel='close' ><label >" + $('#dr-name').val() + "</label></a>" +
               " <p>Cart Details</p>" +
               " <a href='#Item-cart' data-transition='flip'><label >Total Item : " + data.cnt + "</label></a>" +
               " <p>Gross Amount</p>" +
                "<span> <img src='assets/img/rupee.png' alt='Rs' class='rupes' /> </span><span class='amt-color' >" + data.GrossAmt + "</span>" +
                "<p>Net Amount</p>" +
               " <span> <img src='assets/img/rupee.png' alt='Rs' class='rupes' /> </span><span class='amt-color' >" + data.NetAmt + "</span>"
           );
                }
                else {
                    $("#Inv-det").append("   <p>Party Name</p>" +
               " <a data-rel='close'><label >" + $('#party-srch').val() + "</label></a>" +
               " <p>Cart Details</p>" +
               " <a href='#Item-cart' data-transition='flip'><label >Total Item : " + data.cnt + "</label></a>" +
               " <p>Gross Amount</p>" +
                "<span> <img src='assets/img/rupee.png' alt='Rs' class='rupes' /> </span><span class='amt-color' >" + data.GrossAmt + "</span>" +
                "<p>Net Amount</p>" +
               " <span> <img src='assets/img/rupee.png' alt='Rs' class='rupes' /> </span><span class='amt-color' >" + data.NetAmt + "</span>"
           );
                }
            },
            error: function (event) {
            }
        })
    }
    else {

    }
}

function show_PartyWin()
{
    var FDName = window.localStorage.getItem("FDName");
    if (FDName == "ORDS") {
        window.location.href = "#divOrderParty";
    }
    else if (FDName == "SALE") {
        window.location.href = "#PTDR-Info-Search";
    }
    else {
        window.location.href = "#Party-Info-Search";
    }
}


function GetPartyReceiptData(v) {
    $("#VrAmt").text("0.00");
    $("#AlAmt").text("0.00");
    $("#UnlAmt").text("0.00");
    $("#BalAmt").text("0.00");
    $("#AdjAmt").text("0.00");
    $("#RemAmt").text("0.00");
    if ($("#chlselAllRcp").prop("checked")) {
        $("#lblchlselAllRcp").removeClass("ui-checkbox-on");
        $("#lblchlselAllRcp").addClass("ui-checkbox-off");
    }
    if (v == '1') {
        $("#Rcpttxtamt1").val(Number($("#Rcpttxtamt").val()).toFixed(2));
    } else {
        $("#Rcpttxtamt").val(Number($("#Rcpttxtamt1").val()).toFixed(2));
    }
    $("#VrAmt").text($("#Rcpttxtamt").val());
    var   totVrAmt = 0;
    loadmsg = "Loading Data..";
    RemAmt = $("#Rcpttxtamt").val();
    var fdname = localStorage.getItem("FDName");
    var ser;
    if (fdname == "MNRC") {
        ser = localStorage.getItem("sr_rcpt");
    } else {
        ser = localStorage.getItem("sr_pay");
    }
    
    var pcode = localStorage.getItem("ReceiptPcode");
    if (pcode == null || pcode == "") {
        alert("Please Select Party!!!");
        window.location.href = "#Receipt-part1";
        $("#rcptPCode").focus();
    }
    else {
        $(".show-page-loading-msg").click();
        WebSerUrl = localStorage.getItem("APIURL");
        WebSerUrl = WebSerUrl + "/product/GetPartyRcptData?pcode=" + pcode + "&fdname=" + fdname + "&Ser=" + ser;
        
        $.ajax({
            url: WebSerUrl,
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                try {
                    $(".hide-page-loading-msg").click();
                    $("#ulpartyRcpt").html("");
                    VrRcptCount = data.length;
                    for (var i = 0; i < data.length ; i++) {
                        $("#ulpartyRcpt").append(
                            "<li  class='ui-first-child ui-last-child' >" +
                            "<div id='div" + i + "' class='ui-checkbox' style='width:40px;float:right' ><label style='padding:18px;' id='lbl" + i + "' ><input type='checkbox' id='chk" + i + "' onclick=AllocateAmt(" + i + ") ></label></div>" +
                            "<a href='#'  class='ui-btn'>" +
                            "<p style='color:#137ab0;font-weight:bold;display:inline' id='pvrnoslno" + i + "'>" + data[i].AcVrNo + " - " + data[i].AcSlno + "</p>" +
                            "<p style='background-color:#137ab0;color:white;padding:3px;font-weight:lighter;float:right;'>" + data[i].amount.toFixed(2) + "</p>" +
                            "<label style='margin-top:-4px;'>" + data[i].vrdate1 + "</label>" +
                            "<p style='font-weight:bold;margin-top:-3px'>DocNo: " + data[i].DocNo + " (" + data[i].DocDate1 + ")</p>" +
                            "<p id='pBalAmt" + i + "' style='font-weight:bold;'> BalAmt: " + data[i].BalAmt.toFixed(2) + "</p>" +
                            "<div style='width:20vw;margin-top:-34px;margin-right:10px;float:right  '>" +
                            "<input type='number' onClick='this.setSelectionRange(0, this.value.length)'  id='txtadjAmt" + i + "' onkeyup='chkAdjAmt(" + i + ")' onblur='CalAllocateAmt()' style='width:100%;padding:5px;' class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset' value=" + data[i].AdjAmt.toFixed(2) + " />" +
                            "<p style='font-weight:bold;margin-top:-4px;float:right' id='pRemAmt" + i + "'> RemAmt: " + data[i].RemAmt.toFixed(2) + " </p>" +
                            "</div>" +
                            "<label style='white-space:normal;font-weight:normal'> Narr1: " + data[i].narr1 + " </label>" +
                            "</a>" +
                            "</li>"
                            );
                        $("#lbl" + i).addClass('ui-btn');
                        $("#lbl" + i).addClass('ui-corner-all');
                        $("#lbl" + i).addClass('ui-btn-inherit');
                        $("#lbl" + i).addClass('ui-btn-icon-left');
                        $("#lbl" + i).addClass('ui-checkbox-off');
                        totVrAmt = Number(totVrAmt) + Number(data[i].BalAmt.toFixed(2));
                    }
                    if (data.length <= 0) {
                        $("#ulpartyRcpt").append(
                        "<p style='background-color:#1390cf;color:white;padding:8px;font-weight:lighter;font-weight:bold'>No Data Available</p>"
                        );
                    }
                    $("#BalAmt").text(totVrAmt.toFixed(2));
                }
                catch (e) {
                    alert(e.message);
                }
            },
            //if any error occure
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                $(".hide-page-loading-msg").click();
                if (xmlHttpRequest.responseText == "") {
                    ServiceStopMsg();
                }
                else {
                    alert(xmlHttpRequest.responseText);
                }
            }
        })
    }
}

function SaveRcpt(val) {
    var Pcode = localStorage.getItem("ReceiptPcode");
    if (Pcode == null || Pcode == "") {
        alert("Please Select Party!!!");
    }
    else {
        var Vramt = $("#Rcpttxtamt").val();
        if (Vramt == "" || Vramt == null) {
            alert("Please Enter Amount!!!");
        }
        else {
            //if (VrRcptCount == 0 || VrRcptCount == '' || VrRcptCount == null) {
            //    alert("No Credit Vr Found For Party " + $('#rcptPCode').val() + " !!!");
            //}
            //else {
            var valid = '1';
                var TotAdjAlAmt = $("#AlAmt").text();
                if (TotAdjAlAmt == "" || TotAdjAlAmt == "0.00" || TotAdjAlAmt == null) {
                    if (VrRcptCount == 0 || VrRcptCount == '' || VrRcptCount == null) {
                        valid = '1';
                    }
                    else {
                        valid = '0';
                        alert("Plaese Allocate Some Amount !!!");
                    }
                }
                if (valid=='1')
                 {
                    var WebSerUrl = localStorage.getItem("APIURL");
                    WebSerUrl = WebSerUrl + "/Product/SaveRPVr";
                    loadmsg = "Please Wait..";
                    $(".show-page-loading-msg").click();
                    $.ajax({
                        url: WebSerUrl,
                        type: "post",
                        data: getDataForReceipt(),
                        dataType: 'json',
                        processData: true,
                        success: function (data) {
                            $(".hide-page-loading-msg").click();
                            OnSaveSuccessReceipt(data);
                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            $(".hide-page-loading-msg").click();
                            if (xmlHttpRequest.responseText == "") {
                                ServiceStopMsg();
                            } else {
                                alert(xmlHttpRequest.responseText);
                            }
                        }
                    });
                }
           // }
        }
    }
}

function OnSaveSuccessReceipt(data) {
    try {
        $("#vr-detail1").hide();
        $("#vr-detail").show();
        window.location.href = "#Vrdetail";
        $("#vr-detail").html("<div style='width:100%' ><center > <label style='padding-top:5px;font-weight:bold;text-decoration:underline'>   RECEIPT VOUCHER </label> </center> <table><tr style='background-color:white;padding-left:10px;padding-right:10px;color:#137ab0;font-weight:bold;' > <td style='float:left'><label style=''>" + data.AcVrNo + "</label></td>                                <td></td>                                <td ><label style=''>Date: " + data.VrNo + "</label></td>                            </tr>                            <tr style='background-color:white;padding-left:10px;padding-right:10px;'>                                <td style='float:left'><label>Through: " + $("#selacCode").val() + "</label> </td>                                <td></td>                                <td style='float:right'> <label>UserId: " + localStorage.getItem("LoginUserName") + "</label></td>                            </tr>                            <tr>                                <td colspan='3'>                                    <table class='recptTable'>                                                                              <tr>                                                                                        <td colspan='2'><center><label> " + $("#rcptPCode").val() + "</label></center></td>                                        </tr>                                                                                <tr>                                            <td colspan='2'>                                                <Center>                   <div id='ritem'></div>                                 </Center>                                            </td>                                        </tr>                                        <tr>                                            <td colspan='2'><label>Narration1: " + $("#narr1").val() + "</label></td>                                        </tr>                                         <tr>                                            <td colspan='2'><label id='cheNo'>Check No: " + $("#RcptdocNumber").val() + "</label></td>                                        </tr>                                        <tr class='recptTableHead'>                                            <td colspan='2'><label>Amount :Rs " + $("#Rcpttxtamt1").val() + "</label></td>                                        </tr>                                    </table>                                </td>                            </tr>                </table>            </div>");
        $("#ritem").html("   <table  class='CSSTableGenerator' >  <tr class='recptTableHead'>   <td>VrNo</td>     <td>Date</td>                                                        <td>Amt</td>                                                 <td>BalAmt</td>   </tr>    ");
        for (var i = 0; i < data.VrItem.length ; i++) {
            $("#ritem tr:last").after(" <tr><td>" + data.VrItem[i].DrVrNo + "</td><td>" + data.VrItem[i].dt + "</td><td style='text-align:right'>" + data.VrItem[i].AdjAmt + "</td><td style='text-align:right'>" + data.VrItem[i].BalAmt + "</td></tr></table>");
        }
        if ($("#selDoc").val() == "B") {
            $("#cheNo").show();
        } else {
            $("#cheNo").hide();
        }
        clear_ReceiptDetail();
    }
    catch (e) {
        alert(e.message);
    }
}

function GetInsDetailParty() {
    
    var WebSerUrl = localStorage.getItem("APIURL");
    WebSerUrl = WebSerUrl + "/Product/LoadDataFromTMPAV?Pcode=" + localStorage.getItem("ReceiptPcode");
    $.ajax({
        url: WebSerUrl,
        type: "get",
        dataType: 'json',
        processData: true,
        success: function (data) {
            if (data != null) {               
                localStorage.setItem("docno", data.docno);
                localStorage.setItem("accode", data.accode);
                localStorage.setItem("codedesc", data.codedesc);
                localStorage.setItem("Banker", data.Banker);
                localStorage.setItem("Branch", data.Branch);
                $("#RcptBranch").val(data.Branch);
                $("#RcptBank").val(data.Banker);
                $("#RcptdocNumber").val(data.docno);
               
                localStorage.setItem("doc", data.doc);
                if (data.doc == null || data.doc == "" || data.doc == "null") {
                    data.doc = "Cash Voucher";
                }
                $("#pdocRec").text(data.doc);
                if (data.doc.toUpperCase() == "CHEQUE") {
                    $("#selDoc").val("B").change();
                } else {
                    $("#selDoc").val("H").change();
                }
                GetAccCode();
                if ($("#selDoc").val() == "B") {
                    if (localStorage.getItem("accode") != "") {
                        $("#selacCode").val(localStorage.getItem("accode")).change();
                    }
                }
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {            
        }
    });
}

function getDataForReceipt() {
    $(".hide-page-loading-msg").click();
    loadmsg = "Collecting Data..";
    $(".show-page-loading-msg").click();
    var pcode = localStorage.getItem("ReceiptPcode");
    var Fdname = localStorage.getItem("FDName");
    var series;
    var DrCr;
    if (Fdname == "MNRC") {
        series = window.localStorage.getItem("sr_rcpt");
        DrCr = "C";
    }
    else {
        series = window.localStorage.getItem("sr_pay");
        DrCr = "D";
    }
    var ACCode =  $("#selacCode").val();
    var Narr1=$("#narr1").val();
    var Narr2 = $("#narr2").val();
    var VrAmt=$("#Rcpttxtamt").val();
    var Type = $("#selDoc").val();
    var doc = localStorage.getItem("doc");
    var DocNo=$("#RcptdocNumber").val();
    var BANKERS1 = $("#RcptBank").val();
    var BANKERS2 = $("#RcptBranch").val();
    if (Type == "B") {
        Type = "Q";
    }
    else {
        Type = "C";
    }
    var VrItem = GetRctPartyVr();
    var data = {
        "VrUserID": localStorage.getItem("LoginUser"),
        "VrType": Type,
        "trcode": Fdname,
        "Series": series,
        "Pcode": pcode,
        "ACCode": ACCode,
        "VrAmt": VrAmt,
        "Narr1": Narr1,
        "Narr2": Narr2,
        "VrItem": VrItem,
        "doc": doc,
        "DocNo": DocNo,
        "BANKERS1": BANKERS1,
        "BANKERS2": BANKERS2,
        "DrCr": DrCr
    };
    return data;
}

function GetRctPartyVr() {
    var DrVrNo, DrSlNo, AdjAmt, BalAmt, RemAmt;
    var list = new Array();
    localStorage.setItem("arrayRptVr", "");
    for(i = 0; i <= VrRcptCount; i++) {
        DrVrNo = $("#pvrnoslno" + i).text().split(" - ")[0];
        DrSlNo = $("#pvrnoslno" + i).text().split(" - ")[1];
        AdjAmt = $("#txtadjAmt" + i).val();
        BalAmt = $("#pBalAmt" + i).text().replace("BalAmt:", "").trim();
        RemAmt = $("#pRemAmt" + i).text().replace("RemAmt:", "").trim();
        var data = {
            "PCODE": localStorage.getItem("ReceiptPcode"),
            "DrVrNo": DrVrNo,
            "DrSlNo": DrSlNo,
            "AdjAmt": AdjAmt,
            "BalAmt": BalAmt,
            "RemAmt": RemAmt
        };
        list.push(data);
    }
    $(".hide-page-loading-msg").click();
    loadmsg = "Saving Data..";
    $(".show-page-loading-msg").click();
    return list;
}



function SelectAllRcpt(val) {
    
    try{
        for (var i = 0; i < VrRcptCount ; i++) {
            if (val == '1') {
                $("#chk" + i).prop("checked", true);
            } else {
                $("#chk" + i).prop("checked", false);
            }
            AllocateAmt(i)
        }
    } catch (e) {
        alert(e.message);
    }
}

function chkAdjAmt(id) {
    setAdjAmt(id,'1');
}

function AllocateAmt(id) {
   
    if ($("#chk" + id).prop("checked") == true) {
        setAdjAmt(id,'0');
    }
    else if ($("#chk" + id).prop("checked") == false) {
        $("#txtadjAmt" + id).val("0.00");
        $("#pRemAmt" + id).text("RemAmt: " + ($("#pBalAmt" + id).text().replace("BalAmt:", "").trim()));
        SetVrAmtTable();
    }
}

function SelectAllRcptVr() {
    
    if ($("#chlselAllRcp").prop("checked") == true) {
        SelectAllRcpt('1')
    }
    else if ($("#chlselAllRcp").prop("checked") == false) {
        SelectAllRcpt('0')
    }
}

function CalAllocateAmt() {
    try{
        $("#AlAmt").text(GetTotalAdjAmt());
    } catch (e) {
        alert(e.message);
    }
}

function setAdjAmt(id, val) {
    try {
        
        var VrAmt = $("#Rcpttxtamt1").val();
        var TotalAdjAmt = GetTotalAdjAmt();
        var TotalAdjAmtNew = TotalAdjAmt - $("#txtadjAmt" + id).val();
        var RemAmt = VrAmt - TotalAdjAmtNew;
        var adjAmt = $("#txtadjAmt" + id).val();
        var balAmt = $("#pBalAmt" + id).text().replace("BalAmt:", "").trim();
        if (Number(adjAmt) > Number(balAmt)) {
            if (Number(balAmt) > Number(RemAmt)) {
                $("#txtadjAmt" + id).val(RemAmt);
            } else {
                $("#txtadjAmt" + id).val(balAmt);
            }
        }
        else {
            if (Number(adjAmt) > Number(RemAmt)) {
                $("#txtadjAmt" + id).val(RemAmt);
            } else {
                if (val == '1') {
                    $("#txtadjAmt" + id).val(adjAmt);
                }
                else {
                    if (Number(balAmt) > Number(RemAmt)) {
                        if (Number(RemAmt) < Number(adjAmt)) { $("#txtadjAmt" + id).val(RemAmt); }
                        else {
                            if (Number(adjAmt) == 0) {
                                $("#txtadjAmt" + id).val(RemAmt);
                            }
                            else {
                                $("#txtadjAmt" + id).val(adjAmt);
                            }
                        }
                    } else {
                        if (Number(balAmt) < Number(adjAmt)) { $("#txtadjAmt" + id).val(balAmt); }
                        else {
                            if (Number(adjAmt) == 0) {
                                $("#txtadjAmt" + id).val(balAmt);
                            }
                            else {
                                $("#txtadjAmt" + id).val(adjAmt);
                            }
                        }
                    }
                }
            }
        }
        if (Number($("#txtadjAmt" + id).val()) == 0) {            
            $("#lblNoRcptAmt").show();
            $("#chk" + id).prop("checked", false);            
            var abc1 = setInterval(                
                function abc() {
                    clearInterval(abc1);
                    $("#lblNoRcptAmt").hide();
                }, 3000);
        }
        //$("#txtadjAmt" + id).val(Number($("#txtadjAmt" + id).val()).toFixed(2));
        $("#pRemAmt" + id).text("RemAmt: "+ (Number(balAmt)- Number($("#txtadjAmt" + id).val())).toFixed(2));
        SetVrAmtTable();
    }
    catch (e) {
        alert(e.message);
    }
}

function SetVrAmtTable() {
    var NewAlocateTotal = GetTotalAdjAmt();
    $("#AlAmt").text(NewAlocateTotal);
    $("#AdjAmt").text(NewAlocateTotal);
    var NewBalAme = $("#BalAmt").text();
    var NewVrAmt = $("#VrAmt").text();
    var NewRemAmt = Number(NewBalAme) - Number(NewAlocateTotal);
    var NewUnAlAmt = Number(NewVrAmt) - Number(NewAlocateTotal);
    $("#RemAmt").text(NewRemAmt.toFixed(2));
    $("#UnlAmt").text(NewUnAlAmt.toFixed(2));
}

function GetTotalAdjAmt() {
    var values = $('input[id^="txtadjAmt"]').map(function () {
        return this.value
    }).get()
    var ValArr = values.toString().split(',');
    var AllocateAmtTotal = 0;
    for (var i = 0; i <= ValArr.length - 1; i++) {
        AllocateAmtTotal = Number(AllocateAmtTotal) + Number(ValArr[i]);
    }
    return AllocateAmtTotal.toFixed(2);
}

function GetAccCode() {
    var Type = $("#selDoc").val();
    if (Type == "B") {
        $("#chkdtl").slideDown();
        $("#pdocRec").text("Cheque");
    } else {
        $("#chkdtl").slideUp();
        $("#pdocRec").text("Cash Voucher");
    }
    WebSerUrl = localStorage.getItem("APIURL");
    $.ajax({
        url: WebSerUrl + "/Order/GetAcCode?name=&Type=" + Type + "",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            $('#selacCode').empty();
            var select = document.getElementById('selacCode');
            for (var i = 0; i <= data.length - 1; i++) {
                var opt = document.createElement('option');
                opt.value = data[i].PCODE;
                opt.innerHTML = data[i].PCODE + ":" + data[i].PNAME;
                opt.style.background = 'white';
                select.appendChild(opt);
            }                
            $("#selacCode").selectmenu("refresh", true);
        },
        //if any error occure
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            $(".hide-page-loading-msg").click();
            ServiceStopMsg();
        }
    })
}


    function GetSereisList() {
        WebSerUrl = localStorage.getItem("APIURL");
        $.ajax({
            url: WebSerUrl + "/Order/GetSer",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                $('#menuO').empty();
                $('#menuOr').empty();
                $('#menuWs').empty();
                $('#menuSer').empty();
                $('#menurcpt').empty();
                $('#menupay').empty();

                if (data.length > 1) {
                    if (data[0].FDNAME == "SALE") {
                        select = document.getElementById('menuSer');
                        for (var i = 0; i <= data[0].vcli.length - 1; i++) {
                            var opt = document.createElement('option');
                            opt.value = data[0].vcli[i].SER;
                            opt.innerHTML = data[0].vcli[i].SER;
                            select.appendChild(opt);
                        }
                    }
                    if (data[1].FDNAME == "WSAL") {
                        select = document.getElementById('menuWs');
                        for (var i = 0; i <= data[1].vcli.length - 1; i++) {
                            var opt = document.createElement('option');
                            opt.value = data[1].vcli[i].SER;
                            opt.innerHTML = data[1].vcli[i].SER;
                            select.appendChild(opt);
                        }
                    }
                    if (data[2].FDNAME == "ORDS") {
                        select = document.getElementById('menuO');
                        if (data.length > 1) {
                            for (var i = 0; i <= data[2].vcli.length - 1; i++) {
                                var opt = document.createElement('option');
                                opt.value = data[2].vcli[i].SER;
                                opt.innerHTML = data[2].vcli[i].SER;
                                select.appendChild(opt);
                            }
                        }
                    }
                    if (data[3].FDNAME == "ORDR") {
                        select = document.getElementById('menuOr');
                        if (data.length > 1) {
                            for (var i = 0; i <= data[3].vcli.length - 1; i++) {
                                var opt = document.createElement('option');
                                opt.value = data[3].vcli[i].SER;
                                opt.innerHTML = data[3].vcli[i].SER;
                                select.appendChild(opt);
                            }
                        }
                    }
                    if (data[4].FDNAME == "MNRC") {
                        select = document.getElementById('menurcpt');
                        if (data.length > 1) {
                            for (var i = 0; i <= data[4].vcli.length - 1; i++) {
                                var opt = document.createElement('option');
                                opt.value = data[4].vcli[i].SER;
                                opt.innerHTML = data[4].vcli[i].SER;
                                select.appendChild(opt);
                            }
                        }
                    }
                    if (data[5].FDNAME == "MNPY") {
                        select = document.getElementById('menupay');
                        if (data.length > 1) {
                            for (var i = 0; i <= data[5].vcli.length - 1; i++) {
                                var opt = document.createElement('option');
                                opt.value = data[5].vcli[i].SER;
                                opt.innerHTML = data[5].vcli[i].SER;
                                select.appendChild(opt);
                            }
                        }
                    }

                    $("#menuOr").selectmenu("refresh", true);
                    $("#menuO").selectmenu("refresh", true);
                    $("#menuWs").selectmenu("refresh", true);
                    $("#menuSer").selectmenu("refresh", true);
                    $("#menurcpt").selectmenu("refresh", true);
                    $("#menupay").selectmenu("refresh", true);
                }
            },
            //if any error occure
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                $(".hide-page-loading-msg").click();
                ServiceStopMsg();
            }
        })
    }

    function SaveSer(e, v) {
        if (v == "SALE") {
            window.localStorage.setItem("sr_R", e.value);
        } else if (v == "WSAL") {
            window.localStorage.setItem("sr_W", e.value);
        } else if (v == "ORDS") {
            window.localStorage.setItem("sr_O", e.value);
        } else if (v == "ORDR") {
            window.localStorage.setItem("sr_Or", e.value);
        } else if (v == "MNRC") {
            window.localStorage.setItem("sr_rcpt", e.value);
        } else if (v == "MNPY") {
            window.localStorage.setItem("sr_pay", e.value);
        } else {
            window.localStorage.setItem("sr_R", $("#menuSer").val());
            window.localStorage.setItem("sr_W", $("#menuWs").val());
            window.localStorage.setItem("sr_O", $("#menuO").val());
            window.localStorage.setItem("sr_Or", $("#menuOr").val());
            window.localStorage.setItem("sr_rcpt", $("#menurcpt").val());
            window.localStorage.setItem("sr_pay", $("#menupay").val());
        }
    }
    function SaveOrderType(e) {
        if (e.value == "ORDR") {
            $("#divOrderPTDR").slideDown(1000);
        }
        else {
            $("#divOrderPTDR").slideUp(1000);
        }
        window.localStorage.setItem("ORDFDNAME", e.value);
    }
    function show_SaveWin() {
        var pt = $("#ordPatient").val();
        if (pt == "" && localStorage.getItem("ORDFDNAME")=="ORDR") {
            alert('Patient Name Required!!!');
        }
        else {
            $("#close_DivordType").click();
            setTimeout(function () {
                $("#id_ainvoice-item-btn2-body").click();
            }, 800);
        }
    }

    function SettingWind() {
        $("#menuSer").val(window.localStorage.getItem("sr_R"));
        $("#menuWs").val(window.localStorage.getItem("sr_W"));
        $("#menuO").val(window.localStorage.getItem("sr_O"));
        $("#menuOr").val(window.localStorage.getItem("sr_Or"));
        $("#menurcpt").val(window.localStorage.getItem("sr_rcpt"));
        $("#menupay").val(window.localStorage.getItem("sr_pay"));
        window.location.href = "#series_div";
    }
    var timerExitPrss;
    var CheckExitTime = '';
    function exitAppMenu() {
        CheckExitTime = '1';
        exitApp();
    }
    function exitApp() {
        try {
            //$("#li3").addClass('left');
        
            if (CheckExitTime == '') {
                $("#lblexit").show();
                CheckExitTime = '1';
                timerExitPrss = setInterval(function () {
                    $("#lblexit").hide();
                    CheckExitTime = '';
                    clearInterval(timerExitPrss);

                }, 2000);
            }
            else {
                clearInterval(timerExitPrss);
                Clear_OrderDetail();
                Clear_SaleDetail();
                Clear_WSaleDetail();
                logout();
                navigator.app.exitApp();
            }
        }
        catch (e) {
            alert(e.message);
        }

    }

    function BackButton() {
        $(".hide-page-loading-msg").click();
        var link = window.location.href.toString();
        var r = link.split('#');

        switch (r[1]) {
            case "page-con":
                exitApp();
                break;
            case "Vrdetail":
                if (localStorage.getItem("FDName") == "SALE") {
                    Retail_click();
                }
                else if (localStorage.getItem("FDName") == "WSAL") {
                    Wsale_Invoice();
                }
                else if (localStorage.getItem("FDName") == "MNRC") {
                    Receipt_click();
                }
                else if (localStorage.getItem("FDName") == "MNPY") {
                    Payment_click();
                }
                else {
                    Order_click();
                }
                break;
            case "Item-Info-Search":
                if (localStorage.getItem("FDName") == "SALE") {
                    window.location.href = "#page-con";
                }else {
                    window.location.href = "#Party-Info-Search";
                }
                break;
            case "Item-Info-Search-Body":
            case "Item-cart":
                window.location.href = "#Item-Info-Search";
                break;
            case "PTDR-Info-Search":
                window.location.href = "#Item-cart";
                break;
            case "Chng_batch":
            case "altITem":
                window.location.href = "#Item-Info-Search-Body";
                break;
            case "Party-Ldg":
            case "Party-Info-Search":
            case "MISRPT":
            case "appSetting-div":
            case "Payment":
            case "Receipt-part1":
                window.location.href = "#page-con";
                break;
            case "div-party-ldgr":
                if (localStorage.getItem("FDName") == "SALE") {
                    window.location.href = "#PTDR-Info-Search";
                }
                else if (localStorage.getItem("FDName") == "PLDG") {
                    window.location.href = "#Party-Ldg";
                } else if (localStorage.getItem("FDName") == "MNRC" || localStorage.getItem("FDName") == "MNPY") {
                    window.location.href = "#Receipt-part1";
                }
                else {
                    window.location.href = "#Party-Info-Search";
                }
                break;
            case "ImageSelect":
                window.location.href = "#divOrderParty";
                break;
            case "Receipt-part2":
                window.location.href = "#Receipt-part1";
                break;
            default:
                window.location.href = "#page-con";
                break;
        }

    }
    //function BackButton() {
    //    var link = window.location.href.toString();
    //    history.back(1);
    //    var r=link.split('#');
    //    if (r.length == 2 && r[1] == "page-con") {
    //        Clear_OrderDetail();
    //        Clear_SaleDetail();
    //        Clear_WSaleDetail();
    //        logout();
    //        navigator.app.exitApp();
    //    }
    //    else {
    //        if (r[1] == "Vrdetail") {
    //            if (localStorage.getItem("FDName") == "SALE") {
    //                Retail_click();
    //            }
    //            else if (localStorage.getItem("FDName") == "WSAL") {
    //                Wsale_Invoice();
    //            } else {
    //                Order_click();
    //            }
    //        }
    //        else {
    //            history.back(1);
    //        }
    //    }
    //}


    function NewBill() {
        if (localStorage.getItem("FDName") == "SALE") {
            Retail_click();
        }
        else if (localStorage.getItem("FDName") == "WSAL") {
            Wsale_Invoice();
        } else {
            Order_click();
        }
    }

    function CheckMono()
    {
        var Name = $("#txtRegName").val().trim();
        var MoNo = $("#txtMoNO").val().trim();
        var Address = $("#txtadd").val().trim();
        var Email = $("#txtemail").val().trim();

        if (Name == "") {
            textAnim('txtRegName', 'bounce');
        }
        if (MoNo == "") {
            textAnim('txtMoNO', 'bounce');
        }
        if (Address == "") {
            textAnim('txtadd', 'bounce');
        }
        if (Email == "") {
            textAnim('txtemail', 'bounce');
        }
        if (Name != "" && MoNo != "" && Address != "" && Email != "") {
            loadmsg = "Checking Mobile No.";
            $(".show-page-loading-msg").click();
       
            var MoNo = $("#txtMoNO").val();
            $.ajax({
                url: GBCServicePath + "/Values/CheckNo?Mo=" + MoNo,
                type: "GET",
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.indexOf("$") == 0) {
                        alert(data);
                        $(".hide-page-loading-msg").click();
                        $("#txtMoNO").focus();
                    }
                    else if (data == "@") {
                        alert("Mobile No AlReady Registered.");
                        $(".hide-page-loading-msg").click();
                    }
                    else {
                        $(".hide-page-loading-msg").click();
                        loadmsg = "Sending OTP.";
                        $(".show-page-loading-msg").click();
                        randomNumberGenerate();
                        var no = sessionStorage.getItem("randomNo");
                        var msg = "Hi! Welcome to TiaERP@App. Your OTP no is " + no;
                        $.ajax({
                            url: GBCServicePath + "/Values/GetSMSUrl?mono=" + MoNo + "&msg=" + msg,
                            type: "GET",
                            dataType: "json",
                            cache: false,
                            success: function (data) {
                                if (data == "1") {
                                    localStorage.setItem("OTP", localStorage.getItem("randomNo"));
                                    window.location.href = "#GetOTP";
                                    $("#GetUserPass").slideUp();
                                }
                                $(".hide-page-loading-msg").click();
                            },
                            error: function (xmlHttpRequest, textStatus, errorThrown) {
                                alert(textStatus);
                                $(".hide-page-loading-msg").click();
                            }
                        })
                    }
                },
                //if any error occure
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    $(".hide-page-loading-msg").click();
                    alert(errorThrown);
                }
            })
        }
    }

    //generate rando number
    function randomNumberGenerate() {
        var rand_no = Math.floor(Math.random() * 900000) + 100000;
        rand_no = parseInt(rand_no);
        localStorage.setItem("randomNo", rand_no);
    }

    function CheckOTP() {
        var OTP = $("#txtotp").val().trim();
        if (OTP == "") {
            textAnim('txtotp', 'bounce');
        }
        else {
            if (OTP == localStorage.getItem("OTP")) {
                $("#divOTP").slideUp();
                $("#GetUserPass").slideDown();
            }
            else {
                alert("Incorrect OTP");
            }
        }
    }

    function Register() {
        var Pass = $("#txtpass").val();
        var RePass = $("#txtrepass").val();
        if (Pass == "") {
            textAnim('txtpass', 'bounce');
        }
        if (RePass == "") {
            textAnim('txtrepass', 'bounce');
        }
        if (Pass != "" && RePass != "") {
            if (Pass == RePass) {
                var Name = $("#txtRegName").val();
                var MoNo = $("#txtMoNO").val();
                var Address = $("#txtadd").val();
                var Email = $("#txtemail").val();
                $.ajax({
                    url: GBCServicePath + "/Values/RegisterCustmoer?name=" + Name + "&Add=" + Address + "&email=" + Email + "&phone=" + MoNo + "&Pass=" + Pass,
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.indexOf("$") == 0) {
                            alert(data);
                        }
                        else {
                            window.location.href = "#page-con";
                            alert("Succeccfully Registered");
                            alert("Your Userd " + data);
                            localStorage.setItem("ClientCode", data);
                            localStorage.setItem("GBCUserID", data);
                            localStorage.setItem("GBCPass", Pass);
                            localStorage.setItem("txtUsr", data);
                            localStorage.setItem("txtPass", Pass);
                            localStorage.setItem("ListFDNAME", "INV081,ACC021");
                            localStorage.setItem("PType", "C");
                            window.localStorage.setItem("GbcLogin", "1");
                            window.location.reload();
                        }
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        alert(textStatus);
                        $(".hide-page-loading-msg").click();
                    }
                })
            }
            else {
                alert("Password Not Match!!!");
            }
        }
    }

   

    $(document).ready(function () {
    
        $("#txtMoNO").keydown(function (e) {
            if ($("#txtMoNO").val().length >= 10) {           
                var charCode = (e.which) ? e.which : event.keyCode            
                // alert(charCode)
                if (charCode != 8) {
                    e.preventDefault();
                }
                // return false;
            }    });
        $("#txtRegName").blur(function (e) {
            if ($("#txtRegName").val().length <= 3) {
                alert("Enter Proper Name");
                $("#txtRegName").focus();
            }
        });
        $("#txtMoNO").blur(function (e) {
            if ($("#txtMoNO").val().length < 10) {
                alert("Enter Proper Mobile No");
                $("#txtMoNO").focus();
            }
        });
    });


    //////////////////Image 

    function clearCache() {
        navigator.camera.cleanup();
    }

    function onPhotoURISuccess(imageURI) {  ///////////
        window.location.href = "#ImageSelect";
        var smallImage = document.getElementById('sel_image');
        smallImage.src = imageURI;      
        localStorage.setItem("ImagePath", imageURI);
    }



    function onPhotoDataSuccess(imageURI) {  ///////////////
        window.location.href = "#ImageSelect";
        var smallImage = document.getElementById('sel_image');
        smallImage.src = imageURI;
        localStorage.setItem("ImagePath", imageURI);
        movePic(imageURI);
    }


    function capturePhotoEdit() { ///////////
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
            quality: 20,
            destinationType: destinationType.FILE_URI,
            // saveToPhotoAlbum: true
        });
    }

    function getPhoto(source) {  ////////////
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: source
        });
    }

    function onFail(message) {  ///////////
        alert('Failed because: ' + message);
    }


    function send(imageURI, fileName) {
        var imageName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        if (imageName.indexOf(".") > 0) {
            var a = imageName.split('.');
            fileName = fileName + "." + a[a.length - 1];
        }
        else {
            fileName = fileName + ".jpeg";
        }
        localStorage.setItem("VRNOName", fileName);
        movePic(imageURI);
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileName //imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers = {
            Connection: "close"
        }
        var params = {};
        params.value1 = "test";
        params.value2 = "param";
        options.params = params;
        var WebSerUrl = localStorage.getItem("APIURL");
        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(WebSerUrl + "/upload/Post"), win, fail, options);

    }

    function movePic(file) {
        window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
    }

    function resolveOnSuccess(entry) {
        var Vrno = localStorage.getItem("VRNOName");
        if (Vrno.indexOf("G") == 0) {
        } else {
            var d;
            var n;
            var newFileName;
            if (Vrno == "" || Vrno == null) {
                d = new Date();
                n = d.getTime();
                newFileName = n + ".jpg";
            } else {
                newFileName = Vrno;
            }
            var myFolderApp = FolderName;// "TiaERP@ConsumerApp";
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                fileSys.root.getDirectory(myFolderApp,
                                { create: true, exclusive: false },
                                function (directory) {
                                    entry.moveTo(directory, newFileName, successMove, resOnError);
                                },
                                resOnError);
            },
            resOnError);
        }
    }

    function successMove(entry) {
        var imgLoc = folderPath + entry.fullPath;
        //alert(imgLoc);
        localStorage.setItem("ImagePath", imgLoc);
    }

    function resOnError(error) {
        alert("Failed To Move Prescription In " + FolderName + " Folder" + error.code + error.source + error.target);
    }

    function win(r) {
        // alert("File Upload Successuful");
    }

    function fail(error) {
        alert("Failed To Send Prescription On Server " + error.code + error.source + error.target);
    }

    function Close_img() {
        var smallImage = document.getElementById('sel_image');
        smallImage.src = "assets/img/No_image.png";
        document.getElementById('Img15').src = "assets/img/No_image.png";
    }

    function FullSize() {
        var smallImage = document.getElementById('sel_image');
        window.open(smallImage.src, '_system', ' ');
    }
    //function movePic(imageData) {
    //    alert(imageData);
    //    alert("move pic");
    //    window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);
    //}

    //function resolveOnSuccess(entry) {
    //    alert("resolvetosuccess");
    //   // alert(fileSys);
    //    //new file name
    //    var newFileName = "123" + ".jpg";
    //    var myFolderApp = "ImgFolder";

    //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
    //        alert("folder create");
    //        alert(LocalFileSystem.PERSISTENT);
    //        //The folder is created if doesn't exist
    //        fileSys.root.getDirectory(myFolderApp,
    //            { create: true, exclusive: false },
    //            function (directory) {
    //                alert("move to file..");
    //                entry.moveTo(directory, newFileName, successMove, resOnError);
    //                alert("release");
    //                alert(directory);
    //                alert(newFileName);

    //            },
    //            resOnError);
    //    },
    //    resOnError);
    //}

    //function successMove(entry) {
    //    //I do my insert with "entry.fullPath" as for the path
    //    alert("success");
    //    //this is file path, customize your path
    //    alert(entry);
    //}

    //function resOnError(error) {
    //    alert("failed");
    //}


    function setCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    function MISReport() {
        window.location.href = "#MISRPT";
        $("#curDate").text("Current Date :"+ setCurrentDate());
        loadmsg = "Loading MIS Report";
        $(".show-page-loading-msg").click();
        var WebSerUrl = localStorage.getItem("APIURL");
        $.ajax({
            url: WebSerUrl + "/Values/GetMISReport",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                var a, b, c;
                $("#saledc").text("0");
                $("#saledt").text("0");
                $("#salemt").text("0")
                $(".hide-page-loading-msg").click();
                try{
                    for (var i = 0; i < data.length; i++) {
                        //data[i].INAME
                        if (data[i].TRCODE == "SALE" || data[i].TRCODE == "SISU" || data[i].TRCODE == "WSAL") {
                            a = +Number($("#saledc").text()) + +Number((data[i].CurCash == null) ? 0 : data[i].CurCash);
                            b = +Number($("#saledt").text()) + +Number((data[i].CurTot == null) ? 0 : data[i].CurTot);
                            c = +Number($("#salemt").text()) + +Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt);
                            $("#saledc").text(a.toFixed(2));
                            $("#saledt").text(b.toFixed(2));
                            $("#salemt").text(c.toFixed(2));
                        }
                        else if (data[i].TRCODE == "DMOW") {
                            $("#dmodc").text(Number((data[i].CurCash == null) ? 0 : data[i].CurCash).toFixed(2));
                            $("#dmodt").text(Number((data[i].CurTot == null) ? 0 : data[i].CurTot).toFixed(2));
                            $("#dmomt").text(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt).toFixed(2));
                        }
                        else if (data[i].TRCODE == "SRET") {
                            $("#salerdc").text(Number(Number((data[i].CurCash == null) ? 0 : data[i].CurCash) * -1).toFixed(2));
                            $("#salerdt").text(Number(Number((data[i].CurTot == null) ? 0 : data[i].CurTot)* -1).toFixed(2));
                            $("#salermt").text(Number(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt) * -1).toFixed(2));
                        }
                        else if (data[i].TRCODE == "PURC") {
                            $("#purcdc").text(Number((data[i].CurCash == null) ? 0 : data[i].CurCash).toFixed(2));
                            $("#purcdt").text(Number((data[i].CurTot == null) ? 0 : data[i].CurTot).toFixed(2));
                            $("#purcmt").text(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt).toFixed(2));
                        }
                        else if (data[i].TRCODE == "DMIW") {
                            $("#dmidc").text(Number((data[i].CurCash == null) ? 0 : data[i].CurCash).toFixed(2));
                            $("#dmidt").text(Number((data[i].CurTot == null) ? 0 : data[i].CurTot).toFixed(2));
                            $("#dmimt").text(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt).toFixed(2));
                        }
                        else if (data[i].TRCODE == "PRET") {
                            $("#purcrdc").text(Number(Number((data[i].CurCash == null) ? 0 : data[i].CurCash)* -1).toFixed(2));
                            $("#purcrdt").text(Number(Number((data[i].CurTot == null) ? 0 : data[i].CurTot)* -1).toFixed(2));
                            $("#purcrmt").text(Number(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt) * -1).toFixed(2));
                        }
                        else if (data[i].TRCODE == "MNRC") {
                            $("#recdc").text(Number((data[i].CurCash == null) ? 0 : data[i].CurCash).toFixed(2));
                            $("#recdt").text(Number((data[i].CurTot == null) ? 0 : data[i].CurTot).toFixed(2));
                            $("#recmt").text(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt).toFixed(2));
                        }
                        else if (data[i].TRCODE == "MNPY") {
                            $("#paydc").text(Number((data[i].CurCash == null) ? 0 : data[i].CurCash).toFixed(2));
                            $("#paydt").text(Number((data[i].CurTot == null) ? 0 : data[i].CurTot).toFixed(2));
                            $("#paymt").text(Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt).toFixed(2));
                        }
                        else if (data[i].TRCODE == "Stock") {
                            $("#misstk").text("Tentative MRP Stock: "+Number((data[i].TotAmt == null) ? 0 : data[i].TotAmt).toFixed(2));
                        }
                    }

                    $("#Tsaledc").text((+Number($("#saledc").text()) + +Number($("#dmodc").text()) + +Number($("#salerdc").text())).toFixed(2));
                    $("#Tsaledt").text((+Number($("#saledt").text()) + +Number($("#dmodt").text()) + +Number($("#salerdt").text())).toFixed(2));
                    $("#Tsalemt").text((+Number($("#salemt").text()) + +Number($("#dmomt").text()) + +Number($("#salermt").text())).toFixed(2));
                    $("#Tpurcdc").text((+Number($("#purcdc").text()) + +Number($("#dmidc").text()) + +Number($("#purcrdc").text())).toFixed(2));
                    $("#Tpurcdt").text((+Number($("#purcdt").text()) + +Number($("#dmidt").text()) + +Number($("#purcrdt").text())).toFixed(2));
                    $("#Tpurcmt").text((+Number($("#purcmt").text()) + +Number($("#dmimt").text()) + +Number($("#purcrmt").text())).toFixed(2));
                    $("#Fdc").text((+Number($("#Tsaledc").text()) - +Number($("#Tpurcdc").text()) + +Number($("#recdc").text()) - +Number($("#paydc").text())).toFixed(2));
                    $("#Fdt").text((+Number($("#Tsaledt").text()) - +Number($("#Tpurcdt").text()) + +Number($("#recdt").text()) - +Number($("#paydt").text())).toFixed(2));
                    $("#Fmt").text((+Number($("#Tsalemt").text()) - +Number($("#Tpurcmt").text()) + +Number($("#recmt").text()) - +Number($("#paymt").text())).toFixed(2));
                }
                catch (e) {
                    alert(e.message);
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                $(".hide-page-loading-msg").click();
                if (xmlHttpRequest.responseText == '{"Message":""}') {
                    ServiceStopMsg();
                } else {
                    alert(xmlHttpRequest.responseText);
                }
            }
        })
    }

    function LoadSaleReport() {
        localStorage.setItem("SALERPTPcode",'');
        localStorage.setItem("salerptPTname",'');
        window.location.href = "#saleRpt";
        document.getElementById("frmdt_saleR").valueAsDate = new Date(localStorage.getItem("startdt"));
        document.getElementById("todt_saleR").valueAsDate = new Date(localStorage.getItem("enddt"));
        SaleReport();
    }

    function SaleReport() {    
        loadmsg = "Loading Sale Report...";
        $(".show-page-loading-msg").click();
        var url = localStorage.getItem("APIURL");
        var frmdate = $("#frmdt_saleR").val();
        var todate = $("#todt_saleR").val();
        var pcode = localStorage.getItem("SALERPTPcode");
        var ptcode = localStorage.getItem("salerptPTname");
        var vrtype = $("#flip-chk-vrtype").val();
        url = url + "/Values/GetSaleRpt?fromdate=" + frmdate + "&Todate=" + todate + "&pcode=" + pcode + "&ptcode=" + ptcode + "&vrtype=" + vrtype;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                $(".hide-page-loading-msg").click();
                var itm = data;
                var Pcode;
                var LastPcode;
                var Ctot, Rtot;
                var count = 0;
                $("#saleRptBody").html("");
                $("#saleRptBody").append("<table  class='CSSTableGenerator' style='border-collapse:collapse;width:100%'><tr><td style='width:40px;'>VrNo</td><td>Patient</td><td>CAmt</td><td>RAmt</td></tr>");
                for (var i = 0; i < itm.length; i++) {
                    if (i == itm.length - 1) {
                        //$("#saleRptBody tr:last").after("<tr><td colspan='2' style='color:purple;font-weight:bold;'>" + itm[i].Vrno + "</td><td style='color:purple;font-weight:bold; text-align:right;width:40px;'>" + itm[i].cashAmt + "</td><td  style='color:purple;font-weight: bold; text-align:right;width:40px;'>" + itm[i].crAmt + "</td></tr></tbody>");
                        $("#saleRptBody tr:last").after("<tr><td colspan='2' style='color:purple;font-weight:bold;'>Group Total (" + count + ")</td><td style='color:purple;font-weight:bold; text-align:right;width:40px;'>" + Ctot.toFixed(2) + "</td><td  style='color:purple;font-weight: bold; text-align:right;width:40px;'>" + Rtot.toFixed(2) + "</td></tr></tbody>");
                    } else {
                        Pcode = itm[i].Pcode;                    
                        if (Pcode != LastPcode) {
                            LastPcode = Pcode;
                            if (count != 0) {
                                $("#saleRptBody tr:last").after("<tr><td colspan='2' style='color:purple;font-weight:bold;'>Group Total (" + count + ")</td><td style='color:purple;font-weight:bold; text-align:right;width:40px;'>" + Ctot.toFixed(2) + "</td><td  style='color:purple;font-weight: bold; text-align:right;width:40px;'>" + Rtot.toFixed(2) + "</td></tr></tbody>");
                            }
                            $("#saleRptBody tr:last").after("<tr><td colspan='4' style='color:purple;font-weight:bold;'>" + itm[i].Pcode + " : " + itm[i].Pname + "</td> </tr></tbody>");
                            count = 0;
                            Ctot = 0;
                            Rtot = 0;
                        }
                        $("#saleRptBody tr:last").after(
                            "<tr><td>" + itm[i].Vrno + "\n" + itm[i].Vrdt + "</td> <td>" + itm[i].NameP + "</td><td style='text-align: right;'>" + itm[i].cashAmt + "</td><td style='text-align: right;'>" + itm[i].crAmt + "</td></tr></tbody>");
                        Ctot = Ctot + +Number(itm[i].cashAmt);
                        Rtot = Rtot + +Number(itm[i].crAmt);
                        count = +Number(count) + 1;
                    }
                }
            },
            error: function (data) {
                $(".hide-page-loading-msg").click();
                if (data.responseText == '{"Message":""}') {
                    ServiceStopMsg();
                }
                else {
                    alert(data.responseText);
                }
            }
        });
    }

    function getStartEndDate() {
        var startdt;
        var enddt;
        WebSerUrl = localStorage.getItem("APIURL");
        $.ajax({
            url: WebSerUrl + "/Order/GetStartEndDate",
            type: "GET",
            cache: false,
            success: function (data) {
                var dt = data.split('%');
                startdt = dt[0];
                enddt = dt[1];
                localStorage.setItem("startdt", startdt);
                localStorage.setItem("enddt", enddt);
                document.getElementById("frmdt_saleR").valueAsDate = new Date(startdt);
                document.getElementById("todt_saleR").valueAsDate = new Date(enddt);
            },
            //if any error occure
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log('some error occured', textStatus, errorThrown);
            }

        });
    }

    function Button1_onclick() {
        var DeviceName = device.model;
        var Platform = device.platform;
        var UniqueID = device.uuid;
        var Version = device.version;
        navigator.notification.alert('Device Name : ' + DeviceName + '\n Platform : ' + Platform
       + '\n UUID : ' + UniqueID + '\n Version : ' + Version);
    }

    function GetDeviceNameId(val) {
        try{
            switch (val) {
                case "1":
                    return device.model;
                case "2":
                    return device.uuid;
                case "3":
                    return device.model + "(" + device.uuid + ")";
                default:
                    return "";
            }
        } catch (e) {
            return "1";
        }
    }

    (function ($) {
        function pageIsSelectmenuDialog(page) {
            var isDialog = false,
            id = page && page.attr("id");
            $(".filterable-select").each(function () {
                if ($(this).attr("id") + "-dialog" === id) {
                    isDialog = true;
                    return false;
                }
            });
            return isDialog;
        }
        $.mobile.document
    
        .on("selectmenucreate", ".filterable-select", function (event) {
            var input,
            selectmenu = $(event.target),
            list = $("#" + selectmenu.attr("id") + "-menu"),
            form = list.jqmData("filter-form");
        
            if (!form) {
                input = $("<input data-type='search'></input>");
                form = $("<form></form>").append(input);
                input.textinput();
                list
                .before(form)
                .jqmData("filter-form", form);
                form.jqmData("listview", list);
            }
       
            selectmenu
            .filterable({
                input: input,
                children: "> option[value]"
            })
       
            .on("filterablefilter", function () {
                selectmenu.selectmenu("refresh");
            });
        })
    
        .on("pagecontainerbeforeshow", function (event, data) {
            var listview, form;
       
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }
            listview = data.toPage.find("ul");
            form = listview.jqmData("filter-form");
      
            data.toPage.jqmData("listview", listview);
       
            listview.before(form);
        })
   
        .on("pagecontainerhide", function (event, data) {
            var listview, form;
        
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }
            listview = data.prevPage.jqmData("listview"),
            form = listview.jqmData("filter-form");
       
            listview.before(form);
        });
    })(jQuery);

    function checkMsg(a) {
        $("#lbl" + a).removeClass('ui-checkbox-off');
        $("#lbl" + a).addClass('ui-checkbox-on');
        $("#chk" + a).attr('data-cacheval', "false");
    }



    function ChangeFontsize() {
        var Size = $("#fontsize").val();
        if (Size == "8") {
            alert('8');
            document.getElementById("bodyFont").style.backgroundcolor = "red";
        }
        else {
            alert(Size);
        }
    }