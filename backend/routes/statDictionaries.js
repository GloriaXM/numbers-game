const STAT_MEANS = {
  games: 0,
  minutes_played: 0,
  field_goals: 0,
  field_attempts: 0,
  field_percent: 0,
  three_fg: 0,
  three_attempts: 0,
  three_percent: 0,
  two_fg: 0,
  two_attempts: 0,
  two_percent: 0,
  effect_fg_percent: 0,
  ft: 0,
  fta: 0,
  ft_percent: 0,
  ORB: 0,
  DRB: 0,
  TRB: 0,
  AST: 0,
  STL: 0,
  BLK: 0,
  TOV: 0,
  PF: 0,
  PTS: 0,
};

const STAT_VARIANCES = {
  games: 0,
  minutes_played: 0,
  field_goals: 0,
  field_attempts: 0,
  field_percent: 0,
  three_fg: 0,
  three_attempts: 0,
  three_percent: 0,
  two_fg: 0,
  two_attempts: 0,
  two_percent: 0,
  effect_fg_percent: 0,
  ft: 0,
  fta: 0,
  ft_percent: 0,
  ORB: 0,
  DRB: 0,
  TRB: 0,
  AST: 0,
  STL: 0,
  BLK: 0,
  TOV: 0,
  PF: 0,
  PTS: 0,
};

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

const FEEDBACK_OPTIONS = {
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

let POP_SIZE = 0;

function incrementPopSize() {
  ++POP_SIZE;
}

export {
  STAT_MEANS,
  STAT_VARIANCES,
  POP_SIZE,
  incrementPopSize,
  OPPONENT_STYLE_TO_MYTEAM_STYLE,
  FEEDBACK_OPTIONS,
};
