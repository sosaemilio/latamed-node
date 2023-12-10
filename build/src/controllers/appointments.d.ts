declare const ObjectId: any;
declare const mongoappointment: any;
declare const addAppointment: (req: any, res: any) => Promise<void>;
declare const getAppointmentsByPatientId: (req: any, res: any) => Promise<void>;
declare const getAppointmentsByDoctorId: (req: any, res: any) => Promise<void>;
declare const getAppointmentById: (req: any, res: any) => Promise<void>;
declare const updateAppointmentById: (req: any, res: any) => Promise<void>;
declare const deleteAppointment: (req: any, res: any) => Promise<void>;
declare const getAppointments: (req: any, res: any) => void;
