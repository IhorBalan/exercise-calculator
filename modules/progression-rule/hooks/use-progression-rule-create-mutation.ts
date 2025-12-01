import { progressionRuleCreateApi } from '@/modules/progression-rule/api/progression-rule-create.api';
import { ProgressionRule } from '@/modules/progression-rule/types/progression-rule.types';
import { useMutation } from '@tanstack/react-query';

export const useProgressionRuleCreateMutation = () => {
  return useMutation<boolean, Error, ProgressionRule>({
    mutationFn: progressionRuleCreateApi,
  });
};
