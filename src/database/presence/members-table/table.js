import { MembersModel } from './model.js';

export class DBPresenceMembers {
  constructor () {}

	async getMembersByGroupId ( transaction, groupId, includeInactive ) {
    let parameters = {
      group_id: groupId
    };

    if (!includeInactive) {
      parameters['active'] = true;
    }

		return await transaction
      .select(MembersModel)
      .table('group_members')
      .withSchema('presence')
      .where(parameters);
	}
}