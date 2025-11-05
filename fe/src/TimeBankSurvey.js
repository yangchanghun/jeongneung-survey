import { useState } from "react";

export default function TimeBankSurvey({ setPage }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    knows_timebank: "",
    help_receive: "",
    help_receive_other: "",
    help_give: "",
    help_give_other: "",
    time_commitment: "",
    time_commitment_other: "",
    support_network: "",
    participation_type: "",
    expectation: "",
    expectation_other: "",
    age_group: "",
    gender: "",
    residence: "",
  });
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Django API 엔드포인트로 POST 요청
      const response = await fetch(`${REACT_APP_BASE_URL}/api/survey/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true); // 모달 표시
        const result = await response.json();
        setSubmitMessage("설문에 참여해 주셔서 감사합니다!");
        // 폼 초기화
        setFormData({
          knows_timebank: "",
          help_receive: "",
          help_receive_other: "",
          help_give: "",
          help_give_other: "",
          time_commitment: "",
          time_commitment_other: "",
          support_network: "",
          participation_type: "",
          expectation: "",
          expectation_other: "",
          age_group: "",
          gender: "",
          residence: "",
        });
        setTimeout(() => {
          setShowModal(false);
          setPage(0);
        }, 2000);
      } else {
        const error = await response.json();
        setSubmitMessage("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("Error:", error);
      }
    } catch (error) {
      setSubmitMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("BASE_URL", process.env.REACT_APP_BASE_URL);
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      padding: "30px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "12px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#6b7280",
      lineHeight: "1.6",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    question: {
      marginBottom: "35px",
      paddingBottom: "30px",
      borderBottom: "1px solid #e5e7eb",
    },
    questionText: {
      fontSize: "17px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
      lineHeight: "1.6",
    },
    optionLabel: {
      display: "flex",
      alignItems: "flex-start",
      padding: "12px",
      marginBottom: "10px",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "background-color 0.2s",
      fontSize: "15px",
      color: "#374151",
    },
    radio: {
      marginRight: "10px",
      marginTop: "2px",
      cursor: "pointer",
      width: "18px",
      height: "18px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      marginTop: "10px",
      marginLeft: "28px",
      border: "2px solid #3b82f6",
      borderRadius: "6px",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.2s",
      backgroundColor: "#f0f9ff",
    },
    button: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "17px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "20px",
      transition: "background-color 0.2s",
      opacity: isSubmitting ? 0.6 : 1,
    },
    message: {
      padding: "16px",
      marginTop: "20px",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "600",
      backgroundColor: submitMessage.includes("감사") ? "#dcfce7" : "#fee2e2",
      color: submitMessage.includes("감사") ? "#166534" : "#991b1b",
    },
    // ✅ 모달 스타일 추가
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "400px",
      width: "90%",
    },
    modalIcon: {
      fontSize: "64px",
      marginBottom: "20px",
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "12px",
    },
    modalMessage: {
      fontSize: "16px",
      color: "#6b7280",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.container}>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalIcon}>✅</div>
            <h2 style={styles.modalTitle}>제출 완료!</h2>
            <p style={styles.modalMessage}>
              설문에 참여해 주셔서 감사합니다!
              <br />
              잠시 후 메인 페이지로 이동합니다.
            </p>
          </div>
        </div>
      )}
      <div style={styles.header}>
        <h1 style={styles.title}>정릉3동 축제부스 시간은행 설문</h1>
        <p style={styles.subtitle}>시간은행에 참여해 주셔서 감사합니다</p>
        <button
          onClick={() => {
            setPage(0);
          }}
        >
          처음으로
        </button>
        {/* <button
          onClick={() => {
            setPage(2);
          }}
        >
          통계보기
        </button> */}
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        {/* 질문 1 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            1. "시간은행(Time Bank)" 또는 "타임뱅크"를 들어보신 적이 있나요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="knows_timebank"
              value="yes"
              checked={formData.knows_timebank === "yes"}
              onChange={(e) => handleChange("knows_timebank", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 예</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="knows_timebank"
              value="no"
              checked={formData.knows_timebank === "no"}
              onChange={(e) => handleChange("knows_timebank", e.target.value)}
              style={styles.radio}
            />
            <span>② 아니오</span>
          </label>
        </div>

        {/* 질문 2 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            2. "시간은행"은 서로의 시간을 나누고 도움을 주고받는 품앗이
            활동입니다.
            <br />
            참여하신다면 어떤 도움을 받고 싶으신가요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_receive"
              value="learning"
              checked={formData.help_receive === "learning"}
              onChange={(e) => handleChange("help_receive", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 배우기 (예: 스마트폰 사용법, 운동 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_receive"
              value="labor"
              checked={formData.help_receive === "labor"}
              onChange={(e) => handleChange("help_receive", e.target.value)}
              style={styles.radio}
            />
            <span>② 일손 (예: 정리, 청소 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_receive"
              value="care"
              checked={formData.help_receive === "care"}
              onChange={(e) => handleChange("help_receive", e.target.value)}
              style={styles.radio}
            />
            <span>③ 돌봄 (예: 동행, 말벗 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_receive"
              value="other"
              checked={formData.help_receive === "other"}
              onChange={(e) => handleChange("help_receive", e.target.value)}
              style={styles.radio}
            />
            <span>④ 기타</span>
          </label>
          {formData.help_receive === "other" && (
            <input
              type="text"
              placeholder="기타 내용을 입력해주세요"
              value={formData.help_receive_other}
              onChange={(e) =>
                handleChange("help_receive_other", e.target.value)
              }
              style={styles.input}
              required
            />
          )}
        </div>

        {/* 질문 3 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            3. "시간은행"에 참여하신다면 어떤 도움을 주실 수 있나요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_give"
              value="teaching"
              checked={formData.help_give === "teaching"}
              onChange={(e) => handleChange("help_give", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 가르치기 (예: 스마트폰 사용법, 운동 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_give"
              value="labor"
              checked={formData.help_give === "labor"}
              onChange={(e) => handleChange("help_give", e.target.value)}
              style={styles.radio}
            />
            <span>② 일손 돕기 (예: 정리, 청소, 수선 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_give"
              value="care"
              checked={formData.help_give === "care"}
              onChange={(e) => handleChange("help_give", e.target.value)}
              style={styles.radio}
            />
            <span>③ 돌봄 (예: 동행, 말벗 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="help_give"
              value="other"
              checked={formData.help_give === "other"}
              onChange={(e) => handleChange("help_give", e.target.value)}
              style={styles.radio}
            />
            <span>④ 기타</span>
          </label>
          {formData.help_give === "other" && (
            <input
              type="text"
              placeholder="기타 내용을 입력해주세요"
              value={formData.help_give_other}
              onChange={(e) => handleChange("help_give_other", e.target.value)}
              style={styles.input}
              required
            />
          )}
        </div>

        {/* 질문 4 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            4. "시간은행"에 참여하신다면 얼마나 시간을 내실 수 있을까요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="time_commitment"
              value="3months"
              checked={formData.time_commitment === "3months"}
              onChange={(e) => handleChange("time_commitment", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 3개월에 1~2시간 정도</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="time_commitment"
              value="1month"
              checked={formData.time_commitment === "1month"}
              onChange={(e) => handleChange("time_commitment", e.target.value)}
              style={styles.radio}
            />
            <span>② 1개월에 1~2시간 정도</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="time_commitment"
              value="1week"
              checked={formData.time_commitment === "1week"}
              onChange={(e) => handleChange("time_commitment", e.target.value)}
              style={styles.radio}
            />
            <span>③ 1주일에 1~2시간 정도</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="time_commitment"
              value="other"
              checked={formData.time_commitment === "other"}
              onChange={(e) => handleChange("time_commitment", e.target.value)}
              style={styles.radio}
            />
            <span>④ 기타</span>
          </label>
          {formData.time_commitment === "other" && (
            <input
              type="text"
              placeholder="기타 내용을 입력해주세요"
              value={formData.time_commitment_other}
              onChange={(e) =>
                handleChange("time_commitment_other", e.target.value)
              }
              style={styles.input}
              required
            />
          )}
        </div>

        {/* 질문 5 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            5. 지금 급히 도움이 필요할 때, 도움을 요청할 수 있는 사람은 몇 명
            정도 있나요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="support_network"
              value="0"
              checked={formData.support_network === "0"}
              onChange={(e) => handleChange("support_network", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 없다</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="support_network"
              value="1"
              checked={formData.support_network === "1"}
              onChange={(e) => handleChange("support_network", e.target.value)}
              style={styles.radio}
            />
            <span>② 1명</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="support_network"
              value="2"
              checked={formData.support_network === "2"}
              onChange={(e) => handleChange("support_network", e.target.value)}
              style={styles.radio}
            />
            <span>③ 2명</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="support_network"
              value="3+"
              checked={formData.support_network === "3+"}
              onChange={(e) => handleChange("support_network", e.target.value)}
              style={styles.radio}
            />
            <span>④ 3명 이상</span>
          </label>
        </div>

        {/* 질문 6 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            6. "시간은행"을 이용한다면 어떤 형태로 참여하고 싶으신가요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="participation_type"
              value="regular"
              checked={formData.participation_type === "regular"}
              onChange={(e) =>
                handleChange("participation_type", e.target.value)
              }
              style={styles.radio}
              required
            />
            <span>① 정기 모임(소모임 형태)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="participation_type"
              value="ondemand"
              checked={formData.participation_type === "ondemand"}
              onChange={(e) =>
                handleChange("participation_type", e.target.value)
              }
              style={styles.radio}
            />
            <span>② 필요할 때만 참여(개별 교류)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="participation_type"
              value="online"
              checked={formData.participation_type === "online"}
              onChange={(e) =>
                handleChange("participation_type", e.target.value)
              }
              style={styles.radio}
            />
            <span>③ 온라인 중심 교류(앱, 단톡방 등)</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="participation_type"
              value="unsure"
              checked={formData.participation_type === "unsure"}
              onChange={(e) =>
                handleChange("participation_type", e.target.value)
              }
              style={styles.radio}
            />
            <span>④ 아직 잘 모르겠다</span>
          </label>
        </div>

        {/* 질문 7 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            7. "시간은행"을 이용한다면 어떤 점이 가장 기대되시나요?
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="expectation"
              value="meeting"
              checked={formData.expectation === "meeting"}
              onChange={(e) => handleChange("expectation", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 새로운 사람들과의 만남</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="expectation"
              value="support"
              checked={formData.expectation === "support"}
              onChange={(e) => handleChange("expectation", e.target.value)}
              style={styles.radio}
            />
            <span>② 도움이 필요할 때 안심</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="expectation"
              value="sharing"
              checked={formData.expectation === "sharing"}
              onChange={(e) => handleChange("expectation", e.target.value)}
              style={styles.radio}
            />
            <span>③ 나의 재능을 나눌 수 있음</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="expectation"
              value="community"
              checked={formData.expectation === "community"}
              onChange={(e) => handleChange("expectation", e.target.value)}
              style={styles.radio}
            />
            <span>④ 지역 공동체의 따뜻한 분위기</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="expectation"
              value="other"
              checked={formData.expectation === "other"}
              onChange={(e) => handleChange("expectation", e.target.value)}
              style={styles.radio}
            />
            <span>⑤ 기타</span>
          </label>
          {formData.expectation === "other" && (
            <input
              type="text"
              placeholder="기타 내용을 입력해주세요"
              value={formData.expectation_other}
              onChange={(e) =>
                handleChange("expectation_other", e.target.value)
              }
              style={styles.input}
              required
            />
          )}
        </div>

        {/* 질문 8 */}
        <div style={styles.question}>
          <div style={styles.questionText}>
            8. 귀하의 연령대를 선택해 주세요.
          </div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="age_group"
              value="under30"
              checked={formData.age_group === "under30"}
              onChange={(e) => handleChange("age_group", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 30세 미만</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="age_group"
              value="30-50"
              checked={formData.age_group === "30-50"}
              onChange={(e) => handleChange("age_group", e.target.value)}
              style={styles.radio}
            />
            <span>② 30세 이상 ~ 50세 미만</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="age_group"
              value="50-70"
              checked={formData.age_group === "50-70"}
              onChange={(e) => handleChange("age_group", e.target.value)}
              style={styles.radio}
            />
            <span>③ 50세 이상 ~ 70세 미만</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="age_group"
              value="over70"
              checked={formData.age_group === "over70"}
              onChange={(e) => handleChange("age_group", e.target.value)}
              style={styles.radio}
            />
            <span>④ 70세 이상</span>
          </label>
        </div>

        {/* 질문 9 */}
        <div style={styles.question}>
          <div style={styles.questionText}>9. 귀하의 성별을 선택해 주세요.</div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) => handleChange("gender", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 남성</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) => handleChange("gender", e.target.value)}
              style={styles.radio}
            />
            <span>② 여성</span>
          </label>
        </div>

        {/* 질문 10 */}
        <div style={styles.question}>
          <div style={styles.questionText}>10. 거주지를 선택해 주세요.</div>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="residence"
              value="jeongneung3"
              checked={formData.residence === "jeongneung3"}
              onChange={(e) => handleChange("residence", e.target.value)}
              style={styles.radio}
              required
            />
            <span>① 정릉3동</span>
          </label>
          <label style={styles.optionLabel}>
            <input
              type="radio"
              name="residence"
              value="other"
              checked={formData.residence === "other"}
              onChange={(e) => handleChange("residence", e.target.value)}
              style={styles.radio}
            />
            <span>② 그 외 지역</span>
          </label>
        </div>

        <button
          type="submit"
          style={styles.button}
          disabled={isSubmitting}
          onMouseOver={(e) =>
            !isSubmitting && (e.target.style.backgroundColor = "#2563eb")
          }
          onMouseOut={(e) =>
            !isSubmitting && (e.target.style.backgroundColor = "#3b82f6")
          }
        >
          {isSubmitting ? "제출 중..." : "제출하기"}
        </button>

        {submitMessage && <div style={styles.message}>{submitMessage}</div>}
      </form>
    </div>
  );
}
