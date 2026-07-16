// 응시자 작성 가이드: 조항데이터.json 을 fetch 해서 카드로 렌더링하고
// 검색어 입력 시 본문에 검색어가 포함된 조만 필터링해 보여주세요.
// 화면 우측 #count 영역에 현재 필터링된 결과 조 수를 표시해야 합니다.

let data = [];
fetch('조항데이터.json').then(r => r.json()).then(d => { data = d; render(d); });
const q = document.getElementById('q');
const list = document.getElementById('list');
const count = document.getElementById('count');
q.addEventListener('input', () => {
  const kw = q.value.trim();
  const filtered = kw ? data.filter(a => a.본문.includes(kw) || a.제목.includes(kw)) : data;
  render(filtered);
});
function render(arr) {
  count.textContent = `결과 ${arr.length}건`;
  list.innerHTML = arr.map(a => `
    <div class="card">
      <span class="label">${a.조}</span>
      <div class="title">${a.제목}</div>
      <div class="body">${a.본문.slice(0, 300)}${a.본문.length > 300 ? '…' : ''}</div>
    </div>`).join('');
}
