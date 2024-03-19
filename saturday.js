const scriptName = "test_bot";
const { Jsoup: Jsoup } = org.jsoup;
const _cmdArr = ["명령어", "날씨", "질문"];


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var cmd = msg.split(" ");

  if (msg == "/날씨") {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨").get();
    data = data.select("div.lcl_lst").get(0);
    data = data.select("a");
    var result = [];
    for (var n = 0; n < data.size(); n++) {
      result[n] = data.get(n).text();
    }
    replier.reply("[전국 날씨 정보]\n\n" + result.join("\n").replace(/도씨/g, "℃"));
  }

  if (cmd[0] == "/맛집") {
    cmd.shift();
    var data = Utils.parse("https://m.map.kakao.com/actions/searchView?q=" + cmd.join("%20") + "%20맛집")
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
  }

  if (cmd[0] == "/영화") {
    var str = "[영화 순위] \n\n";
    var data = org.jsoup.Jsoup.connect("https://ticket.maxmovie.com/reserve/movie").get().select(".tmplMovie > a") + "";
    data = data.replace(/<[^>]+>/g, "");
    data = data.split("\n");

    for (var idx = 0; idx < 10; idx++) {
      str += (idx + 1) + "위 : " + data[idx].trim() + "\n";
    }
    str = str.slice(0, -1);
    replier.reply(str);
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