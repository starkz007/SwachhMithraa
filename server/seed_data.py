import os
import random
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models

def seed_database(db: Session = None):
    Base.metadata.create_all(bind=engine)
    close_after = False
    if db is None:
        db = SessionLocal()
        close_after = True

    try:
        # 1. Seed Workers
        if db.query(models.WorkerModel).count() == 0:
            print("Seeding initial sanitary worker roster...")
            initial_workers = [
                models.WorkerModel(
                    id="SW-101",
                    name="Sunil V. Kumar",
                    phone="+91 98450 21345",
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #4 (12th Main Road)",
                    duty="on_duty",
                    shift="06:00 AM - 02:00 PM",
                    dignityCredits=1420,
                    photo="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                ),
                models.WorkerModel(
                    id="SW-102",
                    name="Manjula Devi",
                    phone="+91 98450 67890",
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #2 (100ft Road Sector)",
                    duty="on_duty",
                    shift="06:00 AM - 02:00 PM",
                    dignityCredits=1680,
                    photo="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
                ),
                models.WorkerModel(
                    id="SW-103",
                    name="Ramesh Gowda",
                    phone="+91 98450 11223",
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #5 (CMH Road Metro)",
                    duty="off_duty",
                    shift="02:00 PM - 10:00 PM",
                    dignityCredits=950,
                    photo="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
                ),
                models.WorkerModel(
                    id="SW-104",
                    name="Anand K.",
                    phone="+91 98450 99887",
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #1 (HAL 2nd Stage)",
                    duty="on_duty",
                    shift="06:00 AM - 02:00 PM",
                    dignityCredits=1210,
                    photo="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                )
            ]
            db.add_all(initial_workers)
            db.commit()
            print(f"Seeded {len(initial_workers)} workers.")

        # 2. Seed Initial Tickets
        if db.query(models.TicketModel).count() == 0:
            print("Seeding initial municipal complaints & camera tickets...")
            initial_tickets = [
                models.TicketModel(
                    id="SWM-2024-1042",
                    title="Overflowing Secondary Waste Dump",
                    titleHi="कचरा पात्र का अत्यधिक भरा होना",
                    category="Garbage Dump / Overflowing Bin",
                    source="citizen",
                    isAiDetection=False,
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #4",
                    location="Indiranagar 12th Main Road",
                    lat=12.9716,
                    lng=77.6412,
                    reportedBy="Rajesh Sharma (Citizen #9842)",
                    reportedTime="12 mins ago",
                    status="pending",
                    priority="Critical",
                    assignedWorkerId=None,
                    assignedWorkerName=None,
                    beforePhoto="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
                    afterPhoto=None,
                    slaRemaining="03h 48m",
                    notes="Garbage heap blocking pedestrian footpath and storm drain."
                ),
                models.TicketModel(
                    id="SWM-2024-1039",
                    title="AI Optical Flag: Beverage Can & Plastic Debris",
                    titleHi="एआई कैमरा फ्लैग: प्लास्टिक बोतल कचरा",
                    category="AI CCTV: Live Optical Waste Flag",
                    source="ai_camera",
                    isAiDetection=True,
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #2",
                    location="100ft Road Junction Pole-14",
                    lat=12.9698,
                    lng=77.6435,
                    reportedBy="AI Optical Surveillance Camera (Node #1402)",
                    reportedTime="35 mins ago",
                    status="in_progress",
                    priority="High",
                    assignedWorkerId="SW-101",
                    assignedWorkerName="Sunil V. Kumar",
                    beforePhoto="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80",
                    afterPhoto=None,
                    slaRemaining="06h 15m",
                    notes="Autonomous AI optical detection. Tamper seal verified."
                ),
                models.TicketModel(
                    id="SWM-2024-1015",
                    title="Construction Debris & Mortar Residue",
                    titleHi="निर्माण मलबा व अवशेष",
                    category="Construction & Demolition Debris",
                    source="citizen",
                    isAiDetection=False,
                    ward="Ward 14 - Indiranagar",
                    beat="Beat #5",
                    location="CMH Road Metro Pillar #82",
                    lat=12.9782,
                    lng=77.6450,
                    reportedBy="Pooja Hegde (Citizen #4410)",
                    reportedTime="Yesterday",
                    status="resolved",
                    priority="Normal",
                    assignedWorkerId="SW-102",
                    assignedWorkerName="Manjula Devi",
                    beforePhoto="https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&auto=format&fit=crop&q=80",
                    afterPhoto="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
                    slaRemaining="Resolved",
                    notes="Cleared with mini-tipper truck and road washed."
                )
            ]
            db.add_all(initial_tickets)
            db.commit()
            print(f"Seeded {len(initial_tickets)} tickets.")

        # 3. Seed AI Violations
        if db.query(models.AiViolationModel).count() == 0:
            print("Seeding AI camera violations...")
            initial_violations = [
                models.AiViolationModel(
                    id="AI-CAM-101",
                    nodeId="POLE-NODE-1402",
                    location="Indiranagar 12th Main Road",
                    timestamp="10 mins ago",
                    violation="Illegal Night Dumping via Commercial Vehicle",
                    confidence=97.8,
                    videoClipUrl="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
                    plateNumber="KA-04-MB-4819",
                    ownerName="Apex Caterers & Logistics",
                    status="Challan Pending",
                    fineAmount=2500,
                    ticketId="SWM-2024-1042"
                ),
                models.AiViolationModel(
                    id="AI-CAM-102",
                    nodeId="POLE-NODE-880",
                    location="CMH Road Metro Junction",
                    timestamp="1 hour ago",
                    violation="Plastic Beverage Can Litter",
                    confidence=94.2,
                    videoClipUrl="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80",
                    plateNumber="KA-03-HA-9012",
                    ownerName="Commercial Store",
                    status="Challan Issued",
                    fineAmount=500,
                    ticketId="SWM-2024-1039"
                )
            ]
            db.add_all(initial_violations)
            db.commit()
            print(f"Seeded {len(initial_violations)} AI violations.")

    finally:
        if close_after:
            db.close()

if __name__ == "__main__":
    seed_database()
    print("Database seeding completed successfully.")
