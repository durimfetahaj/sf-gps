import { Prisma } from "@/app/generated/prisma";

// Type for Assignment including its AssignmentItems and InventoryItems
export type AssignmentWithItems = Prisma.AssignmentGetPayload<{
  include: {
    items: {
      include: {
        item: true; // InventoryItem
      };
    };
  };
}>;

// Type for Worker including Assignments with nested items
export type WorkerWithAssignments = Prisma.WorkerGetPayload<{
  include: {
    assignments: {
      include: {
        items: {
          include: {
            item: true;
          };
        };
      };
    };
  };
}>;
