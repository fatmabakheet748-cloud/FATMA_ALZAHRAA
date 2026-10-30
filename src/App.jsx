import { useState } from "react";
import "./App.css";

const stages = [
  "بداية الرحلة", "أهداف الرحلة", "مصادر المياه",
  "المياه العذبة", "المياه المالحة", "خريطة مصر",
  "تحدي المحقق", "الاختبار النهائي", "ختام الرحلة"
];

const sources = [
  { name: "نهر النيل", icon: "🌊", type: "مياه عذبة", desc: "يُعد نهر النيل أهم مصدر للمياه العذبة في مصر. يمر بوادي النيل والدلتا، وتقوم عليه الزراعة والحياة في مصر." },
  { name: "بحيرة ناصر", icon: "🏞️", type: "مياه عذبة", desc: "تقع في جنوب مصر خلف السد العالي بالقرب من أسوان، وتُعد من أكبر البحيرات الصناعية في العالم." },
  { name: "المياه الجوفية", icon: "💧", type: "مياه عذبة", desc: "هي مياه توجد تحت سطح الأرض، ويمكن الحصول عليها عن طريق الآبار، وتُستخدم في الشرب والزراعة في بعض المناطق." },
  { name: "البحر المتوسط", icon: "⛵", type: "مياه مالحة", desc: "يقع شمال مصر، ويساهم في الصيد والنقل البحري والسياحة." },
  { name: "البحر الأحمر", icon: "🐠", type: "مياه مالحة", desc: "يقع شرق مصر، ويتميز بالشعاب المرجانية والأسماك الملونة، ويُعد من المناطق السياحية المهمة." },
  { name: "البحيرات الشمالية", icon: "🦆", type: "بحيرات", desc: "منها بحيرات المنزلة والبرلس والبردويل، وتُعد من مصادر الثروة السمكية في مصر." }
];

const fresh = [
  { name: "نهر النيل", icon: "🌊", desc: "أهم مصدر للمياه العذبة في مصر، ويستخدم في الشرب والزراعة والصناعة." },
  { name: "بحيرة ناصر", icon: "🏞️", desc: "تقع جنوب مصر خلف السد العالي، وتخزن كميات كبيرة من مياه النيل." },
  { name: "المياه الجوفية", icon: "💧", desc: "مياه مخزنة في باطن الأرض، ونحصل عليها باستخدام الآبار." }
];

const salty = [
  { name: "البحر المتوسط", icon: "⛵", desc: "يقع شمال مصر، ويُستخدم في الصيد والنقل البحري والسياحة." },
  { name: "البحر الأحمر", icon: "🪸", desc: "يقع شرق مصر، ويتميز بالشعاب المرجانية والكائنات البحرية المتنوعة." },
  { name: "البحيرات الشمالية", icon: "🦆", desc: "مثل المنزلة والبرلس والبردويل، وتساهم في إنتاج الأسماك." }
];

const locations = [
  { name: "نهر النيل", desc: "يمر نهر النيل بوادي النيل والدلتا، وهو شريان الحياة في مصر.", lat: 26.8, lon: 30.8 },
  { name: "بحيرة ناصر", desc: "تقع في جنوب مصر خلف السد العالي بالقرب من أسوان.", lat: 22.5, lon: 31.8 },
  { name: "البحر المتوسط", desc: "يمتد بمحاذاة الساحل الشمالي لمصر.", lat: 31.4, lon: 29.8 },
  { name: "البحر الأحمر", desc: "يقع شرق مصر ويمتد بمحاذاة ساحل البحر الأحمر.", lat: 26.5, lon: 33.8 }
];

const questions = [
  { q: "ما أهم مصدر للمياه العذبة في مصر؟", answers: ["البحر الأحمر", "نهر النيل", "البحر المتوسط"], correct: 1, explain: "نهر النيل هو أهم مصدر للمياه العذبة في مصر." },
  { q: "أين تقع بحيرة ناصر؟", answers: ["شمال مصر", "شرق مصر", "جنوب مصر"], correct: 2, explain: "تقع بحيرة ناصر في جنوب مصر خلف السد العالي." },
  { q: "أي البحار يقع شمال مصر؟", answers: ["البحر المتوسط", "البحر الأحمر", "لا يوجد"], correct: 0, explain: "يقع البحر المتوسط شمال مصر." },
  { q: "أين توجد المياه الجوفية؟", answers: ["تحت سطح الأرض", "في السحاب", "في الهواء"], correct: 0, explain: "توجد المياه الجوفية في باطن الأرض." }
];

