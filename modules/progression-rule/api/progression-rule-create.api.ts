import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { ProgressionRule } from '@/modules/progression-rule/types/progression-rule.types';
import { getUser } from '@/modules/user/api/user.api';
import { addDoc, collection } from '@react-native-firebase/firestore';

export const progressionRuleCreateApi = async (data: ProgressionRule) => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const progressionRuleRef = collection(firestore, COLLECTIONS.PROGRESSION_RULES);

  await addDoc(progressionRuleRef, {
    ...data,
    userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return true;
};
