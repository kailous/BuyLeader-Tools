function show() {
    addHeader();
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
            "</p><pw style='display:none;'>******</pw><img src='img/play.svg'><span id='fanyi'></span></li>";
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
        //执行完成后 执行showPw()方法
        showPw();
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
    // 获取#myRange的值并除以10，设置变量名称为 sudu
    var sudu = document.getElementById("sudu").value / 10;
    // 语音朗读
    var utterance = new SpeechSynthesisUtterance(text);
    // 设置语速
    utterance.rate = sudu;
    speechSynthesis.speak(utterance);
}
// 方法 gouxuan() 执行showPw()方法
function gouxuan() {
    showPw();
}

function addHeader() {
    var header = document.getElementsByTagName("header")[0];
    var label = header.getElementsByTagName("label");
    if (label.length == 0) {
        var header = document.getElementsByTagName("header")[0];
        var html =
            "<label class='switch'><span class='slider round'>听写模式</span><img id='onoff' src='img/on.svg' /><input type='checkbox' id='checkbox' onclick='gouxuan()'></label>";
        header.innerHTML += html;
    } else {
        return;
    }
}


// 判断 checkbox
// 如果选中，显示li>pw，隐藏li>p
// 如果未选中，显示li>p，隐藏li>pw
function showPw() {
    var checkbox = document.getElementById("checkbox");
    var lis = document.getElementsByTagName("li");
    if (checkbox.checked) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].getElementsByTagName("p")[0].style.display = "none";
            lis[i].getElementsByTagName("pw")[0].style.display = "block";
            // 隐藏textarea
            document.getElementsByName("text")[0].style.display = "none";
            // 修改 #start 颜色为灰色，删除 #start 的 onclick 事件
            document.getElementById("start").style.background = "gray";
            document.getElementById("start").removeAttribute("onclick");
            // 修改 #start 的内容为 "听写模式无法生成新的卡片"
            document.getElementById("start").innerHTML = "听写模式无法生成新的卡片";
            // 修改 #onoff 的 src为"off.svg"
            document.getElementById("onoff").src = "img/off.svg";
        }
    } else {
        for (var i = 0; i < lis.length; i++) {
            lis[i].getElementsByTagName("p")[0].style.display = "block";
            lis[i].getElementsByTagName("pw")[0].style.display = "none";
            // 显示textarea
            document.getElementsByName("text")[0].style.display = "block";
            // 恢复 #start 颜色 ，添加 #start 的 onclick 事件
            document.getElementById("start").style.background = "var(--botton-background";
            document.getElementById("start").setAttribute("onclick", "show()");
            // 恢复 #start 的内容为 "生成单词卡片"
            document.getElementById("start").innerHTML = "生成单词卡片";
            // 恢复 #onoff 的 src为"on.svg"
            document.getElementById("onoff").src = "img/on.svg";
        }
    }
}