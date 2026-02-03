from sqlmodel import create_engine, Session
from ..lib.config import settings

# Create the database engine
engine = create_engine(settings.neon_db_url, echo=True)

def get_session():
    with Session(engine) as session:
        yield session