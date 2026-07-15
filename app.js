// 신청목록.json 원본 데이터를 그대로 반영
// (배포 환경에서 별도 서버 요청 없이 바로 동작하도록 JS 배열로 내장)
const APPLICATIONS = [
  { name: "가람군", population: 30000, requested: 250000 },
  { name: "나봄시", population: 45000, requested: 500000 },
  { name: "다솔구", population: 80000, requested: 600000 },
  { name: "라윤시", population: 60000, requested: 700000 },
  { name: "마을군", population: 25000, requested: 200000 },
  { name: "바람시", population: 100000, requested: 950000 },
  { name: "사계구", population: 55000, requested: 600000 },
  { name: "아현시", population: 70000, requested: 650000 },
  { name: "자연군", population: 40000, requested: 380000 },
  { name: "차돌시", population: 90000, requested: 880000 },
];

// 심사 규칙: 한도액 = 인구수 x 10
// 신청액 > 한도액 -> 반려 / 신청액 <= 한도액 -> 승인
const LIMIT_MULTIPLIER = 10;

function judge(population, requested) {
  const limit = population * LIMIT_MULTIPLIER;
  const verdict = requested > limit ? "반려" : "승인";
  return { limit, verdict };
}

function formatWon(n) {
  return n.toLocaleString("ko-KR") + "원";
}

function render() {
  const results = APPLICATIONS.map((item) => {
    const { limit, verdict } = judge(item.population, item.requested);
    return { ...item, limit, verdict };
  });

  // 표 렌더링
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = results
    .map(
      (r) => `
      <tr>
        <td class="name">${r.name}</td>
        <td>${r.population.toLocaleString("ko-KR")}명</td>
        <td>${formatWon(r.requested)}</td>
        <td>${formatWon(r.limit)}</td>
        <td class="verdict">
          <span class="stamp ${r.verdict === "승인" ? "approve" : "reject"}">${r.verdict}</span>
        </td>
      </tr>`
    )
    .join("");

  // 요약 칩 렌더링
  const approveCount = results.filter((r) => r.verdict === "승인").length;
  const rejectCount = results.length - approveCount;

  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <span class="chip total">전체 ${results.length}건</span>
    <span class="chip approve">승인 ${approveCount}건</span>
    <span class="chip reject">반려 ${rejectCount}건</span>
  `;
}

document.addEventListener("DOMContentLoaded", render);
