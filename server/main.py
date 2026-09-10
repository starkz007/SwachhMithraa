from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from database import engine, Base, get_db
import models, schemas, crud
from seed_data import seed_database

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SwachhMitra Enterprise Civic Backend API",
    description="Production-grade RESTful API for SwachhMitra Unified Civic Sanitation & AI Surveillance Platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Cross-Origin Resource Sharing (CORS) Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    """Auto-seed initial municipal records if database is empty."""
    db = next(get_db())
    try:
        seed_database(db)
    finally:
        db.close()

@app.get("/", tags=["System"])
def root():
    return {
        "status": "online",
        "service": "SwachhMitra Unified Civic Backend",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "cctvVisionEngine": "active",
        "serverTime": "live"
    }

# --- TICKETS ENDPOINTS ---
@app.get("/api/tickets", response_model=List[schemas.TicketResponse], tags=["Grievances & AI Tickets"])
def read_tickets(
    status: Optional[str] = Query(None, description="Filter by status: pending, in_progress, resolved"),
    source: Optional[str] = Query(None, description="Filter by source: citizen, ai_camera"),
    db: Session = Depends(get_db)
):
    return crud.get_tickets(db, status=status, source=source)

@app.get("/api/tickets/{ticket_id}", response_model=schemas.TicketResponse, tags=["Grievances & AI Tickets"])
def read_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = crud.get_ticket(db, ticket_id=ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.post("/api/tickets", response_model=schemas.TicketResponse, tags=["Grievances & AI Tickets"])
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.create_ticket(db=db, ticket=ticket)

@app.put("/api/tickets/{ticket_id}/assign", response_model=schemas.TicketResponse, tags=["Grievances & AI Tickets"])
def assign_ticket_worker(ticket_id: str, assign_data: schemas.TicketAssign, db: Session = Depends(get_db)):
    ticket = crud.assign_worker(db, ticket_id=ticket_id, worker_id=assign_data.workerId, worker_name=assign_data.workerName)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.put("/api/tickets/{ticket_id}/resolve", response_model=schemas.TicketResponse, tags=["Grievances & AI Tickets"])
def resolve_ticket(ticket_id: str, resolve_data: schemas.TicketResolve, db: Session = Depends(get_db)):
    ticket = crud.resolve_ticket(db, ticket_id=ticket_id, after_photo=resolve_data.afterPhoto)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

# --- WORKERS ENDPOINTS ---
@app.get("/api/workers", response_model=List[schemas.WorkerResponse], tags=["Sanitation Workforce"])
def read_workers(db: Session = Depends(get_db)):
    return crud.get_workers(db)

@app.put("/api/workers/{worker_id}/duty", response_model=schemas.WorkerResponse, tags=["Sanitation Workforce"])
def update_worker_duty(worker_id: str, duty_data: schemas.WorkerDutyUpdate, db: Session = Depends(get_db)):
    worker = crud.update_worker_duty(db, worker_id=worker_id, duty=duty_data.duty)
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker

# --- AI SURVEILLANCE ENDPOINTS ---
@app.get("/api/surveillance/alerts", response_model=List[schemas.AiViolationResponse], tags=["AI Surveillance & Violations"])
def read_violations(db: Session = Depends(get_db)):
    return crud.get_violations(db)

@app.put("/api/surveillance/alerts/{alert_id}/challan", response_model=schemas.AiViolationResponse, tags=["AI Surveillance & Violations"])
def issue_challan(alert_id: str, db: Session = Depends(get_db)):
    violation = crud.issue_challan(db, violation_id=alert_id)
    if not violation:
        raise HTTPException(status_code=404, detail="Violation record not found")
    return violation

# --- ANALYTICS ENDPOINTS ---
@app.get("/api/analytics/metrics", response_model=schemas.AnalyticsMetricsResponse, tags=["Analytics & Oversight"])
def read_metrics(db: Session = Depends(get_db)):
    return crud.get_analytics(db)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
