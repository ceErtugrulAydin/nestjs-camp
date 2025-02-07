import { InventoryModel } from './../models/inventory.model';
import { ActivityModel } from 'tools/models/activity.model';
import { AuditModel } from 'tools/models/audit.model';
import { TicketTypeModel } from 'tools/models/ticket-type.model';
import { UserModel } from 'tools/models/user.model';

export class TicketTypeDto {
  name: string;
  description: string;
  type: TicketTypeModel;
  responsible: UserModel;
  audit: AuditModel;
  activities: ActivityModel[];
  inventories: InventoryModel[];
}
