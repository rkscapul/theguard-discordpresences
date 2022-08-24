import { GroupFullModel, GroupModel } from './model.js';

export class DBPresenceGroups {
  constructor () {}

	async getGroupByCode ( transaction, groupCode ) {
		return await transaction
			.select(GroupModel)
			.table('groups')
			.withSchema('presence')
			.where({
				group_code: groupCode
			});
	}

	async getGroups ( transaction, isActive ) {
		return await transaction
			.select(GroupModel)
			.from('groups')
			.withSchema('presence')
			.where({ active: isActive });
	}

	async getAllGroups ( transaction ) {
		return await transaction
			.select(GroupModel)
			.from('groups')
			.withSchema('presence');
	}

	async getGroupFullDetailsByCode ( transaction, groupCode ) {
		return await transaction
			.select(GroupFullModel)
			.table('groups')
			.withSchema('presence')
			.where({
				group_code: groupCode
			});
	}
}