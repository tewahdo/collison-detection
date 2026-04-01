// export type SubmissionStatus = "pending" | "approved" | "rejected";

// export type SectorType =
//   | "airport"
//   | "asphalt"
//   | "railway"
//   | "pipeline"
//   | "powerline"
//   | "building"
//   | "other";

// export interface Coordinate {
//   lat: number;
//   lng: number;
// }

// export interface Submission {
//   id: string;
//   sectorName: string;
//   sectorType: SectorType;
//   coordinates: Coordinate[];
//   metadata: Record<string, string>;
//   status: SubmissionStatus;
//   hasCollision: boolean;
//   collisionDetails?: string;
//   submittedAt: string;
//   updatedAt: string;
//   managerMessage?: string;
// }

// export interface SubmissionFormData {
//   sectorName: string;
//   sectorType: SectorType;
//   coordinates: Coordinate[];
//   metadata: Record<string, string>;
// }

// export interface CollisionResult {
//   hasCollision: boolean;
//   collidingInfrastructure?: string[];
//   details?: string;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }


// export type SubmissionStatus = "pending" | "approved" | "rejected";

// export type SectorType =
//   | "airport"
//   | "asphalt"
//   | "railway"
//   | "pipeline"
//   | "powerline"
//   | "building"
//   | "other";

// export interface Coordinate {
//   lat: number;
//   lng: number;
// }

// export interface Submission {
//   id: string;
//   sectorName: string;
//   sectorType: SectorType;
//   coordinates: Coordinate[];
//   metadata: Record<string, string>;
//   status: SubmissionStatus;
//   hasCollision: boolean;
//   collisionDetails?: string;
//   submittedAt: string;
//   updatedAt: string;
//   managerMessage?: string;
// }

// export interface SubmissionFormData {
//   sectorName: string;
//   sectorType: SectorType;
//   coordinates: Coordinate[];
//   metadata: Record<string, string>;
// }

// export interface CollisionResult {
//   hasCollision: boolean;
//   collidingInfrastructure?: string[];
//   details?: string;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }









// // src/types/submission.ts

// // ✅ 9 SECTORS (STRICT + SAFE)
// export const SECTOR_TYPES = [
//   "airport",
//   "roads",
//   "electric_towers",
//   "power_plants",
//   "transformers",
//   "substations",
//   "railway_lines",
//   "telecom_sites",
//   "transmission_lines",
// ] as const;

// export type SectorType = (typeof SECTOR_TYPES)[number];

// // ✅ Submission Status
// export type SubmissionStatus = "pending" | "approved" | "rejected";

// // ✅ Coordinates type (NEW - cleaner)
// export interface Coordinate {
//   lat: number;
//   lng: number;
// }

// // ✅ Form data
// export interface SubmissionFormData {
//   sectorName: string;
//   sectorType: SectorType;
//   coordinates: Coordinate[];
//   metadata?: any;
// }

// // ✅ DB response
// export interface Submission {
//   id: string;
//   sectorName: string;
//   sectorType: SectorType;
//   coordinates: Coordinate[];
//   metadata: any;
//   status: SubmissionStatus;
//   hasCollision: boolean;
//   submittedAt: string;
//   updatedAt: string;
// }

// // ✅ API response
// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }











// ✅ 9 SECTORS
export const SECTOR_TYPES = [
  "airport",
  "roads",
  "electric_towers",
  "power_plants",
  "transformers",
  "substations",
  "railway_lines",
  "telecom_sites",
  "transmission_lines",
] as const;

export type SectorType = (typeof SECTOR_TYPES)[number];

// ✅ Status
export type SubmissionStatus = "pending" | "approved" | "rejected";

// ✅ Coordinates
export interface Coordinate {
  lat: number;
  lng: number;
}

// ✅ Form Data
export interface SubmissionFormData {
  sectorName: string;
  sectorType: SectorType;
  coordinates: Coordinate[];
  metadata?: any;
}

// ✅ DB Model
export interface Submission {
  id: string;
  sectorName: string;
  sectorType: SectorType;
  coordinates: Coordinate[];
  metadata: any;
  status: SubmissionStatus;
  hasCollision: boolean;
  collisionDetails?: string[]; // ✅ NEW
  submittedAt: string;
  updatedAt: string;
}

// ✅ API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}