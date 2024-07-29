function RecommendationFeedback({ recommendations }) {
  return (
    <div className="recommendationPoints">
      <h4> {recommendations.keyTask}</h4>
      <p>{recommendations.mainPracticePoint}</p>
      <p>{recommendations.secondaryPracticePoint}</p>
    </div>
  );
}

export default RecommendationFeedback;
