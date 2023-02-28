function show() {
    // 获取文本框中的内容
    var text = document.getElementsByName("text")[0].value;
    // 获取DIV
    var show = document.getElementById("show");
    // 将文本框中的内容按行分割
    var lines = text.split("\n");
    // 将文本呈现在DIV > ul > li中
    var html = "<ul>";
    for (var i = 0; i < lines.length; i++) {
        html +=
            "<li onclick='play(\"" +
            lines[i] +
            "\")'><p>" +
            lines[i] +
            "</p><img src='play.svg'><span id='fanyi'></span></li>";
    }
    html += "</ul>";
    show.innerHTML = html;
    // 设置 li 的背景 为 background-image: var(--[01~12]); 避免重复
    var lis = document.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var index = Math.floor(Math.random() * 12) + 1;
        lis[i].style.backgroundImage = "var(--" + index + ")";
        // 自动触发翻译动作
        var p = lis[i].getElementsByTagName("p")[0];
        var fanyi = lis[i].getElementsByTagName("span")[0];
        (function (p, fanyi) {
            var text = p.innerHTML;
            var url =
                "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=" +
                text;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    var translation = response[0][0][0];
                    fanyi.innerHTML = translation;
                }
            };
            xhr.send();
        })(p, fanyi);
    }
}


function autoTranslate() {
    var lis = document.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var text = lis[i].getElementsByTagName("p")[0].innerHTML;
        var fanyi = lis[i].getElementsByTagName("span")[0];
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=" + text;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var translation = response[0][0][0];
                fanyi.innerHTML = translation;
            }
        };
        xhr.send();
    }
}
function play(text) {
    // 语音朗读
    // speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; // 将语速设置为0.8倍正常语速
    speechSynthesis.speak(utterance);
}
