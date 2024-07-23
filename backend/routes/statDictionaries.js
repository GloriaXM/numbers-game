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
  outsideOffenseScore: [
    "Key task: focus on strong outside scoring",
    "Spend extra time in the lead up to this match on form shooting and shooring drills",
    "Practice plays designed for your outside shooters",
  ],
  insideOffenseScore: [
    "Key task: have strong inside scoring",
    "Practice play-making in the paint",
    "Focus on attacking the rim and drawing fouls",
  ],
  offenseDisciplineScore: [
    "Key task: play smart offense",
    "Practice shot selection and encourage high percentage shots",
    "Focus on minimizing turnovers",
  ],
  defenseDisciplineScore: [
    "Key task: play disciplined defense",
    "Practice clean man-to-man defense without fouling",
    "Iron out player familiarity and communication for zone and help defense",
  ],
  consistencyScore: [
    "Key task: use a strong bench to maintain consistency throughout the game",
    "Focus on completing simple drills efficiently and consistently",
    "Make sure that all players are getting possessions and making impacts throughout the game",
  ],
  reboundingScore: [
    "Key task: make the hustle plays count",
    "Focus on gathering all defensive rebounds. Don't give the opponent second chances",
    "Play with a bigger roster that can get more offensive rebounds and convert on them",
  ],
};

export {
  STAT_MEANS,
  STAT_VARIANCES,
  OPPONENT_STYLE_TO_MYTEAM_STYLE,
  STYLE_FEEDBACK,
};
