"use server";

import prisma from "@/lib/prisma";
import { workLogSchema } from "@/lib/validators/work-log";
import { calculateDifference } from "@/lib/helpers/workLog";
import { z } from "zod";

export async function createWorkLog(data: unknown) {
  try {
    const validatedData = workLogSchema.parse(data);

    const difference = calculateDifference({
      gpsStartTime: validatedData.gpsStartTime,
      gpsEndTime: validatedData.gpsEndTime,
      reportStartTime: validatedData.reportStartTime,
      reportEndTime: validatedData.reportEndTime,
      breakTime: validatedData.breakTime,
    });

    let kmNumber: number | null = null;
    if (validatedData.km) {
      kmNumber = Number(validatedData.km.replace(/[.,]/g, ""));
    }

    if (!validatedData?.driverId) {
      throw new Error("Selected vehicle has no assigned driver.");
    }

    console.log(data);

    const workLog = await prisma.workLog.create({
      data: {
        vehicleId: validatedData.vehicleId,
        driverId: validatedData.driverId,
        gpsStartTime: validatedData.gpsStartTime,
        gpsEndTime: validatedData.gpsEndTime,
        reportStartTime: validatedData.reportStartTime,
        reportEndTime: validatedData.reportEndTime,
        breakTime: validatedData.breakTime ?? "00:00",
        km: validatedData.km,
        difference, // calculated difference
        comment: validatedData.comment || null,
        date: new Date(validatedData.date),
      },
    });

    // If difference exists, mark driver as having a discrepancy
    if (difference && difference !== "00:00") {
      await prisma.driver.update({
        where: { id: validatedData.driverId },
        data: { hasDiscrepancy: true },
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation errors
      throw new Error(JSON.stringify(error.message));
    }
    // Other errors
    throw error;
  }
}
