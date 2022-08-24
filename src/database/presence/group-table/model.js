import { dateValues } from '../../common/models.js';

export const GroupModel = {
  groupCode: 'group_code',
  groupName: 'group_name',
  active: 'active',
};

export const GroupFullModel = {
  ...GroupModel,
  ...dateValues,
  activity: 'activity',
  groupUuid: 'group_uuid',
  id: 'id'
};