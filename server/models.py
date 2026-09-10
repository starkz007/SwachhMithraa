import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime
from database import Base

class TicketModel(Base):
    __tablename__ = "tickets"

    id = Column(String(50), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    titleHi = Column(String(255), nullable=True)
    category = Column(String(100), nullable=False)
    source = Column(String(50), default="citizen") # 'citizen' | 'ai_camera'
    isAiDetection = Column(Boolean, default=False)
    ward = Column(String(100), default="Ward 14 - Indiranagar")
    beat = Column(String(50), default="Beat #4")
    location = Column(String(255), nullable=False)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    reportedBy = Column(String(255), default="Citizen Reporter")
    reportedTime = Column(String(100), default="Just now")
    status = Column(String(50), default="pending") # 'pending' | 'in_progress' | 'resolved'
    priority = Column(String(50), default="High")  # 'Normal' | 'High' | 'Critical'
    assignedWorkerId = Column(String(50), nullable=True)
    assignedWorkerName = Column(String(100), nullable=True)
    beforePhoto = Column(Text, nullable=True)
    afterPhoto = Column(Text, nullable=True)
    slaRemaining = Column(String(50), default="24h 00m")
    notes = Column(Text, nullable=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

class WorkerModel(Base):
    __tablename__ = "workers"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(50), nullable=False)
    ward = Column(String(100), default="Ward 14 - Indiranagar")
    beat = Column(String(50), default="Beat #4")
    duty = Column(String(50), default="on_duty") # 'on_duty' | 'off_duty'
    shift = Column(String(50), default="06:00 AM - 02:00 PM")
    dignityCredits = Column(Integer, default=1420)
    photo = Column(Text, nullable=True)

class AiViolationModel(Base):
    __tablename__ = "ai_violations"

    id = Column(String(50), primary_key=True, index=True)
    nodeId = Column(String(50), default="POLE-NODE-1402")
    location = Column(String(255), default="Indiranagar 12th Main")
    timestamp = Column(String(100), default="Just now")
    violation = Column(String(255), default="Illegal Waste Dumping")
    confidence = Column(Float, default=95.0)
    videoClipUrl = Column(Text, nullable=True)
    plateNumber = Column(String(50), default="KA-04-MB-4819")
    ownerName = Column(String(100), default="Commercial Violator")
    status = Column(String(50), default="Challan Pending") # 'Challan Pending' | 'Challan Issued' | 'Paid'
    fineAmount = Column(Integer, default=500)
    ticketId = Column(String(50), nullable=True)

class DirectiveModel(Base):
    __tablename__ = "directives"

    id = Column(String(50), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Circular")
    targetZone = Column(String(100), default="All Zones (City-Wide)")
    effectiveDate = Column(String(50), default="Immediate Effect")
    status = Column(String(50), default="Active")
    summary = Column(Text, nullable=True)
