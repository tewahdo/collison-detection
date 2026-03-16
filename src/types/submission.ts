export type SubmissionStatus = "pending" | "approved" | "rejected";

export type SectorType =
  | "airport"
  | "asphalt"
  | "railway"
  | "pipeline"
  | "powerline"
  | "building"
  | "other";

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Submission {
  id: string;
  sectorName: string;
  sectorType: SectorType;
  coordinates: Coordinate[];
  metadata: Record<string, string>;
  status: SubmissionStatus;
  hasCollision: boolean;
  collisionDetails?: string;
  submittedAt: string;
  updatedAt: string;
  managerMessage?: string;
}

export interface SubmissionFormData {
  sectorName: string;
  sectorType: SectorType;
  coordinates: Coordinate[];
  metadata: Record<string, string>;
}

export interface CollisionResult {
  hasCollision: boolean;
  collidingInfrastructure?: string[];
  details?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
