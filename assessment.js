'use strict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

function assessment(userName){
    //全ての文字を足し算する
    let userNameNumber= 0;
    for(let i = 0; i < userName.length; i++){
        userNameNumber += userName.charCodeAt(i);
    }
    let answerNumber = userNameNumber % answers.length;
    let result = answers[answerNumber];
    //result.replace(/\{userName}/g, userName); //置換
    return result.replace(/\{userName\}/g, userName);//診断結果
}


console.assert(assessment('次郎') === assessment('次郎'),
'同じ文字で同じ答えが出ていない'
    /**確認したいこと
    エラー時の出力内容 */);
    userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
      assessmentButton.onclick();
  }
};
    
    
    assessmentButton.onclick = function (){
    let userName = userNameInput.value;
    if(userName.length === 0){
        //　名前の入力がなかったら処理を中断
        return;
    }

    // すでにある診断結果をクリア
    while(resultDivided.firstChild){
        resultDivided.removeChild(resultDivided.firstChild);
    }

    // result-areaにh3タグで"診断結果"という文字を表示
    const h3 = document.createElement('h3'); // h3タグを作る
    h3.innerText = '診断結果'; // h3タグに診断結果の文字列を設定
    resultDivided.appendChild(h3); // result-areaにh3変数を設定
    // 診断処理を実行
    const result = assessment(userName);
    // pタグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    resultDivided.appendChild(p);

    while(tweetDivided.firstChild){
        tweetDivided.removeChild(tweetDivided.firstChild);
    }

    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    a.setAttribute('href', href);
    a.setAttribute('class','twitter-hashtag-button');
    a.setAttribute('data-text',result);
    a.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(a);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}
