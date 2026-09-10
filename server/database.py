import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL: defaults to SQLite file in server/ directory, easily overridden by PostgreSQL/MySQL connection string
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./swachhmitra.db")

# For SQLite, connect_args is needed to allow multithreaded requests
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL, connect_args=connect_args, echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency that creates and yields a database session, ensuring clean closure."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
