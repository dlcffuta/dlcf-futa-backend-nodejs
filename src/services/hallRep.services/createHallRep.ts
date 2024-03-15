import { NextFunction } from "express";

import { HallRepresentativeModel, PermissionModel, WorkerModel } from "../../models";
import { IHallRepresentative } from "../../interfaces";
import { CustomError } from "utils/response/custom-error/customError";

export const createHallRepService = async (payload: IHallRepresentative, next: NextFunction) => {
    try {
        const worker = await WorkerModel.findById({ _id: payload.hallRepEmail });
        if (!worker) {
            return next(new CustomError(400, 'General', `Worker doesn't exist`))
        }
        const newHallRep = await HallRepresentativeModel.create({
            workerId: worker._id,
            hallId: payload.hallId,
            hallRepName: `${worker.firstName} ${worker.lastName}`,
            hallRepEmail: payload.hallRepEmail,
            hallRepPhone: `${worker.phoneNumber}`,
        });
        const permission = await PermissionModel.create({
            hallRepId: newHallRep._id,
            hall: { create: true, read: true, update: true, delete: true },
        })
        newHallRep.permission = permission._id;
        await newHallRep.save();
        return newHallRep;
    } catch (error) {
        return next(new CustomError(500, 'Raw', 'Internal server error', error.message));
    }
}