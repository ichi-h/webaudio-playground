
console.log("いくで");
console.log("いくで");
// オーディオコンテキストを作成
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// オーディオバッファを保持する変数
let audioBuffer;

// サンプル数を指定して再生開始
async function playAudioLoop(audioUrl, startSample, endSample) {
  // オーディオファイルをロード
  if (!audioBuffer) {
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  }

  // 開始時間と終了時間（秒）を計算
  const sampleRate = audioBuffer.sampleRate;
  const startTime = startSample / sampleRate;
  const endTime = endSample / sampleRate;

  // ループ再生用にオーディオバッファソースを作成
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true;
  source.loopStart = startTime;
  source.loopEnd = endTime;

  // 出力先に接続して再生
  source.connect(audioContext.destination);
  source.start(0, startTime);

  console.log(`Looping from ${startTime.toFixed(3)}s to ${endTime.toFixed(3)}s.`);
}

// 使用例
// サンプル数 44100（1秒）から 88200（2秒）をループ再生
const audioUrl = 'アクアマリンに旅をして.mp3'; // 置き換えてください
playAudioLoop(audioUrl, 44100, 88200);

