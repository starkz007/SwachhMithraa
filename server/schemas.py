from typing import Optional, List
from pydantic import BaseModel, ConfigDict
import datetime

# --- TICKET SCHEMAS ---
class TicketBase(BaseModel):
    title: str
    titleHi: Optional[str] = None
    category: str
    source: Optional[str] = "citizen"
    isAiDetection: Optional[bool] = False
    ward: Optional[str] = "Ward 14 - Indiranagar"
    beat: Optional[str] = "Beat #4"
    location: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    reportedBy: Optional[str] = "Citizen Reporter"
    priority: Optional[str] = "High"
    beforePhoto: Optional[str] = None
    notes: Optional[str] = None

class TicketCreate(TicketBase):
    id: Optional[str] = None

class TicketAssign(BaseModel):
    workerId: str
    workerName: str

class TicketResolve(BaseModel):
    afterPhoto: str
    resolutionNotes: Optional[str] = "Cleaned and verified by sanitary worker."

class TicketResponse(TicketBase):
    id: str
    status: str
    reportedTime: Optional[str] = "Just now"
    assignedWorkerId: Optional[str] = None
    assignedWorkerName: Optional[str] = None
    afterPhoto: Optional[str] = None
    slaRemaining: Optional[str] = "24h 00m"
    createdAt: Optional[datetime.datetime] = None

    model_config = ConfigDict(from_attributes=True)

# --- WORKER SCHEMAS ---
class WorkerBase(BaseModel):
    name: str
    phone: str
    ward: Optional[str] = "Ward 14 - Indiranagar"
    beat: Optional[str] = "Beat #4"
    duty: Optional[str] = "on_duty"
    shift: Optional[str] = "06:00 AM - 02:00 PM"
    dignityCredits: Optional[int] = 1420
    photo: Optional[str] = None

class WorkerCreate(WorkerBase):
    id: str

class WorkerDutyUpdate(BaseModel):
    duty: str # 'on_duty' | 'off_duty'

class WorkerResponse(WorkerBase):
    id: str

    model_config = ConfigDict(from_attributes=True)

# --- AI CAMERA VIOLATION SCHEMAS ---
class AiViolationBase(BaseModel):
    nodeId: Optional[str] = "POLE-NODE-1402"
    location: Optional[str] = "Indiranagar 12th Main"
    violation: Optional[str] = "Illegal Waste Dumping"
    confidence: Optional[float] = 95.0
    videoClipUrl: Optional[str] = None
    plateNumber: Optional[str] = "KA-04-MB-4819"
    ownerName: Optional[str] = "Commercial Violator"
    status: Optional[str] = "Challan Pending"
    fineAmount: Optional[int] = 500
    ticketId: Optional[str] = None

class AiViolationCreate(AiViolationBase):
    id: Optional[str] = None

class AiViolationResponse(AiViolationBase):
    id: str
    timestamp: Optional[str] = "Just now"

    model_config = ConfigDict(from_attributes=True)

# --- ANALYTICS SCHEMAS ---
class AnalyticsMetricsResponse(BaseModel):
    cityCleanlinessScore: int
    activeGrievances: int
    resolvedMonth: int
    segregationRatePercent: float
    cctvNodesActive: int
    totalWorkersOnDuty: int
