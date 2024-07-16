let meansObject = {
  minutes_played: 0,
  field_goals: 0,
  field_attempts: 0,
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

let variancesObject = {
  minutes_played: 0,
  field_goals: 0,
  field_attempts: 0,
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

let STAT_MEANS = new Map([...Object.entries(meansObject)]);
let STAT_VARIANCES = new Map([...Object.entries(variancesObject)]);

export { STAT_MEANS, STAT_VARIANCES };
