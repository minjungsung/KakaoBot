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

}

function getNaverWeather(loc) {
  try {
    var url = Utils.parse("https://m.search.naver.com/search.naver?query=" + loc.replace(/ /g, "+") + "+날씨")
      .select("a.csm_more").attr("href");
    Log.i("url", url);
    var data = Utils.parse(url).select("ul.week_list > li");
    var result = [];
    var days = ["오늘", "내일", "모래", "글피"];
    for (var n = 0; n < days.length; n++) {
      var info = data.get(n).select("span");
      result[n] = "[" + days[n] + " 날씨]\n";
      result[n] += "상태 : " + info.get(2).attr("data-wetr-txt") + " -> ";
      result[n] += info.get(7).attr("data-wetr-txt") + "\n";
      result[n] += "강수확률 : " + info.get(4).ownText() + " -> ";
      result[n] += info.get(9).ownText() + "\n";
      var tmp = data.get(n).select("strong.temperature").select("span");
      tmp = (tmp.get(0).ownText() + " ~ " + tmp.get(3).ownText()).replace(/°/g, "℃");
      result[n] += "온도 : " + tmp;
      return result;
    }
  } catch (e) {
    Log.error(loc + "날씨 정보 뜯어오기 실패\n" + e);
    return null;
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