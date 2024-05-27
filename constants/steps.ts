export enum StepType {
  basicInformation = 'Basic Information',
  additionalInformation = 'Additional Information',
  selfPromotion = 'Self Promotion',
  balanceGame = 'Balance Game',
}

export const Steps = [
  StepType.basicInformation,
  StepType.additionalInformation,
  StepType.selfPromotion,
  StepType.balanceGame,
];

export const FirstStep = StepType.basicInformation;
export const FinalStep = StepType.balanceGame;
