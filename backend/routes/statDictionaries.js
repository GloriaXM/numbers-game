import { PlayerStats } from "../../frontend/src/single_player/PlayerStats.js";

const STAT_MEANS = new PlayerStats();

const STAT_VARIANCES = new PlayerStats();

//Maps the oponent's best playing style score to a list of playing styles ordered by ability to win against opponent
const OPPONENT_STYLE_TO_MYTEAM_STYLE = {
  outsideOffenseScore: [
    "outsideOffenseScore",
    "defenseDisciplineScore",
    "reboundingScore",
    "offenseDisciplineScore",
    "consistencyScore",
    "insideOffenseScore",
  ],
  insideOffenseScore: [
    "defenseDisciplineScore",
    "outsideOffenseScore",
    "insideOffenseScore",
    "offenseDisciplineScore",
    "reboundingScore",
    "consistencyScore",
  ],
  offenseDisciplineScore: [
    "outsideOffenseScore",
    "insideOffenseScore",
    "consistencyScore",
    "offenseDisciplineScore",
    "defenseDisciplineScore",
    "reboundingScore",
  ],
  defenseDisciplineScore: [
    "outsideOffenseScore",
    "offenseDisciplineScore",
    "reboundingScore",
    "defenseDisciplineScore",
    "consistencyScore",
    "insideOffenseScore",
  ],
  consistencyScore: [
    "offenseDisciplineScore",
    "insideOffenseScore",
    "consistencyScore",
    "reboundingScore",
    "outsideOffenseScore",
    "defenseDisciplineScore",
  ],
  reboundingScore: [
    "reboundingScore",
    "offenseDisciplineScore",
    "outsideOffenseScore",
    "insideOffenseScore",
    "consistencyScore",
    "defenseDisciplineScore",
  ],
};

//Maps the styles to actions that the user should take to improve said style score
const STYLE_FEEDBACK = {
  outsideOffenseScore: {
    keyTask: "Win on strong outside scoring",
    mainPracticePoint:
      "Spend extra time in the lead up to this match on form shooting and shooring drills",
    secondaryPracticePoint: "Practice plays designed for your outside shooters",
  },
  insideOffenseScore: {
    keyTask: "Win on strong inside scoring",
    mainPracticePoint: "Practice play-making in the paint",
    secondaryPracticePoint: "Focus on attacking the rim and drawing fouls",
  },
  offenseDisciplineScore: {
    keyTask: "Win on playing smart offense",
    mainPracticePoint:
      "Practice shot selection and encourage high percentage shots",
    secondaryPracticePoint: "Focus on minimizing turnovers",
  },
  defenseDisciplineScore: {
    keyTask: "Win on disciplined defense",
    mainPracticePoint: "Practice clean man-to-man defense without fouling",
    secondaryPracticePoint:
      "Iron out player familiarity and communication for zone and help defense",
  },
  consistencyScore: {
    keyTask: "Win with consistent performance across the bench",
    mainPracticePoint:
      "Focus on completing simple drills efficiently and consistently",
    secondaryPracticePoint:
      "Iron out player familiarity and communication for zone and help defense",
  },
  reboundingScore: {
    keyTask: "Win on making the hustle plays count",
    mainPracticePoint:
      "Focus on gathering all defensive rebounds. Don't allow second chance shots",
    secondaryPracticePoint:
      "Play with a bigger roster that can get and convert more offensive rebounds",
  },
};

export {
  STAT_MEANS,
  STAT_VARIANCES,
  OPPONENT_STYLE_TO_MYTEAM_STYLE,
  STYLE_FEEDBACK,
};
