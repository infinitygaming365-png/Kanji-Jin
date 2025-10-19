// Level Selection Component - WITH BEAUTIFUL ANIMATIONS
const LevelSelection = ({ onLevelSelect }) => {
  const levels = [
    { id: 'N5', name: 'Basic Level', color: '#4CAF50', description: '~100 Kanji, Basic Grammar' },
    { id: 'N4', name: 'Elementary Level', color: '#2196F3', description: '~300 Kanji, Everyday Expressions' },
    { id: 'N3', name: 'Intermediate Level', color: '#FF9800', description: '~650 Kanji, Daily Life Situations' },
    { id: 'N2', name: 'Pre-Advanced Level', color: '#F44336', description: '~1000 Kanji, Complex Texts' },
    { id: 'N1', name: 'Advanced Level', color: '#9C27B0', description: '~2000 Kanji, Abstract Topics' }
  ];

  // Common JLPT N5 kanji for floating animation
  const floatingKanjis = [
    '日', '月', '水', '火', '木', '金', '土', '人', '山', '川',
    '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
    '百', '千', '万', '父', '母', '友', '女', '男', '子', '学',
    '生', '先', '校', '本', '語', '文', '字', '名', '田', '町'
  ];

  const getDifficultyDots = (level) => {
    const dots = [];
    const activeDots = 
      level === 'N5' ? 1 :
      level === 'N4' ? 2 :
      level === 'N3' ? 3 :
      level === 'N2' ? 4 : 5;
    
    for (let i = 0; i < 5; i++) {
      dots.push(
        <span 
          key={i} 
          className={`difficulty-dot ${i < activeDots ? 'active' : ''}`}
        />
      );
    }
    return dots;
  };

  return (
    <div className="level-selection-animated">
      {/* Animated Background with Floating Kanji */}
      <div className="levels-background">
        {floatingKanjis.map((kanji, index) => (
          <div 
            key={index}
            className="floating-kanji"
            style={{
              animationDelay: `${index * 0.7}s`,
              left: `${10 + (index % 10) * 8}%`,
              top: `${5 + (index % 7) * 13}%`,
              fontSize: `${2 + (index % 4)}rem`,
              opacity: `${0.05 + (index % 10) * 0.02}`
            }}
          >
            {kanji}
          </div>
        ))}
      </div>

      <div className="levels-container">
        <div className="levels-header">
          <h1>Choose Your JLPT Journey</h1>
          <p>Select your proficiency level and start mastering Japanese kanji</p>
          <p className="levels-subtitle">Each level builds upon the previous one - start where you feel comfortable!</p>
        </div>
        
        <div className="levels-grid">
          {levels.map((level, index) => {
            const kanjiCount = 10; // Default count for demo
            return (
              <div
                key={level.id}
                className="level-card"
                style={{ 
                  background: `linear-gradient(135deg, ${level.color}20, ${level.color}40)`,
                  borderLeft: `5px solid ${level.color}`,
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => onLevelSelect(level.id)}
              >
                <div className="level-header">
                  <div 
                    className="level-badge"
                    style={{ background: level.color }}
                  >
                    {level.id}
                  </div>
                  <h3>{level.name}</h3>
                </div>
                
                <p className="level-description">{level.description}</p>
                
                <div className="level-stats">
                  <span className="kanji-count">
                    {kanjiCount} Kanji Available
                  </span>
                  <div 
                    className="level-difficulty"
                    style={{ color: level.color }}
                  >
                    {getDifficultyDots(level.id)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};