function InfoCards({ items }) {
  const [opened, setOpened] = useState(null);

  return (
    <div className="feature-grid">
      {items.map((item, index) => (
        <button
          className={`feature-card ${opened === index ? "expanded" : ""}`}
          key={item.name}
          onClick={() => setOpened(opened === index ? null : index)}
        >
          <span className="feature-emoji">{item.icon}</span>
          <h2>{item.name}</h2>
          <span className="inside-hint">
            {opened === index ? "إخفاء الشرح ▲" : "اضغطي لمعرفة المزيد ▼"}
          </span>
          {opened === index && <p className="inside-description">{item.desc}</p>}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [openedSource, setOpenedSource] = useState(null);

  function playSound(correct = true) {
    if (!soundOn) return;
    try {
      const audio = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.frequency.value = correct ? 660 : 220;
      gain.gain.setValueAtTime(0.12, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.25);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.25);
    } catch {}
  }

  function goNext() {
    setPage(p => Math.min(p + 1, 8));
    setFeedback("");
    setSelectedAnswer(null);
  }

  function goBack() {
    setPage(p => Math.max(p - 1, 0));
    setFeedback("");
    setSelectedAnswer(null);
  }

  function chooseAnswer(index) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    if (index === questions[questionIndex].correct) {
      setFeedback("correct");
      setScore(s => s + 1);
      playSound(true);
    } else {
      setFeedback("wrong");
      playSound(false);
    }
  }

  function nextQuestion() {
    if (selectedAnswer !== questions[questionIndex].correct) return;

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setFeedback("");
    } else {
      setPage(7);
      setSelectedAnswer(null);
      setFeedback("");
    }
  }

  function restart() {
    setPage(0);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback("");
    setScore(0);
    setOpenedSource(null);
  }

  return (
    <div className="app" dir="rtl">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">💧</span>
          <div>
            <strong>رحلة المياه</strong>
            <small>مغامرة استكشاف الموارد المائية في مصر</small>
          </div>
        </div>
        <button className="sound-btn" onClick={() => setSoundOn(!soundOn)}>
          {soundOn ? "🔊 الصوت يعمل" : "🔇 الصوت مغلق"}
        </button>
      </header>

      <div className="progress-wrap">
        <div className="progress-info">
          <span>المرحلة {page + 1} من 9</span>
          <span>{Math.round(((page + 1) / 9) * 100)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((page + 1) / 9) * 100}%` }} />
        </div>
      </div>

      <main className="main-content">

        {page === 0 && (
          <section className="hero-page">
            <div className="hero-drop">💧</div>
            <span className="eyebrow">مغامرة تعليمية تفاعلية</span>
            <h1>أهلًا بك في <span>رحلة المياه!</span></h1>
            <p>استعدي لاكتشاف كنوز مصر المائية، وتعرّفي على مصادر المياه وأهميتها من خلال اللعب والاستكشاف والتحديات.</p>
            <button className="primary-btn" onClick={goNext}>ابدئي المغامرة ←</button>
            <div className="hero-facts">
              <span>🌊 اكتشفي</span><span>🧭 استكشفي</span><span>🏆 تحدّي نفسك</span>
            </div>
          </section>
        )}

        {page === 1 && (
          <section className="content-page">
            <div className="section-heading">
              <span className="section-icon">🎯</span>
              <div><span className="eyebrow">المحطة الأولى</span><h1>أهداف الرحلة</h1></div>
            </div>
            <p className="intro">في نهاية رحلتنا، ستكونين قادرة على:</p>
            <div className="goal-grid">
              {[
                ["💧", "التعرّف على المصادر", "تحديد أهم مصادر المياه في مصر."],
                ["🌊", "التمييز بين المياه", "التفرقة بين المياه العذبة والمياه المالحة."],
                ["🗺️", "تحديد المواقع", "معرفة مواقع أهم المسطحات المائية على خريطة مصر."],
                ["🌱", "المحافظة على المياه", "اقتراح سلوكيات تساعد على ترشيد استهلاك المياه."]
              ].map(item => (
                <article className="goal-card" key={item[1]}>
                  <span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === 2 && (
          <section className="content-page">
            <div className="section-heading">
              <span className="section-icon">💦</span>
              <div><span className="eyebrow">المحطة الثانية</span><h1>مصادر المياه في مصر</h1></div>
            </div>
            <p className="intro">اضغطي على البطاقة لفتح الشرح بداخلها.</p>
            <div className="source-grid">
              {sources.map((source, index) => (
                <button
                  className={`source-card ${openedSource === index ? "active" : ""}`}
                  key={source.name}
                  onClick={() => setOpenedSource(openedSource === index ? null : index)}
                >
                  <span className="source-emoji">{source.icon}</span>
                  <strong>{source.name}</strong>
                  <small>{source.type}</small>
                  <span className="card-hint">{openedSource === index ? "إخفاء الشرح ▲" : "اضغطي للتعرّف ▼"}</span>
                  {openedSource === index && <p className="inside-description">{source.desc}</p>}
                </button>
              ))}
            </div>
          </section>
        )}

        {page === 3 && (
          <section className="content-page">
            <div className="section-heading">
              <span className="section-icon">🚰</span>
              <div><span className="eyebrow">المحطة الثالثة</span><h1>المياه العذبة</h1></div>
            </div>
            <p className="intro">المياه العذبة تحتوي على نسبة قليلة من الأملاح، ونستخدمها في الشرب والزراعة والأنشطة اليومية. اضغطي على كل بطاقة لقراءة شرحها.</p>
            <InfoCards items={fresh} />
            <div className="tip-panel">💡 <strong>هل تعلمين؟</strong> المحافظة على نهر النيل مسؤولية كل فرد؛ فلا نلقي المخلفات في مياهه.</div>
          </section>
        )}

        {page === 4 && (
          <section className="content-page">
            <div className="section-heading">
              <span className="section-icon">🐠</span>
              <div><span className="eyebrow">المحطة الرابعة</span><h1>المياه المالحة</h1></div>
            </div>
            <p className="intro">تحتوي المياه المالحة على نسبة مرتفعة من الأملاح. اضغطي على كل بطاقة للتعرف على أهم المسطحات المائية.</p>
            <InfoCards items={salty} />
            <div className="tip-panel">🐟 <strong>معلومة:</strong> البحار والبحيرات بيئات طبيعية تعيش فيها أنواع كثيرة من الكائنات.</div>
          </section>
        )}

        {page === 5 && (
          <section className="content-page map-page">
            <div className="section-heading">
              <span className="section-icon">🗺️</span>
              <div><span className="eyebrow">محطة الاستكشاف</span><h1>خريطة مصر التفاعلية</h1></div>
            </div>
            <p className="intro">اختاري موقعًا من البطاقات لتشاهدي مكانه على الخريطة وتقرئي الشرح داخل البطاقة نفسها.</p>

            <div className="map-layout">
              <div className="location-list">
                {locations.map((loc, index) => (
                  <button
                    key={loc.name}
                    className={`location-btn ${selectedLocation === index ? "chosen" : ""}`}
                    onClick={() => setSelectedLocation(index)}
                  >
                    <span>📍</span>
                    <strong>{loc.name}</strong>
                    {selectedLocation === index && (
                      <span className="location-description">{loc.desc}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="map-frame">
                <iframe
                  title="خريطة مصر التفاعلية"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=24.5%2C21.5%2C36%2C32.5&layer=mapnik&marker=${locations[selectedLocation].lat}%2C${locations[selectedLocation].lon}`}
                />
                <small>خريطة تفاعلية لمصر والموقع المحدد</small>
              </div>
            </div>
          </section>
        )}

        {page === 6 && (
          <section className="content-page challenge-page">
            <div className="section-heading">
              <span className="section-icon">🕵️</span>
              <div><span className="eyebrow">مهمة المحقق الصغير</span><h1>تحدي المحقق</h1></div>
            </div>
            <p className="intro">أجيبي عن الأسئلة لتثبتي أنك خبيرة في موارد مصر المائية!</p>
            <div className="quiz-card">
              <div className="quiz-top">
                <span>السؤال {questionIndex + 1} من {questions.length}</span>
                <span>⭐ {score} نقاط</span>
              </div>
              <div className="quiz-track">
                <div style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
              </div>
              <h2>{questions[questionIndex].q}</h2>
              <div className="answer-list">
                {questions[questionIndex].answers.map((answer, index) => (
                  <button
                    key={answer}
                    onClick={() => chooseAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`answer-btn ${selectedAnswer === index ? (feedback === "correct" ? "answer-correct" : "answer-wrong") : ""}`}
                  >
                    <span>{["أ", "ب", "ج"][index]}</span>{answer}
                  </button>
                ))}
              </div>
              {feedback === "correct" && (
                <div className="feedback success">
                  🎉 {questions[questionIndex].explain}
                  <button onClick={nextQuestion}>السؤال التالي ←</button>
                </div>
              )}
              {feedback === "wrong" && (
                <div className="feedback error">
                  💪 حاولي مرة أخرى! فكّري جيدًا ثم اختاري الإجابة الصحيحة.
                  <button onClick={() => { setSelectedAnswer(null); setFeedback(""); }}>إعادة المحاولة</button>
                </div>
              )}
            </div>
          </section>
        )}

        {page === 7 && (
          <section className="content-page final-test">
            <div className="section-heading">
              <span className="section-icon">🏆</span>
              <div><span className="eyebrow">وصلنا إلى النهاية</span><h1>نتيجة التحدي</h1></div>
            </div>
            <div className="result-card">
              <div className="trophy">🏆</div>
              <h2>أحسنتِ يا مستكشفة المياه!</h2>
              <p>لقد أنهيتِ تحدي المحقق الصغير بنجاح.</p>
              <div className="score-number">{score} <small>/ {questions.length}</small></div>
              <p>إجابات صحيحة</p>
              <button className="primary-btn" onClick={goNext}>شاهدي ختام الرحلة ←</button>
            </div>
          </section>
        )}

        {page === 8 && (
          <section className="ending-page">
            <div className="ending-glow" />
            <div className="water-wave">≈ ≈ ≈</div>
            <div className="ending-stars">✦　✧　✦　✧　✦</div>
            <div className="ending-drop">💧</div>
            <span className="eyebrow">نهاية الرحلة وبداية المسؤولية</span>
            <h1>المياه حياة… <span>فلنحافظ عليها</span></h1>
            <p className="ending-message">
              شكرًا لمشاركتك في رحلة اكتشاف الموارد المائية في مصر.
              تذكري دائمًا أن كل قطرة ماء تساوي حياة، وأن المحافظة عليها مسؤوليتنا جميعًا.
            </p>

            <div className="project-credit">
              <div className="credit-symbol">💧</div>
              <h2>رحلة المياه</h2>
              <p className="credit-subtitle">الموارد المائية في مصر</p>
              <div className="credit-line" />

              <div className="credit-item">
                <span>إعداد الطالبة</span>
                <strong>فاطمة الزهراء بخيت</strong>
              </div>

              <div className="credit-item">
                <span>تحت إشراف</span>
                <strong>د. نرمين نصر</strong>
                <strong>د. حسام حمدي</strong>
              </div>

              <div className="credit-item">
                <span>الفئة المستهدفة</span>
                <strong>الصف الخامس الابتدائي</strong>
              </div>
            </div>

            <div className="final-motto">💙 قطرة ماء تساوي حياة 💙</div>
            <button className="restart-btn" onClick={restart}>↻ إعادة الرحلة من البداية</button>
          </section>
        )}

      </main>

      <footer className="bottom-nav">
        <button className="nav-btn" onClick={goBack} disabled={page === 0 || page === 8}>→ السابقة</button>
        <span>{stages[page]}</span>
        <button className="nav-btn next" onClick={goNext} disabled={page === 8 || page === 6}>التالية ←</button>
      </footer>
    </div>
  );
}