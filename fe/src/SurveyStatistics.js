import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function SurveyStatistics({ setPage }) {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

  const pw = "1234";

  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);
  const handleClick = () => {
    // 현재 창에서 다운로드
    window.location.href = `${REACT_APP_BASE_URL}/api/survey/export/`;
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}/api/survey/statistics/`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStatistics(data);
      } else {
        setError("통계 데이터를 불러올 수 없습니다.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 색상 팔레트
  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  // 라벨 매핑
  const labelMap = {
    // 시간은행 인지
    yes: "예",
    no: "아니오",

    // 받고 싶은 도움
    learning: "배우기",
    labor: "일손",
    care: "돌봄",

    // 줄 수 있는 도움
    teaching: "가르치기",

    // 참여 시간
    "3months": "3개월에 1~2시간",
    "1month": "1개월에 1~2시간",
    "1week": "1주일에 1~2시간",

    // 지원 네트워크
    0: "없다",
    1: "1명",
    2: "2명",
    "3+": "3명 이상",

    // 참여 형태
    regular: "정기 모임",
    ondemand: "필요할 때만",
    online: "온라인 중심",
    unsure: "잘 모르겠다",

    // 기대 사항
    meeting: "새로운 만남",
    support: "안심",
    sharing: "재능 나눔",
    community: "공동체 분위기",

    // 연령대
    under30: "30세 미만",
    "30-50": "30~50세",
    "50-70": "50~70세",
    over70: "70세 이상",

    // 성별
    male: "남성",
    female: "여성",

    // 거주지
    jeongneung3: "정릉3동",
    other: "그 외 지역",
  };

  if (!login) {
    return (
      <PasswordPage
        pw={pw}
        password={password}
        setPassword={setPassword}
        setLogin={setLogin}
      />
    );
  }

  const getLabel = (key, fieldName) => {
    // 'other' 값인 경우 필드명에 따라 다른 레이블 반환
    if (key === "other") {
      if (fieldName === "residence") return "그 외 지역";
      return "기타";
    }
    return labelMap[key] || key;
  };

  const prepareChartData = (data, totalCount) => {
    if (!data || data.length === 0) return [];

    return data.map((item) => {
      const key = Object.keys(item).find((k) => k !== "count");
      const value = item[key];
      const count = item.count;
      const percentage = ((count / totalCount) * 100).toFixed(1);

      return {
        name: getLabel(value),
        value: count,
        percentage: percentage,
      };
    });
  };

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderChart = (title, data, description) => {
    if (!data || data.length === 0) {
      return (
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>{title}</h3>
          <p style={styles.noData}>데이터가 없습니다</p>
        </div>
      );
    }

    return (
      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>{title}</h3>
        {description && <p style={styles.chartDescription}>{description}</p>}

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value}명 (${props.payload.percentage}%)`,
                props.payload.name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div style={styles.statsGrid}>
          {data.map((item, index) => (
            <div key={index} style={styles.statItem}>
              <div
                style={{
                  ...styles.colorDot,
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <div style={styles.statText}>
                <span style={styles.statLabel}>{item.name}</span>
                <span style={styles.statValue}>
                  {item.value}명 ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: "#f9fafb",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "12px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#6b7280",
    },
    totalCount: {
      fontSize: "48px",
      fontWeight: "bold",
      color: "#3b82f6",
      marginTop: "20px",
    },
    totalLabel: {
      fontSize: "16px",
      color: "#6b7280",
      marginTop: "8px",
    },
    chartsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
      gap: "30px",
      marginTop: "30px",
    },
    chartCard: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    chartTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "8px",
    },
    chartDescription: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "20px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "12px",
      marginTop: "20px",
    },
    statItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
    },
    colorDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      marginRight: "12px",
      flexShrink: 0,
    },
    statText: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    statLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
    },
    statValue: {
      fontSize: "13px",
      color: "#6b7280",
    },
    loading: {
      textAlign: "center",
      padding: "100px 20px",
      fontSize: "18px",
      color: "#6b7280",
    },
    error: {
      textAlign: "center",
      padding: "100px 20px",
      fontSize: "18px",
      color: "#ef4444",
    },
    noData: {
      textAlign: "center",
      padding: "60px 20px",
      fontSize: "16px",
      color: "#9ca3af",
    },
    refreshButton: {
      padding: "12px 24px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>통계 데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          {error}
          <br />
          <button
            style={styles.refreshButton}
            onClick={fetchStatistics}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <div style={styles.header}>
        <h1 style={styles.title}>정릉3동 시간은행 설문조사 통계</h1>
        <p style={styles.subtitle}>설문조사 결과를 한눈에 확인하세요</p>
        <div style={styles.totalCount}>{statistics.total_count}</div>
        <div style={styles.totalLabel}>총 응답 수</div>
        <button
          onClick={() => {
            setPage(0);
          }}
        >
          처음으로
        </button>
        <button onClick={handleClick}>액셀다운</button>
      </div>

      {/* 차트 그리드 */}
      <div style={styles.chartsGrid}>
        {/* 1. 시간은행 인지 여부 */}
        {renderChart(
          "1. 시간은행 인지 여부",
          prepareChartData(statistics.awareness, statistics.total_count),
          '"시간은행(Time Bank)" 또는 "타임뱅크"를 들어보신 적이 있나요?'
        )}

        {/* 2. 받고 싶은 도움 */}
        {renderChart(
          "2. 받고 싶은 도움",
          prepareChartData(statistics.help_receive, statistics.total_count),
          "참여하신다면 어떤 도움을 받고 싶으신가요?"
        )}

        {/* 3. 줄 수 있는 도움 */}
        {renderChart(
          "3. 줄 수 있는 도움",
          prepareChartData(statistics.help_give, statistics.total_count),
          "참여하신다면 어떤 도움을 주실 수 있나요?"
        )}

        {/* 4. 참여 시간 */}
        {renderChart(
          "4. 참여 가능 시간",
          prepareChartData(statistics.time_commitment, statistics.total_count),
          "참여하신다면 얼마나 시간을 내실 수 있을까요?"
        )}

        {/* 5. 지원 네트워크 */}
        {renderChart(
          "5. 도움 요청 가능한 사람",
          prepareChartData(statistics.support_network, statistics.total_count),
          "지금 급히 도움이 필요할 때, 도움을 요청할 수 있는 사람은 몇 명인가요?"
        )}

        {/* 6. 참여 형태 */}
        {renderChart(
          "6. 선호하는 참여 형태",
          prepareChartData(
            statistics.participation_type,
            statistics.total_count
          ),
          "시간은행을 이용한다면 어떤 형태로 참여하고 싶으신가요?"
        )}

        {/* 7. 기대 사항 */}
        {renderChart(
          "7. 가장 기대되는 점",
          prepareChartData(statistics.expectation, statistics.total_count),
          "시간은행을 이용한다면 어떤 점이 가장 기대되시나요?"
        )}

        {/* 8. 연령대 */}
        {renderChart(
          "8. 연령대 분포",
          prepareChartData(statistics.age_group, statistics.total_count),
          "응답자의 연령대 분포"
        )}

        {/* 9. 성별 */}
        {renderChart(
          "9. 성별 분포",
          prepareChartData(statistics.gender, statistics.total_count),
          "응답자의 성별 분포"
        )}

        {/* 10. 거주지 */}
        {renderChart(
          "10. 거주지 분포",
          prepareChartData(statistics.residence, statistics.total_count),
          "응답자의 거주지 분포"
        )}
      </div>

      {/* 새로고침 버튼 */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          style={styles.refreshButton}
          onClick={fetchStatistics}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          통계 새로고침
        </button>
      </div>
    </div>
  );
}

// ✅ 비밀번호 입력 페이지 분리
const PasswordPage = ({ pw, password, setPassword, setLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === pw) {
      alert("관리자 로그인 성공 ✅");
      setLogin(true);
    } else {
      alert("비밀번호가 틀렸습니다 ❌");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>관리자 비밀번호 입력</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          접속
        </button>
      </form>
    </div>
  );
};
