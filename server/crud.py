import random
from sqlalchemy.orm import Session
import models, schemas

# --- TICKETS CRUD ---
def get_tickets(db: Session, status: str = None, source: str = None):
    query = db.query(models.TicketModel)
    if status and status != 'all':
        query = query.filter(models.TicketModel.status == status)
    if source and source != 'all':
        query = query.filter(models.TicketModel.source == source)
    return query.order_by(models.TicketModel.createdAt.desc()).all()

def get_ticket(db: Session, ticket_id: str):
    return db.query(models.TicketModel).filter(models.TicketModel.id == ticket_id).first()

def create_ticket(db: Session, ticket: schemas.TicketCreate):
    ticket_id = ticket.id or f"SWM-2024-{random.randint(1000, 9999)}"
    db_ticket = models.TicketModel(
        id=ticket_id,
        title=ticket.title,
        titleHi=ticket.titleHi or ticket.title,
        category=ticket.category,
        source=ticket.source or "citizen",
        isAiDetection=ticket.isAiDetection or False,
        ward=ticket.ward or "Ward 14 - Indiranagar",
        beat=ticket.beat or "Beat #4",
        location=ticket.location,
        lat=ticket.lat or (12.9716 + (random.random() - 0.5) * 0.005),
        lng=ticket.lng or (77.6412 + (random.random() - 0.5) * 0.005),
        reportedBy=ticket.reportedBy or ("AI Optical Camera Node #1402" if ticket.isAiDetection else "Citizen Reporter"),
        reportedTime="Just now",
        status="pending",
        priority=ticket.priority or "High",
        beforePhoto=ticket.beforePhoto or "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
        afterPhoto=None,
        slaRemaining="24h 00m",
        notes=ticket.notes or ("Autonomous AI camera detection." if ticket.isAiDetection else "Citizen photo report.")
    )
    db.add(db_ticket)

    # If it is an AI detection, also log into ai_violations table automatically!
    if ticket.isAiDetection or ticket.source == "ai_camera":
        db_violation = models.AiViolationModel(
            id=f"AI-CAM-{random.randint(1000, 9999)}",
            nodeId="POLE-NODE-1402",
            location=ticket.location,
            timestamp="Just now",
            violation=ticket.title.replace("AI Autonomous Flag: ", ""),
            confidence=96.4,
            videoClipUrl=db_ticket.beforePhoto,
            plateNumber="KA-04-MB-4819",
            ownerName="Civic Surveillance Evidence",
            status="Challan Pending",
            fineAmount=500,
            ticketId=ticket_id
        )
        db.add(db_violation)

    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def assign_worker(db: Session, ticket_id: str, worker_id: str, worker_name: str):
    db_ticket = get_ticket(db, ticket_id)
    if db_ticket:
        db_ticket.assignedWorkerId = worker_id
        db_ticket.assignedWorkerName = worker_name
        db_ticket.status = "in_progress"
        db.commit()
        db.refresh(db_ticket)
    return db_ticket

def resolve_ticket(db: Session, ticket_id: str, after_photo: str):
    db_ticket = get_ticket(db, ticket_id)
    if db_ticket:
        db_ticket.afterPhoto = after_photo
        db_ticket.status = "resolved"
        db_ticket.slaRemaining = "Resolved"
        db.commit()
        db.refresh(db_ticket)
    return db_ticket

# --- WORKERS CRUD ---
def get_workers(db: Session):
    return db.query(models.WorkerModel).all()

def update_worker_duty(db: Session, worker_id: str, duty: str):
    db_worker = db.query(models.WorkerModel).filter(models.WorkerModel.id == worker_id).first()
    if db_worker:
        db_worker.duty = duty
        db.commit()
        db.refresh(db_worker)
    return db_worker

# --- AI VIOLATIONS CRUD ---
def get_violations(db: Session):
    return db.query(models.AiViolationModel).order_by(models.AiViolationModel.id.desc()).all()

def issue_challan(db: Session, violation_id: str):
    db_violation = db.query(models.AiViolationModel).filter(models.AiViolationModel.id == violation_id).first()
    if db_violation:
        db_violation.status = "Challan Issued"
        db.commit()
        db.refresh(db_violation)
    return db_violation

# --- ANALYTICS CRUD ---
def get_analytics(db: Session):
    total_tickets = db.query(models.TicketModel).count()
    active_tickets = db.query(models.TicketModel).filter(models.TicketModel.status != "resolved").count()
    resolved_count = db.query(models.TicketModel).filter(models.TicketModel.status == "resolved").count()
    workers_on_duty = db.query(models.WorkerModel).filter(models.WorkerModel.duty == "on_duty").count()
    ai_violations_count = db.query(models.AiViolationModel).count()

    return schemas.AnalyticsMetricsResponse(
        cityCleanlinessScore=894,
        activeGrievances=active_tickets,
        resolvedMonth=resolved_count + 142,
        segregationRatePercent=87.6,
        cctvNodesActive=14,
        totalWorkersOnDuty=workers_on_duty
    )
