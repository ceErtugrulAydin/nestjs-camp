import { AuditModel } from "./audit.model";
import { InventoryTypeModel } from "./inventory-type.model";
import { ProductModel } from "./product.model";

export class InventoryModel {
    id: string;
    barcode: number;
    description: string;
    type: InventoryTypeModel;
    audit: AuditModel;
    product: ProductModel;
}