export const calculateDosha = (answers) => {
  let scores = {
    vata: 0,
    pitta: 0,
    kapha: 0
  };

  answers.forEach((ans) => {
    scores[ans.type] += ans.weight;
  });

  const total = scores.vata + scores.pitta + scores.kapha;

  return {
    vata: Math.round((scores.vata / total) * 100),
    pitta: Math.round((scores.pitta / total) * 100),
    kapha: Math.round((scores.kapha / total) * 100),
    dominant: Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)
  };
};
