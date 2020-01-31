var CHANNEL_ACCESS_TOKEN = "rl+DTHhZ8PyTgSFeeiD30an9Ts6VU1OP1v+VNuYfR1tyAT/muNfhmFgLioDvRND+N25Cma6vE9ijuIHvTasPukgEUefYQFy45rR+L941wbMNoginFfWT/+vA0WDWfddN0r99dHqfZhuFY5mqbffXygdB04t89/1O/w1cDnyilFU=";

var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();

// メイン処理。LINE botがユーザーからメッセージを受け取った時
function doPost(e) {
  getMessage(e)
}

function getMessage(e){
  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken = event.replyToken;
  if(typeof replyToken === 'undefined'){
    return;
  };
  var messageText = event.message.text;
  
  reply(replyToken, messageText)
}


// ラインにメッセージを返す処理。getMessage()関数からreplyMessageからreplyMessageを引き継ぎ呼び出される。
function reply(replyToken, messageText){

  var url = "https://api.line.me/v2/bot/message/reply";
  var message = {
    "replyToken" : replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : messageText //ラインに送られるメッセージ。replyMessageはgetMessage()関数での処理で決定する
      }
    ]
  };

  var options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(message)
  };

  UrlFetchApp.fetch(url, options)

}



//スプレッドシートにログを表示するためのもの
function outputLog(text){
  var sheetName = "logs";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), text]
  );
}

