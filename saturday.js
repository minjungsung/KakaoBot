const scriptName = "test_bot";
const { Jsoup: Jsoup } = org.jsoup;
const _cmdArr = ["명령어", "날씨", "질문"];


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  // Split the message into command and additional message parts
  var parts = msg.split(" ");
  var apiCommand = parts[0];
  var additionalMsg = parts.slice(1).join(" ");

  // Check the command and call sendRequestToApi accordingly
  if (parts[0] == ".맛집") {
    parts.shift();
    var data = Utils.parse("https://m.map.kakao.com/actions/searchView?q=" + parts.join("%20") + "%20맛집")
      .select("li.search_item.base");
    var result = "[맛집 리스트]\n\n";
    for (var n = 0; n < data.size(); n++) {
      var datum = data.get(n);
      result += (n + 1) + ". " + datum.attr("data-title") + "\n";
      result += "주소 : " + datum.select("span.txt_g").text() + "\n";
      result += "지도 : https://place.map.kakao.com/m/" + datum.attr("data-id");
      if (n == 1) result += "\u200b".repeat(500);
      result += "\n\n";
    }
    replier.reply(result.trim());
  } else if (apiCommand[0] == ".") {
    var apiUrl = "https://kakao-bot-api-ten.vercel.app/api/command";
    sendRequestToApi(apiUrl, apiCommand, additionalMsg, replier, sender, room, isGroupChat);
  } else {
    var apiUrl = "https://kakao-bot-api-ten.vercel.app/api/chat";
    sendRequestToApi(apiUrl, apiCommand, additionalMsg, replier, sender, room, isGroupChat);
  }
}

function sendRequestToApi(apiUrl, apiCommand, additionalMsg, replier, sender, room, isGroupChat) {

  if (additionalMsg === undefined) {
    additionalMsg = '';
  }

  additionalMsg = additionalMsg.trim();
  var fullMsg = apiCommand;
  if (additionalMsg) {
    fullMsg += " " + additionalMsg;
  }

  var apiUrlWithParams = apiUrl + "?msg=" + encodeURIComponent(fullMsg) +
    "&sender=" + encodeURIComponent(sender) +
    "&room=" + encodeURIComponent(room) +
    "&isGroupChat=" + isGroupChat;

  try {
    var response = org.jsoup.Jsoup.connect(apiUrlWithParams)
      .ignoreContentType(true)
      .execute();
    var data = response.body();
    replier.reply(data);
  } catch (error) {
    replier.reply("Failed to process command: " + error.toString());
  }
}



/************** 자동생성코드 **************/

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) { }

function onResume(activity) { }

function onPause(activity) { }

function onStop(activity) { }