import { DBPresenceGroups } from '../../database/presence/group-table/table.js';
import { DBPresenceMembers } from '../../database/presence/members-table/table.js';
import { DBPresenceValues } from '../../database/presence/values-table/table.js';

export class TGDPViewer {
  constructor ( logging, database ) {
    this.logging = logging;
    this.database = database;
    
    this.groups = new DBPresenceGroups();
    this.members = new DBPresenceMembers();
    this.values = new DBPresenceValues();
  }

  async getActiveGroups () {
    return await this.database.transaction(async trx => {
      const groups = await this.groups.getGroups(trx, true);

      return { code: 200, data: groups };
    });
  }

  async getInactiveGroups () {
    return await this.database.transaction(async trx => {
      const groups = await this.groups.getGroups(trx, false);
    
      return { code: 200, data: groups };
    });
  }

  async getAllGroups () {
    return await this.database.transaction(async trx => {
      const groups = await this.groups.getAllGroups(trx);
    
      return { code: 200, data: groups };
    });
  }

  async getAllMembersByGroupCodeSimplified ( groupCode, includeInactive ) {
    const transactionProvider = this.database.transactionProvider()
    
    const groupsTrx = await transactionProvider();
    const group = await this.groups.getGroupFullDetailsByCode(groupsTrx, groupCode);
      
    const membersTrx = await transactionProvider();
    const members = await this.members.getMembersByGroupId(membersTrx, group[0].id, includeInactive);

    const valueIds = members.map(data => { return data.memberId });
    const valuesTrx = await transactionProvider();
    const values = await this.values.getValueNames(valuesTrx, valueIds);
  
    return {
      code: 200,
      data: this.formatFinalGroupMemberPayloadSimplified(group[0], values),
    }
  }

  formatFinalGroupMemberPayloadSimplified(group, values) {
    const members = values.map(data => { return data.name });
    const { activity, groupCode, groupName } = group;

    return { activity, groupCode, groupName, members };
  }
}