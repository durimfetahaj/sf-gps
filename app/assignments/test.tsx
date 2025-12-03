"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Mode = "worker" | "vehicle";
type VehicleChoice = "worker" | "inventory" | null;

export default function AssignmentCardExample() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [vehicleChoice, setVehicleChoice] = useState<VehicleChoice>(null);

  return (
    <div className="space-y-6 max-w-md mx-auto p-4">
      {/* Step 1: Choose Worker or Vehicle */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Assign To</h2>
        <div className="flex gap-4">
          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              mode === "worker"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => {
              setMode("worker");
              setVehicleChoice(null);
            }}
          >
            Worker
          </div>
          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              mode === "vehicle"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
            onClick={() => {
              setMode("vehicle");
              setVehicleChoice(null);
            }}
          >
            Vehicle
          </div>
        </div>
      </div>

      {/* Step 2: Vehicle secondary choice */}
      {mode === "vehicle" && (
        <div>
          <h3 className="text-md font-medium mb-2">Assign Vehicle To</h3>
          <div className="flex gap-4">
            <div
              className={`cursor-pointer p-3 border rounded-md flex-1 text-center ${
                vehicleChoice === "worker"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
              onClick={() => setVehicleChoice("worker")}
            >
              Worker
            </div>
            <div
              className={`cursor-pointer p-3 border rounded-md flex-1 text-center ${
                vehicleChoice === "inventory"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300"
              }`}
              onClick={() => setVehicleChoice("inventory")}
            >
              Inventory Items
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Render relevant form */}
      {mode === "worker" && (
        <div className="p-4 border rounded-md bg-blue-50">
          <p>Select a Worker and Inventory Items here...</p>
        </div>
      )}

      {mode === "vehicle" && vehicleChoice === "worker" && (
        <div className="p-4 border rounded-md bg-green-50">
          <p>Select a Worker to assign this Vehicle to...</p>
        </div>
      )}

      {mode === "vehicle" && vehicleChoice === "inventory" && (
        <div className="p-4 border rounded-md bg-orange-50">
          <p>Select Inventory Items to assign to this Vehicle...</p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          onClick={() => {
            setMode(null);
            setVehicleChoice(null);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={
            mode === null || (mode === "vehicle" && vehicleChoice === null)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
